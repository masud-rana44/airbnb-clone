import prisma from "../libs/prismadb";

export interface IListingParams {
  userId?: string;
}

export async function getListings(params: IListingParams) {
  try {
    let query: any = {};
    const { userId } = params;

    if (userId) {
      query.userId = userId;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
