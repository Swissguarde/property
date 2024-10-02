import connectDB from "@/config/database";
import Property from "@/models/Property";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  {
    params,
  }: {
    params: { id: string };
  }
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
