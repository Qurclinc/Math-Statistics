import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { uploadFile } from "../services/api";


export default function UploadForm() {
    const navigate = useNavigate();
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [skipCols, setSkipCols] = useState("");
    const [signCol, setSignCol] = useState("");

    async function handleClick() {
        if (!file) return;

        const res = await uploadFile(
            file,
            skipCols ? (Number)(skipCols) : 1,
            signCol ? (Number)(signCol) : 1
        );
        if (res) navigate("result");
    }

  return (
    <div className="w-full max-w-lg bg-surface border border-border rounded-2xl p-8 shadow-lg">
      
      {/* TITLE */}
      <h2 className="text-xl text-magenta text-neon-purple font-semibold mb-6 text-center">
        Upload Excel File
      </h2>

      {/* FILE INPUT */}
      <label className="block mb-6">
        <span className="text-sm text-muted mb-2 block">
          Select .xlsx file
        </span>

        <div className="border border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary transition">
          <input
            type="file"
            accept=".xlsx"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                setFile(file)
                setFileName(file.name);
              }
            }}
          />

          <div className="text-sm text-muted">
            {fileName ? (
              <span className="text-green text-neon-green">
                {fileName}
              </span>
            ) : (
              "Click to choose file"
            )}
          </div>
        </div>
      </label>

      {/* OPTIONAL PARAMS */}
      <div className="mb-6">
        <span className="text-sm text-muted mb-2 block">
          Optional settings
        </span>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Skip columns (default: 1)"
            value={skipCols}
            onChange={(e) => setSkipCols(e.target.value)}
            className="w-1/2 p-2 bg-bg border border-border rounded-lg focus:outline-none focus:border-primary"
          />

          <input
            type="text"
            placeholder="Sign column (default: 1)"
            value={signCol}
            onChange={(e) => setSignCol(e.target.value)}
            className="w-1/2 p-2 bg-bg border border-border rounded-lg focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* BUTTON */}
      <button
        className="w-full bg-primary text-black py-2 rounded-lg font-medium shadow-neonBlue hover:brightness-110 transition"
        onClick={handleClick}
      >
        Upload
      </button>
    </div>
  );
}