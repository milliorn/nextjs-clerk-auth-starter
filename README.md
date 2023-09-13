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

Currently, no pages but the home page exist.

## Create a Protected Page

Create a new file called `page.tsx` in the `app\dashboard` directory (or whatever you want to call it). Then add the following code:

```tsx
type Props = {};

const Dashboard = (props: Props) => {
  return (
    <>
      <h1 className="text-2xl font-bold mb-5">Welcome</h1>
      <p className="mb-5">Welcome User!</p>
    </>
  );
};

export default Dashboard;
```

To check that the page is working, go to `http://localhost:3000/dashboard` and you should see the page. Next, go to `https://clerk.com/docs/references/nextjs/auth-middleware#auth-middleware` and copy the code for the `authMiddleware` function. Then create a new file called `middleware.ts` in the root of your project and paste the code. Go back to `http://localhost:3000/dashboard` and you should be redirected to login page.

```tsx

```

At this point, you should be able to register and login using default redirect page. Now we need to create a custom redirect page.

## .env file

Create a new file called `.env` in the root of your project and add the following code:

```md
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/login
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/login
```

This is necessary to point to your new redirect route pages.

## Redirect Login Page

Create a file at `app\login\[[...login]]\page.tsx` and add the following code:

```tsx
type Props = {};

const Login = (props: Props) => {
  return <div>Login</div>;
};

export default Login;
```

The, click on `Register` or go to `localhost:3000/login` and you should see the login page. `[...login]` is a dynamic route that will catch all routes that start with `/login`. You can either add your own components to this page or use the default Clerk components. To use the default Clerk components, add the following code to the `Login` component:

```tsx
import { SignIn } from "@clerk/nextjs";
```

Then in the return statement, add the `SignIn` component:

```tsx
return <SignIn path="/login" routing="path" />;
```

Now, it should all look like this.

```tsx
import { SignIn } from "@clerk/nextjs";

type Props = {};

const Login = (props: Props) => {
  return <SignIn path="/login" routing="path" />;
};

export default Login;
```

To create a custom Register page, repeat the steps above used to create the custom Login page. The only difference is that you will use the `Register` component instead of the `Login` component.

You can now go to `https://dashboard.clerk.com/` and confirm that sign in and sign up work.

## Update Header Based on Auth Status

To update the header based on the auth status, we need to import the `auth` from `@clerk/nextjs`.

```tsx
import { auth } from "@clerk/nextjs";
```

Then we need to destruct the `userId` property from `auth()`. Add this inside your `Header` component.

```tsx
const { user } = auth();
```

Now we can use the `user` object to determine if the user is logged in or not. If the user is logged in, we will show the `Dashboard` link. If the user is not logged in, we will show the `Login` and `Register` links. Here is the changes to the `Header` component:

```tsx
{
  !userId && (
    <>
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
    </>
  );
}
```

Now your `Header` component should look like this:

```tsx
import { auth } from "@clerk/nextjs";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  const { userId } = auth();
  // console.log(userId);

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
        <div className="text-indigo-50 flex items-center">
          {!userId && (
            <>
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
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;
```

## UserButton Component

Go back to your `Header` component and add the following code:

```tsx
import { auth, UserButton } from "@clerk/nextjs";
```

Then add the `UserButton` component to the `Header` component.

```tsx
<UserButton afterSignOutUrl="/" />
```

Now your `Header` component should look like this:

```tsx
import { auth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  const { userId } = auth();
  // console.log(userId);

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
        <div className="text-indigo-50 flex items-center">
          {!userId && (
            <>
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
            </>
          )}
          <div className="mx-auto">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
```

## Create Profile Page

Create a new file called `page.tsx` in the `app\profile` directory (or whatever you want to call it). Then add the following code:

```tsx
import { UserProfile } from "@clerk/nextjs";

type Props = {};

const Profile = (props: Props) => {
  return (
    <div>
      <UserProfile />
    </div>
  );
};

export default Profile;
```

Now go to `http://localhost:3000/profile` and you should see the profile page. Next, go back to `Header` component and add the `Profile` link.

````tsx
          {userId && (
            <Link href="/profile" className="hover:text-indigo-300 mr-4">
              Profile
            </Link>
          )}
          ```
````

Now your `Header` component should look like this:

```tsx
import { auth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  const { userId } = auth();
  // console.log(userId);

  return (
    <div>
      <nav className="bg-indigo-900  text-indigo-50 p-4 flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Link href="/">
            <div className="hover:text-indigo-300 text-sm uppercase font-bold">
              Clerk Starter
            </div>
          </Link>
        </div>
        <div className="flex items-center">
          {!userId && (
            <>
              <Link href="/login" className="hover:text-indigo-300 mr-4">
                LogIn
              </Link>
              <Link href="/register" className="hover:text-indigo-300 mr-4">
                Register
              </Link>
            </>
          )}
          {userId && (
            <Link href="/profile" className="hover:text-indigo-300 mr-4">
              Profile
            </Link>
          )}
          <div className="ml-auto">
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
```

## Test Email Signup & Verification Code Flow

Make sure if you are signed in, to sign out. Now, click on the `Register` link and sign up with an email. You should receive an email with a verification code. Copy the verification code and paste it into the input field. Then click `Verify`. You should be redirected to the `Dashboard` page. Make sure (if you have not) update your public routes in `middleware.ts` to include the `Register` page.

```tsx
import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: ["/", "/login", "/register"],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
```
