# Regex Lab – Developer Toolkit

A modern, client-side developer toolkit for crafting, testing, and understanding regular expressions directly in the browser.

> **Project Status:** Day 3 of 7 — Regex Pattern Library Implemented

---

## Project Description

**Regex Lab** is designed as a clean, fast, zero-dependency web application for developers working with regular expressions.
- **Day 1:** Established the project structure, dark glassmorphism UI foundation, and Vanilla JS load verification.
- **Day 2:** Built the **Live Regex Tester** with real-time pattern evaluation, flag toggles (`g`, `i`, `m`, `s`, `u`), safe HTML-escaped match highlighting, match breakdown with numbered and named capture groups, error handling, and sample/clear controls.
- **Day 3:** Built the **Regex Pattern Library** featuring 26 curated, verified regular expressions across 7 essential categories, real-time search, category filtering, one-click clipboard copying with toast notifications, and seamless loading into the Live Regex Tester.

---

## Day 2 Features (Live Regex Tester)

- **Regex Pattern Input & Flags:** Enter custom regular expressions and toggle `g`, `i`, `m`, `s`, and `u` flags dynamically.
- **Live Evaluation & Match Count:** Evaluates patterns as you type and displays the total number of matches.
- **Safe Match Highlighting:** Highlights matched substrings with alternating purple/blue marks while escaping HTML to prevent injected HTML from rendering.
- **Match Breakdown & Capture Groups:** Lists each match separately with start–end character indices, numbered capture groups (`$1`, `$2`, ...), and named capture groups.
- **Resilient Error Handling:** Catches invalid `RegExp` syntax with clear inline error messages, handles empty inputs cleanly, and guards against infinite loops on zero-length matches.
- **Sample & Clear Controls:** Choose from built-in sample patterns via **Load Sample** or reset the workspace with **Clear**.

---

## Day 3 Features (Regex Pattern Library)

- **7 Dedicated Categories:**
  1. **Basic Patterns** — Exact word match, non-empty string, multiple whitespace, trim whitespace.
  2. **Numbers** — Whole integers (positive/negative), decimal floating-point numbers, USD currency, percentage values.
  3. **Text** — Alphabetical only, alphanumeric, URL slug validation, capitalized title words.
  4. **Email and Web** — Standard RFC email addresses, HTTP/HTTPS web URLs, IPv4 address validation, domain names.
  5. **Password** — Strong password (lowercase, uppercase, digit, symbol, min 8 chars), medium password, numeric PIN codes.
  6. **Date and Time** — ISO 8601 calendar dates (YYYY-MM-DD), 24-hour military time, 12-hour time with AM/PM.
  7. **Programming** — CSS hex color literals (3/6/8-digit), Semantic Versioning (SemVer 2.0), UUID v4 identifiers, HTML/XML tag elements.
- **Rich Pattern Cards:** Each card displays the pattern name, category badge, active flags, plain-English explanation, syntax-highlighted regex code box, realistic example input, and expected matching output.
- **Live Search & Category Filtering:** Instant multi-field search (searches name, regex, explanation, input, output, and category) plus quick category filter chips and a responsive empty-state screen with a one-click **Reset Filters** button.
- **Deep Integration with Live Regex Tester:** Clicking **⚡ Test Pattern** automatically populates the regex input, sets the appropriate flags, inserts the sample text into the test string area, triggers immediate evaluation and match highlighting, and smoothly scrolls to the Live Regex Tester.
- **One-Click Copy & Toast Notifications:** Clicking **📋 Copy Pattern** copies the regular expression directly to the system clipboard, toggles the button state to `✓ Copied!`, and presents a sleek, glassmorphic toast notification.

---

## Technology Stack

- **HTML5** — Semantic page structure, accessible ARIA attributes
- **CSS3** — Dark theme, purple/blue accents, glassmorphism cards, responsive CSS Grid and Flexbox layout
- **Vanilla JavaScript** — Real-time `RegExp` engine, dynamic card filtering, clipboard management, toast system (zero external libraries, no frameworks, no database)

---

## Planned Features (7-Day Roadmap)

- **Live Regex Tester** *(Active · Day 2)* — Real-time pattern matching, flag controls (`g`, `i`, `m`, `s`, `u`), and match highlighting
- **Pattern Library** *(Active · Day 3)* — 26 curated developer snippets across 7 categories with live search, copy, and tester loading
- **Match & Replace Sandbox** — Interactive substitution preview with capture group backreferences
- **Regex Explainer** — Token-by-token plain-English breakdown of patterns
- **Code Generator** — Ready-to-use export snippets for JavaScript, Python, and Go
- **Saved Snippets** — LocalStorage-backed bookmarks and JSON test case export

---

## Project Structure

```text
regex-lab/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   └── images/
├── README.md
└── .gitignore
```

---

## Installation and Usage

Because Regex Lab uses pure HTML5, CSS3, and Vanilla JavaScript, no build tools or package installations are required.

### Option 1: Open Directly in a Browser
1. Download or clone this repository.
2. Open `index.html` by double-clicking it or dragging it into Chrome, Edge, Firefox, or Safari.
3. Verify the status pill in the top-right reads **`App Loaded · Ready`** and check the browser DevTools console for the initialization log.

### Option 2: Run with a Local Static Server (Recommended)
- **VS Code Live Server:** Open the `regex-lab` folder in VS Code, right-click `index.html`, and select **Open with Live Server**.
- **Python HTTP Server:**
  ```bash
  cd regex-lab
  python -m http.server 8080
  ```
  Then visit `http://localhost:8080` in your browser.

---

### Exploring the Toolkit

1. **Live Regex Tester:**
   - Type or paste any regular expression into the pattern field between the `/` delimiters.
   - Toggle desired flags (`g`, `i`, `m`, `s`, `u`).
   - Paste test text in **Test String** to see live highlighted matches and a breakdown of numbered and named capture groups.
2. **Regex Pattern Library:**
   - Browse through the 7 category chips (`Basic Patterns`, `Numbers`, `Text`, `Email and Web`, `Password`, `Date and Time`, `Programming`) or select `All`.
   - Use the live search bar to find patterns by keyword (e.g., `email`, `uuid`, `hex`, `slug`, `date`).
   - Click **📋 Copy Pattern** to quickly copy any pattern to your clipboard.
   - Click **⚡ Test Pattern** to load the pattern, flags, and sample text directly into the Live Regex Tester for instant experimentation.
