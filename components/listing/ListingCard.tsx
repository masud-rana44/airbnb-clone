"use client";

import { Listing, User } from "@prisma/client";

interface ListingCardProps {
  currentUser: User | null;
  data: Listing;
}

export const ListingCard = ({ currentUser, data }: ListingCardProps) => {
  return <div>ListingCard</div>;
};
