import { blogPosts } from "@/data/blogPosts";

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const baseUrl = "https://rejaka.id";

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Rejaka Abimanyu Susanto - Blog</title>
    <link>${baseUrl}/blog</link>
    <description>Technical articles, tutorials, and guides on web development, cybersecurity, databases, and more by Rejaka Abimanyu Susanto.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(blogPosts[0]?.date || Date.now()).toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>abim@rejaka.id (Rejaka Abimanyu Susanto)</managingEditor>
    <webMaster>abim@rejaka.id (Rejaka Abimanyu Susanto)</webMaster>
    ${blogPosts
      .map(
        (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <dc:creator>Rejaka Abimanyu Susanto</dc:creator>
      <category>${escapeXml(post.category)}</category>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
