"use client";
import Image from "next/image";
import Link from "next/link";
import profileDefault from "@/public/assets/profile.png";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const { data: session } = useSession();
  const profileImage = session?.user.image;
  const profileName = session?.user.name;
  const profileEmail = session?.user.email;

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProperties = async (userId: string) => {
      if (!userId) return;
      try {
        const res = await fetch(`/api/properties/user/${userId}`);
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (session?.user.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  const handleDeleteProperty = async (propertyId: string) => {
    console.log("propertyId", propertyId);

    const confirmed = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        // Remove the property from state
        const updatedProperties = properties.filter(
          (property: PropertyData) => property._id !== propertyId,
        );

        setProperties(updatedProperties);

        toast.success("Property Deleted");
      } else {
        toast.error("Failed to delete property");
      }
    } catch (error) {
      console.log(error);
      alert("Failed to delete property");
    }
  };
  return (
    <section className="bg-teal-50">
      <div className="container m-auto py-24">
        <div className="m-4 mb-4 rounded-md border bg-white px-6 py-8 shadow-md md:m-0">
          <h1 className="mb-4 text-3xl font-bold">Your Profile</h1>

          <div className="flex flex-col md:flex-row">
            <div className="mx-20 mt-10 md:w-1/4">
              <div className="mb-4">
                <Link href="/property.html">
                  <Image
                    className="mx-auto h-32 w-32 rounded-full md:mx-0 md:h-48 md:w-48"
                    src={profileImage || profileDefault}
                    alt="User"
                    width={200}
                    height={200}
                    priority={true}
                  />
                </Link>
              </div>

              <h2 className="mb-4 text-2xl">
                <span className="block font-bold">Name: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="block font-bold">Email: </span> {profileEmail}
              </h2>
            </div>
            <div className="md:w-3/4 md:pl-4">
              <h2 className="mb-4 text-xl font-semibold">Your Listings</h2>
              {!loading && properties.length === 0 && (
                <p>You have no property listings</p>
              )}

              {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties.map((property: PropertyData) => {
                  const {
                    _id,
                    location: { city, state, street },
                    name,
                    images,
                  } = property;
                  return (
                    <div key={_id} className="mb-10">
                      <Link href={`/properties/${_id}`}>
                        <Image
                          className="h-32 w-full rounded-md object-cover"
                          src={images[0]}
                          alt={name}
                          width={500}
                          height={100}
                          priority={true}
                        />
                      </Link>
                      <div className="mt-2">
                        <p className="text-lg font-semibold">{name}</p>
                        <p className="text-gray-600">
                          Address: {street} {city} {state}
                        </p>
                      </div>
                      <div className="mt-2">
                        <Link
                          href={`/properties/${_id}/edit`}
                          className="mr-2 rounded-md bg-teal-500 px-3 py-3 text-white hover:bg-teal-600"
                        >
                          Edit
                        </Link>
                        <button
                          className="rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600"
                          type="button"
                          onClick={() => handleDeleteProperty(_id!)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
