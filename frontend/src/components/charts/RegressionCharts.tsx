import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Line
} from "recharts";

interface Props {
  actual: number[];
  predicted: number[];
  residuals: number[];
}

export default function RegressionCharts({
  actual,
  predicted,
  residuals
}: Props) {
  // safety
  if (!actual?.length || !predicted?.length || !residuals?.length) {
    return null;
  }

  // =========================
  // DATA PREP
  // =========================

  const compareData = actual.map((a, i) => ({
    x: a,
    y: predicted[i]
  }));

  const residData = predicted.map((p, i) => ({
    x: p,
    y: residuals[i]
  }));

  // =========================
  // DOMAINS (MATPLOTLIB STYLE)
  // =========================

  const allActual = [...actual, ...predicted];
  const minXY = Math.min(...allActual);
  const maxXY = Math.max(...allActual);

  const residMin = Math.min(...residuals);
  const residMax = Math.max(...residuals);

  const predMin = Math.min(...predicted);
  const predMax = Math.max(...predicted);

  // =========================
  // COLORS (TOKYONIGHT)
  // =========================

  const blue = "#7aa2f7";
  const purple = "#bb9af7";
  const cyan = "#7dcfff";
  const red = "#f7768e";
  const grid = "#414868";

  // =========================
  // RENDER
  // =========================

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">

      {/* ===================== */}
      {/* REAL vs PREDICTED */}
      {/* ===================== */}

      <div className="bg-surface2 p-4 rounded-xl border border-border shadow-md">
        <p className="text-sm text-muted mb-2">
          Реальные vs Предсказанные
        </p>

        <ScatterChart width={420} height={320}>
          <CartesianGrid stroke={grid} />

          <XAxis
            type="number"
            dataKey="x"
            domain={[minXY, maxXY]}
            stroke={cyan}
            name="Real Y"
          />

          <YAxis
            type="number"
            dataKey="y"
            domain={[minXY, maxXY]}
            stroke={cyan}
            name="Pred Y"
          />

          <Tooltip />

          <Scatter
            data={compareData}
            fill={blue}
            fillOpacity={0.6}
          />

          {/* y = x line */}
          <Line
            data={[
              { x: minXY, y: minXY },
              { x: maxXY, y: maxXY }
            ]}
            dataKey="y"
            stroke={red}
            strokeWidth={2}
            dot={false}
          />
        </ScatterChart>
      </div>

      {/* ===================== */}
      {/* RESIDUALS */}
      {/* ===================== */}

      <div className="bg-surface2 p-4 rounded-xl border border-border shadow-md">
        <p className="text-sm text-muted mb-2">
          График остатков
        </p>

        <ScatterChart width={420} height={320}>
          <CartesianGrid stroke={grid} />

          <XAxis
            type="number"
            dataKey="x"
            domain={[predMin, predMax]}
            stroke={cyan}
            name="Predicted"
          />

          <YAxis
            type="number"
            dataKey="y"
            domain={[residMin, residMax]}
            stroke={cyan}
            name="Residuals"
          />

          <Tooltip />

          <Scatter
            data={residData}
            fill={purple}
            fillOpacity={0.6}
          />

          {/* y = 0 baseline */}
          <Line
            data={[
              { x: predMin, y: 0 },
              { x: predMax, y: 0 }
            ]}
            dataKey="y"
            stroke={cyan}
            strokeWidth={2}
            dot={false}
          />
        </ScatterChart>
      </div>

    </div>
  );
}