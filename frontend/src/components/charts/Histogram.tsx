import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Line
} from "recharts";

interface Props {
  title: string;
  data: number[];
}

export default function Histogram({ title, data }: Props) {
  if (!data.length) return null;

  // 🔥 много бинов, максимально плотные
  const bins = Math.max(30, Math.ceil(data.length / 5)); // почти 1 бин на 5 точек

  const min = Math.min(...data);
  const max = Math.max(...data);
  const step = (max - min) / bins || 1;

  // ✅ строим бины по центру
  const histogram = Array.from({ length: bins }, (_, i) => {
    const start = min + i * step;
    const center = start + step / 2;
    return { x: center, count: 0 };
  });

  // распределяем значения по бинам
  data.forEach((val) => {
    let idx = Math.floor((val - min) / step);
    if (idx >= bins) idx = bins - 1;
    histogram[idx].count++;
  });

  // вычисляем среднее и std
  const mean =
    data.reduce((sum, v) => sum + v, 0) / data.length;
  const std = Math.sqrt(
    data.reduce((sum, v) => sum + (v - mean) ** 2, 0) / data.length
  );

  // защита от нуля
  if (std === 0) {
    return (
      <div className="bg-surface border border-border p-4 shadow-md">
        <div className="text-sm text-primary mb-2 text-neon-blue">
          {title}
        </div>
        <div className="text-muted text-sm">
          Все значения одинаковые
        </div>
      </div>
    );
  }

  // строим нормальную кривую, масштабированную под гистограмму
  const chartData = histogram.map((bin) => {
    const pdf =
      (1 / (std * Math.sqrt(2 * Math.PI))) *
      Math.exp(-0.5 * ((bin.x - mean) / std) ** 2);
    return {
      ...bin,
      curve: pdf * data.length * step
    };
  });

  return (
    <div className="bg-surface border border-border p-4 shadow-md">
      <div className="text-sm text-primary mb-2 text-neon-blue">{title}</div>

      <div className="w-full h-64">
        <ResponsiveContainer>
          <BarChart data={chartData} barCategoryGap="2%">
            <XAxis
              dataKey="x"
              stroke="#565f89"
              tickFormatter={(v) => v.toFixed(1)}
              interval="preserveStartEnd"
            />
            <YAxis stroke="#565f89" />
            <Tooltip />

            {/* 📊 гистограмма */}
            <Bar
              dataKey="count"
              fill="#7aa2f7"
              barSize={50} // узкие столбцы, как в PyQt
              minPointSize={1} // даже нули видны
            />

            {/* 📈 нормальная кривая */}
            <Line
              type="monotone"
              dataKey="curve"
              stroke="#9ece6a"
              strokeWidth={2}
              dot={false}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}