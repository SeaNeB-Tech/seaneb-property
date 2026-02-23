"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import MainNavbar from "@/components/ui/MainNavbar";
import { getBusinessDetailsBySeanebId } from "@/services/location.service";
import { locationTw } from "./locationTailwindClasses";

export default function BusinessDetail({ businessSlug }) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [details, setDetails] = useState(null);

  const fallbackName = useMemo(
    () =>
      businessSlug
        ? businessSlug
            .replace(/[_-]/g, " ")
            .split(" ")
            .filter(Boolean)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
        : "Business",
    [businessSlug]
  );

  useEffect(() => {
    let active = true;

    const loadDetails = async () => {
      if (!businessSlug) {
        setError("Business identifier is missing.");
        setLoading(false);
        return;
      }

      try {
        setError("");
        setLoading(true);
        const data = await getBusinessDetailsBySeanebId(businessSlug);
        if (!active) return;

        if (!data) {
          setError("Business details not found.");
          setDetails(null);
        } else {
          setDetails(data);
        }
      } catch {
        if (!active) return;
        setError("Unable to load business details right now.");
      } finally {
        if (active) setLoading(false);
      }
    };

    void loadDetails();

    return () => {
      active = false;
    };
  }, [businessSlug]);

  const business = details?.business || {};
  const hierarchy = details?.hierarchy || {};
  const area = hierarchy?.area || {};
  const city = hierarchy?.city || {};
  const state = hierarchy?.state || {};
  const country = hierarchy?.country || {};

  const businessName =
    business?.display_name ||
    business?.business_name ||
    details?.display_name ||
    details?.business_name ||
    fallbackName;

  const toSeoSlug = (value) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

  const areaSlug = toSeoSlug(area?.area_name || area?.name);
  const citySlug = toSeoSlug(city?.city_name || city?.name);
  const stateSlug = toSeoSlug(state?.state_slug || state?.slug || state?.state_name || state?.name);
  const computedBackHref =
    areaSlug && citySlug ? `/in/${areaSlug}-${citySlug}` : citySlug && stateSlug ? `/in/${citySlug}-${stateSlug}` : "/in";
  const fromParam = String(searchParams.get("from") || "").trim();
  const backToAreaHref = fromParam.startsWith("/in/") ? fromParam : computedBackHref;

  const detailRows = [
    ["SeaNeB ID", details?.seaneb_id || businessSlug || "-"],
    ["Branch ID", details?.branch_id || "-"],
    ["Business ID", business?.business_id || details?.business_id || "-"],
    ["Primary Number", details?.primary_number || "-"],
    ["WhatsApp", details?.whatsapp_number || "-"],
    ["Email", details?.business_email || "-"],
    ["Address", details?.address || "-"],
    ["Landmark", details?.landmark || "-"],
    ["Latitude", details?.latitude ?? "-"],
    ["Longitude", details?.longitude ?? "-"],
    ["Business Type", business?.business_type || details?.business_type || "-"],
    ["Business Status", business?.business_status ?? details?.business_status ?? "-"],
    ["About Branch", details?.about_branch || "-"],
  ];

  return (
    <>
      <MainNavbar />
      <div className={locationTw.detailWrapper}>
        <div className={locationTw.dynamicContainer}>
          <div className={locationTw.detailContainer}>
            <p className={locationTw.detailBreadcrumb}>
              <Link className={locationTw.detailBreadcrumbLink} href="/in">Home</Link> /{" "}
              <Link className={locationTw.detailBreadcrumbLink} href={backToAreaHref}>Area</Link> / {businessName}
            </p>
            <h1 className={locationTw.detailTitle}>{businessName}</h1>
            <p className={locationTw.detailDesc}>
              {details?.about_branch || `Business detail page for ${businessName}.`}
            </p>

            {loading && <p className={locationTw.detailDesc}>Loading business details...</p>}
            {!loading && error && <p className={locationTw.detailDesc}>{error}</p>}

            {!loading && !error && (
              <>
                <div className={locationTw.detailRatingRow}>
                  <div className={locationTw.detailRating}>
                    <span className={locationTw.detailRatingValue}>Location Hierarchy</span>
                  </div>
                  <div>
                    {[area?.area_name, city?.city_name, state?.state_name, country?.country_name]
                      .filter(Boolean)
                      .join(", ") || "-"}
                  </div>
                </div>

                <h3>Business Information</h3>
                {detailRows.map(([label, value]) => (
                  <p key={label} className={locationTw.detailDesc}>
                    <strong>{label}:</strong> {String(value ?? "-")}
                  </p>
                ))}

                <h3 className="mt-4">Area / City / State / Country</h3>
                <ul className={locationTw.detailFeatures}>
                  <li>
                    Area: {area?.area_name || "-"} ({area?.area_id || "-"})
                  </li>
                  <li>
                    City: {city?.city_name || "-"} ({city?.city_id || "-"})
                  </li>
                  <li>
                    State: {state?.state_name || "-"} ({state?.state_id || "-"})
                  </li>
                  <li>
                    Country: {country?.country_name || "-"} ({country?.country_id || "-"})
                  </li>
                </ul>

              </>
            )}

            <div className={locationTw.detailBackWrap}>
              <Link href={backToAreaHref} className={locationTw.backLink}>
                Back to Area
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
