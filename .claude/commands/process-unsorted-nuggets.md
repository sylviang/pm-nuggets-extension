You will launch **multiple agents in parallel** to process markdown files in the `nuggets/unsorted/` folder efficiently.

**IMPORTANT: Content must be brief "nuggets of wisdom" - digestible within 30 seconds of reading. Think bite-sized, not comprehensive.**

## Step 1: Discover Files

First, use Glob to find all .md files in `nuggets/unsorted/`:

```
nuggets/unsorted/*.md
```

## Step 2: Launch Parallel Agents

Launch **3-4 general-purpose agents in parallel** (in a single message with multiple Task tool calls), each processing a subset of files.

**Instructions for each agent:**

---

Process your assigned markdown files in `nuggets/unsorted/` folder. For each file:

1. **Read the file** and analyze its current content

2. **Update the format** to match the standard nugget format:
   - Title (H1)
   - _Last updated: YYYY-MM-DD_ (use today's date)
   - **Brief, focused description** (2-4 paragraphs max - readable in 30 seconds)
   - Key bullet points or examples (3-5 items max)
   - **Links with emoji prefixes**:
     - 📘 **Book link** (if a seminal book exists on the topic - prioritize this)
     - 🔗 **Web link** (authoritative article, guide, or resource)
     - Only include links that add real value
     - Make sure book and web links have two spaces at the back
   - Image reference: `![Title](../../images/filename.png)`

3. **Content guidelines - CRITICAL**:
   - **Keep it brief**: Target 150-300 words total
   - **30-second rule**: Must be digestible in 30 seconds or less
   - Focus on the core insight or framework
   - Include 1-2 concrete examples for product managers
   - Avoid lengthy explanations - this is a "nugget" not a textbook
   - Professional but concise tone

4. **Link priority**:
   - **Always prefer a book link first** if a seminal/canonical book exists (e.g., "Thinking, Fast and Slow" for Dual Process Theory)
   - Then add 1-2 web links for practical resources
   - Use web search to find authoritative sources when needed

5. **Determine the appropriate category**:
   - Check existing categories in `data/index.json`: ai, anti-pattern, business-models, communication, delivery, design, discovery, gtm, interview, market-analysis, mental-models, metrics, pmf, pricing, prioritisation, psychology, revenue, risk, strategy, validation
   - If the concept doesn't fit, suggest a NEW category using product management lingo
   - Common new categories: frameworks, user-research, growth, decision-making, etc.

6. **Add entry to `data/index.json`** following this format:
   ```json
   {
     "id": "file-name",
     "category": "appropriate-category",
     "title": "Display Title",
     "file": "nuggets/appropriate-category/file-name.md"
   }
   ```
   Insert it alphabetically within its category section.

7. **Save the updated file** back to `nuggets/`"appropriate category"/ folder. Create new folder if it does not exist.

8. **DO NOT create images** - only update markdown content and index.json

**Report** which files you processed and their categories.

---

## Step 3: Review

After all agents complete, review a sample to ensure 30-second digestibility and proper book/web links.
