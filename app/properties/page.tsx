import Properties from "../components/properties";
import PropertySearchForm from "../components/property-search-form";

export default function PropertiesPage() {
  return (
    <>
      <section className="bg-teal-700 py-4">
        <div className="mx-auto flex max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <Properties />
    </>
  );
}
