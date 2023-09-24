import { getCurrentUser } from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import { ClientOnly } from "@/components/ClientOnly";
import { EmptyState } from "@/components/EmptyState";
import { FavoriteClient } from "./FavoritesClient";
import getFavoriteListings from "@/actions/getFavoriteListings";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const listings = await getFavoriteListings();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="Looks like you have no favorite listings."
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoriteClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
