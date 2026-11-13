# Regex Lab – Developer Toolkit

A modern, client-side developer toolkit for crafting, testing, and understanding regular expressions directly in the browser.

> **Project Status:** Day 2 of 7 — Live Regex Tester Implemented

---

## Project Description

**Regex Lab** is designed as a clean, fast, zero-dependency web application for developers working with regular expressions.
- **Day 1:** Established the project structure, dark glassmorphism UI foundation, and Vanilla JS load verification.
- **Day 2:** Built the **Live Regex Tester** with real-time pattern evaluation, flag toggles (`g`, `i`, `m`, `s`, `u`), safe HTML-escaped match highlighting, match breakdown with numbered and named capture groups, error handling, and sample/clear controls.

---

## Day 2 Features (Live Regex Tester)

- **Regex Pattern Input & Flags:** Enter custom regular expressions and toggle `g`, `i`, `m`, `s`, and `u` flags dynamically.
- **Live Evaluation & Match Count:** Evaluates patterns as you type and displays the total number of matches.
- **Safe Match Highlighting:** Highlights matched substrings with alternating purple/blue marks while escaping HTML to prevent injected HTML from rendering.
- **Match Breakdown & Capture Groups:** Lists each match separately with start–end character indices, numbered capture groups (`$1`, `$2`, ...), and named capture groups.
- **Resilient Error Handling:** Catches invalid `RegExp` syntax with clear inline error messages, handles empty inputs cleanly, and guards against infinite loops on zero-length matches.
- **Sample & Clear Controls:** Choose from built-in sample patterns via **Load Sample** or reset the workspace with **Clear**.

---

## Technology Stack

- **HTML5** — Semantic page structure
- **CSS3** — Dark theme, purple/blue accents, glassmorphism cards, CSS Grid & Flexbox
- **Vanilla JavaScript** — Real-time `RegExp` evaluation, DOM rendering, and UI verification (no frameworks, no backend, no database)

---

## Planned Features (7-Day Roadmap)

- **Live Regex Tester** *(Active · Day 2)* — Real-time pattern matching, flag controls (`g`, `i`, `m`, `s`, `u`), and match highlighting
- **Pattern Library** — Curated snippets for emails, URLs, dates, UUIDs, and IP addresses
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

### Using the Live Regex Tester
1. Enter a regular expression in the `/` pattern input (for example, `\d+` or `(?<year>\d{4})-(\d{2})`).
2. Toggle flags (`g`, `i`, `m`, `s`, `u`) as needed.
3. Type or paste text in the **Test String** box to view live highlights and match breakdowns.
4. Use the sample selector + **Load Sample** to try preset examples, or click **Clear** to reset.
