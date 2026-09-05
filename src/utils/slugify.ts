export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function truncateText(text: string, numberOfChars: number = 50) {
  if (text.length <= numberOfChars) return text;
  return text.slice(0, numberOfChars) + " ...";
}
