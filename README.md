# Regex Lab – Developer Toolkit

A modern, client-side developer toolkit for crafting, testing, and understanding regular expressions directly in the browser.

> **Project Status:** Day 4 of 7 — Regex Code Generator Implemented

---

## Project Description

**Regex Lab** is designed as a clean, fast, zero-dependency web application for developers working with regular expressions.
- **Day 1:** Established the project structure, dark glassmorphism UI foundation, and Vanilla JS load verification.
- **Day 2:** Built the **Live Regex Tester** with real-time pattern evaluation, flag toggles (`g`, `i`, `m`, `s`, `u`), safe HTML-escaped match highlighting, match breakdown with numbered and named capture groups, error handling, and sample/clear controls.
- **Day 3:** Built the **Regex Pattern Library** featuring 26 curated, verified regular expressions across 7 essential categories, real-time search, category filtering, one-click clipboard copying with toast notifications, and seamless loading into the Live Regex Tester.
- **Day 4:** Built the **Regex Code Generator** to export regular expressions into ready-to-use, syntactically appropriate validation and matching code for **JavaScript**, **Python**, **PHP**, and **Java**, complete with language-specific escaping, customizable test strings, instant copy, and one-click integration from the Pattern Library.

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
- **Deep Integration with Live Regex Tester & Code Generator:** Pattern cards feature **⚡ Test** to evaluate in the Live Tester, **💻 Code** to generate multi-language code, and **📋 Copy** to copy the pattern directly.
- **One-Click Copy & Toast Notifications:** Copies regular expressions to the clipboard with animated button states and non-intrusive floating toasts.

---

## Day 4 Features (Regex Code Generator)

- **4 Supported Programming Languages:**
  1. **JavaScript (ES6+)** — Generates `/pattern/flags` regex literals with `regex.test()` boolean validation, `sampleText.match()` global extraction, and `regex.exec()` capture group extraction.
  2. **Python (`re` module)** — Generates raw string literals `r"..."`, maps flags to `re.IGNORECASE | re.MULTILINE | re.DOTALL`, performs `re.search()`, and extracts matches with `re.findall()`.
  3. **PHP (`preg_match` / `preg_match_all`)** — Generates delimited `$pattern = '/.../flags';` with `PREG_OFFSET_CAPTURE` and handles PHP string quote & dollar sign variable escaping.
  4. **Java (`java.util.regex`)** — Generates `Pattern.compile()` with bitmask flags (`Pattern.CASE_INSENSITIVE | Pattern.MULTILINE`), `Matcher.find()`, and performs rigorous Java double-escaping (`\\d` $\rightarrow$ `\\\\d`) for Java String literals.
- **Accurate Syntax Escaping:**
  - Properly escapes delimiter forward slashes `/` for JavaScript and PHP.
  - Accurately doubles backslashes for Java String literals to prevent compiler syntax errors.
  - Escapes quote characters, dollar signs (`$`), and newlines in sample test strings across all target languages.
- **Custom Sample Text:** Allows developers to customize the sample test string inside the generated snippet or automatically import sample text from the Pattern Library.
- **Live Validation & Error Reporting:** Detects invalid regex syntax and displays clear, helpful error warnings in a dedicated error banner without crashing the application.
- **Interactive Language Switching:** Switch languages using either the dropdown selector or one-click language tabs (`JavaScript`, `Python`, `PHP`, `Java`) with instant code regeneration.
- **One-Click Code Copy:** Dedicated **Copy Code** action with visual `✓ Copied!` confirmation and floating toast notifications.
- **Pattern Library Integration:** Clicking **💻 Code** on any card in the Pattern Library immediately loads the pattern, flags, and sample text into the Code Generator and scrolls directly to the code output.

---

## Technology Stack

- **HTML5** — Semantic page structure, accessible ARIA attributes
- **CSS3** — Dark theme, purple/blue accents, glassmorphism cards, responsive CSS Grid and Flexbox layout
- **Vanilla JavaScript** — Real-time `RegExp` engine, multi-language code generation, clipboard management, toast system (zero external libraries, no frameworks, no database)

---

## Planned Features (7-Day Roadmap)

- **Live Regex Tester** *(Active · Day 2)* — Real-time pattern matching, flag controls (`g`, `i`, `m`, `s`, `u`), and match highlighting
- **Pattern Library** *(Active · Day 3)* — 26 curated developer snippets across 7 categories with live search, copy, and tester loading
- **Code Generator** *(Active · Day 4)* — Multi-language code generation for JavaScript, Python, PHP, and Java
- **Match & Replace Sandbox** — Interactive substitution preview with capture group backreferences
- **Regex Explainer** — Token-by-token plain-English breakdown of patterns
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
   - Click **📋 Copy** to copy any pattern to your clipboard.
   - Click **💻 Code** to generate ready-to-run code in JavaScript, Python, PHP, or Java.
   - Click **⚡ Test** to load the pattern, flags, and sample text directly into the Live Regex Tester for instant experimentation.
3. **Regex Code Generator:**
   - Enter or paste any regular expression pattern and flags.
   - Select your target language tab (**JavaScript**, **Python**, **PHP**, or **Java**).
   - Optionally edit the **Sample Test String** to match your application's data.
   - Click **⚡ Generate Code** (or watch it generate live as you type).
   - Click **Copy Code** to copy the complete snippet directly to your clipboard.
