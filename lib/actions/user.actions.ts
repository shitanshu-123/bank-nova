'use server';

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";

import { plaidClient } from '@/lib/plaid';
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    if (!userId) return null;
    const { database, user: userAdmin } = await createAdminClient();

    let userDoc: any = null;

    try {
      const userList = await database.listDocuments(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        [Query.equal('userId', [userId])]
      );

      if (userList && userList.documents.length > 0) {
        userDoc = userList.documents[0];
      }
    } catch (listErr) {
      console.warn("Could not query user by userId attribute:", listErr);
    }

    // Fallback: Query by document $id
    if (!userDoc) {
      try {
        userDoc = await database.getDocument(
          DATABASE_ID!,
          USER_COLLECTION_ID!,
          userId
        );
      } catch {}
    }

    // Fallback: If not in database, get from Appwrite Users Auth service and auto-create the database document
    if (!userDoc) {
      try {
        const appwriteUser = await userAdmin.get(userId);
        if (appwriteUser) {
          const names = (appwriteUser.name || 'User').split(' ');
          const firstName = names[0] || 'User';
          const lastName = names.slice(1).join(' ') || '';

          // Auto-create missing document in users database collection
          try {
            userDoc = await database.createDocument(
              DATABASE_ID!,
              USER_COLLECTION_ID!,
              ID.unique(),
              {
                userId: appwriteUser.$id,
                email: appwriteUser.email,
                firstName,
                lastName,
                address1: 'N/A',
                city: 'N/A',
                state: 'NY',
                postalCode: '10001',
                dateOfBirth: '1990-01-01',
                ssn: '0000',
                dwollaCustomerId: '',
                dwollaCustomerUrl: '',
              }
            );
          } catch (createDocErr) {
            console.warn("Could not auto-create database user document:", createDocErr);
            userDoc = {
              $id: appwriteUser.$id,
              userId: appwriteUser.$id,
              email: appwriteUser.email,
              name: appwriteUser.name || 'User',
              firstName,
              lastName,
              address1: '',
              city: '',
              state: '',
              postalCode: '',
              dateOfBirth: '',
              ssn: '',
              dwollaCustomerId: '',
              dwollaCustomerUrl: '',
            };
          }
        }
      } catch (authFetchErr) {
        console.warn("Could not fetch user from Appwrite Auth:", authFetchErr);
      }
    }

    return parseStringify(userDoc);
  } catch (error) {
    console.error("Error in getUserInfo:", error);
    return null;
  }
};

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    const user = await getUserInfo({ userId: session.userId });

    if (!user) {
      return parseStringify({
        $id: session.userId,
        userId: session.userId,
        email: email,
      });
    }

    return parseStringify(user);
  } catch (error: any) {
    console.error('Error signing in:', error);
    if (
      error?.type === 'user_invalid_credentials' ||
      error?.code === 401 ||
      error?.message?.toLowerCase().includes('invalid credentials')
    ) {
      return { error: 'Invalid email or password. Please check your credentials and try again.' };
    }
    return { error: error?.message || 'Failed to sign in. Please try again.' };
  }
};

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  const { email, firstName, lastName } = userData;
  
  let newUserAccount;

  try {
    const { account, database } = await createAdminClient();

    newUserAccount = await account.create(
      ID.unique(), 
      email, 
      password, 
      `${firstName} ${lastName}`
    );

    if(!newUserAccount) throw new Error('Error creating user account');

    let dwollaCustomerUrl = "";
    try {
      const res = await createDwollaCustomer({
        ...userData,
        type: 'personal'
      });
      if (res) dwollaCustomerUrl = res;
    } catch (dwollaErr) {
      console.warn("Dwolla customer creation error:", dwollaErr);
    }

    const dwollaCustomerId = dwollaCustomerUrl ? extractCustomerIdFromUrl(dwollaCustomerUrl) : "";

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        dwollaCustomerId,
        dwollaCustomerUrl
      }
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return parseStringify(newUser);
  } catch (error: any) {
    console.error('Error signing up:', error);
    if (error?.type === 'user_already_exists' || error?.code === 409) {
      return { error: 'An account with this email already exists. Please Sign In instead.' };
    }
    return { error: error?.message || 'Sign up failed. Please try again.' };
  }
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });

    if (!user) {
      const names = (result.name || 'User').split(' ');
      return parseStringify({
        $id: result.$id,
        userId: result.$id,
        email: result.email,
        name: result.name || 'User',
        firstName: names[0] || 'User',
        lastName: names.slice(1).join(' ') || '',
      });
    }

    return parseStringify(user);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export const logoutAccount = async () => {
  try {
    cookies().delete('appwrite-session');

    try {
      const { account } = await createSessionClient();
      await account.deleteSession('current');
    } catch (sessionErr) {
      console.warn("Session already invalidated or missing on server:", sessionErr);
    }

    return true;
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
}

export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    }

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token })
  } catch (error) {
    console.log(error);
  }
}

export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      }
    )

    return parseStringify(bankAccount);
  } catch (error) {
    console.log(error);
  }
}

export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    
    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

     // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
     const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });
    
    // If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareableId ID
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      shareableId: encryptId(accountData.account_id),
    });

    // Revalidate the path to reflect the changes
    revalidatePath("/");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    console.error("An error occurred while creating exchanging token:", error);
  }
}

export const getBanks = async ({ userId }: getBanksProps) => {
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('userId', [userId])]
    )

    return parseStringify(banks.documents);
  } catch (error) {
    console.log(error)
  }
}

export const getBank = async ({ documentId }: getBankProps) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('$id', [documentId])]
    )

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.log(error)
  }
}

export const getBankByAccountId = async ({ accountId }: getBankByAccountIdProps) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal('accountId', [accountId])]
    )

    if(bank.total !== 1) return null;

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.log(error)
  }
}