import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSesssion } from "@/utils/getUserSession";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();

    const userSession = await getUserSesssion();

    if (!userSession || !userSession.user) {
      return new Response("User ID is required", {
        status: 401,
      });
    }

    const { userId } = userSession;

    const count = await Message.countDocuments({
      recipient: userId,
      read: false,
    });

    return new Response(JSON.stringify(count), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
