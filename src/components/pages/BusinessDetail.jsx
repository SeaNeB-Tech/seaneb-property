"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import MainNavbar from "@/components/ui/MainNavbar";
import { getBusinessDetailsBySeanebId } from "@/services/location.service";

export default function BusinessDetail({ businessSlug }) {
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
      <div className="bd-wrapper">
        <div className="dp-dynamicContainer">
          <div className="bd-container">
            <p className="bd-breadcrumb">
              <Link href="/in">Home</Link> / <Link href="/in">Areas</Link> / {businessName}
            </p>
            <h1 className="bd-title">{businessName}</h1>
            <p className="bd-desc">
              {details?.about_branch || `Business detail page for ${businessName}.`}
            </p>

            {loading && <p className="bd-desc">Loading business details...</p>}
            {!loading && error && <p className="bd-desc">{error}</p>}

            {!loading && !error && (
              <>
                <div className="bd-rating-row">
                  <div className="bd-rating">
                    <span className="bd-rating-value">Location Hierarchy</span>
                  </div>
                  <div>
                    {[area?.area_name, city?.city_name, state?.state_name, country?.country_name]
                      .filter(Boolean)
                      .join(", ") || "-"}
                  </div>
                </div>

                <h3>Business Information</h3>
                {detailRows.map(([label, value]) => (
                  <p key={label} className="bd-desc">
                    <strong>{label}:</strong> {String(value ?? "-")}
                  </p>
                ))}

                <h3 className="mt-4">Area / City / State / Country</h3>
                <ul className="bd-features">
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

                {details?.primary_number && (
                  <a href={`tel:${details.primary_number}`} className="bd-contact-btn">
                    Contact Now
                  </a>
                )}
              </>
            )}

            <div style={{ marginTop: 16 }}>
              <Link href="/in" className="text-sm text-gray-500">
                Back to Areas
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
