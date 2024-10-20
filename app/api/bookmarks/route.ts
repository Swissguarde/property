import connectDB from "@/config/database";
import Property from "@/models/Property";
import User from "@/models/User";
import { getUserSesssion } from "@/utils/getUserSession";

export const dynamic = "force-dynamic";
export const POST = async (request: Request) => {
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
    let message;
    if (isBookmarked) {
      user.bookmarks.pull(propertyId);
      message = "Bookmark removed successfully";
      isBookmarked = false;
    } else {
      user.bookmarks.push(propertyId);
      message = "Bookmark added successfully";
      isBookmarked = true;
    }
    await user.save();
    return new Response(JSON.stringify({ message, isBookmarked }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const GET = async () => {
  try {
    await connectDB();
    const userSession = await getUserSesssion();
    if (!userSession || !userSession.userId) {
      return new Response("User ID is required", { status: 401 });
    }
    const { userId } = userSession;
    const user = await User.findOne({ _id: userId });

    const bookmarks = await Property.find({ _id: { $in: user.bookmarks } });

    return new Response(JSON.stringify(bookmarks), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
