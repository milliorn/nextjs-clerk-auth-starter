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

Go to [Clerk](https://clerk.com) and create an account. Once you've created an account, create a new application at https://dashboard.clerk.com/ by clicking on `Add application`. Name your application whatever you want. Select how your users will sign in, then click `Create application`. Once your application is created, scroll down and copy the `API Key` and `Public Key` into a new file in your project root called `.env.local`.
