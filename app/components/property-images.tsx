import Image from "next/image";

export default function PropertyImages({ images }: { images: string[] }) {
  return (
    <section className="bg-teal-50 p-4">
      <div className="container mx-auto">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt="property_image"
            className="mx-auto h-[400px] rounded-xl object-cover"
            width={1800}
            height={400}
            priority={true}
          />
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {images.map((image, i) => (
              <div
                key={i}
                className={`${images.length === 3 && i === 2 ? "col-span-2" : "col-span-1"}`}
              >
                <Image
                  src={image}
                  alt="property_image"
                  className="h-[400px] w-full rounded-xl object-cover"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
