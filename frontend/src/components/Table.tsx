interface TableProps {
    headers?: string[];
    signs?: string[];
    data?: (string | number)[][];
}

export default function Table({ headers = [], signs = [], data = [] }: TableProps) {
  return (
    <div className="overflow-x-auto w-full rounded-xl border border-border bg-surface2 p-4 shadow-md">
      <table className="w-full border-collapse text-sm text-text">
        <thead>
          <tr>
            {/* Заголовки */}
            {headers.map((header, i) => (
              <th
                key={i}
                className="p-2 border border-border text-left font-semibold text-primary text-neon-blue"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-surface/50 transition-colors">
              {/* Подписи строки */}
              {signs.length > 0 && <td className="p-2 border border-border font-medium">{signs[rowIndex]}</td>}

              {/* Данные */}
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="p-2 border border-border">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}