import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";

import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await req.json();

    const {
      title,
      description,
      imageSrc,
      category,
      roomCount,
      bathroomCount,
      guestCount,
      location,
      price,
    } = body;

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (
      !title ||
      !description ||
      !imageSrc ||
      !category ||
      !roomCount ||
      !bathroomCount ||
      !guestCount ||
      !location ||
      !price
    ) {
      return new NextResponse("Missing field value", { status: 403 });
    }

    const listing = await prisma.listing.create({
      data: {
        title,
        description,
        imageSrc,
        category,
        roomCount,
        bathroomCount,
        guestCount,
        locationValue: location.value,
        price: parseInt(price, 10),
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.log("[LISTING_POST]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
