import UserProfilePage from "@/components/profile/profile";
import { getUserSession } from "@/lib/utils/action";

export default async function Profile() {
  const userName = (await getUserSession()?.name) || "";
  return <UserProfilePage name={userName} />;
}
