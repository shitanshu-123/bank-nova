<div align="center">
  <br />
  <h1>🏦 Bank Nova</h1>
  <p><strong>Next-Gen Modern Banking & Financial Platform with Google Pay & UPI Suite</strong></p>
  
  <div>
    <img src="https://img.shields.io/badge/Next.js_14-black?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Appwrite-FD366E?style=for-the-badge&logo=appwrite&logoColor=white" alt="Appwrite" />
    <img src="https://img.shields.io/badge/Google_Pay-4285F4?style=for-the-badge&logo=googlepay&logoColor=white" alt="Google Pay" />
  </div>
  <br />
</div>

---

## 🌟 Overview

**Bank Nova** is a state-of-the-art financial SaaS and modern banking platform built with **Next.js 14**, **Appwrite Cloud**, **Plaid**, and **Dwolla**, featuring a complete **Google Pay & UPI Payment Suite** with real-time balance tracking, dynamic QR scan & pay, digital invoice receipts, and 6-digit email OTP authentication.

---

## ⚡ Key Features

- 🔐 **Bank-Grade Authentication**: Ultra-secure SSR authentication with 6-digit Email OTP verification and password recovery.
- 🇮🇳 **Indian Localization & INR (₹) Currency**: Full support for Indian Rupees (`₹`), 6-digit PIN codes, Indian state validation, and PAN/Aadhaar ID fields.
- ⚡ **Google Pay & UPI Payment Hub**:
  - Send instantly to any UPI ID / GPay handle (`@okhdfcbank`, `@okaxis`, `@oksbi`, `@paytm`, `@ybl`).
  - 10-digit mobile number payments.
  - Interactive **Dynamic QR Code Generator & Scanner**.
  - Quick-tap frequent contacts and preset amount chips.
  - UPI PIN authorization sheet.
- 🧾 **Digital Payment Invoices**: Instant printable and downloadable payment receipts with unique UPI UTR reference numbers.
- 🏦 **Multi-Bank Account Linking**: Real-time integration with Plaid for multi-institution account aggregation.
- 📊 **Interactive Financial Analytics**: Doughnut charts, category expense tracking, dynamic status badges, and animated balance counters.
- 📱 **100% Responsive & Cross-Device**: Optimized for mobile phones, tablets, and desktop workstations.

---

## ⚙️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router & Server Actions)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Backend & Database**: [Appwrite Cloud](https://cloud.appwrite.io/)
- **Banking APIs**: [Plaid](https://plaid.com/) & [Dwolla](https://www.dwolla.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & [Radix UI](https://www.radix-ui.com/)
- **Icons & Visuals**: [Lucide React](https://lucide.dev/) & Chart.js
- **Form Management**: React Hook Form & Zod Schema Validation

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/shitanshu-123/bank-nova.git
cd bank-nova
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:5000
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://fra.cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=your_appwrite_project_id
APPWRITE_DATABASE_ID=your_database_id
APPWRITE_USER_COLLECTION_ID=users
APPWRITE_ITEM_COLLECTION_ID=items
APPWRITE_BANK_COLLECTION_ID=banks
APPWRITE_TRANSACTION_COLLECTION_ID=transactions
NEXT_APPWRITE_KEY=your_appwrite_api_secret_key

PLAID_CLIENT_ID=your_plaid_client_id
PLAID_SECRET=your_plaid_secret
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions
PLAID_COUNTRY_CODES=US

DWOLLA_KEY=your_dwolla_key
DWOLLA_SECRET=your_dwolla_secret
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5000](http://localhost:5000) in your browser.

---

## ☁️ Deployment

Bank Nova is optimized for instant zero-configuration deployment on **Vercel**:

1. Push your repository to **GitHub**.
2. Import the repository into **[Vercel](https://vercel.com)**.
3. Add the `.env` keys in Vercel's Environment Variables settings.
4. Click **Deploy**.

---

## 👨‍💻 Author

**Shitanshu Patel**  
- GitHub: [@shitanshu-123](https://github.com/shitanshu-123)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
