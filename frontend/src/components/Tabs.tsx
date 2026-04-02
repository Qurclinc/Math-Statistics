interface TabsProps {
  active: number;
  onChange: (index: number) => void;
}

export default function Tabs({ active, onChange }: TabsProps) {
  const tabs = ["Данные", "Статистика", "Нормированные", "Нормальность"];

  return (
    <div className="mb-6 w-full">
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => onChange(i)}
            className={`px-4 py-2 text-sm transition
              ${
                active === i
                  ? "text-purple border-b-2 border-primary shadow-neonPurple"
                  : "text-muted hover:text-text"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}