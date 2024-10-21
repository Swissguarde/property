"use client";
import PropertyCard from "@/app/components/property-card";
import PropertySearchForm from "@/app/components/property-search-form";
import Spinner from "@/app/components/spinner";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`,
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else setProperties([]);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [location, propertyType]);

  return (
    <>
      <section className="bg-teal-700 py-4">
        <div className="mx-auto flex max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      {loading ? (
        <Spinner loading={loading} />
      ) : (
        <section className="px-4 py-6">
          <div className="container-xl m-auto px-4 py-6 lg:container">
            <Link
              href="/properties"
              className="mb-3 flex items-center text-teal-500 hover:underline"
            >
              <FaArrowAltCircleLeft className="mb-1 mr-2" /> Back To Properties
            </Link>
            <h1 className="mb-4 text-2xl">Search Results</h1>
            {properties.length === 0 ? (
              <p>No search results found</p>
            ) : (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {properties.map((property: IProperty) => (
                  <PropertyCard key={property._id} property={property} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}
    </>
  );
}
