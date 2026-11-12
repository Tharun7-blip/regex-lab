# Regex Lab – Developer Toolkit

A modern, client-side developer toolkit for crafting, testing, and understanding regular expressions directly in the browser.

> **Project Status:** Day 2 of 7 — Live Regex Tester Implemented

---

## Project Description

**Regex Lab** is designed as a clean, fast, zero-dependency web application for developers working with regular expressions.
- **Day 1:** Established the project structure, dark glassmorphism UI foundation, and Vanilla JS load verification.
- **Day 2:** Added the **Live Regex Tester** with real-time pattern evaluation, flag toggles (`g`, `i`, `m`, `s`, `u`), inline match highlighting, syntax error reporting, and numbered/named capture group inspection.

---

## Technology Stack

- **HTML5** — Semantic page structure
- **CSS3** — Dark theme, purple/blue accents, glassmorphism cards, CSS Grid & Flexbox
- **Vanilla JavaScript** — Lightweight DOM initialization and UI verification (no frameworks, no backend, no database)

---

## Planned Features (7-Day Roadmap)

- **Live Regex Tester** — Real-time pattern matching, flag controls (`g`, `i`, `m`, `s`, `u`), and match highlighting
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

