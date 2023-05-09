import logo from "/assets/image/logo-caica.png";
import avaGames from "/assets/image/supporters/avagames.webp";
import caica from "/assets/image/supporters/caica.webp";
import dpz from "/assets/image/supporters/dpz.webp";
import ipm from "/assets/image/supporters/ipm.webp";
import westa from "/assets/image/supporters/westa.webp";
import caicaImg1 from "/assets/image/mission2.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

interface Isupporter {
  title: string;
  url: string;
}
const supporters: Isupporter[] = [
  { title: "avaGames", url: avaGames },
  { title: "caica", url: caica },
  { title: "dpz", url: dpz },
  { title: "ipm", url: ipm },
  { title: "westa", url: westa },
  { title: "avaGames", url: avaGames },
  { title: "caica", url: caica },
  { title: "dpz", url: dpz },
  { title: "ipm", url: ipm },
  { title: "westa", url: westa },
  { title: "avaGames", url: avaGames },
  { title: "caica", url: caica },
  { title: "dpz", url: dpz },
  { title: "ipm", url: ipm },
  { title: "westa", url: westa },
];

const Slider = () => {
  return (
    <Swiper
      loop={true}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
      }}
      preventInteractionOnTransition={true}
      slidesPerView="auto"
      spaceBetween={32}
      speed={5000}
      modules={[Autoplay]}
      className="mySwiper relative [&>div]:!ease-linear
      before:absolute  before:h-36 before:w-20 before:bg-gradient-to-r before:to-transparent before:from-kaika-black before:z-10
      after:absolute after:top-0 after:right-0 after:h-36 after:w-20 after:bg-gradient-to-r after:from-transparent after:to-kaika-black after:z-10
      "
    >
      {supporters.map((supporter) => (
        <SwiperSlide className="bg-gray-900 w-36 h-36 rounded-3xl flex select-none items-center justify-center">
          <img
            draggable={false}
            className="h-1/2 w-1/2 grayscale opacity-40 transition-opacity duration-500 hover:opacity-100"
            src={supporter.url}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
