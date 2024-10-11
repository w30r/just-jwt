"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function assets() {
  const [wellbores, setWellbore] = useState([]);

  const fetchData = async () => {
    try {
      const wbs = await axios.get("http://localhost:3000/api/wellbores");
      console.log("🚀 ~ fetchData ~ wbs:", wbs);
      setWellbore(...wellbores, wbs.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  console.log("🚀 ~ assets ~ wellbores:", wellbores);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-12 pt-32">
      <h1 className="text-4xl">WELLBORES</h1>
      {Array.isArray(wellbores) &&
        wellbores.map((wb) => <div key={wb.uwi}>{wb.wellborename}</div>)}
      <div>
        <h1>Click to get wellbores</h1>
        <button
          className="bg-purple-500 px-2 rounded"
          onClick={() => fetchData()}
        >
          Get
        </button>
      </div>
    </div>
  );
}
