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
