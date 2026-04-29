import RegressionCharts from "./charts/RegressionCharts";
import Table from "./Table";

interface Props {
  data: any;
}

export default function RegressionView({ data }: Props) {
  if (!data) return null;

  return (
    <div className="flex flex-col gap-6 w-full">

      {/* таблица */}
      <Table
        headers={data.header}
        signs={data.signs}
        data={data.data.map((row: any[]) => [
          ...row.map((v) =>
            typeof v === "number" ? Number(v.toFixed(4)) : v
          )
        ])}
      />

      {/* метрики */}
      <div className="text-sm text-text">
        R²: <b>{data.R2.toFixed(4)}</b> | R²_adj:{" "}
        <b>{data.R2_abj.toFixed(4)}</b> | F:{" "}
        <b>{data.F_obs.toFixed(2)}</b> (p={data.p_f.toExponential(4)}) | MAPE:{" "}
        <b>{data.mape.toFixed(2)}%</b>
      </div>

      {/* warning */}
      {data.mape > 10 && (
        <div className="text-red-400">
          ⚠ модель неточная (MAPE &gt; 10%)
        </div>
      )}

      {/* графики */}
      <RegressionCharts
        predicted={data.predicted_Y}
        residuals={data.resid}
        actual={data.actual_Y}
      />
    </div>
  );
}