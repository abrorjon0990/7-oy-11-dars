import React from "react";
import CryptoCarousel from "../components/CryptoCarusel";
import CryptoTable from "../components/Crypto";

const Home = () => {
  return (
    <div>
      <CryptoCarousel />
      <CryptoTable /> {/* Faqat Home sahifasida chiqadi */}
    </div>
  );
};

export default Home;
