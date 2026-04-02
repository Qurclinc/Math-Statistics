const BASE = "/api";

export async function uploadFile(
  file: File,
  skip_cols: number | null,
  sign_col: number | null
) {
  const form = new FormData();
  form.append("xlsx_file", file);
  form.append("skip_cols", String(skip_cols));
  form.append("sign_col", String(sign_col));

  const res = await fetch(`${BASE}/load`, {
    method: "POST",
    body: form
  });

  if (!res.ok) throw new Error("Не удалось загрузить файл");
  return res;
}

export async function getParsed() {
  const res = await fetch(`${BASE}/parse`);
  return res.json();
}

export async function getDescStats() {
  const res = await fetch(`${BASE}/describing_statistics`);
  return res.json();
}

export async function getNormalizedData() {
  const res = await fetch(`${BASE}/normalized`);
  return res.json();
}