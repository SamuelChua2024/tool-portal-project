# CLAUDE.md

## Tech Stack

- Plain HTML, CSS, and JavaScript only.
- No frameworks and no build step: files must open directly in a browser.

## Project Structure

Update this section as files are added.

- `CLAUDE.md` — these project instructions (repo root)
- `index.html` — portal homepage with one card per tool
- `css/styles.css` — shared styles, including the light and dark theme colours
- `js/theme.js` — shared light/dark theme toggle
- `tools/code-explainer/index.html` — the Python code explainer page
- `tools/code-explainer/rules.js` — the explainer's rule list (pattern → plain-language explanation)
- `tools/code-explainer/explainer.js` — reads the pasted code and shows the explanations

## Key Requirements

1. Every page must be responsive and work on desktop, tablet, and phone.
2. Users can toggle between a light and a dark theme. The default is the light theme.
3. Text must stay easy to read, with good contrast, in both the light and the dark theme.

## Feature Plan

A web portal where visitors try small Python-programming tools.

### Portal structure

- **Homepage** (`index.html`): short intro plus one card per tool.
- **Open a tool:** click its card; each tool lives on its own page in `tools/<tool-name>/`.
- **Get back:** every tool page has a "Back to all tools" link to the homepage.
- **Add a new tool later:** create a `tools/<tool-name>/` folder and add one card to the homepage. Shared styles and the theme toggle are reused, so nothing else changes.

### Phases

1. **Phase 1:** the portal plus its first tool, the Python code explainer (paste a snippet, get a plain-language line-by-line explanation from built-in rules; no server).
   - [x] Portal: homepage, theme toggle, and a placeholder card that opens and returns via the navigation. Neutral styling for now; visual design to be chosen later.
   - [x] First tool: the Python code explainer (replaced the placeholder; beginner-basics rules, line-by-line output).
2. **Phase 2:** more explainer rules and polish (to be decided).
3. **Phase 3:** more tools (to be decided).

## Rules for Claude

- Explain technical terms in plain language.
- Ask before making big changes.
- Ask rather than guess when something is unclear.
