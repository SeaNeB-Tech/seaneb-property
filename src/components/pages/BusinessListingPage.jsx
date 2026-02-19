"use client";

import Image from "next/image";
import Link from "next/link";

const PROPERTY_IMAGE = "/assets/propertyimages/image.png";

function formatPrice(value) {
  const text = String(value || "").trim();
  return text || "Price on request";
}

export default function BusinessListingPage({ title, subtitle, businesses = [] }) {
  return (
    <section className="dp-wrapper" aria-labelledby="property-listing-title">
      <header className="dp-header">
        <h2 id="property-listing-title">{title || "Properties Near You"}</h2>

        <p>
          {subtitle ||
            "Browse verified residential and commercial properties curated for your selected area."}
        </p>
      </header>

      <div className="dp-grid">
        {businesses.length === 0 ? (
          <p className="dp-sectionDesc">No businesses found for this location.</p>
        ) : (
          businesses.map((business) => (
            <Link
              key={business.id}
              href={`/${business.slug}`}
              className="dp-card"
              aria-label={`View details of ${business.title}`}
            >
              <div className="dp-imageWrap">
                <Image
                  src={business.image || PROPERTY_IMAGE}
                  alt={`${business.title} image`}
                  fill
                  className="dp-image"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <span className="dp-badge">{business.type || "Property"}</span>
              </div>

              <div className="dp-body">
                <h3 className="dp-title">{business.title}</h3>

                <p className="dp-location">{business.location || "Location not available"}</p>

                <div className="dp-footer">
                  <span className="dp-price">{formatPrice(business.price)}</span>

                  <span className="dp-action">View Details</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
