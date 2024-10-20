"use client";

import BookmarkButton from "@/app/components/bookmark-button";
import ContactForm from "@/app/components/contact-form";
import PropertyDetail from "@/app/components/property-detail";
import PropertyHeaderImage from "@/app/components/property-header-image";
import PropertyImages from "@/app/components/property-images";
import ShareButtons from "@/app/components/share-buttons";
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
                href="/properties"
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
                  <BookmarkButton property={property} />
                  <ShareButtons property={property} />

                  <ContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
}
