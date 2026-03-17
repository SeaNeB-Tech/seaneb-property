import { CommercialPropertyContent } from "../page";

const toPlaceLabel = (value) =>
  String(value || "")
    .trim()
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default async function CommercialPropertyPlacePage({ params }) {
  const resolved = await params;
  const place = toPlaceLabel(resolved?.place);
  return <CommercialPropertyContent place={place} />;
}

