"use client";

import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";
import { Listing, Reservation } from "@prisma/client";
import Image from "next/image";
import { Button } from "../Button";
import { HeartButton } from "../HeartButton";

interface ListingCardProps {
  data: Listing;
  currentUser?: SafeUser | null;
  reservations?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
}

export const ListingCard = ({
  data,
  currentUser,
  reservations,
  onAction,
  disabled,
  actionLabel,
  actionId = "",
}: ListingCardProps) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) return;

      onAction?.(actionId);
    },
    [disabled, actionId, onAction]
  );

  const price = useMemo(() => {
    if (reservations) {
      return reservations.totalPrice;
    }

    return data.price;
  }, [reservations, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservations) return;

    const start = new Date(reservations.startDate);
    const end = new Date(reservations.endDate);

    return `${format(start, "PP")} ${format(end, "PP")}`;
  }, [reservations]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group cursor-pointer col-span-1"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full h-full relative overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt="House"
            className="object-cover h-full w-full group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-lg">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservations && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            small
            disabled={disabled}
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};
