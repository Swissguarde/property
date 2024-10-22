import connectDB from "@/config/database";
import Message from "@/models/Message";
import { getUserSesssion } from "@/utils/getUserSession";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async () => {
  try {
    await connectDB();
    const userSession = await getUserSesssion();

    if (!userSession || !userSession.user) {
      return new Response("User ID is required", { status: 401 });
    }
    const { userId } = userSession;
    const readMessages = await Message.find({
      recipient: userId,
      read: true,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const unreadMessages = await Message.find({
      recipient: userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const messages = [...unreadMessages, ...readMessages];
    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();
    const { email, name, phone, message, property, recipient } =
      await request.json();

    const userSession = await getUserSesssion();

    if (!userSession || !userSession.user) {
      return new Response(
        JSON.stringify({ message: "You must sign in to send a message" }),
        { status: 401 },
      );
    }
    const { user } = userSession;

    if (user.id === recipient)
      return new Response(
        JSON.stringify({ message: "You can not send a message to yourself" }),
        { status: 400 },
      );

    const newMessage = new Message({
      sender: user.id,
      recipient,
      property,
      email,
      phone,
      name,
      body: message,
    });
    await newMessage.save();
    return new Response(JSON.stringify({ message: "Message Sent!" }), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong", { status: 500 });
  }
};
