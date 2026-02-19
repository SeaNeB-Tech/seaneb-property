"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/dynamic-pages.module.css";

const PROPERTY_IMAGE = "/assets/propertyimages/image.png";

function formatPrice(value) {
  const text = String(value || "").trim();
  return text || "Price on request";
}

export default function BusinessListingPage({ title, subtitle, businesses = [] }) {
  return (
    <section className={styles.wrapper} aria-labelledby="property-listing-title">
      <header className={styles.header}>
        <h2 id="property-listing-title">{title || "Properties Near You"}</h2>

        <p>
          {subtitle ||
            "Browse verified residential and commercial properties curated for your selected area."}
        </p>
      </header>

      <div className={styles.grid}>
        {businesses.length === 0 ? (
          <p className={styles.sectionDesc}>No businesses found for this location.</p>
        ) : (
          businesses.map((business) => (
            <Link
              key={business.id}
              href={`/${business.slug}`}
              className={styles.card}
              aria-label={`View details of ${business.title}`}
            >
              <div className={styles.imageWrap}>
                <Image
                  src={business.image || PROPERTY_IMAGE}
                  alt={`${business.title} image`}
                  fill
                  className={styles.image}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />

                <span className={styles.badge}>{business.type || "Property"}</span>
              </div>

              <div className={styles.body}>
                <h3 className={styles.title}>{business.title}</h3>

                <p className={styles.location}>{business.location || "Location not available"}</p>

                <div className={styles.footer}>
                  <span className={styles.price}>{formatPrice(business.price)}</span>

                  <span className={styles.action}>View Details</span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}
