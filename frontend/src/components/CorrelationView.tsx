import { useEffect, useState } from "react";
import Table from "./Table";
import CorrelationChart from "./charts/CorrelationChart";
import {
  getPairwiseCorrelation,
  getPartialCorrelation
} from "../services/api";
import type { CorrelationData } from "../types/correlation";

export default function CorrelationView() {
  const [tab, setTab] = useState<"pair" | "partial">("pair");
  const [data, setData] = useState<CorrelationData>();

  async function load() {
    const res =
      tab === "pair"
        ? await getPairwiseCorrelation()
        : await getPartialCorrelation();

    setData(res);
  }

  function replaceHeader(header: Array<string>) {
    let new_header: Array<string> = [];
    header.map((_, index) => {
        if (index === 0) {
            new_header.push("");
        } else if (index === header.length - 1) {
            new_header.push("Y");
        } else {
            new_header.push(`X${index}`);
        }
    })
    return new_header;
  }

  function replaceSigns(signs: Array<string>) {
    let new_signs: Array<string> = [];
    console.log(signs.length)
    signs.map((_, index) => {
        if (index === signs.length - 1) {
            new_signs.push("Y");
        } else {
            new_signs.push(`X${index + 1}`);
        }
    })
    return new_signs;
  }

  useEffect(() => {
    load();
  }, [tab]);

  if (!data) return <div className="text-muted">Loading...</div>;

  return (
    <div className="w-full">

      {/* SUB TABS */}
      <div className="flex gap-2 border-b border-border mb-4">
        {[
          { key: "pair", label: "Парная" },
          { key: "partial", label: "Частная" }
        ].map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key as any)}
            className={`px-4 py-2 text-sm transition
              ${
                tab === t.key
                  ? "text-primary text-neon-blue border-b-2 border-primary"
                  : "text-muted hover:text-text"
              }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* CORR MATRIX */}
      <div className="mb-6">
        <h3 className="text-sm text-muted mb-2">Матрица корреляции</h3>
        <Table
          headers={replaceHeader(data.header)}
          signs={replaceSigns(data.signs)}
          data={data.matrix}
        />
      </div>

      {/* T MATRIX */}
      <div className="mb-6">
        <h3 className="text-sm text-purple text-neon-purple mb-2">
          t-критическое = {data.t_crit}
        </h3>
        <Table
          headers={replaceHeader(data.header)}
          signs={replaceSigns(data.signs)}
          data={data.t_matrix}
        />
      </div>

      {/* CHART */}
      <CorrelationChart
        matrix={data.matrix}
        labels={replaceSigns(data.signs)}
      />
      <div>
        {
            data.header.map((element, index) => (
                (index === 0) ? "" : (
                    index === (data.header.length - 1) ? 
                        <div>
                            <span className="text-purple text-neon-purple">Y</span>
                            <span className="text-primary"> - {element}</span>
                        </div> : (
                        <div>
                            <span className="text-purple text-neon-purple">X{index}</span>
                            <span className="text-primary"> - {element}</span>
                        </div>
                    )
            )))
        }
      </div>
    </div>
  );
}