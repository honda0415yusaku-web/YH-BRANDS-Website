import { existsSync, readFileSync, readdirSync } from "node:fs";

const htmlFiles = readdirSync(".").filter((file) => file.endsWith(".html"));
const errors = [];

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${file}: titleがありません`);
  if (!/<meta name="description" content="[^"]+">/.test(html)) errors.push(`${file}: meta descriptionがありません`);

  for (const image of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(image[0])) errors.push(`${file}: altのない画像があります`);
    const source = image[0].match(/\bsrc="([^"]+)"/)?.[1];
    if (source && !existsSync(source)) errors.push(`${file}: ${source}が見つかりません`);
  }
}

const index = readFileSync("index.html", "utf8");
for (const required of ["canonical", "og:title", "twitter:card", "Organization", "WebSite"]) {
  if (!index.includes(required)) errors.push(`index.html: ${required}がありません`);
}

if (!existsSync("robots.txt")) errors.push("robots.txtがありません");
if (!existsSync("sitemap.xml")) errors.push("sitemap.xmlがありません");

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`SEO check passed: ${htmlFiles.length} HTML files`);
