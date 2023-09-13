import { SignedOut } from "@clerk/nextjs";

type Props = {};

const Logout = (props: Props) => {
  return (
    <SignedOut>
      <div>
        <h1>You have been signed out</h1>
      </div>
    </SignedOut>
  );
};

export default Logout;
