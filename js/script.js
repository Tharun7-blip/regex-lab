"use strict";

/**
 * Regex Lab – Developer Toolkit
 * Day 3 Script: App verification, Live Regex Tester & Pattern Library
 */

const MAX_MATCHES = 500;

const SAMPLE_DATA = {
  pattern: "([a-zA-Z0-9._-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})",
  flags: ["g"],
  text: [
    "Contact support@regexlab.dev for toolkit feedback.",
    "Team leads: alice.dev@example.com, bob_99@studio.io",
    "Invalid examples: user@localhost, plain-text.com"
  ].join("\n")
};

const PATTERN_LIBRARY = [
  {
    id: "email",
    title: "Email Address",
    category: "Validation",
    flags: ["g"],
    pattern: "([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})",
    description: "Matches standard email addresses and captures username and domain.",
    sampleText: "Reach us at hello@regexlab.dev or ops.team@company.org (not invalid@domain)."
  },
  {
    id: "url",
    title: "HTTP / HTTPS URL",
    category: "Web & Network",
    flags: ["g", "i"],
    pattern: "https?:\\/\\/(?:www\\.)?[a-z0-9-]+(?:\\.[a-z0-9-]+)+(?::\\d+)?(?:\\/[^\\s]*)?",
    description: "Matches web URLs with optional www, port numbers, and path segments.",
    sampleText: "Docs: https://developer.mozilla.org/en-US/docs and http://localhost:8080/api?v=2"
  },
  {
    id: "ipv4",
    title: "IPv4 Address",
    category: "Web & Network",
    flags: ["g"],
    pattern: "\\b(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)\\b",
    description: "Validates dotted-quad IPv4 addresses with octet bounds (0–255).",
    sampleText: "Allowed: 192.168.1.1, 10.0.0.255, 127.0.0.1 | Invalid: 999.10.20.30"
  },
  {
    id: "iso-date",
    title: "ISO Date (YYYY-MM-DD)",
    category: "Dates & IDs",
    flags: ["g"],
    pattern: "\\b(\\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])\\b",
    description: "Matches ISO-8601 dates and captures year, month, and day groups.",
    sampleText: "Releases: 2026-01-15, 2026-11-12 | Bad dates: 2026-13-01, 2026-00-10"
  },
  {
    id: "uuid",
    title: "UUID v4",
    category: "Dates & IDs",
    flags: ["g", "i"],
    pattern: "\\b[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\\b",
    description: "Matches RFC 4122 version 4 universally unique identifiers.",
    sampleText: "Request ID: 550e8400-e29b-41d4-a716-446655440000\nBad: 550e8400-e29b-11d4-a716-446655440000"
  },
  {
    id: "hex-color",
    title: "Hex Color Code",
    category: "Developer",
    flags: ["g", "i"],
    pattern: "#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})\\b",
    description: "Matches 3-digit, 6-digit, and 8-digit CSS hexadecimal color values.",
    sampleText: "Theme colors: #8b5cf6, #3b82f6, #fff, #070913cc (skip #12345)"
  },
  {
    id: "semver",
    title: "Semantic Version (SemVer)",
    category: "Developer",
    flags: ["g"],
    pattern: "\\bv?(\\d+)\\.(\\d+)\\.(\\d+)(?:-([0-9A-Za-z.-]+))?\\b",
    description: "Captures major, minor, patch, and optional prerelease labels.",
    sampleText: "Upgraded from v1.4.2 to 2.0.0-beta.1 (ignoring 1.2)"
  },
  {
    id: "strong-password",
    title: "Strong Password",
    category: "Validation",
    flags: ["m"],
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[^A-Za-z0-9]).{8,}$",
    description: "Requires 8+ chars with lowercase, uppercase, digit, and symbol.",
    sampleText: "WeakPass1\nStr0ng!Pass#2026\nonlylowercase"
  }
];

/**
 * Escapes HTML special characters to safely render arbitrary text inside innerHTML.
 * @param {string} value
 * @returns {string}
 */
function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
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
 * Extracts normalized match metadata and capture groups from a RegExpExecArray.
 * @param {RegExpExecArray} match
 */
function formatMatchRecord(match) {
  const start = match.index;
  const end = start + match[0].length;
  const numberedGroups = match.slice(1);
  const namedGroups = match.groups ? { ...match.groups } : null;

  return {
    text: match[0],
    start,
    end,
    numberedGroups,
    namedGroups
  };
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
 * Renders the Match Breakdown & Capture Groups list.
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

document.addEventListener("DOMContentLoaded", () => {
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
  const loadSampleBtn = document.getElementById("btn-load-sample");
  const clearTesterBtn = document.getElementById("btn-clear-tester");

  // Pattern Library elements
  const librarySearchInput = document.getElementById("library-search");
  const libraryCategoryBtns = document.querySelectorAll(".category-pill");
  const libraryGrid = document.getElementById("pattern-library-grid");
  const libraryCountPill = document.getElementById("library-count-pill");
  let activeCategory = "All";

  // 1. Update status indicators to confirm Vanilla JS loaded cleanly
  if (statusBadge && statusLabel) {
    statusBadge.classList.add("is-ready");
    statusLabel.textContent = "App Loaded · Ready";
  }

  if (verifyValue) {
    verifyValue.textContent = "JS Verified (Day 3)";
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
        document.querySelector(targetHref)?.scrollIntoView({ behavior: "smooth" });
        return;
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

  patternInput?.addEventListener("input", evaluateRegex);
  testStringInput?.addEventListener("input", evaluateRegex);
  flagCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", evaluateRegex);
  });

  loadSampleBtn?.addEventListener("click", () => {
    if (!patternInput || !testStringInput) {
      return;
    }
    patternInput.value = SAMPLE_DATA.pattern;
    testStringInput.value = SAMPLE_DATA.text;
    flagCheckboxes.forEach((checkbox) => {
      checkbox.checked = SAMPLE_DATA.flags.includes(checkbox.value);
    });
    evaluateRegex();
  });

  clearTesterBtn?.addEventListener("click", () => {
    if (!patternInput || !testStringInput) {
      return;
    }
    patternInput.value = "";
    testStringInput.value = "";
    evaluateRegex();
    patternInput.focus();
  });

  // 5. Pattern Library filtering, copy & load-in-tester integration
  function loadPatternIntoTester(entry) {
    if (!patternInput || !testStringInput) {
      return;
    }

    patternInput.value = entry.pattern;
    testStringInput.value = entry.sampleText;
    flagCheckboxes.forEach((checkbox) => {
      checkbox.checked = entry.flags.includes(checkbox.value);
    });

    evaluateRegex();
    document.getElementById("tester")?.scrollIntoView({ behavior: "smooth" });
  }

  async function copyPatternToClipboard(pattern, buttonEl) {
    try {
      await navigator.clipboard.writeText(pattern);
      const originalText = buttonEl.textContent;
      buttonEl.textContent = "Copied!";
      window.setTimeout(() => {
        buttonEl.textContent = originalText;
      }, 1400);
    } catch {
      buttonEl.textContent = "Copy failed";
      window.setTimeout(() => {
        buttonEl.textContent = "Copy";
      }, 1400);
    }
  }

  function renderPatternLibrary() {
    if (!libraryGrid) {
      return;
    }

    const query = (librarySearchInput?.value || "").trim().toLowerCase();
    const filtered = PATTERN_LIBRARY.filter((entry) => {
      const matchesCategory = activeCategory === "All" || entry.category === activeCategory;
      const matchesQuery =
        !query ||
        entry.title.toLowerCase().includes(query) ||
        entry.description.toLowerCase().includes(query) ||
        entry.category.toLowerCase().includes(query) ||
        entry.pattern.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });

    if (libraryCountPill) {
      libraryCountPill.textContent = `${filtered.length} ${
        filtered.length === 1 ? "pattern" : "patterns"
      }`;
    }

    if (filtered.length === 0) {
      libraryGrid.innerHTML =
        '<p class="empty-state">No patterns match your search or selected category.</p>';
      return;
    }

    libraryGrid.innerHTML = filtered
      .map(
        (entry) => `
          <article class="pattern-card" data-pattern-id="${escapeHtml(entry.id)}">
            <div class="pattern-card-header">
              <span class="pattern-category">${escapeHtml(entry.category)}</span>
              <span class="pattern-flags-badge">/${escapeHtml(entry.flags.join("") || "—")}</span>
            </div>
            <h3 class="pattern-card-title">${escapeHtml(entry.title)}</h3>
            <p class="pattern-card-desc">${escapeHtml(entry.description)}</p>
            <div class="pattern-code-box" title="${escapeHtml(entry.pattern)}">
              <code>${escapeHtml(entry.pattern)}</code>
            </div>
            <div class="pattern-card-actions">
              <button type="button" class="btn btn-accent js-load-pattern">Load in Tester</button>
              <button type="button" class="btn js-copy-pattern">Copy</button>
            </div>
          </article>
        `
      )
      .join("");
  }

  libraryGrid?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const card = target.closest(".pattern-card");
    if (!card) {
      return;
    }

    const entry = PATTERN_LIBRARY.find((item) => item.id === card.getAttribute("data-pattern-id"));
    if (!entry) {
      return;
    }

    if (target.classList.contains("js-load-pattern")) {
      loadPatternIntoTester(entry);
    } else if (target.classList.contains("js-copy-pattern")) {
      copyPatternToClipboard(entry.pattern, target);
    }
  });

  librarySearchInput?.addEventListener("input", renderPatternLibrary);

  libraryCategoryBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      activeCategory = btn.dataset.category || "All";
      libraryCategoryBtns.forEach((item) => item.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderPatternLibrary();
    });
  });

  // Initial render
  evaluateRegex();
  renderPatternLibrary();

  // 6. Console verification message
  console.info(
    "%cRegex Lab – Developer Toolkit%c initialized successfully (Day 3 · Live Regex Tester & Pattern Library).",
    "color: #a855f7; font-weight: bold;",
    "color: #93c5fd;"
  );
});
