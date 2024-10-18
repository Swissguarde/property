import Link from "next/link";
import Image from "next/image";
import { FaBath, FaBed, FaMoneyBill, FaRulerCombined } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

interface Props {
  property: IProperty;
}

export default function PropertyCard({ property }: Props) {
  const { rates } = property;
  const getRateDisplay = () => {
    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()}/mo`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()}/wk`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()}/night`;
    }
  };
  return (
    <div className="relative rounded-xl shadow-md">
      <Image
        src={property.images[0]}
        alt=""
        className="rounded-t-xl object-cover"
        width={400}
        height={400}
        sizes="100vw"
      />
      <div className="p-4">
        <div className="mb-6 text-left md:text-center lg:text-left">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute right-[10px] top-[10px] rounded-lg bg-white px-4 py-2 text-right font-bold text-blue-500 md:text-center lg:text-right">
          ${getRateDisplay()}
        </h3>

        <div className="mb-4 flex justify-center gap-4 text-gray-500">
          <p>
            <FaBed className="mr-2 inline" /> {property.beds}
            <span className="md:hidden lg:inline"> Beds</span>
          </p>
          <p>
            <FaBath className="mr-2 inline" /> {property.baths}
            <span className="md:hidden lg:inline"> Baths</span>
          </p>
          <p>
            <FaRulerCombined className="mr-2 inline" />
            {property.square_feet}
            <span className="md:hidden lg:inline"> sqft</span>
          </p>
        </div>

        <div className="mb-4 flex items-center justify-center gap-4 text-sm text-green-900">
          {rates.nightly && (
            <p>
              <FaMoneyBill className="mr-2 inline" /> Nightly
            </p>
          )}
          {rates.weekly && (
            <p>
              <FaMoneyBill className="mr-2 inline" /> Weekly
            </p>
          )}
          {rates.monthly && (
            <p>
              <FaMoneyBill className="mr-2 inline" /> Monthly
            </p>
          )}
        </div>

        <div className="mb-5 border border-gray-100"></div>

        <div className="mb-4 flex flex-col justify-between lg:flex-row">
          <div className="mb-4 flex items-center gap-2 align-middle lg:mb-0">
            <FaLocationDot className="text-lg text-orange-700" />
            <span className="text-orange-700">
              {property.location.city}, {property.location.state}
            </span>
          </div>
          <Link
            href={`/properties/${property._id}`}
            className="h-[36px] rounded-lg bg-teal-500 px-4 py-2 text-center text-sm text-white hover:bg-teal-600"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}
