import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Chart from "react-apexcharts";

const Details = () => {
  const { id } = useParams();
  const [coin, setCoin] = useState(null);
  const [cesh, setCesh] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((res) => setCoin(res.data))
      .catch((err) => console.log(err));

    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30`)
      .then((res) => setCesh(res.data.prices))
      .catch((err) => console.log(err));
  }, [id]);

  if (!coin || cesh.length === 0) return <h1 className="text-center text-6xl mt-[200px]"><mark>Yuklanmoqda 😊...</mark></h1>;

  const chartOptions = {
    chart: {
      type: "line",
      background: "#14161a",
      foreColor: "#black",
    },
    xaxis: {
      categories: cesh.map((data) => new Date(data[0]).toLocaleDateString()),
      labels: { rotate: -20, style: { colors: "#fff" } },
    },
    yaxis: {
      labels: { style: { colors: "#fff" } },
    },
  };

  const chartSeries = [
    {
      name: "Price (USD)",
      data: cesh.map((data) => data[1]),
    },
  ];

  return (
    <div className="bg-[#14161a] flex text-white p-10">
      <div className=" w-[400px]">
        <img className="pt-[50px] ml-[100px]" src={coin.image.large} alt={coin.name} width="200" height="200" />
        <h1 className="text-5xl ml-[80px] mt-10">{coin.name} ({coin.symbol.toUpperCase()})</h1>
        <p className="font-normal mb-10 mt-10 w-[600px] text-xl">{coin.description.en.split(". ")[0]}.</p>
        <h2 className="text-2xl mb-5">Rank: {coin.market_cap_rank.toLocaleString()}</h2>
        <h2 className="text-2xl mb-5">Current Price: ${coin.market_data.current_price.usd.toLocaleString()}</h2>
        <h2 className="text-2xl">Market Cap: ${coin.market_data.market_cap.usd.toLocaleString()}</h2>
      </div>
      <div className="mt-10">
        <h2 className="text-2xl mb-5">Price Trend (Last 30 Days)</h2>
        <Chart options={chartOptions} series={chartSeries} type="line" height={500} width={1350} />
        <div className="flex justify-between">
          <button className=" duration-300 ease-linear hover:bg-blue-900 bg-blue-700 px-2 py-4 border-2 border-solid rounded-md">24 Hours</button>
          <button className=" duration-300 ease-linear hover:bg-blue-500 px-2 py-4 border-2 border-solid rounded-md">30 Days</button>
          <button className=" duration-300 ease-linear hover:bg-blue-500 px-2 py-4 border-2 border-solid rounded-md">3 Monthsc</button>
          <button className=" duration-300 ease-linear hover:bg-blue-500 px-2 py-4 border-2 border-solid rounded-md">1 Year</button>
        </div>
      </div>
    </div>
  );
};

export default Details;
