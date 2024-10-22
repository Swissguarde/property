/* eslint-disable @typescript-eslint/no-unused-vars */
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/database";
import Property from "@/models/Property";
import { getUserSesssion } from "@/utils/getUserSession";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectDB();
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1", 10);
    const pageSize = parseInt(
      request.nextUrl.searchParams.get("pageSize") || "1",
      10,
    );

    const skip = (page - 1) * pageSize;

    const total = await Property.countDocuments();
    const properties = await Property.find({}).skip(skip).limit(pageSize);
    const result = {
      total,
      properties,
    };
    return new Response(JSON.stringify(result), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
  }
};

export const POST = async (request: Request) => {
  try {
    await connectDB();

    const userSession = await getUserSesssion();
    if (!userSession || !userSession.userId)
      return new Response("User ID is required", { status: 401 });

    const { userId } = userSession;

    const formData = await request.formData();
    const amenities: string[] = formData.getAll("amenities") as string[];
    const images = formData
      .getAll("images")
      .filter((image) => image instanceof File && image.name !== "");

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
      images: [],
    };

    // Upload images to cloudinary
    const imageUploadPromises = [];

    for (const image of images) {
      if (image instanceof File) {
        const imageBuffer = await image.arrayBuffer();
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);

        const imageBase64 = imageData.toString("base64");
        const result = await cloudinary.uploader.upload(
          `data:image/png;base64,${imageBase64}`,
          { folder: "property" },
        );
        imageUploadPromises.push(result.secure_url);

        const uploadedImages = await Promise.all(imageUploadPromises);
        propertyData.images = uploadedImages;
      }
    }
    const newProperty = new Property(propertyData);
    await newProperty.save();

    return Response.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`,
    );
  } catch (error) {
    console.log(error);
  }
};
