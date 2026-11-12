(function () {
  var G = {
    exchange: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 19c2-7 8-11 15-11 6 0 11 3 14 8"/><path d="M39 8v8h-8"/><path d="M38 29c-2 7-8 11-15 11-6 0-11-3-14-8"/><path d="M9 40v-8h8"/></svg>',
    nest: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 24c0 10 8 16 18 16s18-6 18-16"/><path d="M11 25c0 7 6 11 13 11s13-4 13-11"/><path d="M17 26c0 3 3 5 7 5s7-2 7-5"/><circle cx="24" cy="13" r="4"/></svg>',
    shield: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round" stroke-linecap="round"><path d="M24 6l15 5v12c0 9-6 15-15 19-9-4-15-10-15-19V11z"/><path d="M24 14v20M16 23h16"/></svg>',
    grid: '<svg viewBox="0 0 48 48" fill="currentColor" stroke="none"><circle cx="12" cy="12" r="3.5"/><circle cx="24" cy="12" r="3.5"/><circle cx="36" cy="12" r="3.5"/><circle cx="12" cy="24" r="3.5"/><circle cx="24" cy="24" r="5.5"/><circle cx="36" cy="24" r="3.5"/><circle cx="12" cy="36" r="3.5"/><circle cx="24" cy="36" r="3.5"/><circle cx="36" cy="36" r="3.5"/></svg>',
    sun: '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 32a12 12 0 0 1 24 0"/><path d="M5 32h38M11 39h26"/><path d="M24 8v6M8.5 16.5l4 4M39.5 16.5l-4 4"/></svg>'
  };

  var P = [
    { id: "give-and-grow", h: 222, glyph: "exchange", title: "Give & Grow",
      client: "Nasdaq Entrepreneurial Center",
      line: "Founders want to mentor. What stops them is time.",
      tags: ["In-depth interviews", "Synthesis", "Live prototype tests"],
      role: "Needfinding lead", team: "d.school project team", time: "4 weeks",
      methods: "Interviews, empathy maps, journey maps, 2x2s, live prototype tests",
      lede: 'Founders already want to mentor. <mark>What stops them is time.</mark>', full: true },
    { id: "whats-nest", h: 24, glyph: "nest", title: "What's Nest",
      client: "Stanford d.school",
      line: "An app for mothers whose children have just left home.",
      tags: ["Interviews", "Personas", "Figma prototype"],
      role: "UX design co-lead", team: "To add", time: "To add",
      methods: "User interviews, personas, prototype tests with live users",
      lede: "An app for mothers whose children have just left home, taken from user interviews to a prototype pitched to VCs." },
    { id: "larp", h: 152, glyph: "shield", title: "Moccasins: LARP",
      client: "Stanford d.school",
      line: "Immersion with a live-action role-play group.",
      tags: ["Immersion", "Observation", "Interviews"],
      role: "Researcher, with one partner", team: "2", time: "Fall 2026",
      methods: "Participant observation, in-depth interview, synthesis",
      lede: "Immersion with a live-action role-play group, to understand the people in it from the inside." },
    { id: "student-study", h: 280, glyph: "grid", title: "College student study", status: "In progress",
      client: "Personal project",
      line: "A self-directed needfinding project with college students.",
      tags: ["Interviews"],
      role: "Sole researcher", team: "1", time: "Ongoing",
      methods: "To add",
      lede: "A self-directed needfinding project with college students." },
    { id: "sunrise", h: 44, glyph: "sun", title: "Sunrise Senior Living", status: "In progress",
      client: "Sunrise Senior Living",
      line: "Needfinding in a senior living community.",
      tags: ["Field research"],
      role: "To add", team: "To add", time: "Ongoing",
      methods: "To add",
      lede: "Needfinding in a senior living community." }
  ];

  /* Display order: most recent first, in-progress work at the top. */
  var ORDER = ["sunrise", "student-study", "larp", "give-and-grow", "whats-nest"];
  P.sort(function (a, b) { return ORDER.indexOf(a.id) - ORDER.indexOf(b.id); });

  var stack = document.getElementById("stack");
  var panel = document.getElementById("panel");
  var active = P[0];
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;"); }
  function byId(id) { for (var i = 0; i < P.length; i++) if (P[i].id === id) return P[i]; return null; }

  document.getElementById("count").textContent = P.length;
  stack.innerHTML = P.map(function (p, i) {
    return '<li><a class="card" href="#' + p.id + '" data-id="' + p.id + '" style="--i:' + i + ';--h:' + p.h + '">' +
      '<span class="thumb">' + G[p.glyph] + '</span>' +
      '<span style="min-width:0"><span class="card-title">' + esc(p.title) + '</span>' +
      '<span class="card-line">' + (p.status ? '<span class="status">' + p.status + ' · </span>' : '') + esc(p.line) + '</span></span></a></li>';
  }).join("");

  function previewHTML(p) {
    return '<div class="preview" style="--h:' + p.h + '">' +
      '<div class="preview-tile">' + G[p.glyph] + '</div>' +
      '<div class="preview-text"><div><span class="label">' + esc(p.client) + '</span>' +
      '<h2>' + esc(p.title) + '</h2><p>' + esc(p.line) + '</p></div>' +
      '<a class="open" href="#' + p.id + '">' + "Read Case Study" + ' <span aria-hidden="true">→</span></a></div></div>';
  }

  var TEMPLATE_SECTIONS = ["Context and user group", "Research", "Synthesis", "Insight", "Needs", "Solution, prototyping and result, where they apply"];
  function caseHTML(p) {
    var idx = P.indexOf(p), next = P[(idx + 1) % P.length];
    var body;
    if (p.full) {
      body = document.getElementById("tpl-" + p.id).innerHTML;
    } else {
      body = '<section class="sec"><h2>Write-up</h2><div class="body"><p class="todo">This case study is being written. It will follow the same structure as the others:</p>' +
        '<ul class="needs">' + TEMPLATE_SECTIONS.map(function (s) { return '<li class="todo">' + s + '</li>'; }).join("") + '</ul></div></section>';
    }
    return '<article class="case" style="--h:' + p.h + '">' +
      '<a class="back" href="#home">← All projects</a>' +
      '<header class="case-head"><span class="label">' + esc(p.client) + (p.status ? ' · ' + p.status : '') + '</span>' +
      '<h1>' + esc(p.title) + '</h1><p class="lede">' + p.lede + '</p>' +
      '<dl class="meta"><div><dt>My role</dt><dd>' + esc(p.role) + '</dd></div><div><dt>Team</dt><dd>' + esc(p.team) + '</dd></div>' +
      '<div><dt>Timeline</dt><dd>' + esc(p.time) + '</dd></div><div><dt>Methods</dt><dd>' + esc(p.methods) + '</dd></div></dl></header>' +
      '<figure class="ph tall">Hero image for ' + esc(p.title) + '</figure>' + body +
      '<div class="next"><a href="#home">All projects</a><a href="#' + next.id + '">Next: ' + esc(next.title) + ' →</a></div></article>';
  }

  function setCurrent(id) {
    var cards = stack.querySelectorAll(".card");
    for (var i = 0; i < cards.length; i++) {
      if (cards[i].getAttribute("data-id") === id) cards[i].setAttribute("aria-current", "page");
      else cards[i].removeAttribute("aria-current");
    }
  }

  var reading = false;
  function route() {
    var p = byId(location.hash.slice(1));
    reading = !!p;
    document.body.classList.toggle("reading", reading);
    if (p) { panel.innerHTML = caseHTML(p); setCurrent(p.id); active = p; }
    else { panel.innerHTML = previewHTML(active); setCurrent(null); }
    panel.scrollTop = 0;
    if (window.matchMedia("(max-width: 620px)").matches) window.scrollTo(0, 0);
  }

  function hover(e) {
    if (reading) return;
    var a = e.target.closest ? e.target.closest(".card") : null;
    if (!a) return;
    var p = byId(a.getAttribute("data-id"));
    if (p && p !== active) { active = p; panel.innerHTML = previewHTML(p); }
  }
  stack.addEventListener("mouseover", hover);
  stack.addEventListener("focusin", hover);
  /* Card stack: three cards rest in view, the rest wait as a deck at the bottom
     edge and rise into place as the column scrolls. */
  var index = document.querySelector(".index"), who = document.querySelector(".who");
  var cards = stack.querySelectorAll(".card");
  var RESERVE = 84, PEEK = 34, SHRINK = 0.17, GAP = 8;
  function wide() { return !window.matchMedia("(max-width: 620px)").matches; }
  function updateStack() {
    if (!wide()) return;
    var CH = index.clientHeight, st = index.scrollTop, n = cards.length, depth = [], i;
    /* depth: how many card slots a card sits below the resting line (0 = in the list) */
    for (i = 0; i < n; i++) {
      var h = cards[i].offsetHeight;
      depth[i] = Math.max(0, (cards[i].offsetTop - st - (CH - h - RESERVE)) / (h + GAP));
    }
    for (i = 0; i < n; i++) {
      var c = cards[i], d = depth[i], H = c.offsetHeight;
      var nat = c.offsetTop - st, floor = CH - H - RESERVE;
      if (d > 0) {
        var pos = floor + PEEK * Math.min(d, 3);
        c.style.transform = "translateY(" + (pos - nat) + "px) scale(" + Math.max(0.4, 1 - SHRINK * d) + ")";
        c.style.opacity = String(Math.max(0, Math.min(1, 3 - d)));
      } else {
        c.style.transform = "";
        c.style.opacity = "";
      }
      /* a card darkens while another card is tucked underneath it */
      var under = i + 1 < n ? Math.min(depth[i + 1], 1) : 0;
      c.style.setProperty("--t", (under * (1 - 0.6 * Math.min(d, 1))).toFixed(3));
      c.style.zIndex = String(20 - i);
    }
  }
  function layoutStack() {
    who.style.minHeight = "";
    stack.style.paddingBottom = "";
    if (!wide()) {
      for (var i = 0; i < cards.length; i++) {
        cards[i].style.transform = ""; cards[i].style.zIndex = ""; cards[i].style.opacity = "";
        cards[i].style.removeProperty("--t");
      }
      return;
    }
    stack.style.paddingBottom = "48px";
    /* Rest with up to three full cards; if the window is too short for three,
       settle on two (or one) so no card is caught halfway into the deck. */
    for (var k = Math.min(2, cards.length - 1); k >= 0; k--) {
      var delta = (index.clientHeight - cards[k].offsetHeight - RESERVE) - cards[k].offsetTop;
      if (delta >= 0 || k === 0) {
        if (delta > 0) who.style.minHeight = (who.offsetHeight + delta) + "px";
        break;
      }
    }
    updateStack();
  }
  index.addEventListener("scroll", updateStack, { passive: true });
  window.addEventListener("resize", layoutStack);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutStack);
  layoutStack();

  window.addEventListener("hashchange", route);
  route();
})();
