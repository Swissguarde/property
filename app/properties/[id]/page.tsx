"use client";

import PropertyDetail from "@/app/components/property-detail";
import PropertyHeaderImage from "@/app/components/property-header-image";
import Spinner from "@/app/components/spinner";
import { fetchProperty } from "@/utils/requests";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowLeft, FaBookmark, FaPaperPlane, FaShare } from "react-icons/fa";

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<IProperty | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return;
      try {
        const property = await fetchProperty(id as string);
        setProperty(property);
      } catch (error) {
        console.error("Error fetching property", error);
      } finally {
        setLoading(false);
      }
    };

    if (property === null) fetchPropertyData();
  }, [id, property]);

  if (!property && !loading) {
    return (
      <h1 className="mt-10 text-center text-2xl font-bold">
        Property Not Found
      </h1>
    );
  }

  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto p-6">
              <Link
                href="/properties.html"
                className="flex items-center text-teal-500 hover:text-teal-600"
              >
                <FaArrowLeft className="mr-2" /> Back to Properties
              </Link>
            </div>
          </section>
          <section className="bg-teal-50">
            <div className="container m-auto px-6 py-10">
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-70/30">
                <PropertyDetail property={property} />

                {/* <!-- Sidebar --> */}
                <aside className="space-y-4">
                  <div>
                    <button className="flex w-full items-center justify-center rounded-full bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-600">
                      <FaBookmark className="mr-2" />
                      Bookmark Property
                    </button>
                  </div>
                  <div>
                    <button className="flex w-full items-center justify-center rounded-full bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600">
                      <FaShare className="mr-2" /> Share Property
                    </button>
                  </div>

                  {/* <!-- Contact Form --> */}
                  <div className="rounded-lg bg-white p-6 shadow-md">
                    <h3 className="mb-6 text-xl font-bold">
                      Contact Property Manager
                    </h3>
                    <form
                      action="mailto:support@traversymedia.com"
                      method="post"
                      encType="text/plain"
                    >
                      <div className="mb-4">
                        <label
                          className="mb-2 block text-sm font-bold text-gray-700"
                          htmlFor="email"
                        >
                          Email:
                        </label>
                        <input
                          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          className="mb-2 block text-sm font-bold text-gray-700"
                          htmlFor="message"
                        >
                          Message:
                        </label>
                        <textarea
                          className="focus:shadow-outline h-44 w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow focus:outline-none"
                          id="message"
                          placeholder="Enter your message"
                        ></textarea>
                      </div>
                      <div>
                        <button
                          className="focus:shadow-outline flex w-full items-center justify-center rounded-full bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-600 focus:outline-none"
                          type="submit"
                        >
                          <FaPaperPlane className="mr-2" /> Send Message
                        </button>
                      </div>
                    </form>
                  </div>
                </aside>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}
