import { fetchProperties } from "@/utils/requests";
import PropertyCard from "../components/property-card";
import PropertySearchForm from "../components/property-search-form";

export default async function PropertiesPage() {
  const properties: IProperty[] = await fetchProperties();
  properties.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <>
      <section className="bg-teal-700 py-4">
        <div className="mx-auto flex max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <section className="px-4 py-6">
        <div className="container-xl m-auto px-4 py-6 lg:container">
          {properties.length === 0 ? (
            <p>No properties found</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
