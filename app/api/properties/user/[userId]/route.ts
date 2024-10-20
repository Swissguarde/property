import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } },
) => {
  try {
    await connectDB();
    const userId = params.userId;
    if (!userId) return new Response("User ID is required", { status: 400 });
    const properties = await Property.find({ owner: userId });
    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};
