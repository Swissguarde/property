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

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    await connectDB();

    const userSession = await getUserSesssion();
    if (!userSession || !userSession.userId)
      return new Response("User ID is required", { status: 401 });

    const { id } = params;
    const { userId } = userSession;

    const formData = await request.formData();
    const amenities: string[] = formData.getAll("amenities") as string[];

    const existingProperty = await Property.findById(id);
    if (!existingProperty)
      return new Response("Property does not exist", { status: 404 });

    if (existingProperty.owner.toString() !== userId) {
      return new Response("Unauthorized", { status: 401 });
    }

    const propertyData: PropertyData = {
      type: formData.get("type") as string,
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      location: {
        street: formData.get("location.street") as string,
        city: formData.get("location.city") as string,
        state: formData.get("location.state") as string,
        zipcode: formData.get("location.zipcode") as string,
      },
      beds: formData.get("beds") as string,
      baths: formData.get("baths") as string,
      square_feet: formData.get("square_feet") as string,
      amenities,
      rates: {
        weekly: formData.get("rates.weekly") as string,
        monthly: formData.get("rates.monthly") as string,
        nightly: formData.get("rates.nightly") as string,
      },
      seller_info: {
        name: formData.get("seller_info.name") as string,
        email: formData.get("seller_info.email") as string,
        phone: formData.get("seller_info.phone") as string,
      },
      owner: userId,
    };

    const updatedProperty = await Property.findByIdAndUpdate(id, propertyData);

    return new Response(JSON.stringify(updatedProperty), { status: 200 });
  } catch (error) {
    console.log(error);
  }
};
