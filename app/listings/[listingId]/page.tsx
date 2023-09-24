import { getCurrentUser } from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import { ClientOnly } from "@/components/ClientOnly";
import { EmptyState } from "@/components/EmptyState";
import { ListingClient } from "./ListingClient";
import getListingById from "@/actions/getListingById";

const ListingIdPage = async ({
  params,
}: {
  params: {
    listingId?: string;
  };
}) => {
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  const listing = await getListingById(params);

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient
        listing={listing}
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ListingIdPage;
