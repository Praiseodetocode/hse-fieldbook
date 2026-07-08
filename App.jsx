import { useState } from "react";

// ── DESIGN TOKENS ────────────────────────────────────────────────
const C = {
  bg: "#080d1a",
  surface: "rgba(255,255,255,0.05)",
  border: "rgba(255,255,255,0.09)",
  gold: "#f59e0b",
  goldLight: "#fcd34d",
  blue: "#3b82f6",
  blueLight: "#93c5fd",
  red: "#ef4444",
  green: "#22c55e",
  purple: "#a855f7",
  orange: "#f97316",
  teal: "#14b8a6",
  text: "#f1f5f9",
  muted: "#94a3b8",
  dim: "#475569",
};

const glass = (accent = C.gold) => ({
  background: C.surface,
  border: `1px solid ${C.border}`,
  borderLeft: `3px solid ${accent}`,
  borderRadius: 14,
  backdropFilter: "blur(10px)",
});

const inp = {
  background: "rgba(255,255,255,0.06)",
  border: `1px solid ${C.border}`,
  borderRadius: 10,
  color: C.text,
  padding: "10px 14px",
  fontSize: 14,
  width: "100%",
  boxSizing: "border-box",
  fontFamily: "inherit",
  outline: "none",
};

const lbl = {
  fontSize: 10,
  fontWeight: 700,
  color: C.muted,
  letterSpacing: 1,
  textTransform: "uppercase",
  marginBottom: 5,
  display: "block",
};

const TABS = [
  { id: "about",    emoji: "📖", label: "About" },
  { id: "stats",    emoji: "📊", label: "Statistics" },
  { id: "risk",     emoji: "⚠️",  label: "Risk Matrix" },
  { id: "firstaid", emoji: "❤️",  label: "First Aid" },
  { id: "fire",     emoji: "🔥",  label: "Fire" },
  { id: "confined", emoji: "☠️",  label: "Confined Space" },
  { id: "elec",     emoji: "⚡",  label: "Electrical" },
  { id: "jha",      emoji: "🔍",  label: "JHA" },
  { id: "journey",  emoji: "🚗",  label: "Journey" },
  { id: "enviro",   emoji: "🌍",  label: "Environment" },
  { id: "ref",      emoji: "📋",  label: "Key Values" },
];

// ── ROOT ─────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("about");
  const current = TABS.find(t => t.id === tab);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, sans-serif", maxWidth: 520, margin: "0 auto", color: C.text }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(160deg,#0a0f1e 0%,#1a1040 50%,#0e1f3d 100%)", padding: "18px 16px 14px", position: "sticky", top: 0, zIndex: 100, borderBottom: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 9, fontWeight: 800, color: C.gold, letterSpacing: 2, marginBottom: 2 }}>NISP · ISPON · HSE LEVELS 2 & 3</div>
        <div style={{ fontSize: 17, fontWeight: 900, background: `linear-gradient(135deg,${C.goldLight},${C.blueLight})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.2 }}>
          HSE Cross-Reference &<br />Calculator Fieldbook
        </div>
        <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>
          by <span style={{ color: C.goldLight, fontWeight: 700 }}>Praise Emobome Edore</span> · v1.0 · July 2026
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", overflowX: "auto", gap: 5, padding: "10px 10px", background: "rgba(0,0,0,0.5)", position: "sticky", top: 86, zIndex: 90, scrollbarWidth: "none", borderBottom: `1px solid ${C.border}` }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{ flexShrink: 0, padding: "5px 10px", borderRadius: 18, border: tab === t.id ? `1px solid ${C.gold}` : `1px solid ${C.border}`, cursor: "pointer", fontSize: 10.5, fontWeight: 700, background: tab === t.id ? `${C.gold}20` : "transparent", color: tab === t.id ? C.gold : C.muted, whiteSpace: "nowrap", transition: "all 0.2s" }}>
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: "12px 12px 50px" }}>
        {tab === "about"    && <AboutTab />}
        {tab === "stats"    && <StatsTab />}
        {tab === "risk"     && <RiskTab />}
        {tab === "firstaid" && <FirstAidTab />}
        {tab === "fire"     && <FireTab />}
        {tab === "confined" && <ConfinedTab />}
        {tab === "elec"     && <ElecTab />}
        {tab === "jha"      && <JHATab />}
        {tab === "journey"  && <JourneyTab />}
        {tab === "enviro"   && <EnviroTab />}
        {tab === "ref"      && <RefTab />}
      </div>

      <div style={{ textAlign: "center", padding: "14px 16px", color: C.dim, fontSize: 10, borderTop: `1px solid ${C.border}`, background: "rgba(0,0,0,0.4)", lineHeight: 1.6 }}>
        Created by Praise Emobome Edore · June 2026 (NISP HSE L2 & L3, June 2026 Cohort) · Published July 2026<br />
        Built with Claude AI (Anthropic) · Free for all HSE professionals
      </div>
    </div>
  );
}

// ── REUSABLE COMPONENTS ──────────────────────────────────────────
function Card({ children, accent = C.gold, style = {} }) {
  return <div style={{ ...glass(accent), padding: "14px", marginBottom: 12, ...style }}>{children}</div>;
}

function STitle({ children, accent = C.gold }) {
  return <div style={{ fontWeight: 800, fontSize: 13, color: accent, marginBottom: 10, letterSpacing: 0.3 }}>{children}</div>;
}

function Expand({ title, accent = C.gold, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ ...glass(accent), marginBottom: 8, overflow: "hidden" }}>
      <div onClick={() => setOpen(!open)} style={{ padding: "11px 14px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontWeight: 700, fontSize: 12.5, color: accent, lineHeight: 1.3 }}>{title}</span>
        <span style={{ color: C.muted, fontSize: 11, flexShrink: 0, marginLeft: 8 }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && <div style={{ padding: "0 14px 14px", borderTop: `1px solid ${C.border}` }}>{children}</div>}
    </div>
  );
}

function Bul({ items, accent = C.gold }) {
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} style={{ display: "flex", gap: 8, marginBottom: 5, fontSize: 12, color: C.text, lineHeight: 1.5 }}>
          <span style={{ color: accent, flexShrink: 0 }}>→</span>
          <span dangerouslySetInnerHTML={{ __html: item }} />
        </div>
      ))}
    </div>
  );
}

function MetricCard({ label: lb, value, accent = C.gold, formula, note }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ ...glass(accent), padding: "12px 14px", marginBottom: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: 1 }}>{lb}</span>
        {formula && <button onClick={() => setOpen(!open)} style={{ fontSize: 9, color: accent, background: `${accent}15`, border: `1px solid ${accent}44`, borderRadius: 8, cursor: "pointer", padding: "2px 7px" }}>{open ? "hide" : "formula"}</button>}
      </div>
      <div style={{ fontSize: 30, fontWeight: 900, color: accent, margin: "4px 0 2px" }}>{value}</div>
      {open && (
        <div style={{ background: "rgba(0,0,0,0.3)", borderRadius: 8, padding: "8px 10px", fontSize: 11.5, color: C.muted, lineHeight: 1.6, marginTop: 6 }}>
          <strong style={{ color: accent }}>Formula: </strong>{formula}<br />
          {note && <span style={{ color: C.dim }}>{note}</span>}
        </div>
      )}
    </div>
  );
}

// ── TAB: ABOUT ───────────────────────────────────────────────────
function AboutTab() {
  return (
    <div>
      <Card accent={C.gold}>
        <STitle accent={C.goldLight}>What is this tool?</STitle>
        <div style={{ fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
          The <strong style={{ color: C.goldLight }}>HSE Cross-Reference and Calculator Fieldbook</strong> is a free, interactive digital reference tool built for HSE professionals, supervisors, safety officers and trainees across Nigeria and beyond.
        </div>
        <div style={{ marginTop: 10, fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
          <strong style={{ color: C.text }}>"Cross-reference"</strong> means that every value in this tool connects to related concepts — oxygen levels link to confined space entry, which links to PTW, which links to risk rating. It is not just a calculator. It is a network of related professional knowledge you can navigate in the field.
        </div>
      </Card>

      <Card accent={C.blue}>
        <STitle accent={C.blueLight}>The Problem This Solves</STitle>
        <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
          HSE professionals in the field constantly need to cross-check critical values — the LTIF formula, what fire class diesel falls under, what oxygen level triggers a confined space evacuation, the right CPR ratio in an emergency. These answers are scattered across multiple manuals, regulations and standards.
        </div>
        <div style={{ marginTop: 10, fontSize: 12.5, color: C.text, lineHeight: 1.7 }}>
          This tool consolidates them into one free, accessible, mobile-friendly resource — usable by everyone from a seasoned HSE Manager to someone who has just completed their Level 1 training.
        </div>
      </Card>

      <Card accent={C.teal}>
        <STitle accent={C.teal}>What Is Covered</STitle>
        {[
          ["📊 Statistics","Live LTIF, TRCF, PSIF, Severity Rate and RTAF calculators with plain-language injury classification"],
          ["⚠️ Risk Matrix","Interactive 6×5 visual matrix with plain-language severity guide — from no injury to catastrophe"],
          ["❤️ First Aid","CPR protocols with clear navigation between international standard and organisational references"],
          ["🔥 Fire Safety","Fire classes, extinguisher selection, PASS method, flash points"],
          ["☠️ Confined Space","Oxygen danger levels, mandatory atmospheric testing sequence, 12-step entry procedure"],
          ["⚡ Electrical","AC current effects on the body, LOTO steps, Nigerian legal framework"],
          ["🔍 JHA","Job Hazard Analysis — who performs it, when, steps, team roles"],
          ["🚗 Journey","Journey Management roles, violations, qualifying journeys, journey plan contents"],
          ["🌍 Environment","Sustainability, greenhouse gases, pollution consequences, Nigerian agencies"],
          ["📋 Key Values","Master cross-reference of every critical number, formula and standard in one place"],
        ].map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            <span style={{ fontSize: 14, flexShrink: 0 }}>{k.split(" ")[0]}</span>
            <div>
              <span style={{ fontWeight: 700, fontSize: 12, color: C.teal }}>{k.split(" ").slice(1).join(" ")} </span>
              <span style={{ fontSize: 11.5, color: C.muted }}>{v}</span>
            </div>
          </div>
        ))}
      </Card>

      <Card accent={C.purple}>
        <STitle accent={C.purple}>Sources & Standards</STitle>
        <Bul accent={C.purple} items={[
          "NISP HSE Level 3 Manual — SPDC/Shell Contractor Employee HSE Training",
          "ISPON HSE Level 2 Class Notes — June 2026 Cohort",
          "Factories Act 1990 (Cap. 126) — Nigeria",
          "Mineral Oils Safety Regulations 1997 — Nigeria",
          "ISO 14001 Environmental Management System Standard",
          "ILO Model Code of Safety Regulations",
          "AHA/ILCOR CPR Guidelines (for international standard reference)",
          "Department of Petroleum Resources (DPR) Environmental Guidelines",
        ]} />
      </Card>

      <Card accent={C.orange}>
        <STitle accent={C.orange}>⚠️ Important Disclaimer</STitle>
        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
          This tool is a <strong style={{ color: C.text }}>reference and educational resource</strong>. It does not replace your organisation's approved procedures, your line manager's instructions, or professional medical advice. In any emergency, always follow your organisation's current approved protocol and the most recent certified training you have received.
        </div>
        <div style={{ marginTop: 10, fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
          Where this tool notes differences between Nigerian training manuals and international standards, use your judgement and defer to your organisation's guidance.
        </div>
      </Card>

      <Card accent={C.dim} style={{ borderLeftColor: C.dim }}>
        <STitle accent={C.muted}>Created By</STitle>
        <div style={{ fontSize: 13, fontWeight: 800, color: C.goldLight, marginBottom: 4 }}>Praise Emobome Edore</div>
        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
          NISP HSE Level 2 & 3 Trainee · June 2026 Cohort<br />
          Built with Claude AI (Anthropic) as a technical instrument<br />
          Published free for all HSE professionals · July 2026 · v1.0
        </div>
      </Card>
    </div>
  );
}

// ── TAB: STATISTICS ──────────────────────────────────────────────
function StatsTab() {
  const [s, setS] = useState({ workers: 100, hpd: 8, days: 240, overtime: 0, lti: 1, trc: 3, daysLost: 12, psi: 2, rta: 1, km: 500000 });
  const u = (k, v) => setS(p => ({ ...p, [k]: Number(v) }));
  const M = 1000000;
  const mh = s.workers * s.hpd * s.days + Number(s.overtime);
  const ltif  = mh > 0 ? ((s.lti  * M) / mh).toFixed(3) : "—";
  const trcf  = mh > 0 ? ((s.trc  * M) / mh).toFixed(3) : "—";
  const psif  = mh > 0 ? ((s.psi  * M) / mh).toFixed(3) : "—";
  const sev   = mh > 0 ? ((s.daysLost * M) / mh).toFixed(3) : "—";
  const rtaf  = s.km  > 0 ? ((s.rta  * M) / s.km).toFixed(3) : "—";

  return (
    <div>
      <Card accent={C.blue}>
        <STitle accent={C.blueLight}>Exposure Inputs</STitle>
        {[["workers","Total Workforce"],["hpd","Average Hours Per Day"],["days","Days Worked in Period"],["overtime","Additional Overtime Hours (total)"]].map(([k, lb]) => (
          <div key={k} style={{ marginBottom: 10 }}>
            <span style={lbl}>{lb}</span>
            <input style={inp} type="number" value={s[k]} onChange={e => u(k, e.target.value)} />
          </div>
        ))}
        <div style={{ padding: "8px 12px", background: `${C.gold}18`, border: `1px solid ${C.gold}44`, borderRadius: 8, fontSize: 12, color: C.gold, fontWeight: 700 }}>
          Total Man-Hours: {mh.toLocaleString()} hrs
        </div>
        <div style={{ fontSize: 10.5, color: C.dim, marginTop: 5 }}>Includes all work hours + overtime + training. Excludes leave, sickness and absence.</div>
      </Card>

      <Card accent={C.red}>
        <STitle accent="#fca5a5">Incident Data</STitle>
        {[["lti","Lost Time Injuries (LTI)"],["trc","Total Reportable Cases (TRC = LTI + RWC + MTC)"],["daysLost","Total Workdays Lost"],["psi","Potentially Serious Incidents (potential rating ≥3, consequence to human life)"]].map(([k, lb]) => (
          <div key={k} style={{ marginBottom: 10 }}>
            <span style={lbl}>{lb}</span>
            <input style={inp} type="number" value={s[k]} onChange={e => u(k, e.target.value)} />
          </div>
        ))}
      </Card>

      <Card accent={C.orange}>
        <STitle accent={C.orange}>Road Safety Inputs</STitle>
        {[["rta","Road Traffic Accidents (RTA)"],["km","Total Work-Related Kilometres Driven"]].map(([k, lb]) => (
          <div key={k} style={{ marginBottom: 10 }}>
            <span style={lbl}>{lb}</span>
            <input style={inp} type="number" value={s[k]} onChange={e => u(k, e.target.value)} />
          </div>
        ))}
      </Card>

      <STitle accent={C.goldLight}>Calculated Results</STitle>
      <MetricCard label="LTIF — Lost Time Injury Frequency" value={ltif} accent={C.red}
        formula="LTIF = LTI × 1,000,000 ÷ Total Man-Hours"
        note="LTI includes: Fatalities + PTD + PPD + LWC. Does NOT include RWC or MTC." />
      <MetricCard label="TRCF — Total Reportable Case Frequency" value={trcf} accent={C.orange}
        formula="TRCF = TRC × 1,000,000 ÷ Total Man-Hours"
        note="TRC = LTI + RWC + MTC. Excludes First Aid Cases and Near Misses." />
      <MetricCard label="PSIF — Potentially Serious Injury Frequency" value={psif} accent={C.purple}
        formula="PSIF = PSI × 1,000,000 ÷ Total Man-Hours"
        note="Only incidents with potential severity rating 3 or above and consequence to human life." />
      <MetricCard label="Severity Rate — Days Lost per Million Hours" value={sev} accent={C.blue}
        formula="Severity Rate = Days Lost × 1,000,000 ÷ Total Man-Hours"
        note="Measures how severe injuries are on average, not just how frequent." />
      <MetricCard label="RTAF — Road Traffic Accident Frequency" value={rtaf} accent={C.teal}
        formula="RTAF = RTA × 1,000,000 ÷ Kilometres Driven"
        note="Only work-related km in company-owned or managed vehicles count." />

      <Card accent={C.teal}>
        <STitle accent={C.teal}>Injury Classification — Plain Language</STitle>
        {[
          { level: "Level 0 — No injury", color: C.teal, plain: "Nothing happened. Nobody hurt, nothing damaged.", pro: "No consequence.", code: "Not recorded" },
          { level: "Level 1 — Slight / First Aid Case (FAC)", color: C.green, plain: "Minor cut, scrape or bruise. Person used a bandage and returned straight to their normal job immediately. No doctor needed.", pro: "Treated with first aid materials on site.", code: "FAC — NOT in TRC" },
          { level: "Level 2 — Minor / Medical Treatment Case (MTC)", color: C.blue, plain: "Injury needed a doctor to treat — stitches, medication or an X-ray — but the person was back at their full normal job within 24 hours.", pro: "Required physician treatment. Not a lost-time event.", code: "MTC — counted in TRC only" },
          { level: "Level 3 — Moderate / Restricted or Lost Time", color: C.gold, plain: "Person was hurt badly enough that they could not do their full normal job the next day. Either stayed home (LWC) or did lighter duties (RWC). This is where formal investigations begin.", pro: "LWC or RWC. Requires investigation and reporting.", code: "LWC = in LTI and TRC. RWC = TRC only." },
          { level: "Level 4 — Major / Single Fatality or Permanent Disability", color: C.orange, plain: "One person died, or someone permanently lost use of a limb or ability to work. Serious regulatory reporting. Operations may be suspended.", pro: "Fatality, PTD or PPD. Full investigation mandatory.", code: "Counted in LTI and TRC" },
          { level: "Level 5 — Catastrophic / Multiple Fatalities", color: C.red, plain: "Multiple deaths or a disaster affecting a large number of people. Facility-wide impact. Regulatory shutdown possible.", pro: "Mass casualty event. National reporting required.", code: "Highest severity — STOP ALL WORK" },
        ].map(({ level, color, plain, pro, code }) => (
          <div key={level} style={{ borderLeft: `3px solid ${color}`, paddingLeft: 10, marginBottom: 12 }}>
            <div style={{ fontWeight: 800, fontSize: 12, color }}>{level}</div>
            <div style={{ fontSize: 11.5, color: C.text, marginTop: 3, lineHeight: 1.5 }}><strong style={{ color: C.muted }}>Plain language: </strong>{plain}</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}><strong>Professional: </strong>{pro}</div>
            <div style={{ fontSize: 10.5, color: color, marginTop: 2, fontWeight: 700 }}>Classification: {code}</div>
          </div>
        ))}
        <div style={{ padding: "8px 10px", background: `${C.gold}12`, border: `1px solid ${C.gold}33`, borderRadius: 8, fontSize: 11, color: C.gold, marginTop: 4 }}>
          Near Miss: Potential harm — no actual harm occurred. NOT counted in TRC. But MUST be reported and investigated.
        </div>
      </Card>
    </div>
  );
}

// ── TAB: RISK MATRIX ─────────────────────────────────────────────
function RiskTab() {
  const [prob, setProb] = useState("A");
  const [cons, setCons] = useState("0");
  const pMap = { A: 1, B: 2, C: 3, D: 4, E: 5 };
  const pOpts = [
    ["A", "A — Remote. Never heard of in the industry."],
    ["B", "B — Heard of in the industry somewhere."],
    ["C", "C — Has occurred in our company before."],
    ["D", "D — Happens several times per year in our company."],
    ["E", "E — Happens several times per year at this specific location. (Critical)"],
  ];
  const cOpts = [
    ["0", "0 — No consequence. Nobody hurt. Nothing damaged."],
    ["1", "1 — Slight. First Aid only. Back to full work immediately."],
    ["2", "2 — Minor. Doctor treatment (MTC). Back to full work within 24 hours."],
    ["3", "3 — Moderate. Lost time or restricted work (LTI/RWC). Significant env. effect."],
    ["4", "4 — Major. Single fatality or permanent disability. Massive asset damage."],
    ["5", "5 — Catastrophic. Multiple fatalities. Estimated catastrophic damage."],
  ];
  const score = pMap[prob] * Number(cons);
  const getR = sc => {
    if (sc === 0)  return { label: "NO RISK — continuous improvement", color: C.teal };
    if (sc <= 4)   return { label: "LOW RISK — routine controls are sufficient", color: C.green };
    if (sc <= 9)   return { label: "MEDIUM RISK — localized control and monitoring required", color: C.gold };
    if (sc <= 14)  return { label: "HIGH RISK — immediate management action required", color: C.orange };
    return { label: "CRITICAL / SERIOUS — INTOLERABLE. STOP WORK NOW.", color: C.red };
  };
  const { label: rl, color: rc } = getR(score);
  const probs = ["A", "B", "C", "D", "E"];

  return (
    <div>
      <Card accent={C.orange}>
        <STitle accent={C.orange}>Risk = Probability × Consequence</STitle>
        <div style={{ fontSize: 11.5, color: C.muted, marginBottom: 12, lineHeight: 1.6 }}>
          A risk classification has three characters: e.g. <span style={{ color: C.gold, fontWeight: 800 }}>C3P</span> = Happened in our company (C) · Lost time injury level (3) · People category (P).<br />
          Categories: <strong style={{ color: C.text }}>P</strong>eople · <strong style={{ color: C.text }}>A</strong>ssets · <strong style={{ color: C.text }}>E</strong>nvironment · <strong style={{ color: C.text }}>R</strong>eputation
        </div>
        <span style={lbl}>Probability — How likely is it? (A–E)</span>
        <select style={{ ...inp, marginBottom: 12, cursor: "pointer" }} value={prob} onChange={e => setProb(e.target.value)}>
          {pOpts.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <span style={lbl}>Consequence Severity — How bad could it be? (0–5)</span>
        <select style={{ ...inp, marginBottom: 14, cursor: "pointer" }} value={cons} onChange={e => setCons(e.target.value)}>
          {cOpts.map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <div style={{ background: `${rc}15`, border: `2px solid ${rc}`, borderRadius: 14, padding: "14px", textAlign: "center" }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: rc, letterSpacing: 2 }}>RISK SCORE</div>
          <div style={{ fontSize: 46, fontWeight: 900, color: rc, lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: rc, marginTop: 4 }}>{rl}</div>
          <div style={{ fontSize: 10.5, color: C.muted, marginTop: 3 }}>Classification code: {prob}{cons} (P/A/E/R)</div>
        </div>
      </Card>

      <Card accent={C.purple}>
        <STitle accent={C.purple}>Visual Matrix — Tap any cell to select</STitle>
        <div style={{ display: "grid", gridTemplateColumns: "22px repeat(5,1fr)", gap: 3, marginBottom: 4 }}>
          <div />
          {probs.map(p => <div key={p} style={{ textAlign: "center", fontSize: 10, fontWeight: 800, color: C.gold }}>{p}</div>)}
        </div>
        {[5, 4, 3, 2, 1, 0].map(c => (
          <div key={c} style={{ display: "grid", gridTemplateColumns: "22px repeat(5,1fr)", gap: 3, marginBottom: 3 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: C.muted }}>{c}</div>
            {probs.map(p => {
              const sc = pMap[p] * c;
              const isActive = p === prob && String(c) === cons;
              let col = C.green; if (sc >= 5) col = C.gold; if (sc >= 10) col = C.orange; if (sc >= 15) col = C.red;
              return (
                <div key={p} onClick={() => { setProb(p); setCons(String(c)); }}
                  style={{ height: 34, background: isActive ? `${col}55` : `${col}22`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: col, cursor: "pointer", border: isActive ? `2px solid ${col}` : `1px solid ${col}33`, transform: isActive ? "scale(1.08)" : "scale(1)", transition: "all 0.15s" }}>
                  {sc}
                </div>
              );
            })}
          </div>
        ))}
        <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
          {[[C.green, "Low (0–4)"], [C.gold, "Medium (5–9)"], [C.orange, "High (10–14)"], [C.red, "Critical (15+)"]].map(([c, l]) => (
            <div key={l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10 }}>
              <div style={{ width: 12, height: 12, background: `${c}44`, border: `1px solid ${c}`, borderRadius: 3 }} />
              <span style={{ color: C.muted }}>{l}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card accent={C.teal}>
        <STitle accent={C.teal}>ALARP — What It Means in Practice</STitle>
        <Bul accent={C.teal} items={[
          "<strong>ALARP</strong> = As Low As Reasonably Practicable",
          "ALARP does NOT mean zero risk. It means no further reasonable reduction is possible without disproportionate cost or difficulty.",
          "HIGH risk score = STOP WORK. Reduce risk before proceeding.",
          "MEDIUM = manage and monitor with defined specific controls.",
          "LOW = acceptable with generic procedures and supervision.",
          "<strong>Hierarchy of Control:</strong> Eliminate → Substitute → Engineer → Procedural → PPE (last resort)",
        ]} />
      </Card>
    </div>
  );
}

// ── TAB: FIRST AID ───────────────────────────────────────────────
function FirstAidTab() {
  const [cprMode, setCprMode] = useState("intl");

  return (
    <div>
      {/* CPR Navigator */}
      <Card accent={C.red}>
        <STitle accent="#fca5a5">CPR Protocol — Which Reference Do I Use?</STitle>
        <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.6, marginBottom: 12 }}>
          There are two versions of CPR ratio guidance you may encounter. Select which situation applies to you:
        </div>
        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <button onClick={() => setCprMode("intl")} style={{ flex: 1, padding: "9px", borderRadius: 10, border: cprMode === "intl" ? `1.5px solid ${C.blue}` : `1px solid ${C.border}`, background: cprMode === "intl" ? `${C.blue}22` : "transparent", color: cprMode === "intl" ? C.blueLight : C.muted, fontWeight: 700, fontSize: 11.5, cursor: "pointer" }}>
            🌍 International Standard<br /><span style={{ fontSize: 10, fontWeight: 400 }}>(Field use · Hospitals · General emergency)</span>
          </button>
          <button onClick={() => setCprMode("nisp")} style={{ flex: 1, padding: "9px", borderRadius: 10, border: cprMode === "nisp" ? `1.5px solid ${C.gold}` : `1px solid ${C.border}`, background: cprMode === "nisp" ? `${C.gold}22` : "transparent", color: cprMode === "nisp" ? C.gold : C.muted, fontWeight: 700, fontSize: 11.5, cursor: "pointer" }}>
            📘 NISP Training Manual<br /><span style={{ fontSize: 10, fontWeight: 400 }}>(NISP exam · SPDC/Shell context)</span>
          </button>
        </div>

        {cprMode === "intl" && (
          <div>
            <div style={{ padding: "8px 10px", background: `${C.blue}18`, border: `1px solid ${C.blue}44`, borderRadius: 8, fontSize: 11.5, color: C.blueLight, marginBottom: 12 }}>
              <strong>When to use this:</strong> In any real emergency, in hospital contexts, when working with external emergency services, or when your organisation follows AHA/ILCOR/ILO international guidelines.
            </div>
            {[
              { who: "ADULT", color: C.red, rows: [["Ratio", "30 compressions : 2 rescue breaths"], ["Rate", "100–120 compressions per minute"], ["Depth", "5–6 cm (2–2.4 inches)"], ["Hands", "Two hands — heel of lower hand on centre of chest"], ["Hands-only CPR", "If untrained bystander: 30 compressions only, no rescue breaths"]] },
              { who: "CHILD (1yr – puberty)", color: C.orange, rows: [["Ratio", "30 compressions : 2 breaths (single rescuer)"], ["Rate", "100–120/min"], ["Depth", "~5 cm or 1/3 chest depth"], ["Hands", "One or two hands depending on child size"]] },
              { who: "INFANT (under 1 year)", color: C.purple, rows: [["Ratio", "30 compressions : 2 breaths (single rescuer)"], ["Rate", "100–120/min"], ["Depth", "~4 cm or 1/3 chest depth"], ["Hands", "Two fingers only (index + middle)"], ["Breathing", "Gentle puffs — cover mouth AND nose"]] },
            ].map(({ who, color, rows }) => (
              <div key={who} style={{ ...glass(color), padding: "12px", marginBottom: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 13, color, marginBottom: 8 }}>👤 {who}</div>
                {rows.map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                    <span style={{ color: C.muted }}>{k}</span>
                    <span style={{ fontWeight: 700, color: C.text, textAlign: "right", maxWidth: "58%" }}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {cprMode === "nisp" && (
          <div>
            <div style={{ padding: "8px 10px", background: `${C.gold}18`, border: `1px solid ${C.gold}44`, borderRadius: 8, fontSize: 11.5, color: C.gold, marginBottom: 12 }}>
              <strong>When to use this:</strong> NISP/Shell SPDC training context, ISPON examinations, or when your organisation's approved protocol specifically references the NISP HSE Level 3 manual.
            </div>
            {[
              { who: "ADULT", color: C.red, rows: [["Ratio", "15 compressions : 2 rescue breaths"], ["Rate", "80 compressions per minute"], ["Depth", "4–5 cm"], ["Hands", "Two hands, one on top of other"], ["Check heartbeat", "After first minute, then every 3 minutes (12 cycles)"]] },
              { who: "CHILD", color: C.orange, rows: [["Ratio", "5 compressions : 1 breath"], ["Rate", "80–100/min"], ["Depth", "2.5–3.5 cm"], ["Hands", "Heel of ONE hand only"], ["Breathing", "15–20 breaths per minute"]] },
              { who: "INFANT", color: C.purple, rows: [["Ratio", "5 compressions : 1 breath"], ["Rate", "100/min"], ["Depth", "1.5–2.5 cm"], ["Hands", "TWO FINGERS only"], ["Breathing", "Gentle puffs — seal mouth AND nose"]] },
            ].map(({ who, color, rows }) => (
              <div key={who} style={{ ...glass(color), padding: "12px", marginBottom: 10 }}>
                <div style={{ fontWeight: 800, fontSize: 13, color, marginBottom: 8 }}>👤 {who}</div>
                {rows.map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                    <span style={{ color: C.muted }}>{k}</span>
                    <span style={{ fontWeight: 700, color: C.text, textAlign: "right", maxWidth: "58%" }}>{v}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        <div style={{ padding: "10px 12px", background: "rgba(0,0,0,0.3)", border: `1px solid ${C.border}`, borderRadius: 10, fontSize: 11.5, color: C.muted, lineHeight: 1.6 }}>
          <strong style={{ color: C.text }}>If you are ever in doubt in a real emergency:</strong> Begin compressions immediately. Effective compressions with any ratio are far better than hesitation. Shout for help and get your AED if available.
        </div>
      </Card>

      <Card accent={C.red}>
        <STitle accent="#fca5a5">DRABCDE — Unconscious Person Protocol</STitle>
        {[["D","Danger","Is the scene safe for YOU? Check before approaching. You cannot help by becoming a victim."],["R","Response","Tap shoulder gently: 'Are you OK?' Check for responsiveness."],["A","Airway","Tilt head back, lift chin. Sweep visible obstructions with two fingers. Open and maintain clear airway."],["B","Breathing","Look, listen, feel for 10 seconds. If NOT breathing → call EMS immediately and begin CPR."],["C","Compression","Begin chest compressions + rescue breaths if no pulse."],["D","Defibrillation","Use AED if available. Apply as soon as possible."],["E","Evacuation","Arrange professional medical evacuation to hospital."]].map(([k, t, d]) => (
          <div key={k} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 30, height: 30, background: `${C.red}22`, border: `1px solid ${C.red}55`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 13, color: C.red, flexShrink: 0 }}>{k}</div>
            <div><div style={{ fontWeight: 700, fontSize: 12.5, color: "#fca5a5" }}>{t}</div><div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.4, marginTop: 2 }}>{d}</div></div>
          </div>
        ))}
      </Card>

      <Card accent={C.green}>
        <STitle accent={C.green}>Recovery Position</STitle>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>Use when: person is <strong style={{ color: C.green }}>unconscious but breathing normally</strong></div>
        <Bul accent={C.green} items={["Step 1 — Arm nearest to you: extend at right angle, palm facing up","Step 2 — Far arm: bring across chest, back of their hand against their cheek","Step 3 — Bend far leg: lift knee up, foot flat on ground","Step 4 — Roll toward you using the bent knee as a lever","Step 5 — Tilt head back, chin down to keep airway open; bent top leg at right angle for stability","⚠️ Do NOT use if spinal or neck injury is suspected — unless airway is blocked"]} />
      </Card>

      <Card accent={C.teal}>
        <STitle accent={C.teal}>When to Stop CPR</STitle>
        <Bul accent={C.teal} items={["Spontaneous breathing AND pulse are restored","Another qualified first aider or paramedic takes over","A doctor assumes full responsibility for the casualty","You are completely exhausted and physically unable to continue","⚠️ Always attempt resuscitation — even if in doubt about whether the casualty can be revived"]} />
      </Card>

      <Card accent={C.blue}>
        <STitle accent={C.blueLight}>ABC of First Aid</STitle>
        {[["A — Airway", "Tilt head back + lift chin. Sweep visible obstructions. Open and maintain clear airway before anything else."], ["B — Breathing", "Mouth-to-mouth: pinch nostrils, seal lips around mouth, blow until chest rises. Give first 4 inflations quickly."], ["C — Circulation", "Check for pulse. If absent: external chest compression combined with mouth-to-mouth. Also: control severe bleeding."]].map(([t, d]) => (
          <div key={t} style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 800, fontSize: 12.5, color: C.blueLight }}>{t}</div>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.4 }}>{d}</div>
          </div>
        ))}
      </Card>

      <Card accent={C.teal}>
        <STitle accent={C.teal}>Emergency Call Information</STitle>
        <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
          <strong style={{ color: C.gold }}>SPDC Emergency Medical Services: 122</strong><br /><br />
          Always give:<br />
          1. Exact location — address, building, floor, nearby landmark<br />
          2. Your telephone number<br />
          3. Your name<br />
          4. What happened<br />
          5. Number of casualties and their condition<br />
          6. What first aid is already being given<br /><br />
          <strong style={{ color: C.red }}>DO NOT put down the phone first. Wait for the control officer to end the call.</strong>
        </div>
      </Card>
    </div>
  );
}

// ── TAB: FIRE ────────────────────────────────────────────────────
function FireTab() {
  const [sel, setSel] = useState(null);
  const fires = [
    { cls: "Class A", acc: C.red, fuel: "Ordinary combustible SOLIDS", ex: "Wood, paper, cloth, rubber, leather, sawdust, most plastics", ext: "WATER", col: "RED label", method: "Cooling — removes heat", water: true },
    { cls: "Class B", acc: C.orange, fuel: "Flammable LIQUIDS & liquefiable solids", ex: "Petrol, diesel, kerosene, oil, paint, alcohol, wax, paraffin", ext: "FOAM / CO₂ / DCP", col: "CREAM · BLACK · BLUE", method: "Smothering — removes oxygen", water: false },
    { cls: "Class C", acc: C.blue, fuel: "Flammable GASES", ex: "Natural gas, propane, butane, acetylene, hydrogen, methane", ext: "DRY CHEMICAL POWDER (DCP)", col: "BLUE label", method: "Inhibition — breaks chemical chain reaction", water: false },
    { cls: "Class D", acc: "#6b7280", fuel: "Combustible METALS", ex: "Magnesium, titanium, potassium, sodium, aluminium, uranium", ext: "DRY SAND / Specialist dry powder", col: "SPECIAL", method: "Smothering only — NEVER water (explosive reaction)", water: false },
    { cls: "Class K / F", acc: C.purple, fuel: "Cooking OILS & FATS", ex: "Vegetable oils, animal fats, grease — commercial kitchens", ext: "WET CHEMICAL extinguisher", col: "YELLOW (wet chemical)", method: "Cooling + saponification — forms a soapy smothering layer", water: false },
    { cls: "Electrical", acc: C.gold, fuel: "Live electrical equipment (ignition source — not a true fire class)", ex: "Computers, wiring, circuit boards, motors, switchboards", ext: "CO₂ (Black) or DCP — NEVER foam or water", col: "BLACK (CO₂)", method: "CO₂ displaces oxygen, leaves no residue — safe for electronics", water: false },
  ];

  return (
    <div>
      <Card accent={C.red}>
        <STitle accent="#fca5a5">Fire Triangle</STitle>
        <div style={{ display: "flex", justifyContent: "center", margin: "8px 0 12px" }}>
          <svg viewBox="0 0 200 165" style={{ width: 180, height: 148 }}>
            <polygon points="100,12 12,148 188,148" fill={`${C.red}10`} stroke={C.red} strokeWidth="2.5" />
            <text x="100" y="74" textAnchor="middle" fontSize="14" fontWeight="900" fill={C.red}>HEAT</text>
            <text x="38" y="144" textAnchor="middle" fontSize="12" fontWeight="800" fill={C.orange}>FUEL</text>
            <text x="162" y="144" textAnchor="middle" fontSize="12" fontWeight="800" fill={C.blue}>O₂</text>
            <text x="100" y="108" textAnchor="middle" fontSize="10" fill={C.muted}>= FIRE</text>
          </svg>
        </div>
        <Bul accent={C.red} items={["Remove ANY one side → fire goes out", "<strong>Starvation</strong> — remove fuel (shut off supply, clear combustibles)", "<strong>Smothering</strong> — remove oxygen (foam blanket, CO₂)", "<strong>Cooling</strong> — remove heat (water — Class A fires ONLY)", "<strong>Inhibition</strong> — break chemical chain reaction (DCP, Halon) — 4th method, Fire Tetrahedron", "Fire produces: Heat · Flame · Smoke · Toxic gases (CO, CO₂, HCN)"]} />
      </Card>

      <Card accent={C.orange}>
        <STitle accent={C.orange}>PASS — How to Use a Fire Extinguisher</STitle>
        <div style={{ padding: "8px 10px", background: `${C.red}15`, border: `1px solid ${C.red}33`, borderRadius: 8, fontSize: 12, color: "#fca5a5", fontWeight: 700, marginBottom: 12 }}>
          ⚠️ RAISE THE ALARM FIRST. Then select the extinguisher. Check the wind direction — position yourself with wind at your back.
        </div>
        {[["P — PULL", "Pull the safety pin and break the tamper seal"], ["A — AIM", "Aim the nozzle or hose at the BASE of the fire — not the flames"], ["S — SQUEEZE", "Squeeze the handle levers firmly and steadily"], ["S — SWEEP", "Sweep the jet from side to side across the base of the fire"]].map(([t, d]) => (
          <div key={t} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 32, minWidth: 32, height: 32, background: `${C.orange}22`, border: `1px solid ${C.orange}44`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 12, color: C.orange }}>{t[0]}</div>
            <div><div style={{ fontWeight: 700, fontSize: 12.5, color: C.orange }}>{t}</div><div style={{ fontSize: 11.5, color: C.muted }}>{d}</div></div>
          </div>
        ))}
        <div style={{ padding: "8px 10px", background: `${C.red}15`, border: `1px solid ${C.red}33`, borderRadius: 8, fontSize: 12, color: "#fca5a5", fontWeight: 700, marginTop: 4 }}>
          If you have ANY doubt about your ability to fight the fire — EVACUATE IMMEDIATELY.
        </div>
      </Card>

      <STitle accent={C.goldLight}>Fire Classes — Tap to expand</STitle>
      {fires.map((f, i) => (
        <div key={i}>
          <div onClick={() => setSel(sel === i ? null : i)} style={{ ...glass(f.acc), padding: "10px 14px", marginBottom: 6, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <span style={{ fontWeight: 800, fontSize: 12.5, color: f.acc }}>{f.cls}</span>
              <span style={{ fontSize: 11, color: C.muted, marginLeft: 8 }}>— {f.fuel}</span>
            </div>
            <span style={{ color: C.muted, fontSize: 11 }}>{sel === i ? "▲" : "▼"}</span>
          </div>
          {sel === i && (
            <div style={{ ...glass(f.acc), padding: "12px 14px", marginBottom: 8, marginTop: -4 }}>
              {[["Examples", f.ex], ["Extinguisher to use", f.ext], ["Colour label", f.col], ["How it works", f.method]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                  <span style={{ color: C.muted }}>{k}</span>
                  <span style={{ fontWeight: 700, color: C.text, textAlign: "right", maxWidth: "60%" }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop: 8, padding: "6px 10px", background: f.water ? `${C.green}18` : `${C.red}18`, borderRadius: 6, fontSize: 12, fontWeight: 700, color: f.water ? C.green : C.red }}>
                {f.water ? "✅ Water CAN be used on this class" : "❌ DO NOT use water on this class"}
              </div>
            </div>
          )}
        </div>
      ))}

      <Card accent={C.teal}>
        <STitle accent={C.teal}>Flash Points — Field Reference</STitle>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 8 }}><strong style={{ color: C.text }}>Flash point</strong> = minimum temperature at which a liquid gives enough vapour to ignite temporarily. Below it — no fire risk. Above it — serious risk.</div>
        {[["Petrol / Gasoline", "−45°C", "Most dangerous — ignites far below room temperature"], ["Jet A1", "43°C", "Aviation fuel — moderate risk"], ["Kerosene", "49°C", "Common fuel — significant risk"], ["Diesel", "60°C", "Relatively safer but still flammable"], ["Heavy Fuel Oil", "93°C", "Requires significant heating to ignite"], ["Lubrication Oil", "148°C", "Hard to ignite under normal conditions"]].map(([m, fp, n]) => (
          <div key={m} style={{ display: "flex", gap: 8, padding: "5px 0", borderBottom: `1px solid ${C.border}`, fontSize: 11.5 }}>
            <span style={{ fontWeight: 700, color: C.gold, minWidth: 85 }}>{m}</span>
            <span style={{ fontWeight: 900, color: C.red, minWidth: 48 }}>{fp}</span>
            <span style={{ color: C.muted, fontSize: 11 }}>{n}</span>
          </div>
        ))}
        <div style={{ marginTop: 8, fontSize: 11, color: C.muted, lineHeight: 1.5 }}>
          <span style={{ color: C.orange, fontWeight: 700 }}>Fire Point</span> = slightly above flash point — temperature at which sustained combustion occurs.<br />
          <span style={{ color: C.red, fontWeight: 700 }}>Auto-Ignition Temperature</span> = ignites spontaneously without any external ignition source.
        </div>
      </Card>
    </div>
  );
}

// ── TAB: CONFINED SPACE ──────────────────────────────────────────
function ConfinedTab() {
  return (
    <div>
      <Card accent={C.red}>
        <STitle accent="#fca5a5">What Is a Permit-Required Confined Space?</STitle>
        <Bul accent={C.red} items={["Has one limited entrant and exit point", "Not designed for continuous or prolonged human occupancy", "Has or may have low or high oxygen levels", "Contains or may contain dangerous gas, vapour or airborne hazard", "Typical spaces: boilers, furnaces, pipelines, pits, silos, storage tanks, sewers, manholes, trenches, excavations"]} />
      </Card>

      <Card accent={C.orange}>
        <STitle accent={C.orange}>⚠️ Oxygen Levels — Critical Numbers</STitle>
        <div style={{ fontSize: 11, color: C.muted, marginBottom: 10 }}>Normal atmospheric oxygen = <span style={{ color: C.blue, fontWeight: 800 }}>20.9%</span></div>
        {[
          ["≥ 19.5%", C.green, "SAFE minimum for work without an air-supplied respirator"],
          ["16%", C.gold, "Critical threshold — below this: fire begins to die AND human suffocation starts simultaneously"],
          ["12–14%", C.orange, "Respiration increases noticeably. Poor judgment develops. Exit immediately."],
          ["10–12%", "#f97316", "Lips turn blue. Mental confusion. Loss of coordination."],
          ["8–10%", C.red, "Fainting and nausea. Immediate rescue required."],
          ["6–8%", "#dc2626", "CAUSES DEATH within minutes without rescue."],
          ["> 21% (enriched)", C.purple, "Highly dangerous — flammable materials burn violently. Hair, clothing and oil-soaked materials ignite easily. Never use pure oxygen to ventilate a confined space."],
        ].map(([k, c, d]) => (
          <div key={k} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            <div style={{ minWidth: 70, padding: "3px 6px", background: `${c}22`, border: `1px solid ${c}44`, borderRadius: 8, textAlign: "center", fontWeight: 900, fontSize: 11, color: c }}>{k}</div>
            <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.4 }}>{d}</div>
          </div>
        ))}
      </Card>

      <Card accent={C.purple}>
        <STitle accent={C.purple}>Atmospheric Testing — Mandatory Sequence</STitle>
        <div style={{ fontSize: 11.5, color: C.muted, marginBottom: 10, lineHeight: 1.5 }}>
          Must always be performed in this <strong style={{ color: C.text }}>exact order</strong> — presence of certain gases interferes with the accuracy of other sensors.
        </div>
        {[["Step 1", "OXYGEN CONTENT", "Check for deficiency (below 19.5%) OR enrichment (above 21%). Must be within safe range before proceeding."], ["Step 2", "FLAMMABLE GASES & VAPOURS", "Check for explosive or combustible atmosphere risks."], ["Step 3", "TOXIC AIR CONTAMINANTS", "Check for toxic gases that could cause illness or asphyxiation even at safe oxygen levels."]].map(([s, t, d]) => (
          <div key={s} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 32, height: 32, background: `${C.purple}22`, border: `1px solid ${C.purple}44`, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 11, color: C.purple, flexShrink: 0 }}>{s}</div>
            <div><div style={{ fontWeight: 700, fontSize: 12.5, color: "#d8b4fe" }}>{t}</div><div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.4 }}>{d}</div></div>
          </div>
        ))}
        <div style={{ padding: "8px 10px", background: `${C.orange}15`, border: `1px solid ${C.orange}33`, borderRadius: 8, fontSize: 11.5, color: C.orange, marginTop: 8 }}>
          Test at three levels: 🌬️ <strong>Top</strong> (light gases like methane CH₄) · ↔️ <strong>Middle</strong> (air-density gases like CO) · 🪨 <strong>Bottom</strong> (heavy gases like H₂S)
        </div>
      </Card>

      <Card accent={C.blue}>
        <STitle accent={C.blueLight}>Entry Procedure — 12 Steps</STitle>
        <Bul accent={C.blue} items={["1. Conduct pre-entry briefing with all team members", "2. Assemble and check all equipment", "3. Establish acceptable entry conditions", "4. Conduct initial air sampling — in correct sequence (O₂ → Flammable → Toxic)", "5. Execute and complete the Entry Permit", "6. Station Entry Attendant outside — they do NOT enter", "7. Establish continuous atmosphere monitoring", "8. Establish communication system between entrant and attendant", "9. Execute Hot Work Permit if welding or cutting is involved", "10. Post Confined Space Entry Permit at the entry portal", "11. Enter the space", "12. Post-entry debrief if any problems were encountered"]} />
      </Card>

      <Card accent={C.gold}>
        <STitle accent={C.gold}>Entry Team Roles</STitle>
        {[["Authorized Entrant", "Knows the hazards. Recognizes exposure signs. Maintains communication with attendant. Exits immediately if any warning sign or prohibited condition occurs."], ["Standby Attendant", "NEVER enters the space. Monitors from outside. Maintains headcount. Orders evacuation. Summons rescue services. Does not enter even to rescue unless relieved by another attendant and properly equipped."], ["Entry Supervisor", "Verifies all conditions and tests meet permit requirements. Authorizes entry. Signs permit. Terminates entry and cancels permit if a prohibited condition arises."]].map(([t, d]) => (
          <div key={t} style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 12.5, color: C.gold }}>{t}</div>
            <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.4 }}>{d}</div>
          </div>
        ))}
        <div style={{ padding: "8px 10px", background: `${C.red}15`, border: `1px solid ${C.red}33`, borderRadius: 8, fontSize: 11.5, color: "#fca5a5" }}>
          Non-entry rescue is always the <strong>preferred method</strong>. Entry rescue requires trained team + practice rescues at least once every 12 months.
        </div>
      </Card>
    </div>
  );
}

// ── TAB: ELECTRICAL ──────────────────────────────────────────────
function ElecTab() {
  return (
    <div>
      <Card accent={C.gold}>
        <STitle accent={C.gold}>Key Definitions</STitle>
        {[["Current", "Flow of charged particles. Measured in Amperes (A). The quantity that causes harm."], ["Voltage", "Force pushing particles through the circuit. Measured in Volts (V)."], ["Resistance", "Force opposing particle movement. Measured in Ohms (Ω)."], ["Conductor", "Allows free current flow — metals (aluminium, iron, silver, gold) and water."], ["Switch / Isolator", "Guaranteed isolation item. Safe to work behind."], ["Circuit Breaker", "NOT a guaranteed isolation item — breaks high load and creates an arc. Not safe to work behind without LOTO."], ["LOTO", "Lockout/Tagout — personal safety + prevents access by unauthorized persons."]].map(([k, v]) => (
          <div key={k} style={{ display: "flex", gap: 8, padding: "4px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
            <span style={{ color: C.gold, fontWeight: 700, minWidth: 95, flexShrink: 0 }}>{k}</span>
            <span style={{ color: C.muted, lineHeight: 1.4 }}>{v}</span>
          </div>
        ))}
      </Card>

      <Card accent={C.red}>
        <STitle accent="#fca5a5">AC Current Effects on the Body</STitle>
        {[["1 mA", C.green, "Slight tingling sensation"], ["2–9 mA", C.green, "Small shock — noticeable but not immediately dangerous"], ["10–24 mA", C.gold, "Muscles contract. 'No-let-go' response — person cannot release the source voluntarily."], ["25–74 mA", C.orange, "Respiratory muscles may paralyse. Pain. Exit burns visible on skin."], ["75–300 mA", C.red, "Usually fatal. Ventricular fibrillation — heart flutters and fails to pump blood. Entry and exit wounds visible."], [">300 mA", "#b91c1c", "Death almost certain. Survivors face badly burnt internal organs and likely require amputations."]].map(([c, col, d]) => (
          <div key={c} style={{ display: "flex", gap: 10, marginBottom: 7 }}>
            <div style={{ minWidth: 70, padding: "3px 6px", background: `${col}22`, border: `1px solid ${col}44`, borderRadius: 6, textAlign: "center", fontWeight: 800, fontSize: 11, color: col }}>{c}</div>
            <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.4 }}>{d}</div>
          </div>
        ))}
        <div style={{ padding: "8px 10px", background: `${C.red}15`, border: `1px solid ${C.red}33`, borderRadius: 8, fontSize: 11.5, color: "#fca5a5", marginTop: 8 }}>
          Most dangerous current path: hand-to-foot or hand-to-leg — passes through the chest and causes cardiac arrest.
        </div>
      </Card>

      <Card accent={C.blue}>
        <STitle accent={C.blueLight}>Safe Work Procedure — LOTO Steps</STitle>
        <Bul accent={C.blue} items={["1. Visit site and carry out JSA/JHA first", "2. Plan the task execution thoroughly", "3. Assemble all required PPE", "4. Obtain PTW (Permit to Work)", "5. Switch OFF the machine, line or apparatus", "6. Isolate, Lockout and Tagout", "7. Ground/earth the dead circuit — prevents accidental current flow", "8. LIVE-DEAD-LIVE voltage verification — test before, confirm dead, test again", "9. Use all appropriate PPE throughout", "10. Maintain good housekeeping throughout the task", "RULE: LOCKOUT BEFORE WORK. TEST BEFORE TOUCH."]} />
      </Card>

      <Card accent={C.teal}>
        <STitle accent={C.teal}>Electrical Emergency Response</STitle>
        <Bul accent={C.teal} items={["Call for help if unsure what to do — never act alone on electrical emergencies", "Turn off the power source FIRST if possible", "Separate victim from source using a NON-CONDUCTIVE object (dry wood, dry rope — never your bare hands)", "Check for pulse. If unconscious → commence CPR while evacuating to hospital", "For electrical FIRE: Raise alarm → Turn off power → Assess for evacuation → Fight fire with CO₂ or DCP ONLY (never water or foam)"]} />
      </Card>
    </div>
  );
}

// ── TAB: JHA ─────────────────────────────────────────────────────
function JHATab() {
  return (
    <div>
      <Card accent={C.teal}>
        <STitle accent={C.teal}>What Is JHA?</STitle>
        <div style={{ fontSize: 12.5, color: C.muted, lineHeight: 1.7 }}>
          Job Hazard Analysis (JHA) is a technique that focuses on job tasks as a way to identify hazards <strong style={{ color: C.text }}>before they occur</strong>. It examines the relationship between the <strong style={{ color: C.text }}>worker, the task, the tools and the work environment</strong>.
        </div>
        <div style={{ marginTop: 10, padding: "8px 10px", background: `${C.orange}15`, border: `1px solid ${C.orange}33`, borderRadius: 8, fontSize: 11.5, color: C.orange }}>
          A contractor with a poor JHA or who cannot defend it will not get the contract. Organizations use JHA as part of the contractor selection process.
        </div>
      </Card>

      <Card accent={C.gold}>
        <STitle accent={C.gold}>Steps in JHA</STitle>
        {[["1", "Identify scope and JHA objectives", "Define clearly what job is being analyzed and what the purpose of the analysis is."], ["2", "Break down tasks into basic steps", "Observe and document the actual sequence of steps as performed in the field — not how it should be done in theory."], ["3", "Record results", "Document all steps formally in the JHA format."], ["4", "Identify hazards and threats", "For each step: what could go wrong? What is the hazard? Who or what could be harmed?"], ["5", "Assess hazard potential", "Use the risk matrix: likelihood (A–E) × consequence (0–5). Classify as Low, Medium or High."], ["6", "Define control and recovery measures", "Hierarchy: Eliminate → Substitute → Engineer → Administrative → PPE"], ["7", "Summarise", "Compile task steps + hazards identified + controls in place + recovery measures into one document."]].map(([s, t, d]) => (
          <div key={s} style={{ display: "flex", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 26, height: 26, background: `${C.gold}22`, border: `1px solid ${C.gold}44`, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 11, color: C.gold, flexShrink: 0 }}>{s}</div>
            <div><div style={{ fontWeight: 700, fontSize: 12.5, color: C.gold }}>{t}</div><div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.4 }}>{d}</div></div>
          </div>
        ))}
      </Card>

      <Card accent={C.blue}>
        <STitle accent={C.blueLight}>Who Performs JHA</STitle>
        {[["Frontline Workers (Core)", C.teal, "Most vital participants. They break the job into real steps, flag practical hazards, and improve safety compliance through involvement."], ["Line Supervisor (Leader)", C.blue, "Leads the JHA session. Ensures steps are properly sequenced. Communicates findings via toolbox talks before the job starts."], ["HSE Officer (Facilitator)", C.gold, "Does NOT write the JHA alone. Guides risk-rating, ensures hierarchy of controls is followed, ensures legal compliance, archives the document."], ["Technical Engineers (Experts)", C.purple, "Join when tasks involve specialized risks — high-voltage, complex chemical handling, structural lifting calculations."]].map(([t, c, d]) => (
          <div key={t} style={{ borderLeft: `2px solid ${c}`, paddingLeft: 10, marginBottom: 10 }}>
            <div style={{ fontWeight: 700, fontSize: 12.5, color: c }}>{t}</div>
            <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.4 }}>{d}</div>
          </div>
        ))}
        <div style={{ padding: "8px 10px", background: `${C.red}15`, border: `1px solid ${C.red}33`, borderRadius: 8, fontSize: 11.5, color: "#fca5a5" }}>
          Avoid: an HSE officer writing the JHA alone in an office. Effective JHA requires the supervisor, safety professional AND the workers who actually face the hazards.
        </div>
      </Card>
    </div>
  );
}

// ── TAB: JOURNEY ─────────────────────────────────────────────────
function JourneyTab() {
  return (
    <div>
      <Card accent={C.blue}>
        <STitle accent={C.blueLight}>Roles & Responsibilities</STitle>
        {[["Authorising Person", C.gold, "Manager or department head who guarantees the integrity of the Journey Management system. Appoints Journey Managers and is responsible for subordinate compliance."], ["Journey Manager", C.blue, "Plans, monitors and closes out each journey. Initiates emergency procedures if a vehicle is overdue or an accident is reported. Remains responsible until vehicle returns to home base."], ["Driver", C.green, "Responsible for vehicle condition, safe driving, seatbelt and following the Journey Plan. Must not depart without receiving and fully understanding the Journey Plan."], ["Passenger", C.orange, "Must wear seatbelt. Must NOT pressurise driver to deviate from Journey Plan. Ensures no unauthorised passengers are carried."], ["Quartermaster", C.purple, "Marine equivalent of driver. Responsible for vessel, load and passengers. Must not sail during curfew without written authorisation."]].map(([t, c, d]) => (
          <div key={t} style={{ borderLeft: `3px solid ${c}`, paddingLeft: 10, marginBottom: 10 }}>
            <div style={{ fontWeight: 800, fontSize: 12.5, color: c }}>{t}</div>
            <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.4, marginTop: 2 }}>{d}</div>
          </div>
        ))}
      </Card>

      <Card accent={C.gold}>
        <STitle accent={C.gold}>Qualifying Journeys — Require Formal Management</STitle>
        <Bul accent={C.gold} items={["All medium and heavy vehicle journeys", "All inter-state journeys", "All journeys exceeding <strong>100km round trip</strong>", "All journeys at night outside SPDC operational bases", "<strong>Night driving ban: 1830hrs to 0600hrs</strong> — requires written approval from General Manager (Production) or Duty Manager", "All qualifying journeys must be authorised, planned, monitored and formally closed out"]} />
      </Card>

      <Card accent={C.red}>
        <STitle accent="#fca5a5">Journey Management Violations</STitle>
        <Bul accent={C.red} items={["Driving without authority or competence", "Driving with a faulty speedometer", "Driving without recommended prescription glasses", "Driving under the influence of alcohol or drugs", "Operating during curfew hours (1830–0600) without prior written authorisation", "Failure to adhere to ETA or ETD", "Deviating from the approved route without reason", "Non-reporting or concealing an accident or incident", "Failure to wear seatbelt — driver OR passenger", "Tampering with IVMS (In-Vehicle Monitoring System) to render it ineffective", "Any false entry in the Journey Management Form", "Driving or travelling in SPDC vehicle without IVMS installed", "Failure to inspect the vehicle before use"]} />
      </Card>
    </div>
  );
}

// ── TAB: ENVIRONMENT ─────────────────────────────────────────────
function EnviroTab() {
  return (
    <div>
      <Card accent={C.green}>
        <STitle accent={C.green}>4 Strands of Sustainability</STitle>
        {[["1. Human Sustainability", "Capacity for individuals and communities to meet their needs through health, wellbeing and human development."], ["2. Economic Sustainability", "Long-term financial viability through efficient and responsible use of resources."], ["3. Social Sustainability", "Social justice, fair distribution of benefits, promotion of human rights and equitable community conditions."], ["4. Environmental Sustainability", "Meeting present needs without compromising future generations. Uses renewable energy, reduces carbon emissions, recycles materials."]].map(([t, d]) => (
          <div key={t} style={{ marginBottom: 10 }}>
            <div style={{ fontWeight: 800, fontSize: 12.5, color: C.green }}>{t}</div>
            <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.4 }}>{d}</div>
          </div>
        ))}
      </Card>

      <Card accent={C.teal}>
        <STitle accent={C.teal}>Greenhouse Gases</STitle>
        {[["CO₂", C.red, "Primary human-caused climate change driver. Fossil fuels, deforestation, cement production. Lasts thousands of years."], ["Methane CH₄", C.orange, "25× more potent than CO₂ over 100 years. Livestock farming, landfills, gas production."], ["Nitrous Oxide N₂O", C.purple, "Powerful GHG that also degrades the ozone layer. Agricultural fertilizers, fossil fuel combustion."], ["Water Vapour H₂O", C.blue, "Most abundant GHG. Acts as feedback amplifier — warming causes more evaporation."], ["CFCs", C.teal, "Both greenhouse gas AND ozone-depleting. Found in refrigerants, aerosols, solvents. Regulated by Montreal Protocol 1987."]].map(([k, c, d]) => (
          <div key={k} style={{ display: "flex", gap: 10, marginBottom: 8 }}>
            <div style={{ minWidth: 60, padding: "3px 6px", background: `${c}22`, border: `1px solid ${c}44`, borderRadius: 8, textAlign: "center", fontWeight: 800, fontSize: 11, color: c }}>{k}</div>
            <div style={{ fontSize: 11.5, color: C.muted, lineHeight: 1.4 }}>{d}</div>
          </div>
        ))}
      </Card>

      <Expand title="Air Pollution — Causes & Consequences" accent={C.blue}>
        <Bul accent={C.blue} items={["Sources: smoke, particulate dust, gaseous emissions, noise", "Health problems and respiratory disease", "Ozone layer depletion (from CFCs and halons)", "Greenhouse effect and global warming", "Acid rain — kills aquatic life, damages forests and buildings", "Photochemical smog — from vehicle nitrogen oxide + sunlight"]} />
      </Expand>

      <Expand title="Water Pollution — Causes & Consequences" accent={C.teal}>
        <Bul accent={C.teal} items={["Sources: oil spills, industrial effluents, sewage, acid rain", "Contamination of surface and underground drinking water", "Destruction of aquatic life", "Flooding and erosion", "Silting of water bodies", "Raw industrial effluents MUST be treated before release into rivers — this is a legal requirement"]} />
      </Expand>

      <Expand title="Land Pollution — Causes & Consequences" accent={C.orange}>
        <Bul accent={C.orange} items={["Sources: chemicals draining into ground, agrochemicals, oil spills, refuse", "Reduced soil fertility", "Contamination of underground water", "Reduced land use — land becomes unusable", "Public health hazards"]} />
      </Expand>

      <Card accent={C.purple}>
        <STitle accent={C.purple}>Waste Management — 5 Principles</STitle>
        <Bul accent={C.purple} items={["<strong>1. Inventorisation</strong> — Catalogue all waste types, quantities and sources", "<strong>2. Characterisation / Segregation</strong> — Assess physical, chemical and toxicological properties. Separate at source.", "<strong>3. Minimisation — 4Rs:</strong> Reduce → Reuse → Recycle → Recover", "<strong>4. Treatment</strong> — Thermal, physical, biological or chemical treatment before disposal", "<strong>5. Disposal</strong> — Surface discharge, re-injection, bio-treatment, landfill or incineration as appropriate", "Hazardous waste must be monitored from 'cradle to grave' — this is a legal requirement in Nigeria"]} />
      </Card>

      <Card accent={C.gold}>
        <STitle accent={C.gold}>Nigerian Environmental Legal Framework</STitle>
        <Bul accent={C.gold} items={["Petroleum Act 1969 — Nigeria's first enabling environmental law", "DPR — Department of Petroleum Resources (Decree No. 33, April 1977)", "FEPA — Federal Environmental Protection Agency (Decree No. 58, 1988) — now replaced", "Federal Ministry of Environment — established 1999", "EIA Decree No. 86, 1992 — mandatory environmental assessment for all new major projects", "NESREA — National Environmental Standards and Regulations Enforcement Agency", "NOSDRA — National Oil Spill Detection and Response Agency", "Montreal Protocol 1987 (ozone) · Basel Convention 1988 (hazardous waste) · Rio Summit 1992"]} />
      </Card>
    </div>
  );
}

// ── TAB: KEY VALUES ──────────────────────────────────────────────
function RefTab() {
  const groups = [
    { title: "⚗️ Oxygen Level Standards", accent: C.blue, items: [["Normal air O₂", "20.9%"], ["Minimum for safe work (no respirator)", "≥ 19.5%"], ["Critical threshold — fire dies AND suffocation starts", "Below 16%"], ["12–14%", "Poor judgment, increased respiration"], ["10–12%", "Blue lips, mental confusion"], ["8–10%", "Fainting, nausea"], ["6–8%", "DEATH"], ["Above 21% (enriched)", "Violent burning of materials"]] },
    { title: "💓 CPR — International Standard (AHA/ILCOR)", accent: C.blue, items: [["Adult ratio", "30 : 2"], ["Adult rate", "100–120/min"], ["Adult depth", "5–6 cm, two hands"], ["Child/Infant ratio", "30 : 2 (single rescuer)"], ["Hands-only option", "30 compressions only — no breaths (untrained bystander)"]] },
    { title: "📘 CPR — NISP HSE L3 Manual Reference", accent: C.gold, items: [["Adult ratio", "15 : 2"], ["Adult rate", "80/min"], ["Adult depth", "4–5 cm, two hands"], ["Child ratio", "5 : 1"], ["Child rate", "80–100/min, one hand, 2.5–3.5 cm"], ["Infant ratio", "5 : 1"], ["Infant rate", "100/min, two fingers, 1.5–2.5 cm"], ["Check heartbeat", "After 1st min, then every 3 min"], ["Two-rescuer rate", "60/min, 5:1"]] },
    { title: "📊 All Frequency Formulas", accent: C.gold, items: [["LTIF", "LTI × 1,000,000 ÷ Man-hours"], ["TRCF", "TRC × 1,000,000 ÷ Man-hours"], ["PSIF", "PSI × 1,000,000 ÷ Man-hours"], ["Severity Rate", "Days Lost × 1,000,000 ÷ Man-hours"], ["RTAF", "RTA × 1,000,000 ÷ km driven"], ["The multiplier is always", "1,000,000 — not 100 or 10,000"], ["LTI includes", "Fatalities + PTD + PPD + LWC"], ["TRC includes", "LTI + RWC + MTC"], ["TRC excludes", "First Aid Cases + Near Misses"], ["Man-hours exclude", "Leave, sickness, absence"]] },
    { title: "🔢 Bird's Triangle Ratios", accent: C.orange, items: [["Near misses (base)", "600"], ["Property damage accidents", "30"], ["Minor injuries", "10"], ["Serious or fatal (top)", "1"], ["Hidden costs vs direct", "4× the direct costs"], ["4Es of Prevention", "Engineering · Education · Enforcement · Encouragement"]] },
    { title: "🔊 Noise Standards (Mineral Oils Regulations 1997)", accent: C.purple, items: [["Hearing protection required at", "≥ 85 dBA (8-hour TWA)"], ["Absolute exposure limit", "115 dBA — never at any duration"], ["Max at nearest residential (night)", "50 dBA"], ["Audiometric testing", "Annually for workers in high noise areas"]] },
    { title: "🚗 Journey Management Key Numbers", accent: C.teal, items: [["Night driving ban", "1830hrs to 0600hrs"], ["Qualifying distance (round trip)", "Above 100km"], ["Qualifying trip types", "Medium/heavy vehicles, interstate, night outside base"], ["Fire extinguisher inspection", "At least twice yearly"]] },
    { title: "📋 Document & System Part Counts", accent: C.blue, items: [["Factories Act 1990", "11 Parts"], ["HSE Case", "7 Parts"], ["ISO 14001 Environmental Management System", "5 Elements"], ["Minimum Health Management Standards", "7 Standards"], ["Waste Management Principles", "5 Steps"], ["Mineral Oils Safety Regulations 1997", "5 Parts"], ["Confined space atmospheric testing steps", "3 — O₂ first, then Flammable, then Toxic"]] },
    { title: "🌡️ Flash Points (Lowest to Highest)", accent: C.red, items: [["Petrol / Gasoline", "−45°C (most dangerous)"], ["Jet A1", "43°C"], ["Kerosene", "49°C"], ["Diesel", "60°C"], ["Heavy Fuel Oil", "93°C"], ["Lubrication Oil", "148°C (hardest to ignite)"]] },
  ];

  return (
    <div>
      <Card accent={C.gold}>
        <STitle accent={C.goldLight}>Cross-Reference Master Sheet</STitle>
        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.6 }}>
          Every critical number, formula, ratio and standard in one place. Tap any section to expand. Use this to quickly verify values when completing reports, investigations or audits in the field.
        </div>
      </Card>
      {groups.map((g, i) => (
        <Expand key={i} title={g.title} accent={g.accent}>
          <div style={{ marginTop: 8 }}>
            {g.items.map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "5px 0", borderBottom: `1px solid ${C.border}`, fontSize: 12 }}>
                <span style={{ color: C.muted, flex: 1 }}>{k}</span>
                <span style={{ fontWeight: 800, color: g.accent, textAlign: "right", marginLeft: 8 }}>{v}</span>
              </div>
            ))}
          </div>
        </Expand>
      ))}

      <Card accent={C.red}>
        <STitle accent="#fca5a5">Common Professional Errors to Avoid</STitle>
        {[
          ["PTW", "is ADMINISTRATIVE control — not engineering"],
          ["Accident investigation", "is to PREVENT RECURRENCE — not to punish"],
          ["Near miss", "is NOT an accident — but MUST still be reported"],
          ["HSE Case", "DEMONSTRATES ALARP — the HSE-MS is what ACHIEVES it"],
          ["Clean water", "is a RESOURCE — not a threat to environment"],
          ["Increased community awareness", "is a BENEFIT of mobilization — not a challenge"],
          ["LTI", "excludes RWC and MTC"],
          ["LTIF multiplier", "is 1,000,000 — not 100 or 10,000"],
          ["Standby Attendant", "NEVER enters a confined space to rescue"],
          ["Below 16% O₂", "BOTH fire dies AND human suffocation begins — simultaneously"],
        ].map(([k, v], i) => (
          <div key={i} style={{ display: "flex", gap: 8, marginBottom: 6, fontSize: 12 }}>
            <span style={{ color: C.red, flexShrink: 0 }}>→</span>
            <span><strong style={{ color: C.text }}>{k}</strong> <span style={{ color: C.muted }}>{v}</span></span>
          </div>
        ))}
      </Card>
    </div>
  );
}

