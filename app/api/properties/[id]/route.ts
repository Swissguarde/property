import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextRequest } from "next/server";
import { getUserSesssion } from "@/utils/getUserSession";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  },
) => {
  try {
    await connectDB();
    const property = await Property.findById(params.id);
    if (!property) return new Response("Property Not Found", { status: 404 });

    return new Response(JSON.stringify(property), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

export const DELETE = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  },
) => {
  try {
    const propertyId = params.id;

    const userSession = await getUserSesssion();

    // Check for session
    if (!userSession || !userSession.userId) {
      return new Response("User ID is required", { status: 401 });
    }

    const { userId } = userSession;

    await connectDB();

    const property = await Property.findById(propertyId);

    if (!property) return new Response("Property Not Found", { status: 404 });

    // Verify ownership
    if (property.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    await property.deleteOne();

    return new Response("Property Deleted", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Something Went Wrong", { status: 500 });
  }
};
