import { NextResponse } from "next/server";

import { getCurrentUser } from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

interface IParams {
  listingId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      return new NextResponse("Invalid listing id", { status: 403 });
    }

    const listing = await prisma.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    return NextResponse.json(listing);
  } catch (error) {
    console.log("[LISTING_ID_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
