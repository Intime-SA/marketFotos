import {
  getUsers,
  getUserTypeDistribution,
  getUserGrowth,
} from "@/src/lib/data";
import SuperAdminUsersClient from "@/src/components/users/usersList";

export default async function SuperAdminUsers() {
  const users = await getUsers();
  const userTypeData = await getUserTypeDistribution();
  const userGrowthData = await getUserGrowth();

  return (
    <SuperAdminUsersClient
      initialUsers={users}
      userTypeData={userTypeData}
      userGrowthData={userGrowthData}
    />
  );
}
