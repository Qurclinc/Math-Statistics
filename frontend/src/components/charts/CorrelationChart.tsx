import { useMemo } from "react";

interface Props {
  matrix: number[][];
  labels: string[];
}

export default function CorrelationChart({ matrix, labels }: Props) {
  const size = 500;
  const radius = 200;
  const center = size / 2;

  const nodes = useMemo(() => {
    const n = labels.length;
    return labels.map((label, i) => {
      const angle = (2 * Math.PI * i) / n - Math.PI / 2;
      return {
        label,
        x: center + radius * Math.cos(angle),
        y: center + radius * Math.sin(angle)
      };
    });
  }, [labels]);

  function getStyle(r: number) {
    const abs = Math.abs(r);

    if (abs > 0.7)
      return {
        stroke: r > 0 ? "#166534" : "#7f1d1d",
        width: 4,
        dash: "0"
      };

    if (abs > 0.3)
      return {
        stroke: r > 0 ? "#22c55e" : "#ef4444",
        width: 2,
        dash: "6,4"
      };

    if (abs > 0.1)
      return {
        stroke: "#9ca3af",
        width: 1,
        dash: "2,4"
      };

    return null;
  }

  return (
    <div className="flex justify-center mt-6">
      <svg width={size} height={size}>
        {/* связи */}
        {matrix.map((row, i) =>
          row.map((val, j) => {
            if (j <= i) return null;

            const style = getStyle(Number(val));
            if (!style) return null;

            return (
              <line
                key={`${i}-${j}`}
                x1={nodes[i].x}
                y1={nodes[i].y}
                x2={nodes[j].x}
                y2={nodes[j].y}
                stroke={style.stroke}
                strokeWidth={style.width}
                strokeDasharray={style.dash}
                opacity={0.8}
              />
            );
          })
        )}

        {/* точки */}
        {nodes.map((n, i) => (
          <g key={i}>
            <circle
              cx={n.x}
              cy={n.y}
              r={12}
              fill="white"
              stroke="#333"
              strokeWidth={2}
            />
            <text
              x={n.x}
              y={n.y - 18}
              textAnchor="middle"
              className="text-xs fill-text"
            >
              {n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}