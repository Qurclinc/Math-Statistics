import { useState, useEffect } from "react";
import {
  getParsed,
  getDescStats,
  getNormalizedData,
  getPearsonCrit
} from "../services/api";

import Tabs from "../components/Tabs";
import Table from "../components/Table";
import NormalityCharts from "../components/charts/NormalityCharts";

export default function Result() {
  const [activeTab, setActiveTab] = useState(0);

  const [tableData, setTableData] = useState({
    headers: [] as string[],
    signs: [] as string[],
    data: [] as (string | number)[][]
  });

  const [rawData, setRawData] = useState<Record<string, number[]>>({});
  const [loading, setLoading] = useState(false);

  const tabApiMap: Record<number, () => Promise<any>> = {
    0: getParsed,
    1: getDescStats,
    2: getNormalizedData,
    3: getPearsonCrit,
  };

  async function loadData(tabIndex: number) {
    setLoading(true);

    try {
      const apiCall = tabApiMap[tabIndex];
      if (!apiCall) throw new Error("no api");

      const res = await apiCall();

      setTableData({
        headers: res.header || [],
        signs: res.signs || [],
        data: res.data || []
      });

      // 🔥 ВАЖНО: только для вкладки нормальности
      if (tabIndex === 3 && res.raw_data) {
        setRawData(res.raw_data);
      } else {
        setRawData({});
      }

    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  return (
    <div className="flex flex-col items-start w-full max-w-5xl mx-auto p-4">
      <Tabs active={activeTab} onChange={setActiveTab} />

      {loading ? (
        <div className="text-muted text-center w-full py-8">Loading...</div>
      ) : (
        <>
          <Table
            headers={tableData.headers}
            signs={tableData.signs}
            data={tableData.data}
          />

          {activeTab === 3 && Object.keys(rawData).length > 0 && (
            <NormalityCharts rawData={rawData} />
          )}
        </>
      )}
    </div>
  );
}