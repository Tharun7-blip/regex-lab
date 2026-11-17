"use strict";

/**
 * Regex Lab – Developer Toolkit
 * Day 4 Script: Live Regex Tester + Regex Pattern Library + Regex Code Generator
 */

const MAX_MATCHES = 500;

const SAMPLE_PATTERNS = {
  digits: {
    pattern: "\\d+",
    flags: ["g"],
    text: "My phone number is 9876543210 and order ID is 4092."
  },
  uppercase: {
    pattern: "[A-Z]",
    flags: ["g"],
    text: "Hello WORLD"
  },
  words: {
    pattern: "\\w+",
    flags: ["g"],
    text: "Hello World 123"
  },
  "named-groups": {
    pattern: "(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})",
    flags: ["g"],
    text: "Launch date: 2026-11-13, Backup date: 2026-12-01"
  },
  anchor: {
    pattern: "^Hello",
    flags: ["m"],
    text: "Hello Tharun\nWelcome to Regex Lab"
  }
};

/**
 * 26 Curated patterns spanning the 7 required categories:
 * - Basic Patterns
 * - Numbers
 * - Text
 * - Email and Web
 * - Password
 * - Date and Time
 * - Programming
 */
const PATTERN_LIBRARY = [
  // 1. Basic Patterns
  {
    id: "exact-word",
    name: "Exact Word Match",
    category: "Basic Patterns",
    regex: "\\bhello\\b",
    flags: ["g", "i"],
    explanation: "Matches the exact word 'hello' using word boundaries (\\b) to avoid partial matches in words like 'othello'.",
    exampleInput: "Hello world, say hello and othello.",
    expectedResult: "Matches 'Hello' and 'hello' (excludes 'othello')."
  },
  {
    id: "non-empty-string",
    name: "Non-Empty String",
    category: "Basic Patterns",
    regex: "^\\S+$",
    flags: ["m"],
    explanation: "Ensures the input contains at least one non-whitespace character and contains no spaces.",
    exampleInput: "developer_101\n\nwith space",
    expectedResult: "Matches 'developer_101' (rejects empty or spaced lines)."
  },
  {
    id: "consecutive-whitespace",
    name: "Multiple Whitespace",
    category: "Basic Patterns",
    regex: "\\s{2,}",
    flags: ["g"],
    explanation: "Detects two or more consecutive whitespace characters (spaces, tabs, newlines) for text normalization.",
    exampleInput: "Regex   Lab    Developer  Toolkit",
    expectedResult: "Matches space runs '   ', '    ', and '  '."
  },
  {
    id: "trim-whitespace",
    name: "Trim Whitespace",
    category: "Basic Patterns",
    regex: "^\\s+|\\s+$",
    flags: ["g", "m"],
    explanation: "Matches leading or trailing whitespace at line boundaries to simulate string trimming.",
    exampleInput: "   Leading and trailing spaces.   ",
    expectedResult: "Matches leading '   ' and trailing '   '."
  },

  // 2. Numbers
  {
    id: "integer-numbers",
    name: "Integer Numbers",
    category: "Numbers",
    regex: "^-?\\d+$",
    flags: ["m"],
    explanation: "Matches positive or negative whole numbers with an optional leading minus sign.",
    exampleInput: "-42\n350\nabc12\n0",
    expectedResult: "Matches '-42', '350', and '0' (rejects 'abc12')."
  },
  {
    id: "decimal-numbers",
    name: "Decimal / Floating Point",
    category: "Numbers",
    regex: "^-?\\d+\\.\\d+$",
    flags: ["m"],
    explanation: "Matches floating-point decimal numbers with mandatory digits both before and after the period.",
    exampleInput: "3.14159\n-0.05\n42\n.5",
    expectedResult: "Matches '3.14159' and '-0.05' (rejects integers or lone decimals)."
  },
  {
    id: "currency-usd",
    name: "Currency Amount (USD)",
    category: "Numbers",
    regex: "\\$\\d{1,3}(?:,\\d{3})*(?:\\.\\d{2})?",
    flags: ["g"],
    explanation: "Matches standard dollar amounts with optional comma thousands separators and 2-digit cents.",
    exampleInput: "Prices are $19.99, $1,450.00, and $5.",
    expectedResult: "Matches '$19.99', '$1,450.00', and '$5'."
  },
  {
    id: "percentage-value",
    name: "Percentage Value",
    category: "Numbers",
    regex: "\\b\\d+(?:\\.\\d+)?%",
    flags: ["g"],
    explanation: "Matches integer or decimal percentage numbers terminated by a literal percent sign '%'.",
    exampleInput: "Battery at 98%, discount is 15.5%, error 0%.",
    expectedResult: "Matches '98%', '15.5%', and '0%'."
  },

  // 3. Text
  {
    id: "alpha-only",
    name: "Alphabetical Only",
    category: "Text",
    regex: "^[a-zA-Z]+$",
    flags: ["m"],
    explanation: "Verifies that the text consists solely of Latin lowercase and uppercase letters.",
    exampleInput: "Antigravity\nRegex101\nHello World",
    expectedResult: "Matches 'Antigravity' (rejects numbers and spaces)."
  },
  {
    id: "alphanumeric-only",
    name: "Alphanumeric String",
    category: "Text",
    regex: "^[a-zA-Z0-9]+$",
    flags: ["m"],
    explanation: "Matches strings consisting strictly of letters and digits without punctuation or spaces.",
    exampleInput: "User4092\nSecret#123\nAlpha9",
    expectedResult: "Matches 'User4092' and 'Alpha9' (rejects '#')."
  },
  {
    id: "url-slug",
    name: "URL Slug",
    category: "Text",
    regex: "^[a-z0-9]+(?:-[a-z0-9]+)*$",
    flags: ["m"],
    explanation: "Validates lowercase URL-friendly slugs separated by single hyphens.",
    exampleInput: "regex-lab-developer-toolkit\ninvalid--slug\nvalid-slug-2",
    expectedResult: "Matches 'regex-lab-developer-toolkit' and 'valid-slug-2'."
  },
  {
    id: "capitalized-words",
    name: "Capitalized Words",
    category: "Text",
    regex: "\\b[A-Z][a-z]+\\b",
    flags: ["g"],
    explanation: "Matches words starting with a capital letter followed exclusively by lowercase letters.",
    exampleInput: "Learn Regular Expressions with Google Antigravity.",
    expectedResult: "Matches 'Learn', 'Regular', 'Expressions', 'Google', 'Antigravity'."
  },

  // 4. Email and Web
  {
    id: "email-address",
    name: "Email Address",
    category: "Email and Web",
    regex: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: ["g"],
    explanation: "Captures standard email addresses adhering to common RFC naming conventions.",
    exampleInput: "Contact support@regexlab.dev or dev.team@company.org.",
    expectedResult: "Matches 'support@regexlab.dev' and 'dev.team@company.org'."
  },
  {
    id: "web-url",
    name: "HTTP / HTTPS URL",
    category: "Email and Web",
    regex: "https?:\\/\\/(?:www\\.)?[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}(?::\\d+)?(?:\\/[^\\s]*)?",
    flags: ["g", "i"],
    explanation: "Matches full web URLs with protocol, optional subdomain, port, and query/path segments.",
    exampleInput: "Visit https://github.com/Tharun7-blip/regex-lab or http://localhost:8080/app",
    expectedResult: "Matches 'https://github.com/Tharun7-blip/regex-lab' and 'http://localhost:8080/app'."
  },
  {
    id: "ipv4-address",
    name: "IPv4 Address",
    category: "Email and Web",
    regex: "\\b(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)\\b",
    flags: ["g"],
    explanation: "Validates 4-octet IPv4 addresses with numerical range bounds (0–255 per octet).",
    exampleInput: "Allowed IPs: 192.168.1.1, 10.0.0.255, 127.0.0.1 (bad: 999.1.1.1)",
    expectedResult: "Matches '192.168.1.1', '10.0.0.255', and '127.0.0.1'."
  },
  {
    id: "domain-name",
    name: "Domain Name",
    category: "Email and Web",
    regex: "\\b(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\\.)+[a-zA-Z]{2,}\\b",
    flags: ["g", "i"],
    explanation: "Matches hostnames and domain names adhering to DNS label structure and valid TLDs.",
    exampleInput: "Services on api.service.io, cloud.google.com, invalid_domain",
    expectedResult: "Matches 'api.service.io' and 'cloud.google.com'."
  },

  // 5. Password
  {
    id: "strong-password",
    name: "Strong Password",
    category: "Password",
    regex: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    flags: ["m"],
    explanation: "Requires at least 8 characters with at least 1 lowercase letter, 1 uppercase letter, 1 digit, and 1 special symbol.",
    exampleInput: "P@ssw0rd2026\nweakpass\nNoSpecial123",
    expectedResult: "Matches 'P@ssw0rd2026' (rejects password without special char)."
  },
  {
    id: "medium-password",
    name: "Medium Password",
    category: "Password",
    regex: "^(?=.*[a-zA-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$",
    flags: ["m"],
    explanation: "Requires a minimum of 6 alphanumeric characters containing at least one letter and one number.",
    exampleInput: "Safe101\nonlyletters\n12345",
    expectedResult: "Matches 'Safe101' (rejects purely alphabetic or numeric passwords)."
  },
  {
    id: "numeric-pin",
    name: "Numeric PIN Code",
    category: "Password",
    regex: "^\\d{4}(?:\\d{2})?$",
    flags: ["m"],
    explanation: "Validates standard 4-digit or 6-digit numeric security PIN codes.",
    exampleInput: "1234\n987654\n12345\nabcd",
    expectedResult: "Matches '1234' and '987654' (rejects 5 digits or letters)."
  },

  // 6. Date and Time
  {
    id: "iso-date",
    name: "ISO Date (YYYY-MM-DD)",
    category: "Date and Time",
    regex: "\\b(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])\\b",
    flags: ["g"],
    explanation: "Matches ISO 8601 calendar dates with captured groups for 4-digit year, 2-digit month, and 2-digit day.",
    exampleInput: "Release: 2026-11-13, Deadline: 2026-12-31, Bad: 2026-13-40",
    expectedResult: "Matches '2026-11-13' and '2026-12-31'."
  },
  {
    id: "time-24h",
    name: "24-Hour Time (HH:MM:SS)",
    category: "Date and Time",
    regex: "\\b(?:[01]\\d|2[0-3]):[0-5]\\d(?::[0-5]\\d)?\\b",
    flags: ["g"],
    explanation: "Matches 24-hour military clock times with hours (00–23), minutes (00–59), and optional seconds (00–59).",
    exampleInput: "Starts at 09:30, server log at 23:59:58, invalid: 25:00",
    expectedResult: "Matches '09:30' and '23:59:58'."
  },
  {
    id: "time-12h",
    name: "12-Hour Time (AM/PM)",
    category: "Date and Time",
    regex: "\\b(?:0?[1-9]|1[0-2]):[0-5]\\d\\s?(?:AM|PM|am|pm)\\b",
    flags: ["g"],
    explanation: "Matches 12-hour clock time format with optional leading zero and case-insensitive AM or PM designator.",
    exampleInput: "Meeting at 10:15 AM, dinner at 7:45pm, bad: 14:00 PM",
    expectedResult: "Matches '10:15 AM' and '7:45pm'."
  },

  // 7. Programming
  {
    id: "hex-color",
    name: "Hex Color Code",
    category: "Programming",
    regex: "#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\\b",
    flags: ["g"],
    explanation: "Matches CSS hexadecimal color literals in 3-digit shorthand, 6-digit RGB, or 8-digit RGBA format.",
    exampleInput: "Theme colors: #8b5cf6, #3b82f6, #fff, #070913cc (skip #12345)",
    expectedResult: "Matches '#8b5cf6', '#3b82f6', '#fff', and '#070913cc'."
  },
  {
    id: "semver",
    name: "Semantic Version (SemVer)",
    category: "Programming",
    regex: "\\bv?(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?\\b",
    flags: ["g"],
    explanation: "Validates complete SemVer 2.0 specifications with major.minor.patch numbers and optional pre-release/build metadata.",
    exampleInput: "Packages: v1.0.0, 2.4.15-beta.1, 0.9.3 (invalid: 1.2)",
    expectedResult: "Matches 'v1.0.0', '2.4.15-beta.1', and '0.9.3'."
  },
  {
    id: "uuid-v4",
    name: "UUID v4",
    category: "Programming",
    regex: "\\b[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-4[0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}\\b",
    flags: ["g"],
    explanation: "Validates 128-bit universally unique identifiers adhering to RFC 4122 version 4 standards.",
    exampleInput: "ID: 550e8400-e29b-41d4-a716-446655440000 (bad: 550e8400-e29b-11d4-a716-446655440000)",
    expectedResult: "Matches '550e8400-e29b-41d4-a716-446655440000'."
  },
  {
    id: "html-tags",
    name: "HTML / XML Tags",
    category: "Programming",
    regex: "<\\/?[a-zA-Z][a-zA-Z0-9]*(?:\\s+[^>]*?)?\\/?>",
    flags: ["g"],
    explanation: "Matches opening, closing, and self-closing HTML/XML elements including tag attributes.",
    exampleInput: "<div class=\"hero\"><span id=\"tag\">Regex</span><img src=\"pic.png\" /></div>",
    expectedResult: "Matches '<div class=\"hero\">', '<span id=\"tag\">', '</span>', '<img src=\"pic.png\" />', '</div>'."
  }
];

/**
 * Escapes HTML special characters to safely render arbitrary text inside innerHTML.
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
  if (value === null || value === undefined) {
    return "";
  }
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Extracts normalized match metadata and capture groups from a RegExpExecArray.
 * @param {RegExpExecArray} match
 */
function formatMatchRecord(match) {
  const start = match.index;
  const end = start + match[0].length;
  const length = match[0].length;
  const numberedGroups = match.slice(1);
  const namedGroups = match.groups ? { ...match.groups } : null;

  return {
    text: match[0],
    start,
    end,
    length,
    numberedGroups,
    namedGroups
  };
}

/**
 * Collects matches from text while guarding against zero-length infinite loops.
 * @param {RegExp} regex
 * @param {string} text
 * @returns {{ matches: Array<object>, truncated: boolean }}
 */
function collectMatches(regex, text) {
  const matches = [];
  let truncated = false;

  if (!regex.global) {
    const single = regex.exec(text);
    if (single) {
      matches.push(formatMatchRecord(single));
    }
    return { matches, truncated };
  }

  let match;
  while ((match = regex.exec(text)) !== null) {
    matches.push(formatMatchRecord(match));

    if (matches.length >= MAX_MATCHES) {
      truncated = true;
      break;
    }

    // Advance past zero-length matches so regex.exec cannot loop forever
    if (match[0].length === 0) {
      if (regex.lastIndex >= text.length) {
        break;
      }
      regex.lastIndex += 1;
    }
  }

  return { matches, truncated };
}

/**
 * Builds HTML string with <mark> elements wrapping each matched slice.
 * @param {string} text
 * @param {Array<object>} matches
 * @returns {string}
 */
function buildHighlightedHtml(text, matches) {
  if (!text) {
    return '<span class="highlight-placeholder">Highlighted matches will appear here...</span>';
  }

  if (matches.length === 0) {
    return escapeHtml(text);
  }

  let html = "";
  let cursor = 0;

  matches.forEach((item, idx) => {
    if (item.start < cursor) {
      return;
    }

    html += escapeHtml(text.slice(cursor, item.start));

    const altClass = idx % 2 === 1 ? " match-mark-alt" : "";
    const matchedText = item.text.length > 0 ? escapeHtml(item.text) : "∅";
    html += `<mark class="match-mark${altClass}" title="Match #${idx + 1} (${item.start}–${item.end})">${matchedText}</mark>`;
    cursor = item.end;
  });

  html += escapeHtml(text.slice(cursor));
  return html;
}

/**
 * Renders the Match Breakdown & Capture Groups list in the Live Regex Tester.
 * @param {HTMLElement} container
 * @param {Array<object>} matches
 * @param {boolean} truncated
 */
function renderMatchDetails(container, matches, truncated) {
  if (matches.length === 0) {
    container.innerHTML = '<p class="empty-state">No matches found for the current pattern and test string.</p>';
    return;
  }

  const cardsHtml = matches
    .map((item, index) => {
      const groupPills = [];

      item.numberedGroups.forEach((groupVal, groupIdx) => {
        const display = groupVal === undefined ? "undefined" : escapeHtml(groupVal);
        groupPills.push(`<span class="group-pill">$${groupIdx + 1}: ${display}</span>`);
      });

      if (item.namedGroups) {
        Object.entries(item.namedGroups).forEach(([name, groupVal]) => {
          const display = groupVal === undefined ? "undefined" : escapeHtml(groupVal);
          groupPills.push(`<span class="group-pill">${escapeHtml(name)}: ${display}</span>`);
        });
      }

      const groupsHtml =
        groupPills.length > 0 ? `<div class="group-list">${groupPills.join("")}</div>` : "";

      const matchPreview = item.text.length > 0 ? escapeHtml(item.text) : "(empty match)";

      return `
        <div class="match-item">
          <div class="match-item-head">
            <span class="match-index">Match #${index + 1}</span>
            <span>index ${item.start}–${item.end}</span>
          </div>
          <div class="match-value">${matchPreview}</div>
          ${groupsHtml}
        </div>
      `;
    })
    .join("");

  const truncationNote = truncated
    ? `<p class="empty-state">Showing first ${MAX_MATCHES} matches to keep the browser responsive.</p>`
    : "";

  container.innerHTML = cardsHtml + truncationNote;
}

/* ==========================================================================
   Day 4: Code Generation Helpers
   ========================================================================== */

/**
 * Escapes characters for standard double-quoted string literals.
 */
function escapeStringLiteral(str, quoteChar = '"') {
  if (!str) return "";
  return str
    .replace(/\\/g, "\\\\")
    .replace(new RegExp(quoteChar, "g"), `\\${quoteChar}`)
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n")
    .replace(/\t/g, "\\t");
}

/**
 * Escapes unescaped forward slashes for JavaScript and PHP regex delimiters.
 */
function escapeRegexDelimiters(pattern) {
  if (!pattern) return "";
  return pattern.replace(/(^|[^\\])\//g, "$1\\/");
}

/**
 * Generates JavaScript (ES6+) validation & matching code snippet.
 */
function generateJavaScriptCode(pattern, flags, sampleText) {
  const escapedPattern = escapeRegexDelimiters(pattern);
  const cleanFlags = (flags || "").replace(/[^gimsuy]/gi, "");
  const escapedText = escapeStringLiteral(sampleText, '"');

  return `// ==========================================
// JavaScript (ES6+) Regex Validation & Match
// ==========================================

const pattern = /${escapedPattern}/${cleanFlags};
const sampleText = "${escapedText}";

// 1. Validation test (returns true / false)
const isMatch = pattern.test(sampleText);
console.log("Validation status:", isMatch ? "MATCH FOUND (PASS)" : "NO MATCH (FAIL)");

// 2. Extract match results
if (isMatch) {
  // If global flag 'g' is used, retrieve all matching substrings
  const allMatches = sampleText.match(pattern);
  console.log("All matches found:", allMatches);

  // Reset lastIndex for stateful global expressions
  pattern.lastIndex = 0;
  const matchDetails = pattern.exec(sampleText);

  if (matchDetails) {
    console.log(\`First match: "\${matchDetails[0]}" at position \${matchDetails.index}\`);
    if (matchDetails.length > 1) {
      console.log("Captured groups:", matchDetails.slice(1));
    }
  }
} else {
  console.log("The regular expression did not match the given sample text.");
}`;
}

/**
 * Generates Python (re module) validation & matching code snippet.
 */
function generatePythonCode(pattern, flags, sampleText) {
  const flagMap = {
    i: "re.IGNORECASE",
    m: "re.MULTILINE",
    s: "re.DOTALL",
    u: "re.UNICODE",
    x: "re.VERBOSE"
  };

  const activeFlags = [];
  for (const char of (flags || "").toLowerCase()) {
    if (flagMap[char] && !activeFlags.includes(flagMap[char])) {
      activeFlags.push(flagMap[char]);
    }
  }

  const flagsExpr = activeFlags.length > 0 ? activeFlags.join(" | ") : "0";
  const escapedPattern = (pattern || "").replace(/"/g, '\\"');
  const escapedText = escapeStringLiteral(sampleText, '"');

  return `# ==========================================
# Python (re module) Regex Validation & Match
# ==========================================

import re

pattern = r"${escapedPattern}"
sample_text = "${escapedText}"
flags = ${flagsExpr}

# 1. Search for pattern match in text
match = re.search(pattern, sample_text, flags=flags)

if match:
    print("Validation status: MATCH FOUND (PASS)")
    print(f"Matched text: '{match.group(0)}' at indices {match.span()}")

    # Display capture groups if present
    if match.groups():
        print(f"Capture groups: {match.groups()}")

    # 2. Extract all non-overlapping matches
    all_matches = re.findall(pattern, sample_text, flags=flags)
    print(f"Total occurrences ({len(all_matches)}): {all_matches}")
else:
    print("Validation status: NO MATCH (FAIL)")
    print("The regular expression did not match the given sample text.")`;
}

/**
 * Generates PHP (preg_match / preg_match_all) validation & matching code snippet.
 */
function generatePhpCode(pattern, flags, sampleText) {
  // PHP preg_match handles 'g' through preg_match_all rather than delimiter flag
  const phpFlags = (flags || "").replace(/[^imsux]/gi, "");

  const escapedPattern = (pattern || "")
    .replace(/(^|[^\\])\//g, "$1\\/")
    .replace(/\$/g, "\\$");

  const escapedText = (sampleText || "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\$/g, "\\$")
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n");

  return `<?php
// ==========================================
// PHP Regex Validation & Matching Example
// ==========================================

$pattern = '/${escapedPattern}/${phpFlags}';
$sampleText = "${escapedText}";

// 1. Single match test
if (preg_match($pattern, $sampleText, $singleMatch)) {
    echo "Validation status: MATCH FOUND (PASS)\\n";
    echo "First matched string: '{$singleMatch[0]}'\\n";

    // 2. Extract all matches with character positions
    $matchCount = preg_match_all($pattern, $sampleText, $allMatches, PREG_OFFSET_CAPTURE);
    echo "Total matches found: {$matchCount}\\n";

    foreach ($allMatches[0] as $index => $matchInfo) {
        $text = $matchInfo[0];
        $offset = $matchInfo[1];
        echo "  Match #" . ($index + 1) . ": '{$text}' at position {$offset}\\n";
    }
} else {
    echo "Validation status: NO MATCH (FAIL)\\n";
    echo "The regular expression did not match the given sample text.\\n";
}
?>`;
}

/**
 * Generates Java (java.util.regex) validation & matching code snippet.
 */
function generateJavaCode(pattern, flags, sampleText) {
  // In Java string literals, every backslash must be doubled (\\)
  const escapedPattern = (pattern || "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n");

  const escapedText = (sampleText || "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r/g, "\\r")
    .replace(/\n/g, "\\n");

  const flagMap = {
    i: "Pattern.CASE_INSENSITIVE",
    m: "Pattern.MULTILINE",
    s: "Pattern.DOTALL",
    u: "Pattern.UNICODE_CASE"
  };

  const activeFlags = [];
  for (const char of (flags || "").toLowerCase()) {
    if (flagMap[char] && !activeFlags.includes(flagMap[char])) {
      activeFlags.push(flagMap[char]);
    }
  }

  const compileArgs = activeFlags.length > 0
    ? `regex, ${activeFlags.join(" | ")}`
    : `regex`;

  return `// ==========================================
// Java (java.util.regex) Regex Validation & Match
// ==========================================

import java.util.regex.Pattern;
import java.util.regex.Matcher;

public class RegexValidator {
    public static void main(String[] args) {
        // Double-escaped regex pattern for Java String literal
        String regex = "${escapedPattern}";
        String sampleText = "${escapedText}";

        // Compile regex pattern
        Pattern pattern = Pattern.compile(${compileArgs});
        Matcher matcher = pattern.matcher(sampleText);

        boolean found = false;
        int matchCount = 0;

        // Iterate through all matches
        while (matcher.find()) {
            found = true;
            matchCount++;
            System.out.println("Match #" + matchCount + ": '" + matcher.group() + 
                               "' found at [" + matcher.start() + ".." + matcher.end() + "]");

            // Display capture groups if any
            if (matcher.groupCount() > 0) {
                for (int i = 1; i <= matcher.groupCount(); i++) {
                    System.out.println("  Group $" + i + ": " + matcher.group(i));
                }
            }
        }

        if (!found) {
            System.out.println("Validation status: NO MATCH (FAIL)");
            System.out.println("The regular expression did not match the given sample text.");
        } else {
            System.out.println("Validation status: MATCH FOUND (PASS) - Total: " + matchCount);
        }
    }
}`;
}

/**
 * ============================================================================
 * Day 5: Interactive Regex Cheat Sheet Reference Catalog (43 items)
 * ============================================================================
 */
const CHEATSHEET_ITEMS = [
  // A. Basic Characters (7)
  {
    id: "cs-basic-dot",
    syntax: ".",
    name: "Any Character (Except Newline)",
    category: "Basic Characters",
    pattern: "c.t",
    flags: ["g"],
    explanation: "Matches any single character except line terminators (\\n, \\r), unless the 's' (dotAll) flag is enabled.",
    exampleInput: "cat cut c9t c.t c#t",
    expectedOutput: "cat, cut, c9t, c.t, c#t"
  },
  {
    id: "cs-basic-digit",
    syntax: "\\d",
    name: "Digit Character",
    category: "Basic Characters",
    pattern: "\\d+",
    flags: ["g"],
    explanation: "Matches any decimal digit character from 0 through 9. Shorthand equivalent to [0-9].",
    exampleInput: "Agent 007 has 32 apples and 5 oranges.",
    expectedOutput: "007, 32, 5"
  },
  {
    id: "cs-basic-nondigit",
    syntax: "\\D",
    name: "Non-Digit Character",
    category: "Basic Characters",
    pattern: "\\D+",
    flags: ["g"],
    explanation: "Matches any character that is NOT a decimal digit. Shorthand equivalent to [^0-9].",
    exampleInput: "Room #404 (Building B)",
    expectedOutput: "Room #,  (Building B)"
  },
  {
    id: "cs-basic-word",
    syntax: "\\w",
    name: "Word Character",
    category: "Basic Characters",
    pattern: "\\w+",
    flags: ["g"],
    explanation: "Matches any alphanumeric character (a-z, A-Z, 0-9) plus the underscore (_). Equivalent to [a-zA-Z0-9_].",
    exampleInput: "user_name-42@domain!",
    expectedOutput: "user_name, 42, domain"
  },
  {
    id: "cs-basic-nonword",
    syntax: "\\W",
    name: "Non-Word Character",
    category: "Basic Characters",
    pattern: "\\W+",
    flags: ["g"],
    explanation: "Matches any character that is NOT an ASCII word character (symbols, punctuation, spaces). Equivalent to [^a-zA-Z0-9_].",
    exampleInput: "hello world! #2026",
    expectedOutput: " (space), ! (space), #"
  },
  {
    id: "cs-basic-whitespace",
    syntax: "\\s",
    name: "Whitespace Character",
    category: "Basic Characters",
    pattern: "\\s+",
    flags: ["g"],
    explanation: "Matches any whitespace character including spaces, tabs (\\t), line feeds (\\n), and carriage returns (\\r).",
    exampleInput: "Regex  Lab\t2026\nToolkit",
    expectedOutput: "  (2 spaces), \t (tab), \n (newline)"
  },
  {
    id: "cs-basic-nonwhitespace",
    syntax: "\\S",
    name: "Non-Whitespace Character",
    category: "Basic Characters",
    pattern: "\\S+",
    flags: ["g"],
    explanation: "Matches any character that is NOT a whitespace character. Equivalent to [^\\s].",
    exampleInput: "Alpha Beta Gamma",
    expectedOutput: "Alpha, Beta, Gamma"
  },

  // B. Character Classes (5)
  {
    id: "cs-class-set",
    syntax: "[abc]",
    name: "Character Set",
    category: "Character Classes",
    pattern: "[abc]",
    flags: ["g"],
    explanation: "Matches any single character enclosed within the brackets ('a', 'b', or 'c').",
    exampleInput: "cat bat dog cab",
    expectedOutput: "c, a, b, a, c, a, b"
  },
  {
    id: "cs-class-lower",
    syntax: "[a-z]",
    name: "Lowercase Letter Range",
    category: "Character Classes",
    pattern: "[a-z]+",
    flags: ["g"],
    explanation: "Matches any continuous sequence of lowercase letters from 'a' through 'z'.",
    exampleInput: "CodeCraft 2026 Toolkit",
    expectedOutput: "ode, raft, oolkit"
  },
  {
    id: "cs-class-upper",
    syntax: "[A-Z]",
    name: "Uppercase Letter Range",
    category: "Character Classes",
    pattern: "[A-Z]+",
    flags: ["g"],
    explanation: "Matches any continuous sequence of uppercase letters from 'A' through 'Z'.",
    exampleInput: "HyperText Markup Language (HTML)",
    expectedOutput: "H, T, M, L, HTML"
  },
  {
    id: "cs-class-digit",
    syntax: "[0-9]",
    name: "Digit Range",
    category: "Character Classes",
    pattern: "[0-9]+",
    flags: ["g"],
    explanation: "Matches one or more decimal digits between '0' and '9'. Equivalent to \\d+.",
    exampleInput: "Flight UA941 landed at terminal 4.",
    expectedOutput: "941, 4"
  },
  {
    id: "cs-class-negated",
    syntax: "[^abc]",
    name: "Negated Character Set",
    category: "Character Classes",
    pattern: "[^abc]+",
    flags: ["g"],
    explanation: "Matches any characters that are NOT inside the set. A caret (^) at the start of brackets negates the set.",
    exampleInput: "abracadabra",
    expectedOutput: "r, d, r"
  },

  // C. Quantifiers (6)
  {
    id: "cs-quant-star",
    syntax: "*",
    name: "Zero or More (Greedy)",
    category: "Quantifiers",
    pattern: "bo*",
    flags: ["g"],
    explanation: "Matches the preceding item 0 or more times, matching as many characters as possible.",
    exampleInput: "b bo boo boooo b",
    expectedOutput: "b, bo, boo, boooo, b"
  },
  {
    id: "cs-quant-plus",
    syntax: "+",
    name: "One or More (Greedy)",
    category: "Quantifiers",
    pattern: "bo+",
    flags: ["g"],
    explanation: "Matches the preceding item 1 or more times. Requires at least one occurrence to match.",
    exampleInput: "b bo boo boooo b",
    expectedOutput: "bo, boo, boooo"
  },
  {
    id: "cs-quant-question",
    syntax: "?",
    name: "Optional (Zero or One)",
    category: "Quantifiers",
    pattern: "colou?r",
    flags: ["g"],
    explanation: "Makes the preceding item optional, matching it 0 or 1 time.",
    exampleInput: "Both color and colour are valid spellings.",
    expectedOutput: "color, colour"
  },
  {
    id: "cs-quant-exact",
    syntax: "{n}",
    name: "Exactly n Times",
    category: "Quantifiers",
    pattern: "\\b\\d{4}\\b",
    flags: ["g"],
    explanation: "Matches exactly n consecutive occurrences of the preceding token or subpattern.",
    exampleInput: "Pins: 12, 1234, 56789, 9021",
    expectedOutput: "1234, 9021"
  },
  {
    id: "cs-quant-atleast",
    syntax: "{n,}",
    name: "n or More Times",
    category: "Quantifiers",
    pattern: "\\ba{3,}\\b",
    flags: ["g"],
    explanation: "Matches at least n occurrences of the preceding token with no upper boundary.",
    exampleInput: "a aa aaa aaaa aaaaa",
    expectedOutput: "aaa, aaaa, aaaaa"
  },
  {
    id: "cs-quant-range",
    syntax: "{n,m}",
    name: "Between n and m Times",
    category: "Quantifiers",
    pattern: "\\b\\d{2,4}\\b",
    flags: ["g"],
    explanation: "Matches between n and m occurrences (inclusive) of the preceding token.",
    exampleInput: "Nums: 5, 42, 350, 4096, 52400",
    expectedOutput: "42, 350, 4096"
  },

  // D. Anchors (4)
  {
    id: "cs-anchor-start",
    syntax: "^",
    name: "Start of String / Line",
    category: "Anchors",
    pattern: "^INFO:",
    flags: ["m"],
    explanation: "Asserts position at the beginning of the string (or beginning of each line when 'm' flag is set).",
    exampleInput: "INFO: Application started\nDEBUG: Loading config\nINFO: Ready",
    expectedOutput: "INFO: (line 1), INFO: (line 3)"
  },
  {
    id: "cs-anchor-end",
    syntax: "$",
    name: "End of String / Line",
    category: "Anchors",
    pattern: "SUCCESS$",
    flags: ["m"],
    explanation: "Asserts position at the end of the string (or end of each line when 'm' flag is set).",
    exampleInput: "Build 101: SUCCESS\nBuild 102: FAILED\nBuild 103: SUCCESS",
    expectedOutput: "SUCCESS (line 1), SUCCESS (line 3)"
  },
  {
    id: "cs-anchor-word-boundary",
    syntax: "\\b",
    name: "Word Boundary",
    category: "Anchors",
    pattern: "\\bcat\\b",
    flags: ["g"],
    explanation: "Matches a zero-width word boundary between a word character (\\w) and a non-word character.",
    exampleInput: "cat category catalog bobcat copycat cat",
    expectedOutput: "cat (1st), cat (last)"
  },
  {
    id: "cs-anchor-nonword-boundary",
    syntax: "\\B",
    name: "Non-Word Boundary",
    category: "Anchors",
    pattern: "\\Benter\\B",
    flags: ["g"],
    explanation: "Matches a zero-width position that is NOT at a word boundary (embedded inside a word).",
    exampleInput: "center entering entertainers reentry",
    expectedOutput: "enter (in 'center'), enter (in 'entertainers'), enter (in 'reentry')"
  },

  // E. Groups (4)
  {
    id: "cs-group-capturing",
    syntax: "(abc)",
    name: "Capturing Group",
    category: "Groups",
    pattern: "(\\w+)@(\\w+\\.[a-z]{2,})",
    flags: ["g"],
    explanation: "Groups tokens together and remembers the matched text in numbered groups ($1, $2).",
    exampleInput: "Contact dev@example.com for info",
    expectedOutput: "dev@example.com ($1: dev, $2: example.com)"
  },
  {
    id: "cs-group-noncapturing",
    syntax: "(?:abc)",
    name: "Non-Capturing Group",
    category: "Groups",
    pattern: "(?:https|http):\\/\\/(\\w+\\.[a-z]{2,})",
    flags: ["g"],
    explanation: "Groups sub-expressions for alternation or quantifiers without allocating capture group memory.",
    exampleInput: "https://google.com and http://github.com",
    expectedOutput: "https://google.com ($1: google.com), http://github.com ($1: github.com)"
  },
  {
    id: "cs-group-named",
    syntax: "(?<name>abc)",
    name: "Named Capturing Group",
    category: "Groups",
    pattern: "(?<year>\\d{4})-(?<month>\\d{2})-(?<day>\\d{2})",
    flags: ["g"],
    explanation: "Captures the matched substring under a descriptive name accessible via groups[name].",
    exampleInput: "Release: 2026-11-15",
    expectedOutput: "<year>: 2026, <month>: 11, <day>: 15"
  },
  {
    id: "cs-group-alternation",
    syntax: "a|b",
    name: "Alternation (OR)",
    category: "Groups",
    pattern: "\\b(cat|dog|bird)\\b",
    flags: ["g"],
    explanation: "Matches either the expression to the left or the expression to the right of the vertical bar.",
    exampleInput: "We have a cat, a fish, and a dog.",
    expectedOutput: "cat, dog"
  },

  // F. Lookarounds (4)
  {
    id: "cs-lookaround-pos-ahead",
    syntax: "(?=abc)",
    name: "Positive Lookahead",
    category: "Lookarounds",
    pattern: "\\d+(?=px)",
    flags: ["g"],
    explanation: "Asserts that the subpattern matches immediately ahead without including it in the final match.",
    exampleInput: "width: 1920px; height: 1080px; count: 42;",
    expectedOutput: "1920, 1080"
  },
  {
    id: "cs-lookaround-neg-ahead",
    syntax: "(?!abc)",
    name: "Negative Lookahead",
    category: "Lookarounds",
    pattern: "\\b\\w+\\.(?!png|jpg)\\w+\\b",
    flags: ["g"],
    explanation: "Asserts that the specified subpattern does NOT follow immediately ahead.",
    exampleInput: "index.html script.js logo.png avatar.jpg style.css",
    expectedOutput: "index.html, script.js, style.css"
  },
  {
    id: "cs-lookaround-pos-behind",
    syntax: "(?<=abc)",
    name: "Positive Lookbehind",
    category: "Lookarounds",
    pattern: "(?<=\\$)\\d+",
    flags: ["g"],
    explanation: "Asserts that the subpattern matches immediately behind without including it in the match.",
    exampleInput: "Order cost: $150, discount: €20, fee: $15",
    expectedOutput: "150, 15"
  },
  {
    id: "cs-lookaround-neg-behind",
    syntax: "(?<!abc)",
    name: "Negative Lookbehind",
    category: "Lookarounds",
    pattern: "(?<!\\$)\\b\\d+\\b",
    flags: ["g"],
    explanation: "Asserts that the specified subpattern does NOT match immediately behind.",
    exampleInput: "$99 items total: 42 shipped, 10 pending",
    expectedOutput: "42, 10"
  },

  // G. Flags (5)
  {
    id: "cs-flag-g",
    syntax: "g",
    name: "Global Search Flag",
    category: "Flags",
    pattern: "\\b\\w{4}\\b",
    flags: ["g"],
    explanation: "Searches for all occurrences across the entire input string rather than stopping at the first match.",
    exampleInput: "blue ruby code star beta",
    expectedOutput: "blue, ruby, code, star, beta (all 5 words)"
  },
  {
    id: "cs-flag-i",
    syntax: "i",
    name: "Case-Insensitive Flag",
    category: "Flags",
    pattern: "javascript",
    flags: ["g", "i"],
    explanation: "Treats uppercase and lowercase characters as equivalent during pattern matching.",
    exampleInput: "JavaScript, javascript, and JAVASCRIPT",
    expectedOutput: "JavaScript, javascript, JAVASCRIPT"
  },
  {
    id: "cs-flag-m",
    syntax: "m",
    name: "Multiline Mode Flag",
    category: "Flags",
    pattern: "^#\\s.*$",
    flags: ["g", "m"],
    explanation: "Allows ^ and $ anchors to match at the beginning and end of each line (separated by \\n).",
    exampleInput: "# Heading 1\nParagraph text\n# Heading 2",
    expectedOutput: "# Heading 1, # Heading 2"
  },
  {
    id: "cs-flag-s",
    syntax: "s",
    name: "DotAll Mode Flag (Single-line)",
    category: "Flags",
    pattern: "<article>.*?</article>",
    flags: ["g", "s"],
    explanation: "Enables the dot (.) wildcard to match newline characters (\\n, \\r) as well.",
    exampleInput: "<article>\n  <h2>Title</h2>\n</article>",
    expectedOutput: "<article>\n  <h2>Title</h2>\n</article>"
  },
  {
    id: "cs-flag-u",
    syntax: "u",
    name: "Unicode Mode Flag",
    category: "Flags",
    pattern: "\\p{Extended_Pictographic}+",
    flags: ["g", "u"],
    explanation: "Enables full Unicode character properties, astral plane surrogate handling, and emoji matching.",
    exampleInput: "Hello 🚀 World 💡 2026 🔥",
    expectedOutput: "🚀, 💡, 🔥"
  },

  // H. Common Examples (8)
  {
    id: "cs-example-numbers",
    syntax: "\\b\\d+(?:\\.\\d+)?\\b",
    name: "Numbers (Integer & Decimal)",
    category: "Common Examples",
    pattern: "\\b\\d+(?:\\.\\d+)?\\b",
    flags: ["g"],
    explanation: "Matches standalone integer or decimal numbers with optional fractional parts.",
    exampleInput: "Prices: 42, 3.14, 0.007, and 999 items",
    expectedOutput: "42, 3.14, 0.007, 999"
  },
  {
    id: "cs-example-email",
    syntax: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    name: "Email Address",
    category: "Common Examples",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: ["g"],
    explanation: "Standard pattern matching email usernames, domain names, and top-level domain extensions.",
    exampleInput: "Reach team@regexlab.dev or contact@domain.co.uk",
    expectedOutput: "team@regexlab.dev, contact@domain.co.uk"
  },
  {
    id: "cs-example-indian-mobile",
    syntax: "(?:\\+91|0)?[6-9]\\d{9}",
    name: "Indian Mobile Number",
    category: "Common Examples",
    pattern: "(?:\\+91|0)?[6-9]\\d{9}",
    flags: ["g"],
    explanation: "Matches standard 10-digit Indian cell numbers starting with 6-9, with optional +91 or 0 prefix.",
    exampleInput: "Call +919876543210, 09123456789, or 8888877777",
    expectedOutput: "+919876543210, 09123456789, 8888877777"
  },
  {
    id: "cs-example-password",
    syntax: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    name: "Strong Password Validation",
    category: "Common Examples",
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
    flags: ["m"],
    explanation: "Enforces at least 8 characters with lowercase, uppercase, numeric digit, and special symbol requirements.",
    exampleInput: "P@ssw0rd2026!",
    expectedOutput: "P@ssw0rd2026! (Valid)"
  },
  {
    id: "cs-example-date",
    syntax: "\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b",
    name: "Date Format (YYYY-MM-DD)",
    category: "Common Examples",
    pattern: "\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b",
    flags: ["g"],
    explanation: "Matches ISO 8601 calendar dates with valid 2-digit months (01-12) and days (01-31).",
    exampleInput: "Dates: 2026-11-15, 2026-13-45 (invalid), 2027-01-01",
    expectedOutput: "2026-11-15, 2027-01-01"
  },
  {
    id: "cs-example-url",
    syntax: "https?:\\/\\/[^\\s/$.?#].[^\\s]*",
    name: "Web URL (HTTP / HTTPS)",
    category: "Common Examples",
    pattern: "https?:\\/\\/[^\\s/$.?#].[^\\s]*",
    flags: ["g"],
    explanation: "Matches web URLs starting with http:// or https:// with valid address and query strings.",
    exampleInput: "Docs at https://regexlab.dev/docs and http://localhost:8080",
    expectedOutput: "https://regexlab.dev/docs, http://localhost:8080"
  },
  {
    id: "cs-example-uppercase-words",
    syntax: "\\b[A-Z]{2,}\\b",
    name: "Uppercase Words & Acronyms",
    category: "Common Examples",
    pattern: "\\b[A-Z]{2,}\\b",
    flags: ["g"],
    explanation: "Finds words made entirely of two or more capital letters (acronyms, country codes, constants).",
    exampleInput: "The NASA and ESA launched a new AI satellite.",
    expectedOutput: "NASA, ESA, AI"
  },
  {
    id: "cs-example-whitespace-trim",
    syntax: "^\\s+|\\s+$",
    name: "Whitespace Removal / Trim",
    category: "Common Examples",
    pattern: "^\\s+|\\s+$",
    flags: ["g", "m"],
    explanation: "Matches leading or trailing whitespace at line boundaries to perform string trimming.",
    exampleInput: "   Clean me up   ",
    expectedOutput: "Leading '   ' and trailing '   '"
  }
];

/**
 * ============================================================================
 * Day 6: Advanced Regex Playground Presets & Educational Explainer
 * ============================================================================
 */
const PLAYGROUND_EXAMPLES = {
  numbers: {
    name: "Numbers: \\d+",
    pattern: "\\d+",
    flags: ["g"],
    sampleText: "Orders: 42, 108, and 999 items.",
    replacement: "[$&]"
  },
  email: {
    name: "Email: RFC Standard",
    pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}",
    flags: ["g"],
    sampleText: "Contact support@regexlab.dev or team@google.com.",
    replacement: "[REDACTED_EMAIL]"
  },
  "indian-mobile": {
    name: "Indian Mobile: +91 / 0 Prefix",
    pattern: "^(?:\\+91[- ]?)?[6-9]\\d{9}$",
    flags: ["m"],
    sampleText: "+91-9876543210\n09876543210\n9876543210\n1234567890",
    replacement: "[VALID_PHONE: $&]"
  },
  date: {
    name: "Date: YYYY-MM-DD",
    pattern: "^\\d{4}-\\d{2}-\\d{2}$",
    flags: ["m"],
    sampleText: "2026-11-16\n2026-02-30\n16-11-2026",
    replacement: "[DATE: $&]"
  },
  "html-tags": {
    name: "HTML Tags: <tag>...</tag>",
    pattern: "<([a-z]+)[^>]*>.*?</\\1>",
    flags: ["g"],
    sampleText: "<p>Hello <b>World</b></p> and <div>Content</div>",
    replacement: "[TAG: $1 -> $&]"
  }
};

/**
 * Parses and describes quantifiers (+, *, ?, {n}, {n,}, {n,m}, and lazy variants).
 */
function parseQuantifier(str, idx) {
  if (idx >= str.length) return null;
  const sub = str.slice(idx);

  // Lazy quantifier checks (+?, *?, ??, {n,m}?)
  if (sub.startsWith("+?")) return { raw: "+?", name: "1+ times, lazy", prefix: "One or more times (lazy)" };
  if (sub.startsWith("*?")) return { raw: "*?", name: "0+ times, lazy", prefix: "Zero or more times (lazy)" };
  if (sub.startsWith("??")) return { raw: "??", name: "Optional, lazy", prefix: "Zero or one time (optional, lazy)" };

  // Greedy quantifier checks
  if (sub.startsWith("+")) return { raw: "+", name: "1+ times", prefix: "One or more" };
  if (sub.startsWith("*")) return { raw: "*", name: "0+ times", prefix: "Zero or more" };
  if (sub.startsWith("?")) return { raw: "?", name: "Optional", prefix: "Zero or one (optional)" };

  // Braced quantifiers {n}, {n,}, {n,m}
  const match = sub.match(/^\{(\d+)(?:,(\d*))?\}(\??)/);
  if (match) {
    const raw = match[0];
    const n = match[1];
    const m = match[2];
    const isLazy = match[3] === "?";
    let name = "";
    let prefix = "";

    if (m === undefined) {
      name = `Exactly ${n} times`;
      prefix = `Exactly ${n}`;
    } else if (m === "") {
      name = `${n} or more times`;
      prefix = `At least ${n}`;
    } else {
      name = `${n} to ${m} times`;
      prefix = `Between ${n} and ${m}`;
    }
    if (isLazy) {
      name += " (lazy)";
      prefix += " (lazy)";
    }
    return { raw, name, prefix };
  }

  return null;
}

/**
 * Plain-English pattern breakdown explainer for beginner-friendly learning.
 * Faithfully handles: \d+, [A-Z], ^Hello, (ab)+ and generic token sequences.
 * Clearly disclaims when complex arbitrary nesting cannot be parsed unambiguously.
 */
function explainRegexPattern(pattern) {
  if (!pattern || !pattern.trim()) {
    return {
      tokens: [],
      isComplex: false,
      message: "Enter a regular expression pattern above to view a plain-English explanation."
    };
  }

  const tokens = [];
  let i = 0;
  const len = pattern.length;
  let isComplex = false;

  while (i < len) {
    const char = pattern[i];

    // 1. Anchors
    if (char === "^") {
      tokens.push({
        token: "^",
        name: "Start Assertion",
        desc: "Asserts position at the beginning of the string (or line with multiline flag 'm')."
      });
      i += 1;
      continue;
    }
    if (char === "$") {
      tokens.push({
        token: "$",
        name: "End Assertion",
        desc: "Asserts position at the end of the string (or line with multiline flag 'm')."
      });
      i += 1;
      continue;
    }

    // 2. Alternation
    if (char === "|") {
      tokens.push({
        token: "|",
        name: "Alternation (OR)",
        desc: "Matches either the expression before or after the vertical bar."
      });
      i += 1;
      continue;
    }

    // 3. Escaped tokens (\d, \w, \s, \b, \B, backreferences, etc.)
    if (char === "\\") {
      if (i + 1 >= len) {
        tokens.push({ token: "\\", name: "Trailing Backslash", desc: "Incomplete escape character." });
        i += 1;
        break;
      }
      const nextChar = pattern[i + 1];

      // Word boundary
      if (nextChar === "b") {
        tokens.push({ token: "\\b", name: "Word Boundary", desc: "Asserts a zero-width boundary between a word character (\\w) and non-word character." });
        i += 2;
        continue;
      }
      if (nextChar === "B") {
        tokens.push({ token: "\\B", name: "Non-Word Boundary", desc: "Asserts position that is NOT at a word boundary." });
        i += 2;
        continue;
      }

      // Shorthand character classes with optional quantifier
      const baseToken = "\\" + nextChar;
      let baseName = "";
      let baseDesc = "";

      switch (nextChar) {
        case "d":
          baseName = "Digit";
          baseDesc = "digits (0-9)";
          break;
        case "D":
          baseName = "Non-Digit";
          baseDesc = "characters that are not digits [^0-9]";
          break;
        case "w":
          baseName = "Word Character";
          baseDesc = "word characters (letter, digit, underscore)";
          break;
        case "W":
          baseName = "Non-Word Character";
          baseDesc = "non-word characters (punctuation, symbol, space)";
          break;
        case "s":
          baseName = "Whitespace";
          baseDesc = "whitespace characters (space, tab, newline)";
          break;
        case "S":
          baseName = "Non-Whitespace";
          baseDesc = "non-whitespace characters";
          break;
        default:
          if (/\d/.test(nextChar)) {
            tokens.push({
              token: "\\" + nextChar,
              name: `Backreference $${nextChar}`,
              desc: `Matches the exact text previously captured by group #${nextChar}.`
            });
            i += 2;
            continue;
          }
          baseName = `Literal '${nextChar}'`;
          baseDesc = `literal '${nextChar}' character`;
          break;
      }

      i += 2;

      // Check for attached quantifier (+, *, ?, {n,m})
      const q = parseQuantifier(pattern, i);
      if (q) {
        tokens.push({
          token: baseToken + q.raw,
          name: `${baseName} (${q.name})`,
          desc: `${q.prefix} ${baseDesc}.`
        });
        i += q.raw.length;
      } else {
        tokens.push({
          token: baseToken,
          name: baseName,
          desc: `Matches any ${baseDesc}.`
        });
      }
      continue;
    }

    // 4. Dot (.)
    if (char === ".") {
      i += 1;
      const q = parseQuantifier(pattern, i);
      if (q) {
        tokens.push({
          token: "." + q.raw,
          name: `Any Character (${q.name})`,
          desc: `${q.prefix} any character except line breaks.`
        });
        i += q.raw.length;
      } else {
        tokens.push({
          token: ".",
          name: "Any Character",
          desc: "Matches any single character except line terminators (unless 's' flag is set)."
        });
      }
      continue;
    }

    // 5. Character Class [...]
    if (char === "[") {
      let closeIdx = i + 1;
      if (pattern[closeIdx] === "^") closeIdx += 1;
      if (pattern[closeIdx] === "]") closeIdx += 1;
      while (closeIdx < len && (pattern[closeIdx] !== "]" || pattern[closeIdx - 1] === "\\")) {
        closeIdx += 1;
      }

      if (closeIdx < len && pattern[closeIdx] === "]") {
        const fullClass = pattern.slice(i, closeIdx + 1);
        const inner = fullClass.slice(1, -1);
        const isNegated = inner.startsWith("^");
        const content = isNegated ? inner.slice(1) : inner;

        let classDesc = "";
        if (content === "A-Z") classDesc = "any uppercase letter";
        else if (content === "a-z") classDesc = "any lowercase letter";
        else if (content === "0-9") classDesc = "any digit (0 through 9)";
        else if (content === "a-zA-Z" || content === "A-Za-z") classDesc = "any uppercase or lowercase letter";
        else if (content.includes("a-z") && content.includes("A-Z") && content.includes("0-9")) classDesc = "any alphanumeric letter or digit";
        else if (isNegated) classDesc = `any character EXCEPT characters in [${content}]`;
        else classDesc = `any single character in the set [${content}]`;

        i = closeIdx + 1;
        const q = parseQuantifier(pattern, i);
        if (q) {
          tokens.push({
            token: fullClass + q.raw,
            name: `${isNegated ? "Negated Class" : "Character Class"} (${q.name})`,
            desc: `${q.prefix} ${classDesc}.`
          });
          i += q.raw.length;
        } else {
          tokens.push({
            token: fullClass,
            name: isNegated ? "Negated Character Class" : "Character Class",
            desc: `Matches ${classDesc}.`
          });
        }
        continue;
      } else {
        isComplex = true;
        tokens.push({ token: "[", name: "Unclosed Bracket", desc: "Opening bracket of character class." });
        i += 1;
        continue;
      }
    }

    // 6. Groups (...)
    if (char === "(") {
      let depth = 1;
      let closeIdx = i + 1;
      while (closeIdx < len && depth > 0) {
        if (pattern[closeIdx] === "\\" && closeIdx + 1 < len) {
          closeIdx += 2;
          continue;
        }
        if (pattern[closeIdx] === "(") depth += 1;
        if (pattern[closeIdx] === ")") depth -= 1;
        closeIdx += 1;
      }

      if (depth === 0) {
        const fullGroup = pattern.slice(i, closeIdx);
        let groupName = "Capturing Group";
        let groupDesc = "";
        const innerContent = fullGroup.slice(1, -1);

        if (fullGroup.startsWith("(?<")) {
          const nameEnd = fullGroup.indexOf(">");
          const gName = nameEnd > 3 ? fullGroup.slice(3, nameEnd) : "name";
          groupName = `Named Group <${gName}>`;
          groupDesc = `Captures matched text under the property name '${gName}'.`;
        } else if (fullGroup.startsWith("(?:")) {
          groupName = "Non-Capturing Group";
          groupDesc = "Groups sub-expressions without creating a numbered capture group.";
        } else if (fullGroup.startsWith("(?=")) {
          groupName = "Positive Lookahead";
          groupDesc = "Asserts sub-pattern matches ahead without consuming characters.";
        } else if (fullGroup.startsWith("(?!")) {
          groupName = "Negative Lookahead";
          groupDesc = "Asserts sub-pattern does NOT match ahead.";
        } else if (fullGroup.startsWith("(?<=")) {
          groupName = "Positive Lookbehind";
          groupDesc = "Asserts sub-pattern matches behind without consuming characters.";
        } else if (fullGroup.startsWith("(?<!")) {
          groupName = "Negative Lookbehind";
          groupDesc = "Asserts sub-pattern does NOT match behind.";
        } else {
          groupName = "Capturing Group";
          groupDesc = `Captures group (${innerContent}) into a numbered capture group.`;
        }

        i = closeIdx;
        const q = parseQuantifier(pattern, i);
        if (q) {
          tokens.push({
            token: fullGroup + q.raw,
            name: `${groupName} (${q.name})`,
            desc: `One or more repetitions of the group ${innerContent}.`
          });
          i += q.raw.length;
        } else {
          tokens.push({
            token: fullGroup,
            name: groupName,
            desc: groupDesc
          });
        }
        continue;
      } else {
        isComplex = true;
        tokens.push({ token: "(", name: "Unclosed Group", desc: "Opening parenthesis of sub-group." });
        i += 1;
        continue;
      }
    }

    // 7. Literal text sequence
    const litStart = i;
    while (
      i < len &&
      !"^$|\\.[( ".includes(pattern[i]) &&
      !["+", "*", "?", "{"].includes(pattern[i])
    ) {
      i += 1;
    }

    if (i > litStart) {
      const lit = pattern.slice(litStart, i);
      const q = parseQuantifier(pattern, i);
      if (q && lit.length === 1) {
        tokens.push({
          token: lit + q.raw,
          name: `Literal '${lit}' (${q.name})`,
          desc: `${q.prefix} occurrences of literal '${lit}'.`
        });
        i += q.raw.length;
      } else {
        tokens.push({
          token: lit,
          name: "Literal Text",
          desc: `Matches literal text "${lit}".`
        });
      }
      continue;
    }

    // Lone symbol or whitespace
    tokens.push({
      token: pattern[i],
      name: `Literal '${pattern[i]}'`,
      desc: `Matches literal character '${pattern[i]}'.`
    });
    i += 1;
  }

  return {
    tokens,
    isComplex,
    message: isComplex
      ? "Complex or nested expression detected. Below is an educational best-effort breakdown."
      : "Showing token-by-token plain-English breakdown."
  };
}

if (typeof document !== "undefined") {
  document.addEventListener("DOMContentLoaded", () => {
    // Top-level app status elements
    const statusBadge = document.getElementById("app-status");
    const statusLabel = statusBadge?.querySelector(".status-label");
    const verifyValue = document.getElementById("js-verify-value");
    const moduleFeedback = document.getElementById("module-feedback");
    const toolCards = document.querySelectorAll(".tool-card");
    const navLinks = document.querySelectorAll(".nav-link");

    // Live Regex Tester elements
    const patternInput = document.getElementById("regex-pattern");
    const flagCheckboxes = document.querySelectorAll(".flag-checkbox");
    const flagsPreview = document.getElementById("flags-preview");
    const testStringInput = document.getElementById("test-string");
    const highlightOutput = document.getElementById("match-highlight-output");
    const matchCountPill = document.getElementById("match-count-pill");
    const inputLengthMeta = document.getElementById("input-length-meta");
    const patternValidityPill = document.getElementById("pattern-validity-pill");
    const errorBanner = document.getElementById("regex-error");
    const matchDetailsList = document.getElementById("match-details-list");
    const sampleSelect = document.getElementById("sample-select");
    const loadSampleBtn = document.getElementById("btn-load-sample");
    const clearTesterBtn = document.getElementById("btn-clear-tester");

    // Pattern Library elements
    const librarySearchInput = document.getElementById("library-search");
    const btnClearSearch = document.getElementById("btn-clear-search");
    const categoryChips = document.querySelectorAll("#category-filters .category-chip");
    const patternCardsGrid = document.getElementById("pattern-cards-grid");
    const libraryCountPill = document.getElementById("library-count-pill");
    const toastContainer = document.getElementById("toast-container");

    // Code Generator elements
    const generatorPatternInput = document.getElementById("generator-pattern");
    const generatorFlagsInput = document.getElementById("generator-flags");
    const generatorLangSelect = document.getElementById("generator-lang");
    const generatorSampleTextInput = document.getElementById("generator-sample-text");
    const generatorErrorBanner = document.getElementById("generator-error");
    const generatorCodeOutput = document.getElementById("generator-code-output");
    const generatorCodeMeta = document.getElementById("generator-code-meta");
    const langTabs = document.querySelectorAll(".lang-tab");
    const btnGenerateCode = document.getElementById("btn-generate-code");
    const btnCopyCode = document.getElementById("btn-copy-code");
    const btnCopyCodeInline = document.getElementById("btn-copy-code-inline");
    const btnClearGenerator = document.getElementById("btn-clear-generator");

    // Cheat Sheet elements (Day 5)
    const cheatsheetSearchInput = document.getElementById("cheatsheet-search");
    const btnClearCheatsheetSearch = document.getElementById("btn-clear-cheatsheet-search");
    const cheatCategoryChips = document.querySelectorAll("#cheatsheet-category-filters .cheat-category-chip");
    const cheatsheetCardsGrid = document.getElementById("cheatsheet-cards-grid");
    const cheatsheetCountPill = document.getElementById("cheatsheet-count-pill");
    const mistakeTestButtons = document.querySelectorAll(".js-test-mistake");

    // Advanced Regex Playground elements (Day 6)
    const playgroundPatternInput = document.getElementById("playground-pattern");
    const playgroundFlagCheckboxes = document.querySelectorAll(".playground-flag-checkbox");
    const playgroundFlagsPreview = document.getElementById("playground-flags-preview");
    const playgroundSampleTextInput = document.getElementById("playground-sample-text");
    const playgroundHighlightOutput = document.getElementById("playground-highlight-output");
    const playgroundErrorBanner = document.getElementById("playground-error-banner");
    const playgroundStatsPill = document.getElementById("playground-stats-pill");
    const playgroundTextMeta = document.getElementById("playground-text-meta");
    const playgroundReplacementPattern = document.getElementById("playground-replacement-pattern");
    const playgroundReplacementOutput = document.getElementById("playground-replacement-output");
    const playgroundReplacementCount = document.getElementById("playground-replacement-count");
    const playgroundReplacementNote = document.getElementById("playground-replacement-note");
    const btnTokenInserts = document.querySelectorAll(".btn-token-insert");
    const btnCopyReplacement = document.getElementById("btn-copy-replacement");
    const statTotalMatches = document.getElementById("stat-total-matches");
    const statUniqueMatches = document.getElementById("stat-unique-matches");
    const statPositions = document.getElementById("stat-positions");
    const statLengths = document.getElementById("stat-lengths");
    const statExecTime = document.getElementById("stat-exec-time");
    const statStatusBadge = document.getElementById("stat-status-badge");
    const playgroundGroupCount = document.getElementById("playground-group-count");
    const playgroundGroupsInspector = document.getElementById("playground-groups-inspector");
    const playgroundExplanationContent = document.getElementById("playground-explanation-content");
    const playgroundExplanationMode = document.getElementById("playground-explanation-mode");
    const playgroundExampleSelect = document.getElementById("playground-example-select");
    const btnLoadPlaygroundExample = document.getElementById("btn-load-playground-example");
    const btnCopyPlaygroundPattern = document.getElementById("btn-copy-playground-pattern");
    const btnCopyPlaygroundResults = document.getElementById("btn-copy-playground-results");
    const btnResetPlayground = document.getElementById("btn-reset-playground");
    const btnClearPlayground = document.getElementById("btn-clear-playground");

    let activeCategory = "All";
    let searchQuery = "";
    let currentGeneratorLang = "javascript";
    let activeCheatCategory = "All";
    let cheatSearchQuery = "";

    // 1. Update status indicators to confirm Vanilla JS loaded cleanly
    if (statusBadge && statusLabel) {
      statusBadge.classList.add("is-ready");
      statusLabel.textContent = "App Loaded · Ready";
    }

    if (verifyValue) {
      verifyValue.textContent = "JS Verified (Day 6)";
    }

    // 2. Navigation link active state
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.forEach((item) => item.classList.remove("active"));
        link.classList.add("active");
      });
    });

    // 3. Toolkit module cards interaction
    toolCards.forEach((card) => {
      const activateCard = () => {
        const targetHref = card.dataset.href;
        if (targetHref) {
          const targetElement = document.querySelector(targetHref);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
            navLinks.forEach((nav) => {
              if (nav.getAttribute("href") === targetHref) {
                navLinks.forEach((item) => item.classList.remove("active"));
                nav.classList.add("active");
              }
            });
            return;
          }
        }

        const toolName = card.dataset.tool || "Module";
        toolCards.forEach((item) => item.classList.remove("is-selected"));
        card.classList.add("is-selected");

        if (moduleFeedback) {
          moduleFeedback.textContent = `${toolName} — scheduled for upcoming build`;
        }
      };

      card.addEventListener("click", activateCard);
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activateCard();
        }
      });
    });

    // 4. Live Regex Tester evaluation
    function getActiveFlags() {
      return Array.from(flagCheckboxes)
        .filter((checkbox) => checkbox.checked)
        .map((checkbox) => checkbox.value)
        .join("");
    }

    function evaluateRegex() {
      if (!patternInput || !testStringInput || !highlightOutput || !matchDetailsList) {
        return;
      }

      const pattern = patternInput.value;
      const text = testStringInput.value;
      const flags = getActiveFlags();

      if (flagsPreview) {
        flagsPreview.textContent = flags || "—";
      }

      if (inputLengthMeta) {
        inputLengthMeta.textContent = `${text.length} ${text.length === 1 ? "char" : "chars"}`;
      }

      // Empty pattern state
      if (!pattern) {
        if (errorBanner) {
          errorBanner.hidden = true;
          errorBanner.textContent = "";
        }
        if (patternValidityPill) {
          patternValidityPill.textContent = "Waiting for pattern";
        }
        if (matchCountPill) {
          matchCountPill.textContent = "0 matches";
        }
        highlightOutput.innerHTML = buildHighlightedHtml(text, []);
        matchDetailsList.innerHTML =
          '<p class="empty-state">Enter a pattern and test string to inspect matches.</p>';
        return;
      }

      let compiledRegex;
      try {
        compiledRegex = new RegExp(pattern, flags);
        if (errorBanner) {
          errorBanner.hidden = true;
          errorBanner.textContent = "";
        }
        if (patternValidityPill) {
          patternValidityPill.textContent = "Valid RegExp";
        }
      } catch (error) {
        if (errorBanner) {
          errorBanner.hidden = false;
          errorBanner.textContent = `Invalid pattern: ${error.message}`;
        }
        if (patternValidityPill) {
          patternValidityPill.textContent = "Syntax Error";
        }
        if (matchCountPill) {
          matchCountPill.textContent = "0 matches";
        }
        highlightOutput.innerHTML = buildHighlightedHtml(text, []);
        matchDetailsList.innerHTML =
          '<p class="empty-state">Fix the regex syntax error above to inspect matches.</p>';
        return;
      }

      const { matches, truncated } = collectMatches(compiledRegex, text);

      if (matchCountPill) {
        const suffix = matches.length === 1 ? "match" : "matches";
        matchCountPill.textContent = truncated
          ? `${matches.length}+ ${suffix}`
          : `${matches.length} ${suffix}`;
      }

      highlightOutput.innerHTML = buildHighlightedHtml(text, matches);
      renderMatchDetails(matchDetailsList, matches, truncated);
    }

    function applySelectedSample() {
      if (!patternInput || !testStringInput) {
        return;
      }
      const key = sampleSelect?.value || "digits";
      const sample = SAMPLE_PATTERNS[key] || SAMPLE_PATTERNS.digits;

      patternInput.value = sample.pattern;
      testStringInput.value = sample.text;
      flagCheckboxes.forEach((checkbox) => {
        checkbox.checked = sample.flags.includes(checkbox.value);
      });
      evaluateRegex();
    }

    patternInput?.addEventListener("input", evaluateRegex);
    testStringInput?.addEventListener("input", evaluateRegex);
    flagCheckboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", evaluateRegex);
    });

    loadSampleBtn?.addEventListener("click", applySelectedSample);
    sampleSelect?.addEventListener("change", applySelectedSample);

    clearTesterBtn?.addEventListener("click", () => {
      if (!patternInput || !testStringInput) {
        return;
      }
      patternInput.value = "";
      testStringInput.value = "";
      flagCheckboxes.forEach((checkbox) => {
        checkbox.checked = checkbox.value === "g";
      });
      evaluateRegex();
      patternInput.focus();
    });

    // 5. Toast notification helper
    function showToast(message, icon = "✓") {
      if (!toastContainer) {
        return;
      }

      const toast = document.createElement("div");
      toast.className = "toast";
      toast.setAttribute("role", "status");
      toast.innerHTML = `
        <span class="toast-icon" aria-hidden="true">${escapeHtml(icon)}</span>
        <span class="toast-message">${escapeHtml(message)}</span>
      `;

      toastContainer.appendChild(toast);

      window.setTimeout(() => {
        toast.classList.add("is-hiding");
        toast.addEventListener("animationend", () => toast.remove());
        window.setTimeout(() => toast.remove(), 250);
      }, 2600);
    }

    // 6. Safe clipboard copy helper with fallback
    async function copyToClipboard(text, successCallback) {
      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          if (successCallback) successCallback();
          return true;
        } catch {
          // Fallback to execCommand below
        }
      }

      try {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.left = "-9999px";
        textarea.style.top = "0";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const successful = document.execCommand("copy");
        document.body.removeChild(textarea);
        if (successful && successCallback) {
          successCallback();
          return true;
        }
      } catch {
        // Copy failed
      }
      return false;
    }

    // 7. Day 3: Regex Pattern Library rendering, search & filtering
    function getFilteredPatterns() {
      const q = searchQuery.trim().toLowerCase();

      return PATTERN_LIBRARY.filter((item) => {
        const matchesCategory =
          activeCategory === "All" || item.category === activeCategory;

        const matchesQuery =
          !q ||
          item.name.toLowerCase().includes(q) ||
          item.explanation.toLowerCase().includes(q) ||
          item.regex.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.exampleInput.toLowerCase().includes(q) ||
          item.expectedResult.toLowerCase().includes(q);

        return matchesCategory && matchesQuery;
      });
    }

    function renderPatternCards() {
      if (!patternCardsGrid) {
        return;
      }

      const filtered = getFilteredPatterns();

      // Update count pill
      if (libraryCountPill) {
        if (filtered.length === PATTERN_LIBRARY.length) {
          libraryCountPill.textContent = `Showing all ${filtered.length} patterns`;
        } else if (filtered.length === 0) {
          libraryCountPill.textContent = "0 patterns found";
        } else {
          libraryCountPill.textContent = `Showing ${filtered.length} of ${PATTERN_LIBRARY.length} patterns`;
        }
      }

      // Show empty state if no patterns match
      if (filtered.length === 0) {
        patternCardsGrid.innerHTML = `
          <div class="pattern-empty-state">
            <span class="empty-icon" aria-hidden="true">🔍</span>
            <h3 class="empty-title">No patterns found</h3>
            <p class="empty-desc">
              No regular expressions match your current search "${escapeHtml(searchQuery)}" or selected category "${escapeHtml(activeCategory)}".
            </p>
            <button type="button" class="btn btn-accent" id="btn-reset-filters">Reset Filters</button>
          </div>
        `;

        document.getElementById("btn-reset-filters")?.addEventListener("click", () => {
          activeCategory = "All";
          searchQuery = "";
          if (librarySearchInput) librarySearchInput.value = "";
          if (btnClearSearch) btnClearSearch.hidden = true;
          categoryChips.forEach((chip) => {
            chip.classList.toggle("is-active", chip.dataset.category === "All");
          });
          renderPatternCards();
          librarySearchInput?.focus();
        });
        return;
      }

      // Render cards with 3 actions: Copy, Code, Test
      patternCardsGrid.innerHTML = filtered
        .map((item) => {
          const flagsDisplay = item.flags.length > 0 ? item.flags.join("") : "none";

          return `
            <article class="pattern-card glass-card" data-id="${escapeHtml(item.id)}">
              <div class="pattern-card-header">
                <h3 class="pattern-card-title">${escapeHtml(item.name)}</h3>
                <div class="pattern-card-badges">
                  <span class="category-badge">${escapeHtml(item.category)}</span>
                  <span class="pattern-flags-tag">/${escapeHtml(flagsDisplay)}</span>
                </div>
              </div>

              <p class="pattern-explanation">${escapeHtml(item.explanation)}</p>

              <div class="pattern-regex-box" title="${escapeHtml(item.regex)}">
                <code>${escapeHtml(item.regex)}</code>
              </div>

              <div class="pattern-example-box">
                <span class="meta-box-label">Example Input</span>
                <span class="meta-box-val">${escapeHtml(item.exampleInput)}</span>
              </div>

              <div class="pattern-expected-box">
                <span class="meta-box-label">Expected Result</span>
                <span class="meta-box-val highlight">${escapeHtml(item.expectedResult)}</span>
              </div>

              <div class="pattern-card-actions">
                <button
                  type="button"
                  class="btn btn-ghost btn-copy-pattern"
                  data-id="${escapeHtml(item.id)}"
                  title="Copy regex pattern to clipboard"
                >
                  📋 Copy
                </button>
                <button
                  type="button"
                  class="btn btn-ghost btn-codegen-pattern"
                  data-id="${escapeHtml(item.id)}"
                  title="Generate programming language code for this pattern"
                >
                  💻 Code
                </button>
                <button
                  type="button"
                  class="btn btn-accent btn-test-pattern"
                  data-id="${escapeHtml(item.id)}"
                  title="Load pattern into Live Regex Tester"
                >
                  ⚡ Test
                </button>
              </div>
            </article>
          `;
        })
        .join("");
    }

    // Connect Day 3 & 4 Pattern Card Actions (Copy, Code & Test)
    patternCardsGrid?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      // Action 1: Copy Pattern
      const copyBtn = target.closest(".btn-copy-pattern");
      if (copyBtn) {
        const patternId = copyBtn.getAttribute("data-id");
        const patternItem = PATTERN_LIBRARY.find((p) => p.id === patternId);
        if (!patternItem) return;

        copyToClipboard(patternItem.regex, () => {
          const originalText = copyBtn.innerHTML;
          copyBtn.classList.add("is-copied");
          copyBtn.textContent = "✓ Copied!";

          window.setTimeout(() => {
            copyBtn.classList.remove("is-copied");
            copyBtn.innerHTML = originalText;
          }, 1800);

          showToast(`Copied "${patternItem.name}" pattern to clipboard!`, "📋");
        });
        return;
      }

      // Action 2: Code Generator integration
      const codegenBtn = target.closest(".btn-codegen-pattern");
      if (codegenBtn) {
        const patternId = codegenBtn.getAttribute("data-id");
        const patternItem = PATTERN_LIBRARY.find((p) => p.id === patternId);
        if (!patternItem || !generatorPatternInput) return;

        generatorPatternInput.value = patternItem.regex;
        if (generatorFlagsInput) generatorFlagsInput.value = patternItem.flags.join("");
        if (generatorSampleTextInput) generatorSampleTextInput.value = patternItem.exampleInput;

        generateCode();

        const generatorElement = document.getElementById("generator");
        if (generatorElement) {
          generatorElement.scrollIntoView({ behavior: "smooth" });
        }

        navLinks.forEach((nav) => {
          if (nav.getAttribute("href") === "#generator") {
            navLinks.forEach((item) => item.classList.remove("active"));
            nav.classList.add("active");
          }
        });

        showToast(`Loaded "${patternItem.name}" into Code Generator!`, "💻");
        generatorPatternInput.focus();
        return;
      }

      // Action 3: Test Pattern in Live Tester
      const testBtn = target.closest(".btn-test-pattern");
      if (testBtn) {
        const patternId = testBtn.getAttribute("data-id");
        const patternItem = PATTERN_LIBRARY.find((p) => p.id === patternId);
        if (!patternItem || !patternInput || !testStringInput) return;

        patternInput.value = patternItem.regex;
        testStringInput.value = patternItem.exampleInput;

        flagCheckboxes.forEach((cb) => {
          cb.checked = patternItem.flags.includes(cb.value);
        });

        evaluateRegex();

        const testerElement = document.getElementById("tester");
        if (testerElement) {
          testerElement.scrollIntoView({ behavior: "smooth" });
        }

        navLinks.forEach((nav) => {
          if (nav.getAttribute("href") === "#tester") {
            navLinks.forEach((item) => item.classList.remove("active"));
            nav.classList.add("active");
          }
        });

        showToast(`Loaded "${patternItem.name}" into Live Regex Tester!`, "⚡");
        patternInput.focus();
      }
    });

    // Category filter buttons
    categoryChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        categoryChips.forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        activeCategory = chip.dataset.category || "All";
        renderPatternCards();
      });
    });

    // Search input live filtering
    librarySearchInput?.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      if (btnClearSearch) {
        btnClearSearch.hidden = searchQuery.length === 0;
      }
      renderPatternCards();
    });

    // Clear search button
    btnClearSearch?.addEventListener("click", () => {
      searchQuery = "";
      if (librarySearchInput) {
        librarySearchInput.value = "";
        librarySearchInput.focus();
      }
      btnClearSearch.hidden = true;
      renderPatternCards();
    });

    // 8. Day 4: Regex Code Generator logic & event handlers
    function formatLangName(lang) {
      switch (lang) {
        case "javascript": return "JavaScript";
        case "python": return "Python";
        case "php": return "PHP";
        case "java": return "Java";
        default: return lang;
      }
    }

    function validateRegexPattern(pattern, flags) {
      if (!pattern) {
        return { valid: false, error: "Please enter a regular expression pattern." };
      }
      try {
        new RegExp(pattern, flags);
        return { valid: true, error: null };
      } catch (err) {
        return { valid: false, error: err.message };
      }
    }

    function generateCode() {
      if (!generatorPatternInput || !generatorCodeOutput) return;

      const pattern = generatorPatternInput.value.trim();
      const flags = (generatorFlagsInput?.value || "").trim();
      const sampleText = generatorSampleTextInput?.value || "";
      const lang = currentGeneratorLang || "javascript";

      if (!pattern) {
        if (generatorErrorBanner) {
          generatorErrorBanner.hidden = false;
          generatorErrorBanner.textContent = "Please enter a regular expression pattern above.";
        }
        generatorCodeOutput.textContent = "// Enter a regular expression pattern above to generate code.";
        if (generatorCodeMeta) {
          generatorCodeMeta.textContent = `${formatLangName(lang)} · Waiting for pattern`;
        }
        return;
      }

      // Validate pattern syntax
      const validation = validateRegexPattern(pattern, flags);
      if (!validation.valid) {
        if (generatorErrorBanner) {
          generatorErrorBanner.hidden = false;
          generatorErrorBanner.textContent = `Regex syntax error: ${validation.error}`;
        }
      } else {
        if (generatorErrorBanner) {
          generatorErrorBanner.hidden = true;
          generatorErrorBanner.textContent = "";
        }
      }

      let generated = "";
      switch (lang) {
        case "javascript":
          generated = generateJavaScriptCode(pattern, flags, sampleText);
          break;
        case "python":
          generated = generatePythonCode(pattern, flags, sampleText);
          break;
        case "php":
          generated = generatePhpCode(pattern, flags, sampleText);
          break;
        case "java":
          generated = generateJavaCode(pattern, flags, sampleText);
          break;
        default:
          generated = generateJavaScriptCode(pattern, flags, sampleText);
      }

      generatorCodeOutput.textContent = generated;

      if (generatorCodeMeta) {
        const lineCount = generated.split("\n").length;
        const statusText = validation.valid ? "Ready" : "Warning (Syntax Error)";
        generatorCodeMeta.textContent = `${formatLangName(lang)} · ${lineCount} lines · ${statusText}`;
      }
    }

    function setGeneratorLanguage(lang) {
      currentGeneratorLang = lang;
      if (generatorLangSelect) {
        generatorLangSelect.value = lang;
      }
      langTabs.forEach((tab) => {
        const isActive = tab.getAttribute("data-lang") === lang;
        tab.classList.toggle("is-active", isActive);
        tab.setAttribute("aria-selected", isActive ? "true" : "false");
      });
      generateCode();
    }

    // Generator UI listeners
    generatorLangSelect?.addEventListener("change", (e) => {
      setGeneratorLanguage(e.target.value);
    });

    langTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const lang = tab.getAttribute("data-lang");
        if (lang) {
          setGeneratorLanguage(lang);
        }
      });
    });

    generatorPatternInput?.addEventListener("input", generateCode);
    generatorFlagsInput?.addEventListener("input", generateCode);
    generatorSampleTextInput?.addEventListener("input", generateCode);

    btnGenerateCode?.addEventListener("click", () => {
      generateCode();
      showToast(`Generated ${formatLangName(currentGeneratorLang)} code!`, "⚡");
    });

    function handleCopyGeneratedCode(buttonEl) {
      if (!generatorCodeOutput) return;
      const codeText = generatorCodeOutput.textContent;
      if (!codeText) return;

      copyToClipboard(codeText, () => {
        const originalText = buttonEl ? buttonEl.innerHTML : "";
        if (buttonEl) {
          buttonEl.textContent = "✓ Copied!";
          window.setTimeout(() => {
            buttonEl.innerHTML = originalText;
          }, 1800);
        }
        showToast(`Copied ${formatLangName(currentGeneratorLang)} code to clipboard!`, "📋");
      });
    }

    btnCopyCode?.addEventListener("click", () => handleCopyGeneratedCode(btnCopyCode));
    btnCopyCodeInline?.addEventListener("click", () => handleCopyGeneratedCode(btnCopyCodeInline));

    btnClearGenerator?.addEventListener("click", () => {
      if (generatorPatternInput) generatorPatternInput.value = "";
      if (generatorFlagsInput) generatorFlagsInput.value = "";
      if (generatorSampleTextInput) generatorSampleTextInput.value = "";
      generateCode();
      generatorPatternInput?.focus();
      showToast("Cleared code generator inputs.", "🧹");
    });

    // 9. Day 5: Interactive Regex Cheat Sheet rendering, search & filtering
    function getFilteredCheatSheetItems() {
      const q = cheatSearchQuery.trim().toLowerCase();

      return CHEATSHEET_ITEMS.filter((item) => {
        const matchesCategory =
          activeCheatCategory === "All" || item.category === activeCheatCategory;

        const matchesQuery =
          !q ||
          item.syntax.toLowerCase().includes(q) ||
          item.name.toLowerCase().includes(q) ||
          item.explanation.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q) ||
          item.exampleInput.toLowerCase().includes(q) ||
          item.expectedOutput.toLowerCase().includes(q);

        return matchesCategory && matchesQuery;
      });
    }

    function renderCheatSheetCards() {
      if (!cheatsheetCardsGrid) {
        return;
      }

      const filtered = getFilteredCheatSheetItems();

      // Update count pill
      if (cheatsheetCountPill) {
        if (filtered.length === CHEATSHEET_ITEMS.length) {
          cheatsheetCountPill.textContent = `Showing all ${filtered.length} reference items`;
        } else if (filtered.length === 0) {
          cheatsheetCountPill.textContent = "0 reference items found";
        } else {
          cheatsheetCountPill.textContent = `Showing ${filtered.length} of ${CHEATSHEET_ITEMS.length} reference items`;
        }
      }

      // Show empty state if no cheat items match
      if (filtered.length === 0) {
        cheatsheetCardsGrid.innerHTML = `
          <div class="pattern-empty-state" style="grid-column: 1 / -1;">
            <span class="empty-icon" aria-hidden="true">🔍</span>
            <h3 class="empty-title">No reference items found</h3>
            <p class="empty-desc">
              No regex reference items match your current search "${escapeHtml(cheatSearchQuery)}" or selected category "${escapeHtml(activeCheatCategory)}".
            </p>
            <button type="button" class="btn btn-accent" id="btn-reset-cheat-filters">Reset Filters</button>
          </div>
        `;

        document.getElementById("btn-reset-cheat-filters")?.addEventListener("click", () => {
          activeCheatCategory = "All";
          cheatSearchQuery = "";
          if (cheatsheetSearchInput) cheatsheetSearchInput.value = "";
          if (btnClearCheatsheetSearch) btnClearCheatsheetSearch.hidden = true;
          cheatCategoryChips.forEach((chip) => {
            chip.classList.toggle("is-active", chip.dataset.category === "All");
          });
          renderCheatSheetCards();
          cheatsheetSearchInput?.focus();
        });
        return;
      }

      // Render cheat cards
      cheatsheetCardsGrid.innerHTML = filtered
        .map((item) => {
          return `
            <article class="cheat-card glass-card" data-id="${escapeHtml(item.id)}">
              <div class="cheat-card-header">
                <div class="cheat-card-title-wrap">
                  <code class="cheat-syntax">${escapeHtml(item.syntax)}</code>
                  <h3 class="cheat-name">${escapeHtml(item.name)}</h3>
                </div>
                <span class="category-badge">${escapeHtml(item.category)}</span>
              </div>

              <p class="cheat-desc">${escapeHtml(item.explanation)}</p>

              <div class="cheat-example-box">
                <span class="meta-box-label">Example Input</span>
                <span class="meta-box-val">${escapeHtml(item.exampleInput)}</span>
              </div>

              <div class="cheat-expected-box">
                <span class="meta-box-label">Expected Match</span>
                <span class="meta-box-val highlight">${escapeHtml(item.expectedOutput)}</span>
              </div>

              <div class="cheat-card-actions">
                <button
                  type="button"
                  class="btn btn-ghost btn-copy-cheat"
                  data-id="${escapeHtml(item.id)}"
                  title="Copy syntax or pattern to clipboard"
                >
                  📋 Copy
                </button>
                <button
                  type="button"
                  class="btn btn-ghost btn-codegen-cheat"
                  data-id="${escapeHtml(item.id)}"
                  title="Generate code for this pattern"
                >
                  💻 Code
                </button>
                <button
                  type="button"
                  class="btn btn-accent btn-test-cheat"
                  data-id="${escapeHtml(item.id)}"
                  title="Try pattern in Live Regex Tester"
                >
                  ⚡ Try in Tester
                </button>
              </div>
            </article>
          `;
        })
        .join("");
    }

    // Connect Cheat Card Actions (Copy, Code & Test)
    cheatsheetCardsGrid?.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) {
        return;
      }

      // Action 1: Copy Syntax / Pattern
      const copyBtn = target.closest(".btn-copy-cheat");
      if (copyBtn) {
        const cheatId = copyBtn.getAttribute("data-id");
        const cheatItem = CHEATSHEET_ITEMS.find((c) => c.id === cheatId);
        if (!cheatItem) return;

        copyToClipboard(cheatItem.syntax, () => {
          const originalText = copyBtn.innerHTML;
          copyBtn.classList.add("is-copied");
          copyBtn.textContent = "✓ Copied!";

          window.setTimeout(() => {
            copyBtn.classList.remove("is-copied");
            copyBtn.innerHTML = originalText;
          }, 1800);

          showToast(`Copied "${cheatItem.syntax}" to clipboard!`, "📋");
        });
        return;
      }

      // Action 2: Code Generator integration
      const codegenBtn = target.closest(".btn-codegen-cheat");
      if (codegenBtn) {
        const cheatId = codegenBtn.getAttribute("data-id");
        const cheatItem = CHEATSHEET_ITEMS.find((c) => c.id === cheatId);
        if (!cheatItem || !generatorPatternInput) return;

        generatorPatternInput.value = cheatItem.pattern || cheatItem.syntax;
        if (generatorFlagsInput) generatorFlagsInput.value = (cheatItem.flags || []).join("");
        if (generatorSampleTextInput) generatorSampleTextInput.value = cheatItem.exampleInput;

        generateCode();

        const generatorElement = document.getElementById("generator");
        if (generatorElement) {
          generatorElement.scrollIntoView({ behavior: "smooth" });
        }

        navLinks.forEach((nav) => {
          if (nav.getAttribute("href") === "#generator") {
            navLinks.forEach((item) => item.classList.remove("active"));
            nav.classList.add("active");
          }
        });

        showToast(`Loaded "${cheatItem.name}" into Code Generator!`, "💻");
        generatorPatternInput.focus();
        return;
      }

      // Action 3: Try in Live Regex Tester
      const testBtn = target.closest(".btn-test-cheat");
      if (testBtn) {
        const cheatId = testBtn.getAttribute("data-id");
        const cheatItem = CHEATSHEET_ITEMS.find((c) => c.id === cheatId);
        if (!cheatItem || !patternInput || !testStringInput) return;

        patternInput.value = cheatItem.pattern || cheatItem.syntax;
        testStringInput.value = cheatItem.exampleInput;

        flagCheckboxes.forEach((cb) => {
          cb.checked = (cheatItem.flags || []).includes(cb.value);
        });

        evaluateRegex();

        const testerElement = document.getElementById("tester");
        if (testerElement) {
          testerElement.scrollIntoView({ behavior: "smooth" });
        }

        navLinks.forEach((nav) => {
          if (nav.getAttribute("href") === "#tester") {
            navLinks.forEach((item) => item.classList.remove("active"));
            nav.classList.add("active");
          }
        });

        showToast(`Loaded "${cheatItem.name}" into Live Regex Tester!`, "⚡");
        patternInput.focus();
      }
    });

    // Cheat Sheet Category filter buttons
    cheatCategoryChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        cheatCategoryChips.forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        activeCheatCategory = chip.dataset.category || "All";
        renderCheatSheetCards();
      });
    });

    // Cheat Sheet Search input live filtering
    cheatsheetSearchInput?.addEventListener("input", (e) => {
      cheatSearchQuery = e.target.value;
      if (btnClearCheatsheetSearch) {
        btnClearCheatsheetSearch.hidden = cheatSearchQuery.length === 0;
      }
      renderCheatSheetCards();
    });

    // Cheat Sheet Clear search button
    btnClearCheatsheetSearch?.addEventListener("click", () => {
      cheatSearchQuery = "";
      if (cheatsheetSearchInput) {
        cheatsheetSearchInput.value = "";
        cheatsheetSearchInput.focus();
      }
      btnClearCheatsheetSearch.hidden = true;
      renderCheatSheetCards();
    });

    // 10. Common Mistakes "Try Correct in Tester" click handlers
    mistakeTestButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const pattern = btn.getAttribute("data-pattern") || "";
        const text = btn.getAttribute("data-text") || "";
        const flagsStr = btn.getAttribute("data-flags") || "";

        if (patternInput) patternInput.value = pattern;
        if (testStringInput) testStringInput.value = text;

        flagCheckboxes.forEach((cb) => {
          cb.checked = flagsStr.includes(cb.value);
        });

        evaluateRegex();

        const testerElement = document.getElementById("tester");
        if (testerElement) {
          testerElement.scrollIntoView({ behavior: "smooth" });
        }

        navLinks.forEach((nav) => {
          if (nav.getAttribute("href") === "#tester") {
            navLinks.forEach((item) => item.classList.remove("active"));
            nav.classList.add("active");
          }
        });

        showToast("Loaded common mistake test case into Tester!", "⚡");
        patternInput?.focus();
      });
    });

    // 11. Day 6: Advanced Regex Playground logic, inspector, replacement & explanation
    function getPlaygroundFlags() {
      const selected = [];
      playgroundFlagCheckboxes.forEach((cb) => {
        if (cb.checked) {
          selected.push(cb.value);
        }
      });
      return selected.join("");
    }

    function checkUnsupportedReplacementSyntax(replacement) {
      if (!replacement) return null;

      // Check for Python/PHP style \1, \2, \g<name>, \g<1>
      const slashBackref = replacement.match(/\\[0-9]|\\[gG]<[^>]+>/);
      if (slashBackref) {
        return `⚠️ Unsupported backreference "${slashBackref[0]}". In JavaScript .replace(), use $1, $2 (or $<name>) instead of \\1 or \\g<name>.`;
      }

      // Check for $0 which is common in Java/Bash but not standard JS ($& is standard in JS)
      if (/\$0(?!\d)/.test(replacement)) {
        return `⚠️ Notice: "$0" is not standard in JavaScript .replace(). Use "$&" to insert the entire matched substring.`;
      }

      return null;
    }

    function renderPlaygroundGroups(matches, container) {
      if (!container) return;
      if (!matches || matches.length === 0) {
        container.innerHTML = `
          <div class="empty-state" style="padding: 1.25rem; text-align: center;">
            <span class="empty-icon" aria-hidden="true">🔍</span>
            <p style="margin: 0.35rem 0 0; color: var(--text-muted); font-size: 0.88rem;">
              No matches found to inspect. Enter a matching pattern and text above.
            </p>
          </div>
        `;
        return;
      }

      container.innerHTML = matches.map((m, idx) => {
        let groupsHtml = "";

        // Numbered groups
        if (m.numberedGroups && m.numberedGroups.length > 0) {
          groupsHtml += m.numberedGroups.map((val, gIdx) => {
            const isMatched = val !== undefined && val !== null;
            return `
              <div class="inspector-group-row">
                <span class="group-label">Group $${gIdx + 1}:</span>
                <span class="group-val ${isMatched ? "" : "group-null"}">
                  ${isMatched ? escapeHtml(val) : '<span class="group-tag">Unmatched (null)</span>'}
                </span>
              </div>
            `;
          }).join("");
        }

        // Named groups
        if (m.namedGroups && Object.keys(m.namedGroups).length > 0) {
          groupsHtml += Object.entries(m.namedGroups).map(([gName, val]) => {
            const isMatched = val !== undefined && val !== null;
            return `
              <div class="inspector-group-row">
                <span class="group-label">&lt;${escapeHtml(gName)}&gt;:</span>
                <span class="group-val ${isMatched ? "" : "group-null"}">
                  ${isMatched ? escapeHtml(val) : '<span class="group-tag">Unmatched (null)</span>'}
                </span>
              </div>
            `;
          }).join("");
        }

        if (!groupsHtml) {
          groupsHtml = `
            <div class="inspector-group-row">
              <span class="group-label" style="color: var(--text-muted);">Capture Groups:</span>
              <span class="group-val group-null">None defined in pattern</span>
            </div>
          `;
        }

        const matchTextDisplay = m.text.length > 0 ? escapeHtml(m.text) : "(zero-length match)";

        return `
          <article class="inspector-match-card">
            <div class="inspector-match-head">
              <span class="inspector-match-title">Match #${idx + 1}</span>
              <span class="inspector-match-badge">[${m.start} – ${m.end}] · ${m.length} chars</span>
            </div>
            <div class="inspector-match-body">
              <code>${matchTextDisplay}</code>
            </div>
            <div class="inspector-groups-table">
              ${groupsHtml}
            </div>
          </article>
        `;
      }).join("");
    }

    function renderPlaygroundExplanation(pattern, container) {
      if (!container) return;
      const explanation = explainRegexPattern(pattern);

      if (playgroundExplanationMode) {
        playgroundExplanationMode.textContent = explanation.isComplex
          ? "Complex / Best Effort"
          : `${explanation.tokens.length} token${explanation.tokens.length === 1 ? "" : "s"}`;
      }

      if (explanation.tokens.length === 0) {
        container.innerHTML = `
          <div class="empty-state" style="padding: 1.25rem; text-align: center;">
            <span class="empty-icon" aria-hidden="true">💡</span>
            <p style="margin: 0.35rem 0 0; color: var(--text-muted); font-size: 0.88rem;">
              ${escapeHtml(explanation.message)}
            </p>
          </div>
        `;
        return;
      }

      const tokensHtml = explanation.tokens.map((tok) => {
        return `
          <div class="explanation-token-item">
            <div class="explanation-token-head">
              <code class="token-badge">${escapeHtml(tok.token)}</code>
              <span class="token-name">${escapeHtml(tok.name)}</span>
            </div>
            <p class="token-desc">${escapeHtml(tok.desc)}</p>
          </div>
        `;
      }).join("");

      const disclaimerHtml = `
        <div class="explanation-disclaimer">
          ℹ️ ${escapeHtml(explanation.message)}
        </div>
      `;

      container.innerHTML = tokensHtml + disclaimerHtml;
    }

    let lastPlaygroundMatches = [];

    function evaluatePlayground() {
      if (!playgroundPatternInput) return;

      const pattern = playgroundPatternInput.value;
      const flags = getPlaygroundFlags();
      const sampleText = playgroundSampleTextInput?.value || "";
      const replacementPattern = playgroundReplacementPattern?.value ?? "";

      // Update flags preview display
      if (playgroundFlagsPreview) {
        playgroundFlagsPreview.textContent = flags || "none";
      }

      // Update sample text length meta
      if (playgroundTextMeta) {
        playgroundTextMeta.textContent = `${sampleText.length} character${sampleText.length === 1 ? "" : "s"}`;
      }

      // Handle empty pattern
      if (!pattern) {
        if (playgroundErrorBanner) {
          playgroundErrorBanner.hidden = true;
          playgroundErrorBanner.textContent = "";
        }
        if (statStatusBadge) statStatusBadge.textContent = "Waiting for pattern";
        if (playgroundHighlightOutput) playgroundHighlightOutput.innerHTML = escapeHtml(sampleText);
        if (statTotalMatches) statTotalMatches.textContent = "0";
        if (statUniqueMatches) statUniqueMatches.textContent = "0";
        if (statPositions) statPositions.textContent = "None";
        if (statLengths) statLengths.textContent = "None";
        if (statExecTime) statExecTime.textContent = "0 ms";
        if (playgroundStatsPill) playgroundStatsPill.textContent = "0 matches · 0 ms";
        if (playgroundGroupCount) playgroundGroupCount.textContent = "0 groups";
        if (playgroundReplacementOutput) playgroundReplacementOutput.textContent = sampleText;
        if (playgroundReplacementCount) playgroundReplacementCount.textContent = "0 replacements";
        if (playgroundReplacementNote) playgroundReplacementNote.hidden = true;
        renderPlaygroundGroups([], playgroundGroupsInspector);
        renderPlaygroundExplanation("", playgroundExplanationContent);
        lastPlaygroundMatches = [];
        return;
      }

      // Validate RegExp compilation
      let regex = null;
      let compileError = null;
      try {
        regex = new RegExp(pattern, flags);
      } catch (err) {
        compileError = err.message;
      }

      if (compileError || !regex) {
        if (playgroundErrorBanner) {
          playgroundErrorBanner.hidden = false;
          playgroundErrorBanner.textContent = `Regex Error: ${compileError}`;
        }
        if (statStatusBadge) statStatusBadge.textContent = "Invalid Syntax";
        if (playgroundHighlightOutput) playgroundHighlightOutput.innerHTML = escapeHtml(sampleText);
        if (statTotalMatches) statTotalMatches.textContent = "0";
        if (statUniqueMatches) statUniqueMatches.textContent = "0";
        if (statPositions) statPositions.textContent = "Error";
        if (statLengths) statLengths.textContent = "Error";
        if (statExecTime) statExecTime.textContent = "--";
        if (playgroundStatsPill) playgroundStatsPill.textContent = "Syntax Error";
        if (playgroundGroupCount) playgroundGroupCount.textContent = "0 groups";
        if (playgroundReplacementOutput) playgroundReplacementOutput.textContent = sampleText;
        if (playgroundReplacementCount) playgroundReplacementCount.textContent = "0 replacements";
        renderPlaygroundGroups([], playgroundGroupsInspector);
        renderPlaygroundExplanation(pattern, playgroundExplanationContent);
        lastPlaygroundMatches = [];
        return;
      }

      // Hide error banner when valid
      if (playgroundErrorBanner) {
        playgroundErrorBanner.hidden = true;
        playgroundErrorBanner.textContent = "";
      }
      if (statStatusBadge) statStatusBadge.textContent = "Active";

      // Measure execution time with high precision
      const tStart = performance.now();
      const { matches, truncated } = collectMatches(regex, sampleText);
      const tEnd = performance.now();
      const execTime = tEnd - tStart;
      const execTimeDisplay = execTime < 0.1 ? "< 0.1 ms" : `${execTime.toFixed(2)} ms`;

      lastPlaygroundMatches = matches;

      // Update match highlighting
      if (playgroundHighlightOutput) {
        playgroundHighlightOutput.innerHTML = buildHighlightedHtml(sampleText, matches);
      }

      // Statistics calculations
      const totalMatches = matches.length;
      const uniqueMatches = new Set(matches.map((m) => m.text)).size;

      let positionsText = "None";
      if (matches.length > 0) {
        positionsText = `${matches[0].start} .. ${matches[matches.length - 1].end}`;
      }

      let lengthsText = "None";
      if (matches.length > 0) {
        const lengths = matches.map((m) => m.length);
        const minL = Math.min(...lengths);
        const maxL = Math.max(...lengths);
        const avgL = (lengths.reduce((a, b) => a + b, 0) / lengths.length).toFixed(1);
        lengthsText = `Min: ${minL}, Max: ${maxL}, Avg: ${avgL}`;
      }

      if (statTotalMatches) statTotalMatches.textContent = String(totalMatches) + (truncated ? "+" : "");
      if (statUniqueMatches) statUniqueMatches.textContent = String(uniqueMatches);
      if (statPositions) statPositions.textContent = positionsText;
      if (statLengths) statLengths.textContent = lengthsText;
      if (statExecTime) statExecTime.textContent = execTimeDisplay;

      if (playgroundStatsPill) {
        playgroundStatsPill.textContent = `${totalMatches} match${totalMatches === 1 ? "" : "es"} · ${execTimeDisplay}`;
      }

      // Capture Group count & Inspector rendering
      const totalGroupsDefined = matches.length > 0 ? (matches[0].numberedGroups?.length || 0) + (matches[0].namedGroups ? Object.keys(matches[0].namedGroups).length : 0) : 0;
      if (playgroundGroupCount) {
        playgroundGroupCount.textContent = `${totalGroupsDefined} group${totalGroupsDefined === 1 ? "" : "s"} / match`;
      }
      renderPlaygroundGroups(matches, playgroundGroupsInspector);

      // Plain-English Explanation breakdown
      renderPlaygroundExplanation(pattern, playgroundExplanationContent);

      // Replacement Playground logic & unsupported syntax detection
      const unsupportedWarning = checkUnsupportedReplacementSyntax(replacementPattern);
      if (playgroundReplacementNote) {
        if (unsupportedWarning) {
          playgroundReplacementNote.hidden = false;
          playgroundReplacementNote.textContent = unsupportedWarning;
        } else {
          playgroundReplacementNote.hidden = true;
          playgroundReplacementNote.textContent = "";
        }
      }

      let replacedText = "";
      let replacedCount = 0;
      try {
        const replaceRegex = new RegExp(pattern, flags);
        replacedText = sampleText.replace(replaceRegex, replacementPattern);
        if (replaceRegex.global) {
          replacedCount = matches.length;
        } else {
          replacedCount = matches.length > 0 ? 1 : 0;
        }
      } catch (err) {
        replacedText = `Replacement error: ${err.message}`;
      }

      if (playgroundReplacementOutput) {
        playgroundReplacementOutput.textContent = replacedText;
      }
      if (playgroundReplacementCount) {
        playgroundReplacementCount.textContent = `${replacedCount} replacement${replacedCount === 1 ? "" : "s"}`;
      }
    }

    // Playground input change listeners
    playgroundPatternInput?.addEventListener("input", evaluatePlayground);
    playgroundSampleTextInput?.addEventListener("input", evaluatePlayground);
    playgroundReplacementPattern?.addEventListener("input", evaluatePlayground);

    playgroundFlagCheckboxes.forEach((cb) => {
      cb.addEventListener("change", evaluatePlayground);
    });

    // Helper Token insertion buttons in replacement playground
    btnTokenInserts.forEach((btn) => {
      btn.addEventListener("click", () => {
        const token = btn.getAttribute("data-token");
        if (!token || !playgroundReplacementPattern) return;

        const input = playgroundReplacementPattern;
        const start = input.selectionStart || input.value.length;
        const end = input.selectionEnd || input.value.length;
        const currentVal = input.value;

        input.value = currentVal.substring(0, start) + token + currentVal.substring(end);
        input.focus();
        input.selectionStart = input.selectionEnd = start + token.length;

        evaluatePlayground();
      });
    });

    // Copy Replacement Result button
    btnCopyReplacement?.addEventListener("click", () => {
      if (!playgroundReplacementOutput) return;
      const textToCopy = playgroundReplacementOutput.textContent || "";
      copyToClipboard(textToCopy, () => {
        const originalText = btnCopyReplacement.innerHTML;
        btnCopyReplacement.textContent = "✓ Copied!";
        window.setTimeout(() => {
          btnCopyReplacement.innerHTML = originalText;
        }, 1800);
        showToast("Copied replacement result to clipboard!", "📋");
      });
    });

    // Load Preset Example into Playground
    function loadSelectedPlaygroundExample(key) {
      const example = PLAYGROUND_EXAMPLES[key];
      if (!example) return;

      if (playgroundPatternInput) playgroundPatternInput.value = example.pattern;
      if (playgroundSampleTextInput) playgroundSampleTextInput.value = example.sampleText;
      if (playgroundReplacementPattern) playgroundReplacementPattern.value = example.replacement || "[$&]";

      playgroundFlagCheckboxes.forEach((cb) => {
        cb.checked = (example.flags || []).includes(cb.value);
      });

      evaluatePlayground();
      showToast(`Loaded example "${example.name}"!`, "⚡");
      playgroundPatternInput?.focus();
    }

    playgroundExampleSelect?.addEventListener("change", (e) => {
      loadSelectedPlaygroundExample(e.target.value);
    });

    btnLoadPlaygroundExample?.addEventListener("click", () => {
      const selected = playgroundExampleSelect?.value;
      if (selected) {
        loadSelectedPlaygroundExample(selected);
      } else {
        showToast("Please choose an example pattern from the dropdown first.", "ℹ️");
      }
    });

    // Copy Pattern button
    btnCopyPlaygroundPattern?.addEventListener("click", () => {
      if (!playgroundPatternInput) return;
      const pattern = playgroundPatternInput.value;
      const flags = getPlaygroundFlags();
      const fullRegex = `/${pattern}/${flags}`;

      copyToClipboard(fullRegex, () => {
        const originalText = btnCopyPlaygroundPattern.innerHTML;
        btnCopyPlaygroundPattern.textContent = "✓ Copied!";
        window.setTimeout(() => {
          btnCopyPlaygroundPattern.innerHTML = originalText;
        }, 1800);
        showToast(`Copied ${fullRegex} to clipboard!`, "📋");
      });
    });

    // Copy Results button (copies structured match stats, groups & replacement summary)
    btnCopyPlaygroundResults?.addEventListener("click", () => {
      const pattern = playgroundPatternInput?.value || "";
      const flags = getPlaygroundFlags();
      const replacement = playgroundReplacementPattern?.value || "";
      const replacedText = playgroundReplacementOutput?.textContent || "";

      let summary = `Regex Lab – Advanced Playground Results\n`;
      summary += `Pattern: /${pattern}/${flags}\n`;
      summary += `Matches: ${lastPlaygroundMatches.length} total\n\n`;

      if (lastPlaygroundMatches.length > 0) {
        summary += `--- Matches Breakdown ---\n`;
        lastPlaygroundMatches.forEach((m, idx) => {
          summary += `#${idx + 1}: "${m.text}" [${m.start}–${m.end}] (${m.length} chars)\n`;
          if (m.numberedGroups?.length) {
            m.numberedGroups.forEach((gVal, gIdx) => {
              summary += `  Group $${gIdx + 1}: ${gVal !== undefined ? gVal : "(unmatched)"}\n`;
            });
          }
          if (m.namedGroups) {
            Object.entries(m.namedGroups).forEach(([gName, gVal]) => {
              summary += `  Group <${gName}>: ${gVal !== undefined ? gVal : "(unmatched)"}\n`;
            });
          }
        });
      }

      summary += `\n--- Replacement Result ---\n`;
      summary += `Replacement Pattern: ${replacement}\n`;
      summary += `Output:\n${replacedText}\n`;

      copyToClipboard(summary, () => {
        const originalText = btnCopyPlaygroundResults.innerHTML;
        btnCopyPlaygroundResults.textContent = "✓ Copied!";
        window.setTimeout(() => {
          btnCopyPlaygroundResults.innerHTML = originalText;
        }, 1800);
        showToast("Copied full playground results summary!", "📋");
      });
    });

    // Reset Playground button
    btnResetPlayground?.addEventListener("click", () => {
      loadSelectedPlaygroundExample("numbers");
      showToast("Reset playground to default state.", "🔄");
    });

    // Clear Playground button
    btnClearPlayground?.addEventListener("click", () => {
      if (playgroundPatternInput) playgroundPatternInput.value = "";
      if (playgroundSampleTextInput) playgroundSampleTextInput.value = "";
      if (playgroundReplacementPattern) playgroundReplacementPattern.value = "";
      evaluatePlayground();
      playgroundPatternInput?.focus();
      showToast("Cleared playground inputs.", "🧹");
    });

    // Initial render of Live Regex Tester, Pattern Library, Code Generator, Cheat Sheet and Playground
    evaluateRegex();
    renderPatternCards();
    generateCode();
    renderCheatSheetCards();
    evaluatePlayground();

    // Console verification message
    console.info(
      "%cRegex Lab – Developer Toolkit%c initialized successfully (Day 6 · Advanced Regex Playground).",
      "color: #a855f7; font-weight: bold;",
      "color: #93c5fd;"
    );
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    escapeHtml,
    collectMatches,
    buildHighlightedHtml,
    PATTERN_LIBRARY,
    CHEATSHEET_ITEMS,
    PLAYGROUND_EXAMPLES,
    explainRegexPattern,
    generateJavaScriptCode,
    generatePythonCode,
    generatePhpCode,
    generateJavaCode
  };
}
