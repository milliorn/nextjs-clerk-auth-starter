# Simple Next.js & React Authentication With Clerk

This is a simple example of how to use [Clerk](https://clerk.com) to add authentication to a Next.js app.

## Getting Started

```bash
npx create-next-app@latest
```

It will prompt you a series of questions.

```
√ What is your project named? ... clerk-starter
√ Would you like to use TypeScript? ... No / Yes
√ Would you like to use ESLint? ... No / Yes
√ Would you like to use Tailwind CSS? ... No / Yes
√ Would you like to use `src/` directory? ... No / Yes
√ Would you like to use App Router? (recommended) ... No / Yes
√ Would you like to customize the default import alias? ... No / Yes
```

I selected TypeScript, ESLint, Tailwind CSS, `src/` directory, App Router, and the default import alias.

Name your project whatever you want, then `cd` into the directory and run:

```bash
clerk-starter
```

## Clean Up

Remove all the code from `app/index.tsx` and replace it with:

```tsx
export default function Home() {
  return (
    <main className="">
      <h1 className="">Hello World</h1>
    </main>
  );
}
```

Next, go to `app/globals.css` and remove all the code except Tailwind's `@tailwind base;` and `@tailwind components;` directives.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Install Clerk

Now we need to install Clerk.

```bash
npm i @clerk/nextjs
```

## Create Clerk Account

Go to [Clerk](https://clerk.com) and create an account. Once you've created an account, create a new application at https://dashboard.clerk.com/ by clicking on `Add application`. Name your application whatever you want. Select how your users will sign in, then click `Create application`. Once your application is created, scroll down and copy the `API Key` and `Public Key` into a new file in your project root called `.env.local`. If you use another framework other than Next.Js make sure you select the correct framework in the dropdown.

## Create Clerk Provider

Go to your layout.tsx file located at `app\layout.tsx`. Import the `ClerkProvider` from `@clerk/nextjs`. Then wrap the `ClerkProvider` around the `children` prop.

```tsx
import { ClerkProvider } from "@clerk/nextjs";

<ClerkProvider>
  <html lang="en">
    <body className={inter.className}>{children}</body>
  </html>
</ClerkProvider>;
```

The final code at this point for `app\layout.tsx` should look like this:

```tsx
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js + Clerk Starter",
  description: "A starter for Next.js + Clerk",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <main className="container mx-auto">
            <div className="flex items-start justify-center min-h-screen">
              <div className="mt-20">{children}</div>
            </div>
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
```

## Header Component

Create a new file called `Header.tsx` in the `app\components` directory. Then add the following code:

```tsx
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  return (
    <div>
      <nav className="bg-sky-900 p-4 flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-lg uppercase font-bold text-sky-50">
              Clerk Starter
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;
```

Now we need to import the `Header` component into our `app\layout.tsx` file and add it to the layout.

```tsx
import Header from "./components/Header";
```

Place it after the `main` component.

```tsx
<main className="container mx-auto">
  <Header />
  <div className="flex items-start justify-center min-h-screen">
    <div className="mt-20">{children}</div>
  </div>
</main>
```

Now we need to add links to the header. Replace the `Header` component with the following code:

```tsx
return (
  <div>
    <nav className="bg-indigo-900 p-4 flex items-center justify-between mb-4">
      <div className="flex items-center">
        <Link href="/">
          <div className="text-sm uppercase font-bold text-indigo-50">
            Clerk Starter
          </div>
        </Link>
      </div>
      <div className="text-indigo-50">
        <Link
          href="/login"
          className="text-indigo-100 hover:text-indigo-300 mr-4"
        >
          LogIn
        </Link>
        <Link
          href="/register"
          className="text-indigo-100 hover:text-indigo-300 mr-4"
        >
          Register
        </Link>
      </div>
    </nav>
  </div>
);
```
