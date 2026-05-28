import type { MetadataRoute } from "next";

const siteUrl = "https://anisimovarttattoo.vercel.app";

const lastModified = {
  localLanding: new Date("2026-05-27"),
  gallery: new Date("2026-05-27"),
  booking: new Date("2026-05-28"),
  reviews: new Date("2026-05-28"),
  privacy: new Date("2026-05-28"),
};

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: lastModified.localLanding,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/tatu-master-perovo`,
      lastModified: lastModified.localLanding,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteUrl}/gallery`,
      lastModified: lastModified.gallery,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/booking`,
      lastModified: lastModified.booking,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/reviews`,
      lastModified: lastModified.reviews,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/privacy`,
      lastModified: lastModified.privacy,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${siteUrl}/tryon`,
      lastModified: lastModified.localLanding,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/sketches`,
      lastModified: lastModified.localLanding,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];
}
