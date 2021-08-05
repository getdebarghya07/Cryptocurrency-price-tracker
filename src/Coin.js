import React, { useState, useEffect } from "react";
import "./Coin.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Coin = () => {
  const [data, setData] = useState([]);

  const getPriceData = async () => {
    try {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false.json"
      );
      // console.log(res);
      const actualData = await res.json();
      console.log(actualData);
      setData(actualData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getPriceData();
  }, []);

  return (
    <div id="Covid-19" className="container-fluid mt-5">
      <div className="main-heading">
        <h1 className="mb-5">🔴 LIVE</h1>
        <h1 className="mb-5">
          <span className="font-weight-bold">Crypto-Currency</span> Prices
        </h1>
        <div className="table-responsive">
          <table className="table-hover table">
            <thead className="thead-dark">
              <tr>
                <th>Coin</th>
                <th>Name</th>
                <th>Id</th>
                <th>Price</th>
                <th>Symbol</th>
                <th>Volume</th>
                <th>Cap</th>
                <th>Change in 24h</th>
                <th>Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {data.map((curElem, index) => {
                return (
                  <tr key={index}>
                    <th>
                      <img src={curElem.image} alt="crypto" />
                    </th>
                    <td>{curElem.id}</td>
                    <td>{curElem.name}</td>
                    <td>${curElem.current_price}</td>
                    <td>{curElem.symbol}</td>
                    <td>${curElem.total_volume}</td>
                    <td>${curElem.market_cap}</td>
                    {curElem.price_change_percentage_24h < 0 ? (
                      <td className="red">
                        {curElem.price_change_percentage_24h.toFixed(2)}%
                      </td>
                    ) : (
                      <td className="green">
                        {curElem.price_change_percentage_24h.toFixed(2)}%
                      </td>
                    )}
                    <td>{curElem.last_updated}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Coin;
