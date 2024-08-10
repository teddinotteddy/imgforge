import { cookies } from "next/headers";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getImages } from "../actions";
import Download from "./download";
import Image from "next/image";

export default async function Images() {
  const cookieStore = cookies();
  let userId = cookieStore.get("user_id")?.value;

  let images = [];
  if (userId) {
    images = await getImages(userId);
  }

  const reversedImages = images.reverse();

  return (
    <div className="flex justify-center">
      {Array.isArray(reversedImages) && reversedImages.length > 0 ? (
        <Carousel
          opts={{
            align: "start",
            slidesToShow: 2,
          }}
          className="w-full max-w-3xl"
        >
          <CarouselContent>
            {reversedImages.map((imageUrl) => (
              <CarouselItem key={imageUrl} className="md:basis-1/3 relative">
                <div className="relative">
                  <Image
                    className="rounded-sm w-full h-auto"
                    src={imageUrl}
                    alt="Previous image"
                    width={125}
                    height={125}
                    loading="eager"
                  />
                  <div className="absolute top-0 right-0 p-2">
                    <Download url={imageUrl} />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
}
