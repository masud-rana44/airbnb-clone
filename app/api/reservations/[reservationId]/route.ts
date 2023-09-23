import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

import prisma from "@/libs/prismadb";

export async function DELETE(
  request: Request,
  { params }: { params: { reservationId: string } }
) {
  try {
    const currentUser = await getCurrentUser();
    const { reservationId } = params;

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!reservationId || typeof reservationId !== "string") {
      return new NextResponse("Invalid reservation id", { status: 403 });
    }

    const reservation = await prisma.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          { userId: currentUser.id },
          { listing: { userId: currentUser.id } },
        ],
      },
    });

    return NextResponse.json(reservation);
  } catch (error) {
    console.log("[RESERVATION_ID_DELETE]", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
