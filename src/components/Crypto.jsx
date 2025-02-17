import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // React Router navigatsiya uchun
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";

const CryptoTable = () => {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(0);
  const navigate = useNavigate(); // Navigatsiya funksiyasini chaqirish

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: { vs_currency: "usd", order: "market_cap_desc", per_page: 100 },
      })
      .then((res) => setCoins(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <TableContainer
      component={Paper}
      sx={{ maxWidth: "100%", margin: "auto", mt: 5 }}
    >
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: " #222" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "20px" }}>Coin</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "20px" }} align="right">Price</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "20px" }} align="right">24h Change</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "20px" }} align="right">Market Cap</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coins.slice(page * 10, page * 10 + 10).map((coin) => (
            <TableRow 
            
              key={coin.id} 
              className="cursor-pointer" 
              onClick={() => navigate(`/details/${coin.id}`)} 
              sx={{ cursor: "pointer" }} 
            >
              <TableCell sx={{ display: "flex", alignItems: "center", fontSize: "25px" }}>
                <img src={coin.image} alt={coin.name} width="60" style={{ marginRight: 10 }} />
                {coin.name}
              </TableCell>
              <TableCell sx={{ fontSize: "25px" }} align="right">
                ${coin.current_price.toLocaleString()}
              </TableCell>
              <TableCell
                align="right"
                sx={{
                  fontSize: "20px",
                  color: coin.price_change_percentage_24h > 0 ? "green" : "red",
                }}
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </TableCell>
              <TableCell sx={{ fontSize: "25px" }} align="right">
                ${coin.market_cap.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={coins.length}
        page={page}
        rowsPerPage={10}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPageOptions={[]}
        sx={{
          width: "100%",
          fontSize: "25px",
          display: "flex",
          justifyContent: "center",
        }}
      />
    </TableContainer>
  );
};

export default CryptoTable;
