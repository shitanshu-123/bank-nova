/* eslint-disable no-prototype-builtins */
import { type ClassValue, clsx } from "clsx";
import qs from "query-string";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// FORMAT DATE TIME
export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    year: "numeric", // numeric year (e.g., '2023')
    month: "2-digit", // abbreviated month name (e.g., 'Oct')
    day: "2-digit", // numeric day of the month (e.g., '25')
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "en-US",
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    "en-US",
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "en-US",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "en-US",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  });

  return formatter.format(amount || 0);
}

export const parseStringify = (value: any) => {
  if (value === undefined) return null;
  return JSON.parse(JSON.stringify(value));
};

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}

export function countTransactionCategories(
  transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
    transactions.forEach((transaction) => {
      // Extract the category from the transaction
      const category = transaction.category;

      // If the category exists in the categoryCounts object, increment its count
      if (categoryCounts.hasOwnProperty(category)) {
        categoryCounts[category]++;
      } else {
        // Otherwise, initialize the count to 1
        categoryCounts[category] = 1;
      }

      // Increment total count
      totalCount++;
    });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
    (category) => ({
      name: category,
      count: categoryCounts[category],
      totalCount,
    })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function extractCustomerIdFromUrl(url: string) {
  // Split the URL string by '/'
  const parts = url.split("/");

  // Extract the last part, which represents the customer ID
  const customerId = parts[parts.length - 1];

  return customerId;
}

export function encryptId(id: string) {
  return btoa(id);
}

export function decryptId(id: string) {
  try {
    return atob(id);
  } catch {
    return "";
  }
}

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

export const authFormSchema = (type: string) => z.object({
  // sign up
  firstName: type === 'sign-in' ? z.string().optional() : z.string().min(2, "First name must be at least 2 characters"),
  lastName: type === 'sign-in' ? z.string().optional() : z.string().min(1, "Last name is required"),
  address1: type === 'sign-in' ? z.string().optional() : z.string().min(3, "Address must be at least 3 characters").max(100),
  city: type === 'sign-in' ? z.string().optional() : z.string().min(2, "Please enter a valid city").max(50),
  state: type === 'sign-in' ? z.string().optional() : z.string().min(2, "Please select or enter a valid State / UT").max(50),
  postalCode: type === 'sign-in' 
    ? z.string().optional() 
    : z.string().regex(/^[1-9][0-9]{5}$/, "Please enter a valid 6-digit Indian PIN code (e.g. 400001)"),
  dateOfBirth: type === 'sign-in'
    ? z.string().optional()
    : z.string().refine((val) => {
        if (!val) return false;
        // Accept DD-MM-YYYY, DD/MM/YYYY, or YYYY-MM-DD
        const ddmmyyyy = val.match(/^(\d{1,2})[-/.](\d{1,2})[-/.](\d{4})$/);
        const yyyymmdd = val.match(/^(\d{4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
        
        let d = 0, m = 0, y = 0;
        if (ddmmyyyy) {
          d = parseInt(ddmmyyyy[1], 10);
          m = parseInt(ddmmyyyy[2], 10);
          y = parseInt(ddmmyyyy[3], 10);
        } else if (yyyymmdd) {
          y = parseInt(yyyymmdd[1], 10);
          m = parseInt(yyyymmdd[2], 10);
          d = parseInt(yyyymmdd[3], 10);
        } else {
          return false;
        }

        if (m < 1 || m > 12 || d < 1 || d > 31 || y < 1920 || y > new Date().getFullYear()) {
          return false;
        }
        const dateObj = new Date(y, m - 1, d);
        return dateObj.getFullYear() === y && dateObj.getMonth() === m - 1 && dateObj.getDate() === d;
      }, {
        message: "Please enter a valid Date of Birth in DD-MM-YYYY format (e.g. 12-11-2005)",
      }),
  ssn: type === 'sign-in'
    ? z.string().optional()
    : z.string().refine((val) => {
        if (!val) return false;
        const clean = val.trim().toUpperCase();
        // Indian PAN Card: 5 letters + 4 digits + 1 letter (e.g. ABCDE1234F)
        const isPan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(clean);
        // Aadhaar: 12 digits
        const isAadhaar = /^[2-9]{1}[0-9]{11}$/.test(clean.replace(/\s+/g, ''));
        // SSN: 4-9 digits
        const isSsn = /^[0-9]{4,9}$/.test(clean);
        return isPan || isAadhaar || isSsn;
      }, {
        message: "Enter a valid PAN (e.g. ABCDE1234F), 12-digit Aadhaar, or SSN",
      }),
  // both
  email: z.string().email("Please enter a valid email address (e.g. user@gmail.com)").refine((val) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val.trim());
  }, {
    message: "Please enter a valid email domain (e.g. name@gmail.com)",
  }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});