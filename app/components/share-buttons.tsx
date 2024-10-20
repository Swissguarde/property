import { FaShare } from "react-icons/fa";

export default function ShareButtons({ property }: { property: IProperty }) {
  return (
    <div>
      <button className="flex w-full items-center justify-center rounded-full bg-orange-500 px-4 py-2 font-bold text-white hover:bg-orange-600">
        <FaShare className="mr-2" /> Share Property
      </button>
    </div>
  );
}
