import Image from "next/image";

export default function PropertyHeaderImage({ image }: { image: string }) {
  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={image}
            alt=""
            className="h-[400px] w-full object-cover"
            width={0}
            height={0}
            sizes="100vw"
            priority={true}
          />
        </div>
      </div>
    </section>
  );
}
