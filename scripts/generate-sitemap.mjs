import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync } from "node:fs";

const baseUrl = "https://yh-brands.github.io/YH-BRANDS-Website/";
const pages = readdirSync(".")
  .filter((file) => file.endsWith(".html") && file !== "404.html")
  .sort();

function lastModified(file) {
  try {
    return execFileSync("git", ["log", "-1", "--format=%cs", "--", file], {
      encoding: "utf8",
    }).trim() || new Date().toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

const entries = pages.map((file) => {
  const url = file === "index.html" ? baseUrl : `${baseUrl}${file}`;
  return `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastModified(file)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${file === "index.html" ? "1.0" : "0.7"}</priority>\n  </url>`;
});

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
writeFileSync("sitemap.xml", sitemap);
