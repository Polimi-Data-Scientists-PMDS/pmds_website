import os
import json
import urllib.request
import re
import html

env = {}
try:
    with open(".env.local", "r") as f:
        for line in f:
            if "=" in line:
                key, val = line.strip().split("=", 1)
                env[key] = val
except Exception as e:
    print("Error reading .env.local", e)

NOTION_SECRET = env.get("NOTION_API_KEY")
POSTS_DB = env.get("NOTION_POSTS_DB_ID")

req = urllib.request.Request("https://polimidatascientists.it/wp-json/wp/v2/posts?_embed", headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    posts = json.loads(response.read())

for post in posts:
    title = html.unescape(post['title']['rendered']).replace('&#8217;', "'").replace('&#8211;', '-').replace('&amp;', '&').replace('&#8220;', '"').replace('&#8221;', '"')
    if "Breaking Up with the Cloud" in title:
        continue # Already done
        
    # Get a much better excerpt by taking the first paragraph of content, not the weird excerpt
    raw_content = post['content']['rendered']
    paragraphs = re.findall(r'<p.*?>(.*?)</p>', raw_content, re.DOTALL)
    
    better_excerpt = ""
    for p in paragraphs:
        clean_p = re.sub('<[^<]+>', '', p).strip()
        clean_p = html.unescape(clean_p)
        if len(clean_p) > 50:
            better_excerpt = clean_p
            break
            
    if not better_excerpt:
        better_excerpt = re.sub('<[^<]+>', '', post['excerpt']['rendered']).strip()
        better_excerpt = html.unescape(better_excerpt)
        
    if len(better_excerpt) > 200:
        better_excerpt = better_excerpt[:197] + "..."
        
    # Extract image
    img_url = None
    if '_embedded' in post and 'wp:featuredmedia' in post['_embedded']:
        media = post['_embedded']['wp:featuredmedia'][0]
        if 'source_url' in media:
            img_url = media['source_url']
            
    if not img_url:
        # Try to find first image in content
        img_match = re.search(r'<img[^>]+src="([^">]+)"', raw_content)
        if img_match:
            img_url = img_match.group(1)

    print(f"\nTitle: {title}")
    print(f"Excerpt: {better_excerpt}")
    print(f"Image: {img_url}")
    
    # Update Notion
    query_payload = {"filter": {"property": "Title (mandatory)", "title": {"contains": title[:20]}}}
    query_req = urllib.request.Request(
        f"https://api.notion.com/v1/databases/{POSTS_DB}/query",
        data=json.dumps(query_payload).encode('utf-8'), headers={"Authorization": f"Bearer {NOTION_SECRET}", "Content-Type": "application/json", "Notion-Version": "2022-06-28"}, method="POST"
    )
    
    try:
        with urllib.request.urlopen(query_req) as res:
            results = json.loads(res.read())['results']
            if not results: continue
            page_id = results[0]['id']
            
            update_props = {
                "Excerpt (mandatory)": {"rich_text": [{"text": {"content": better_excerpt}}]}
            }
            if img_url:
                update_props["Cover image (optional)"] = {"files": [{"type": "external", "name": "cover", "external": {"url": img_url}}]}
                
            update_payload = {"properties": update_props}
            update_req = urllib.request.Request(
                f"https://api.notion.com/v1/pages/{page_id}",
                data=json.dumps(update_payload).encode('utf-8'), headers={"Authorization": f"Bearer {NOTION_SECRET}", "Content-Type": "application/json", "Notion-Version": "2022-06-28"}, method="PATCH"
            )
            urllib.request.urlopen(update_req)
            print("✅ Updated in Notion")
    except Exception as e:
        print("❌ Failed", e)

