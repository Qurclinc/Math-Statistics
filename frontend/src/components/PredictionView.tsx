import { useState } from "react";
import { getPrediction } from "../services/api";

interface Props {
  headers: string[];
}

export default function PredictionView({ headers }: Props) {
  // убираем первый столбец (обычно id) и последний (target)
  const features = headers.slice(1, -1);
  const target = headers[headers.length - 1];

  const [values, setValues] = useState<Record<string, string>>({});
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const isValid = features.every(f => values[f] !== undefined && values[f] !== "");

  function handleChange(key: string, value: string) {
    setValues(prev => ({
      ...prev,
      [key]: value
    }));
  }

  async function handlePredict() {
    setLoading(true);

    try {
      // конвертим в числа
      const numericValues: Record<string, number> = {};
      for (const key of features) {
        numericValues[key] = Number(values[key]);
      }

      const res = await getPrediction(numericValues);
      setResult(res.result);
    } catch (e) {
      alert("Ошибка предсказания");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full bg-surface2 p-6 rounded-xl border border-border shadow-md">

      <p className="text-sm text-muted mb-4">
        Введите значения признаков
      </p>

      {/* INPUTS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {features.map((f) => (
          <div key={f} className="flex flex-col">
            <label className="text-xs text-muted mb-1">{f}</label>

            <input
              type="number"
              value={values[f] || ""}
              onChange={(e) => handleChange(f, e.target.value)}
              className="
                bg-bg border border-border rounded-lg p-2
                text-text focus:outline-none
                focus:ring-2 focus:ring-primary
              "
            />
          </div>
        ))}
      </div>

      {/* BUTTON */}
      <button
        onClick={handlePredict}
        disabled={!isValid || loading}
        className={`
          mt-6 px-4 py-2 rounded-lg font-medium transition-all
          ${isValid
            ? "bg-primary text-black shadow-neonBlue hover:opacity-90"
            : "bg-muted text-bg cursor-not-allowed"}
        `}
      >
        {loading ? "Считаем..." : "Предсказать"}
      </button>

      {/* RESULT */}
      {result !== null && (
        <div className="mt-6 p-4 border border-border rounded-lg bg-bg">
          <p className="text-sm text-muted mb-1">
            Результат:
          </p>
          <p className="text-xl text-green font-semibold">
            {target}: {result}
          </p>
        </div>
      )}
    </div>
  );
}