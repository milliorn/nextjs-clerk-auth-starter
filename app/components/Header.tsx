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
