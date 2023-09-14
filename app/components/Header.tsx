import { auth, UserButton } from "@clerk/nextjs";
import Link from "next/link";

type Props = {};

const Header = (props: Props) => {
  const { userId } = auth();
  // console.log(userId);

  return (
    <div>
      <nav className="bg-indigo-900  text-indigo-50 p-4 flex items-center justify-between mb-4 dark:bg-indigo-600">
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
              <Link href="login" className="hover:text-indigo-300 mr-4">
                LogIn
              </Link>
              <Link href="registration" className="hover:text-indigo-300 mr-4">
                Register
              </Link>
            </>
          )}
          {userId && (
            <Link href="profile" className="hover:text-indigo-300 mr-4">
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
