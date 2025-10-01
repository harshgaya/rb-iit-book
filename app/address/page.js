import AddressesPage from "@/components/address/address-page";
import { getUserAddress } from "@/lib/api/api";

export default async function Address() {
  const address = await getUserAddress();
  return <AddressesPage addresses={address} />;
}
