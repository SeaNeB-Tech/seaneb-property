import { RentPropertyContent } from "../page";

const toPlaceLabel = (value) =>
  String(value || "")
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default async function RentPropertyPlacePage({ params }) {
  const resolved = await params;
  const place = toPlaceLabel(resolved?.place);
  return <RentPropertyContent place={place} />;
}

