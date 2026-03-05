import { SellPropertyContent } from "../page";

const toPlaceLabel = (value) =>
  String(value || "")
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default async function SellPropertyPlacePage({ params }) {
  const resolved = await params;
  const place = toPlaceLabel(resolved?.place);
  return <SellPropertyContent place={place} />;
}

