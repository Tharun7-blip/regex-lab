# Regex Lab – Developer Toolkit

A modern, client-side developer toolkit for crafting, testing, and understanding regular expressions directly in the browser.

> **Project Status:** Day 6 of 7 — Advanced Regex Playground Implemented

---

## Project Description

**Regex Lab** is designed as a clean, fast, zero-dependency web application for developers working with regular expressions.
- **Day 1:** Established the project structure, dark glassmorphism UI foundation, and Vanilla JS load verification.
- **Day 2:** Built the **Live Regex Tester** with real-time pattern evaluation, flag toggles (`g`, `i`, `m`, `s`, `u`), safe HTML-escaped match highlighting, match breakdown with numbered and named capture groups, error handling, and sample/clear controls.
- **Day 3:** Built the **Regex Pattern Library** featuring 26 curated, verified regular expressions across 7 essential categories, real-time search, category filtering, one-click clipboard copying with toast notifications, and seamless loading into the Live Regex Tester.
- **Day 4:** Built the **Regex Code Generator** to export regular expressions into ready-to-use, syntactically appropriate validation and matching code for **JavaScript**, **Python**, **PHP**, and **Java**, complete with language-specific escaping, customizable test strings, instant copy, and one-click integration from the Pattern Library.
- **Day 5:** Built the **Interactive Regex Cheat Sheet** with 43 syntax reference cards organized across 8 categories, instant live search and category filtering, deep integration with the Live Tester and Code Generator, and an interactive **Common Beginner Mistakes Guide** with 5 practical lessons.
- **Day 6:** Built the **Advanced Regex Playground** featuring an advanced editor, capture group inspector with unmatched optional group support, beginner-friendly plain-English regex explainer, live replacement playground with JavaScript reference helpers (`$1`, `$&`) and unsupported syntax warnings, match statistics dashboard with execution timing, and 5 preset examples.

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

## Day 5 Features (Interactive Regex Cheat Sheet)

- **8 Comprehensive Reference Categories (43 Cards):**
  1. **Basic Characters (7 items):** `.` (Any Character), `\d` (Digit), `\D` (Non-Digit), `\w` (Word Character), `\W` (Non-Word), `\s` (Whitespace), `\S` (Non-Whitespace).
  2. **Character Classes (5 items):** `[abc]` (Character Set), `[a-z]` (Lowercase Range), `[A-Z]` (Uppercase Range), `[0-9]` (Digit Range), `[^abc]` (Negated Set).
  3. **Quantifiers (6 items):** `*` (0 or more, greedy), `+` (1 or more, greedy), `?` (optional, 0 or 1), `{n}` (exactly n), `{n,}` (n or more), `{n,m}` (between n and m).
  4. **Anchors (4 items):** `^` (Start of line/string), `$` (End of line/string), `\b` (Word boundary), `\B` (Non-word boundary).
  5. **Groups (4 items):** `(abc)` (Capturing group), `(?:abc)` (Non-capturing group), `(?<name>abc)` (Named capture group), `a|b` (Alternation / OR).
  6. **Lookarounds (4 items):** `(?=abc)` (Positive lookahead), `(?!abc)` (Negative lookahead), `(?<=abc)` (Positive lookbehind), `(?<!abc)` (Negative lookbehind).
  7. **Flags (5 items):** `g` (Global search), `i` (Case-insensitive), `m` (Multiline mode), `s` (DotAll / single-line), `u` (Unicode mode).
  8. **Common Examples (8 items):** Numbers (integer/decimal), Email address, Indian mobile number (`+91`/`0` prefix), Strong password validation, Date format (`YYYY-MM-DD`), Web URL (`http`/`https`), Uppercase acronyms, Whitespace trim.
- **Interactive Reference Cards:** Each item features the highlighted regex token/syntax, friendly name, plain-English explanation, realistic example input, expected match output, and 3 actions:
  - **📋 Copy:** Copies the syntax directly to your clipboard with animated feedback.
  - **💻 Code:** Opens the Code Generator with the selected pattern pre-populated.
  - **⚡ Try in Tester:** Instantly sends the pattern, flags, and example input to the Live Regex Tester and scrolls smoothly to the tester.
- **Instant Search & Category Filtering:** Search across syntax tokens, names, explanations, and examples, filter by category chips, and view dynamic count indicators (`Showing 43 reference items`).
- **Common Beginner Mistakes Guide:** Explains 5 critical mistakes with wrong vs. correct syntax comparisons and one-click "⚡ Try Correct in Tester" actions:
  1. Forgetting to escape special characters (`.` vs `\.`).
  2. Confusing `*` (zero or more) and `+` (one or more).
  3. Forgetting `^` and `$` anchors for exact string validation.
  4. Incorrect character ranges (`[A-z]` vs `[a-zA-Z]`).
  5. Greedy vs. lazy matching (`<p>.*</p>` vs `<p>.*?</p>`).

---

## Day 6 Features (Advanced Regex Playground)

- **Advanced Regex Editor & Live Highlighting:**
  - Full-featured regular expression editor with pattern input, `/` delimiters, and flags preview.
  - Interactive flag controls for `g` (global), `i` (case-insensitive), `m` (multiline), `s` (dotAll), and `u` (unicode).
  - Synchronized highlight backdrop overlay mirroring the test text textarea without text-jumping or misalignments.
  - Robust error handling: catches invalid syntax with clear inline error messages and prevents crashes.
- **Capture Group Inspector:**
  - Match cards displaying match index, start and end offsets (`[start – end]`), match length, and full text.
  - Detailed numbered capture groups breakdown (`Group $1`, `Group $2`, etc.).
  - Named capture groups support (e.g. `<year>`, `<month>`, `<day>`).
  - Graceful unmatched group handling: optional groups that did not participate in a match display as `Unmatched (null)` with distinct styling rather than failing or showing undefined.
- **Plain-English Regex Explainer:**
  - Educational tokenizer breaking down regular expressions into plain-English component explanations.
  - Handles shorthand classes (`\d+` $\rightarrow$ "One or more digits"), character sets (`[A-Z]` $\rightarrow$ "Any uppercase letter"), anchors (`^Hello` $\rightarrow$ "Text beginning with Hello"), and groups (`(ab)+` $\rightarrow$ "One or more repetitions of group ab").
  - Identifies lookarounds (`(?=...)`, `(?!...)`, `(?<=...)`, `(?<!...)`), non-capturing groups (`(?:...)`), named groups (`(?<name>...)`), backreferences (`\1`), and greedy/lazy quantifiers.
  - Transparent complexity disclaimer: clearly identifies when intricate arbitrary nesting is parsed at best educational effort without inventing incorrect explanations.
- **Replacement Playground:**
  - Live preview box updating instantly as replacement patterns and test text are edited.
  - Full support for JavaScript replacement syntax:
    - `$&` — inserts matched substring.
    - `$1`, `$2` — inserts numbered capture groups.
    - `$<name>` — inserts named capture group.
    - ``$` `` — inserts text preceding match.
    - `$'` — inserts text following match.
    - `$$` — inserts a literal `$` sign.
  - One-click helper pills to quickly insert replacement tokens into the input.
  - Unsupported syntax detection: warns developers if non-JavaScript backreferences like `\1` or `$0` are typed, explaining standard JS replacement syntax.
  - Dedicated **📋 Copy Result** button with animated feedback.
- **Match Statistics Dashboard:**
  - Total match count (with infinite loop protection on zero-length matches).
  - Unique matched values count.
  - Indices range (`first .. last`).
  - Match lengths analytics (minimum, maximum, and average match length).
  - High-precision execution timing measured in milliseconds via `performance.now()`.
- **5 Built-in Preset Examples:**
  - **Numbers:** `\d+`
  - **Email:** RFC 5322 standard pattern
  - **Indian Mobile:** `^(?:\+91[- ]?)?[6-9]\d{9}$`
  - **Date:** `^\d{4}-\d{2}-\d{2}$`
  - **HTML Tags:** `<([a-z]+)[^>]*>.*?</\1>`
- **Toolbar Actions:**
  - **📋 Copy Pattern:** Copies full `/<pattern>/<flags>` expression.
  - **📋 Copy Results:** Generates and copies a structured breakdown of matches, groups, statistics, and replacement text.
  - **🔄 Reset:** Restores default playground state.
  - **🧹 Clear:** Clears pattern and text inputs.

---

## Technology Stack

- **HTML5** — Semantic page structure, accessible ARIA attributes
- **CSS3** — Dark theme, purple/blue accents, glassmorphism cards, responsive CSS Grid and Flexbox layout
- **Vanilla JavaScript** — Real-time `RegExp` engine, educational tokenizer, replacement engine, statistics computation, clipboard management, toast system (zero external libraries, no frameworks, no database)

---

## Planned Features (7-Day Roadmap)

- [x] **Day 1:** Project Initialization & UI Foundation *(Completed)*
- [x] **Day 2:** Live Regex Tester *(Active)* — Real-time pattern matching, flag controls (`g`, `i`, `m`, `s`, `u`), and match highlighting
- [x] **Day 3:** Pattern Library *(Active)* — 26 curated developer snippets across 7 categories with live search, copy, and tester loading
- [x] **Day 4:** Code Generator *(Active)* — Multi-language code generation for JavaScript, Python, PHP, and Java
- [x] **Day 5:** Interactive Regex Cheat Sheet *(Active)* — 43 reference cards across 8 categories, search, filtering, and Common Mistakes guide
- [x] **Day 6:** Advanced Regex Playground *(Active)* — Capture group inspector, replacement preview, regex explainer, match statistics, and presets
- [ ] **Day 7:** Saved Snippets & Test Cases — LocalStorage-backed bookmarks and test case suite

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
4. **Interactive Regex Cheat Sheet:**
   - Browse across the 8 reference category chips (`Basic Characters`, `Character Classes`, `Quantifiers`, `Anchors`, `Groups`, `Lookarounds`, `Flags`, `Common Examples`) or select `All`.
   - Use the live search bar to quickly locate metacharacters or concepts (e.g. `lookahead`, `boundary`, `digit`, `email`, `unicode`).
   - Click **📋 Copy** on any reference card to copy the syntax token to your clipboard.
   - Click **💻 Code** to open and generate code for the pattern in the Code Generator.
   - Click **⚡ Try in Tester** to instantly populate the pattern, flags, and example text into the Live Regex Tester.
   - Review the **Common Beginner Mistakes Guide** to understand and test fixes for the 5 most common regex pitfalls with one-click **⚡ Try Correct in Tester** buttons.
5. **Advanced Regex Playground:**
   - Choose a pattern from the **Load Example** dropdown (`Numbers`, `Email`, `Indian Mobile`, `Date`, `HTML Tags`) or input custom expressions and flags.
   - Inspect capture groups in the **Capture Group Inspector**, with start-end index ranges, length, and safe handling of optional unmatched groups.
   - View the plain-English token breakdown in the **Regex Explanation Panel**.
   - Test text substitution in the **Live Text Replacement** panel, use token helpers (`$&`, `$1`, `$<name>`), and copy the replacement output with one click.
   - Review comprehensive match statistics including total/unique matches, indices range, lengths, and execution time.
