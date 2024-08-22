"use client";

import { useEffect, useState } from "react";
import { fetchContractData } from "./contract";
import Chart from "./chart";

export default function HomePage() {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchContractData();
      if (result) {
        setData(result);
      }
    };

    getData();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Smart Contract Data Visualization</h1>
      {data.length > 0 ? <Chart data={data} /> : <p>Loading...</p>}
    </main>
  );
}