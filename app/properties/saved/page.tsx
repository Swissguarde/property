"use client";
import PropertyCard from "@/app/components/property-card";
import Spinner from "@/app/components/spinner";
import { useState, useEffect } from "react";

import { toast } from "react-toastify";

const SavedPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch("/api/bookmarks");

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          console.log(res.statusText);
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch saved properties");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedProperties();
  }, []);

  return loading ? (
    <Spinner loading={loading} />
  ) : (
    <section className="px-4 py-6">
      <div className="container-xl m-auto px-4 py-6 lg:container">
        <h1 className="mb-4 text-2xl">Saved Properties</h1>
        {properties.length === 0 ? (
          <p>No saved properties</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {properties.map((property: IProperty) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
export default SavedPropertiesPage;
