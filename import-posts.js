const { Client } = require("@notionhq/client");
require("dotenv").config({ path: ".env.local" });

const notion = new Client({ auth: process.env.NOTION_SECRET });
const dbId = process.env.NOTION_POSTS_DB_ID;

async function run() {
  console.log("Fetching WP Posts...");
  const res = await fetch("https://polimidatascientists.it/wp-json/wp/v2/posts");
  const posts = await res.json();
  
  console.log(`Found ${posts.length} posts. Pushing to Notion...`);
  
  for (const post of posts) {
    // Basic excerpt stripping HTML
    let excerpt = post.excerpt.rendered.replace(/<[^>]+>/g, '').trim();
    if (excerpt.length > 200) excerpt = excerpt.substring(0, 197) + "...";
    
    // Replace HTML entities in title
    let title = post.title.rendered
      .replace(/&#8217;/g, "'")
      .replace(/&#8211;/g, "-")
      .replace(/&amp;/g, "&");

    try {
      await notion.pages.create({
        parent: { database_id: dbId },
        properties: {
          "Title (mandatory)": { title: [{ text: { content: title } }] },
          "Date (mandatory)": { date: { start: post.date.split('T')[0] } },
          "Excerpt (mandatory)": { rich_text: [{ text: { content: excerpt } }] },
          "External url (ONLY FOR LEGACY POSTS)": { rich_text: [{ text: { content: post.link } }] },
          "Published": { checkbox: true },
          "Tag (mandatory)": { select: { name: "General" } }
        }
      });
      console.log(`✅ Pushed: ${title}`);
    } catch (err) {
      console.error(`❌ Failed: ${title}`);
      console.error(err.body || err.message);
    }
  }
  console.log("Done!");
}

run();
