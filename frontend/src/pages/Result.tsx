import { useState, useEffect } from "react";
import { getParsed, getDescStats } from "../services/api";
import Tabs from "../components/Tabs";
import Table from "../components/Table";

export default function Result() {
  const [activeTab, setActiveTab] = useState(0);
  const [tableData, setTableData] = useState({
    headers: [] as string[],
    signs: [] as string[],
    data: [] as (string | number)[][]
  });
  const [loading, setLoading] = useState(false);

  const tabApiMap: Record<number, () => Promise<any>> = {
    0: getParsed,
    1: getDescStats,
  };

  // Функция подгрузки данных по вкладке
  async function loadData(tabIndex: number) {
    setLoading(true);
    try {
      const apiCall = tabApiMap[tabIndex];

      if (!apiCall) {
        throw new Error(`No API mapped for tab ${tabIndex}`);
      }

      const res = await apiCall();

      setTableData({
        headers: res.header || [],
        signs: res.signs || [],
        data: res.data || []
      });

    } catch (err) {
      console.error(err);
      setTableData({ headers: [], signs: [], data: [] });
    } finally {
      setLoading(false);
    }
  }

  // useEffect для ленивой загрузки по активной вкладке
  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  return (
    <div className="flex flex-col items-start w-full max-w-5xl mx-auto p-4">
      <Tabs active={activeTab} onChange={(i) => setActiveTab(i)} />
      {loading ? (
        <div className="text-muted text-center w-full py-8">Loading...</div>
      ) : (
        <Table
          headers={tableData.headers}
          signs={tableData.signs}
          data={tableData.data}
        />
      )}
    </div>
  );
}