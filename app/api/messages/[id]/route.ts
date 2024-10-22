import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSesssion } from "@/utils/getUserSession";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const PUT = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  try {
    await connectDB();
    const userSession = await getUserSesssion();

    if (!userSession || !userSession.user) {
      return new Response("User ID is required", { status: 401 });
    }
    const { userId } = userSession;
    const message = await Message.findById(params.id);

    if (!message) return new Response("Message not found!", { status: 404 });

    if (message.recipient.toString() !== userId)
      return new Response("Unauthorized", { status: 401 });
    message.read = !message.read;

    await message.save();

    return new Response(JSON.stringify(message), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  try {
    await connectDB();
    const userSession = await getUserSesssion();

    if (!userSession || !userSession.user) {
      return new Response("User ID is required", { status: 401 });
    }
    const { userId } = userSession;
    const message = await Message.findById(params.id);

    if (!message) return new Response("Message not found!", { status: 404 });

    if (message.recipient.toString() !== userId)
      return new Response("Unauthorized", { status: 401 });
    await message.deleteOne();

    return new Response("Message Deleted", { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
