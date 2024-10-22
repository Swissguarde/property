import connectDB from "@/config/database";
import User from "@/models/User";
import { getUserSesssion } from "@/utils/getUserSession";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const { propertyId } = await request.json();
    const userSession = await getUserSesssion();
    if (!userSession || !userSession.userId) {
      return new Response("User ID is required", { status: 401 });
    }
    const { userId } = userSession;
    const user = await User.findOne({ _id: userId });

    let isBookmarked = user.bookmarks.includes(propertyId);

    return new Response(JSON.stringify({ isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
