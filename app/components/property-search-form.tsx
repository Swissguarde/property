"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PropertySearchForm() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("All");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location === "" || propertyType === "All") {
      router.push("/properties");
    } else {
      const query = `?location=${location}&propertyType=${propertyType}`;
      router.push(`/properties/search-results${query}`);
    }
  };
  return (
    <section>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-3 flex w-full max-w-2xl flex-col items-center md:flex-row"
      >
        <div className="mb-4 w-full md:mb-0 md:w-3/5 md:pr-2">
          <label htmlFor="location" className="sr-only">
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="Enter Location or Keyword"
            className="w-full rounded-lg bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring focus:ring-teal-500"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="w-full md:w-2/5 md:pl-2">
          <label htmlFor="property-type" className="sr-only">
            Property Type
          </label>
          <select
            id="property-type"
            className="w-full rounded-lg bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring focus:ring-teal-500"
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Apartment">Apartment</option>
            <option value="Studio">Studio</option>
            <option value="Condo">Condo</option>
            <option value="House">House</option>
            <option value="Cabin Or Cottage">Cabin or Cottage</option>
            <option value="Loft">Loft</option>
            <option value="Room">Room</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="mt-4 w-full rounded-lg bg-teal-500 px-6 py-3 text-white hover:bg-teal-600 focus:outline-none focus:ring focus:ring-teal-500 md:ml-4 md:mt-0 md:w-auto"
        >
          Search
        </button>
      </form>
    </section>
  );
}
