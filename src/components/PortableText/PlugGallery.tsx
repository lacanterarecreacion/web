import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { sanityConfig } from '@/lib/config';
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(sanityConfig);

function urlFor(source: SanityImageSource) {
  return builder.image(source);
}

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

export default ({ gallery }: any) => {
  return (
    <>
      <Swiper
        key={gallery.images._key}
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={50}
        slidesPerView={1}
        breakpoints={{
          // when window width is >= 640px
          400: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
          },
        }}
        navigation
        pagination={{ clickable: true }}
      >
        {gallery.images.imagesGallery.map(
          (item: { asset: any }, index: number) => {
            return (
              <SwiperSlide key={index}>
                <a
                  className="glightbox"
                  href={urlFor(item.asset).width(1300).url()}
                >
                  <img
                    className="object-cover w-full rounded-lg overflow-hidden h-64"
                    src={urlFor(item).width(600).height(400).url()}
                  />
                </a>
              </SwiperSlide>
            );
          }
        )}
      </Swiper>
    </>
  );
};
