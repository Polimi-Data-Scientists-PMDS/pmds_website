import os
import json
import urllib.request
import re
import xml.etree.ElementTree as ET

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

# 1. Get the band post HTML
with open("band_post.json", "r") as f:
    band_post = json.load(f)

html_content = band_post['content']

# 2. Convert HTML to Notion Blocks (basic parser)
blocks = []
from html.parser import HTMLParser

class NotionHTMLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.blocks = []
        self.current_tag = None
        self.current_text = ""
        self.list_type = None

    def handle_starttag(self, tag, attrs):
        self.current_tag = tag
        if tag == "img":
            src = dict(attrs).get("src")
            if src:
                self.blocks.append({
                    "object": "block",
                    "type": "image",
                    "image": {
                        "type": "external",
                        "external": {"url": src}
                    }
                })
        elif tag == "ul":
            self.list_type = "bulleted_list_item"
        elif tag == "ol":
            self.list_type = "numbered_list_item"

    def handle_endtag(self, tag):
        text = self.current_text.strip()
        self.current_text = ""
        if not text:
            return
            
        if tag == "p":
            for chunk in [text[i:i+2000] for i in range(0, len(text), 2000)]:
                self.blocks.append({
                    "object": "block",
                    "type": "paragraph",
                    "paragraph": {"rich_text": [{"type": "text", "text": {"content": chunk}}]}
                })
        elif tag == "h2":
            self.blocks.append({
                "object": "block",
                "type": "heading_2",
                "heading_2": {"rich_text": [{"type": "text", "text": {"content": text[:2000]}}]}
            })
        elif tag == "h3":
            self.blocks.append({
                "object": "block",
                "type": "heading_3",
                "heading_3": {"rich_text": [{"type": "text", "text": {"content": text[:2000]}}]}
            })
        elif tag == "li":
            self.blocks.append({
                "object": "block",
                "type": self.list_type or "bulleted_list_item",
                self.list_type or "bulleted_list_item": {"rich_text": [{"type": "text", "text": {"content": text[:2000]}}]}
            })
        elif tag in ["ul", "ol"]:
            self.list_type = None
        elif tag == "blockquote":
            self.blocks.append({
                "object": "block",
                "type": "quote",
                "quote": {"rich_text": [{"type": "text", "text": {"content": text[:2000]}}]}
            })

    def handle_data(self, data):
        # We replace html entities manually because html.parser doesn't do it perfectly by default for all unless we use unescape
        import html
        self.current_text += html.unescape(data).replace('\n', ' ')

parser = NotionHTMLParser()
parser.feed(html_content)

# 3. Find the page in Notion to get its ID
query_payload = {
    "filter": {
        "property": "Title (mandatory)",
        "title": {
            "contains": "Breaking Up with the Cloud"
        }
    }
}
query_req = urllib.request.Request(
    f"https://api.notion.com/v1/databases/{POSTS_DB}/query",
    data=json.dumps(query_payload).encode('utf-8'),
    headers={
        "Authorization": f"Bearer {NOTION_SECRET}",
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
    },
    method="POST"
)

page_id = None
with urllib.request.urlopen(query_req) as res:
    results = json.loads(res.read())['results']
    if results:
        page_id = results[0]['id']

if not page_id:
    print("Page not found in Notion.")
    exit(1)

# 4. Update the page properties (excerpt, image, external url = null)
better_excerpt = "A detailed breakdown of the current state of our firmware and the architecture behind our privacy-centric mobile app. We are jointly developing a smart wristband designed to track sport and sleep metrics with a strict local-only data policy."

update_payload = {
    "properties": {
        "Excerpt (mandatory)": {"rich_text": [{"text": {"content": better_excerpt}}]},
        "External url (ONLY FOR LEGACY POSTS)": {"url": None},
        "Cover image (optional)": {"files": [{"type": "external", "name": "cover", "external": {"url": "https://polimidatascientists.it/wp-content/uploads/2026/02/immagine-edited.png"}}]}
    }
}

update_req = urllib.request.Request(
    f"https://api.notion.com/v1/pages/{page_id}",
    data=json.dumps(update_payload).encode('utf-8'),
    headers={
        "Authorization": f"Bearer {NOTION_SECRET}",
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
    },
    method="PATCH"
)

try:
    with urllib.request.urlopen(update_req) as res:
        print("Updated properties.")
except Exception as e:
    print("Failed properties", e)
    if hasattr(e, 'read'): print(e.read().decode())

# 5. Append blocks to the page
append_payload = {
    "children": parser.blocks
}
append_req = urllib.request.Request(
    f"https://api.notion.com/v1/blocks/{page_id}/children",
    data=json.dumps(append_payload).encode('utf-8'),
    headers={
        "Authorization": f"Bearer {NOTION_SECRET}",
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
    },
    method="PATCH"
)

try:
    with urllib.request.urlopen(append_req) as res:
        print("Appended content to page.")
except Exception as e:
    print("Failed append", e)
    if hasattr(e, 'read'): print(e.read().decode())

print("Done!")
