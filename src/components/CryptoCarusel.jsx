import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import baground from "../assets/image/baground.jpg";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const CryptoCarousel = () => {
  const [pul, setpul] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 12,
          page: 1,
          sparkline: false,
        },
      })
      .then((response) => {
        console.log(response.data);
        setpul(response.data);
      })
      .catch((error) => {
        console.error("API xatosi:", error);
      });
  }, []);

  return (
    <div
      className=" h-[450px] bg-black bg-opacity-60 p-6 rounded-lg"
      style={{
        backgroundImage: `url(${baground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
 <h1 className="text-6xl text-center text-[#87CEEB] mt-[20px]">CRYPTOFOLIO WATCH LIST</h1>
     <p className="text-sm text-[#A9A9A9] text-center mt-[10px]"lcas>Get all the Info regarding your favorite Crypto Currency</p>
      <Swiper
        spaceBetween={20}
        slidesPerView={4}
        autoplay={{ delay: 3000 }}
        loop={true}
        modules={[Autoplay]}
      >
       
        {pul.map((coin) => (
          <SwiperSlide key={coin.id}>
            <div className="text-white mt-[100px] text-center  p-4 rounded-lg">
              <img
                src={coin.image}
                alt={coin.name}
                className="w-20 mx-auto"
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/50";
                }}
              />
              <h2 className="text-xl font-bold">{coin.name}</h2>
              <p className="text-lg">${coin.current_price}</p>
              <p
                className={
                  coin.price_change_percentage_24h > 0
                    ? "text-green-500"
                    : "text-red-500"
                }
              >
                {coin.price_change_percentage_24h?.toFixed(2)}%
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CryptoCarousel;
