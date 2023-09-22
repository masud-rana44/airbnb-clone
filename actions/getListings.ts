import prisma from "../libs/prismadb";

export async function getListings() {
  try {
    const listings = await prisma.listing.findMany();

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
