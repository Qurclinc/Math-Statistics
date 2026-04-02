import Histogram from "./Histogram";

interface Props {
  rawData: Record<string, number[]>;
}

export default function NormalityCharts({ rawData }: Props) {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {Object.entries(rawData).map(([key, values]) => (
        <Histogram key={key} title={key} data={values} />
      ))}
    </div>
  );
}