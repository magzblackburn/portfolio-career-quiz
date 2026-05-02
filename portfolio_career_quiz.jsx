import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');`;

// ─── Types ────────────────────────────────────────────────────────────────────

const TYPES = {
  STABILIZER: {
    id: "STABILIZER",
    label: "The Stabilizer",
    tagline: "Anchored income. Creative freedom on your own terms.",
    combo: "Corporate or Fractional Role + Content Creator",
    streams: ["Steady salary or retainer (your anchor)", "Content creation — newsletter, video, social", "Brand deals or affiliate income over time"],
    description: "You're not ready to go all-in on uncertainty — and you don't have to. Your portfolio career is built on a reliable income foundation with a creative outlet layered on top. Over time, that creative channel grows into something that has its own momentum. You get to build in public without betting the rent on it.",
    forYou: "You value security but crave expression. You're good at your job and you don't hate it — you just want more of yourself in your working life.",
    nextStep: "Start the content channel now, while you still have the stability to experiment without pressure.",
    color: "#6B8F71",
    emoji: "🌿",
  },
  EXPERT: {
    id: "EXPERT",
    label: "The Expert Advisor",
    tagline: "Deep work. High trust. Premium relationships.",
    combo: "Fractional Work + 1:1 Coaching or Mentoring",
    streams: ["Fractional role (2–3 days/week retainer)", "1:1 coaching or mentoring clients", "Occasional advisory or consulting days"],
    description: "You're the kind of person people seek out specifically. Your portfolio career is built around your expertise — in one lane as a fractional leader bringing that expertise to growing companies, and in another as a coach or mentor helping individuals navigate the territory you've already crossed.",
    forYou: "You love working closely with people, you have deep skills in a specific domain, and you want to make serious income without being trapped in one company's org chart.",
    nextStep: "Identify your fractional offer first — it's your fastest path to premium income — then start taking 1:1 clients alongside it.",
    color: "#8B6B8F",
    emoji: "💎",
  },
  EDUCATOR: {
    id: "EDUCATOR",
    label: "The Educator",
    tagline: "Teach what you know. Scale what works.",
    combo: "Content Creator + Group Cohorts or Courses",
    streams: ["Consistent content (newsletter, podcast, video)", "Group cohort or course launches", "Digital products between launches"],
    description: "You believe the most powerful thing you can do is help a lot of people at once. Your portfolio career is built around building an audience through content and then converting that audience into learners — in structured cohorts, live courses, or self-paced programs.",
    forYou: "You have ideas you want to teach, a perspective people find useful, and the patience to build an audience before you build the product.",
    nextStep: "Start the content now, stay consistent for 90 days, and run a small beta cohort before building anything elaborate.",
    color: "#C4622D",
    emoji: "✏️",
  },
  CONNECTOR: {
    id: "CONNECTOR",
    label: "The Connector",
    tagline: "Build the room. Own the relationship.",
    combo: "Community Builder + One-Off Consulting",
    streams: ["Paid community (membership or subscription)", "One-off consulting engagements", "Events, workshops, or retreats"],
    description: "You're at your best when you're bringing people together. Your portfolio career is built around cultivating a community of people who share a problem, an identity, or a goal — and layering consulting or event work on top of the trust that builds inside it.",
    forYou: "You're a natural host and connector. You remember people. You make introductions. And you've noticed that the most valuable thing about your career isn't what you know — it's who you know and how you make them feel.",
    nextStep: "Start a free community first (Slack, Substack, WhatsApp). Prove people want to gather. Charge for it when they'd miss it.",
    color: "#C4843A",
    emoji: "🔗",
  },
  FREEAGENT: {
    id: "FREEAGENT",
    label: "The Free Agent",
    tagline: "Maximum variety. Minimum commitments.",
    combo: "Freelance Consulting + Digital Products or Passive Income",
    streams: ["Project-based consulting clients (varied)", "A digital product or tool that sells without you", "Retainer client or two for baseline stability"],
    description: "You want freedom in the most literal sense — different work, different clients, different weeks. Your portfolio career is deliberately non-linear, mixing consulting work that comes in project form with something that generates income when you're not working. You build a life you don't need a holiday from.",
    forYou: "You get bored with the same client for too long. You love novelty, variety, and the satisfaction of solving a discrete problem and moving on. You're good at a lot of things and you're tired of choosing just one.",
    nextStep: "Land two or three short consulting projects first. Then use the breathing room to build a digital product from problems you keep solving manually.",
    color: "#4A7C9E",
    emoji: "✈️",
  },
  MAKER: {
    id: "MAKER",
    label: "The Creative Maker",
    tagline: "Make things. Sell them. Keep making.",
    combo: "Creative Services + Digital Products or Templates",
    streams: ["Creative client work (design, writing, strategy, etc.)", "Digital products — templates, toolkits, guides", "Licensing or productised services"],
    description: "You have a maker's heart. You love producing things — for clients, for an audience, for the internet at large. Your portfolio career combines client-facing creative work with a product layer that keeps generating income from things you made once.",
    forYou: "You're talented with a creative skill and you've already thought about turning it into something scalable. You want to keep making, not keep managing people or maintaining long retainerships.",
    nextStep: "Package your most-requested service into a productised offer, then create one digital product from the process behind it.",
    color: "#9E6B4A",
    emoji: "🎨",
  },
};

// ─── Questions ────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 1,
    q: "What does your ideal Monday morning look like?",
    answers: [
      { text: "I know exactly what I'm doing — there's a clear structure and I can settle in.", types: ["STABILIZER", "EXPERT"] },
      { text: "I'm deep in a project for someone who really needs what I know.", types: ["EXPERT", "FREEAGENT"] },
      { text: "I'm creating — writing, filming, designing — something for an audience.", types: ["EDUCATOR", "MAKER"] },
      { text: "I'm in the middle of conversations, connections, or community energy.", types: ["CONNECTOR", "EDUCATOR"] },
      { text: "Something completely different from last Monday. Variety is the whole point.", types: ["FREEAGENT", "MAKER"] },
    ],
  },
  {
    id: 2,
    q: "How do you feel about income unpredictability?",
    answers: [
      { text: "I need a stable baseline — variable income keeps me anxious.", types: ["STABILIZER", "EXPERT"] },
      { text: "I'm okay with variation if I have a clear pipeline of clients.", types: ["EXPERT", "CONNECTOR"] },
      { text: "I want income that doesn't always require me to show up.", types: ["EDUCATOR", "MAKER"] },
      { text: "Honestly, I'd rather trade predictability for freedom.", types: ["FREEAGENT", "MAKER"] },
    ],
  },
  {
    id: 3,
    q: "Your favourite way to help someone is…",
    answers: [
      { text: "One-on-one, closely, over time. Real depth with real people.", types: ["EXPERT", "STABILIZER"] },
      { text: "In a group — I love the energy when many people are learning together.", types: ["EDUCATOR", "CONNECTOR"] },
      { text: "By creating something they can use on their own terms, anytime.", types: ["MAKER", "EDUCATOR"] },
      { text: "By building the space where people help each other.", types: ["CONNECTOR", "FREEAGENT"] },
    ],
  },
  {
    id: 4,
    q: "What's your relationship with content creation?",
    answers: [
      { text: "I love it — sharing ideas online feels natural and genuinely fun.", types: ["EDUCATOR", "STABILIZER"] },
      { text: "I'd do it if it helped bring in clients, but it's not my priority.", types: ["EXPERT", "FREEAGENT"] },
      { text: "I create things, but I'd rather sell them than post about them.", types: ["MAKER", "FREEAGENT"] },
      { text: "I love content specifically when it's for a community I care about.", types: ["CONNECTOR", "EDUCATOR"] },
    ],
  },
  {
    id: 5,
    q: "When you imagine your working life 2 years from now, what stands out most?",
    answers: [
      { text: "I've built something with an audience — people follow what I create.", types: ["EDUCATOR", "STABILIZER"] },
      { text: "I'm the person people refer to when they have a specific problem to solve.", types: ["EXPERT", "FREEAGENT"] },
      { text: "I've built a community people would be gutted to lose access to.", types: ["CONNECTOR"] },
      { text: "I have products or work out in the world generating income without me.", types: ["MAKER", "EDUCATOR"] },
      { text: "My calendar looks different every week and I love it that way.", types: ["FREEAGENT", "CONNECTOR"] },
    ],
  },
  {
    id: 6,
    q: "How do you feel about selling your services?",
    answers: [
      { text: "I prefer content or community to do the heavy lifting — inbound all the way.", types: ["EDUCATOR", "CONNECTOR"] },
      { text: "I like 1:1 conversations. Selling feels honest when I know I can help.", types: ["EXPERT", "STABILIZER"] },
      { text: "I want systems and products that sell so I don't have to pitch constantly.", types: ["MAKER", "FREEAGENT"] },
      { text: "I like short outreach bursts when I have space — not ongoing sales.", types: ["FREEAGENT", "CONNECTOR"] },
    ],
  },
  {
    id: 7,
    q: "Complete the sentence: 'The thing I want most from my work is…'",
    answers: [
      { text: "…security AND self-expression. Both. Not one or the other.", types: ["STABILIZER", "EXPERT"] },
      { text: "…to be recognised as the go-to person in my space.", types: ["EXPERT", "EDUCATOR"] },
      { text: "…to reach a lot of people without trading more hours for it.", types: ["EDUCATOR", "MAKER"] },
      { text: "…to build something that feels like mine and brings people together.", types: ["CONNECTOR", "MAKER"] },
      { text: "…the freedom to keep changing what I do and who I do it for.", types: ["FREEAGENT", "CONNECTOR"] },
    ],
  },
];

// ─── Scoring ─────────────────────────────────────────────────────────────────

function getResult(answers) {
  const scores = Object.keys(TYPES).reduce((a, k) => ({ ...a, [k]: 0 }), {});
  answers.forEach(({ types }) => {
    types.forEach((t, i) => { scores[t] += i === 0 ? 2 : 1; });
  });
  return Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const S = {
  wrap: {
    minHeight: "100vh",
    background: "#FAF6F1",
    fontFamily: "'DM Sans', sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "40px 20px 80px",
    position: "relative",
    overflow: "hidden",
  },
  grain: {
    position: "fixed", inset: 0, opacity: 0.04, pointerEvents: "none", zIndex: 0,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    backgroundSize: "200px 200px",
  },
  circle: (color) => ({
    position: "fixed", borderRadius: "50%", opacity: 0.07, pointerEvents: "none", zIndex: 0,
    background: color,
  }),
  card: {
    position: "relative", zIndex: 1,
    background: "#FFFCF8",
    border: "1px solid #E8E0D5",
    borderRadius: "24px",
    padding: "52px 48px",
    maxWidth: "640px",
    width: "100%",
    boxShadow: "0 4px 40px rgba(0,0,0,0.06)",
  },
  topLabel: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: "#B8A898",
    marginBottom: "28px",
  },
  heroTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "46px",
    lineHeight: 1.1,
    color: "#1C1C1C",
    margin: "0 0 16px",
  },
  heroSub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "16px",
    lineHeight: 1.7,
    color: "#666",
    margin: "0 0 36px",
  },
  btn: (color = "#C4622D") => ({
    display: "inline-block",
    background: color,
    color: "#FFF",
    border: "none",
    borderRadius: "100px",
    padding: "15px 36px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "transform 0.15s, box-shadow 0.15s",
    letterSpacing: "0.01em",
  }),
  progressWrap: {
    display: "flex", gap: "6px", marginBottom: "40px",
  },
  progressDot: (filled, color) => ({
    flex: 1, height: "3px", borderRadius: "2px",
    background: filled ? color : "#E8E0D5",
    transition: "background 0.4s",
  }),
  qNum: (color) => ({
    fontFamily: "'Playfair Display', serif",
    fontSize: "13px",
    color: color,
    marginBottom: "12px",
    fontStyle: "italic",
  }),
  qText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "26px",
    lineHeight: 1.35,
    color: "#1C1C1C",
    marginBottom: "32px",
  },
  answerBtn: (selected, color) => ({
    width: "100%",
    textAlign: "left",
    padding: "16px 20px",
    marginBottom: "10px",
    border: `1.5px solid ${selected ? color : "#E8E0D5"}`,
    borderRadius: "12px",
    background: selected ? color + "12" : "#FFFCF8",
    cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    lineHeight: 1.5,
    color: selected ? "#1C1C1C" : "#444",
    transition: "all 0.18s",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  }),
  radio: (selected, color) => ({
    width: "18px", height: "18px", borderRadius: "50%", flexShrink: 0,
    border: `2px solid ${selected ? color : "#C8BFAF"}`,
    background: selected ? color : "transparent",
    transition: "all 0.18s",
  }),
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "28px",
  },
  ghost: {
    background: "none", border: "none", cursor: "pointer",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px", color: "#999",
    padding: "10px 0",
  },
  resultEmoji: {
    fontSize: "52px", marginBottom: "16px",
  },
  resultType: (color) => ({
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    color: color,
    marginBottom: "10px",
  }),
  resultTitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: "40px",
    lineHeight: 1.15,
    color: "#1C1C1C",
    marginBottom: "12px",
  },
  resultTagline: {
    fontFamily: "'Playfair Display', serif",
    fontStyle: "italic",
    fontSize: "18px",
    color: "#888",
    marginBottom: "28px",
  },
  divider: (color) => ({
    height: "1px", background: color + "30",
    margin: "24px 0",
  }),
  sectionHead: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "11px",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#B8A898",
    marginBottom: "12px",
  },
  combo: (color) => ({
    fontFamily: "'Playfair Display', serif",
    fontSize: "20px",
    color: color,
    fontWeight: 700,
    marginBottom: "20px",
  }),
  bodyText: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "15px",
    lineHeight: 1.75,
    color: "#555",
    marginBottom: "20px",
  },
  streamItem: (color) => ({
    display: "flex", gap: "10px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    lineHeight: 1.6,
    color: "#444",
    marginBottom: "8px",
    alignItems: "flex-start",
  }),
  dot: (color) => ({
    width: "7px", height: "7px", borderRadius: "50%",
    background: color, flexShrink: 0, marginTop: "7px",
  }),
  nextStep: (color) => ({
    background: color + "10",
    border: `1px solid ${color}30`,
    borderLeft: `3px solid ${color}`,
    borderRadius: "8px",
    padding: "16px 18px",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "14px",
    lineHeight: 1.7,
    color: "#444",
    marginBottom: "24px",
  }),
  ctaWrap: {
    textAlign: "center",
    paddingTop: "8px",
  },
  ctaSub: {
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "13px",
    color: "#AAA",
    marginTop: "12px",
  },
};

// ─── Screens ──────────────────────────────────────────────────────────────────

function Intro({ onStart }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={S.card}>
      <div style={S.topLabel}>Portfolio Career Quiz</div>
      <h1 style={S.heroTitle}>What kind of portfolio career is actually right for you?</h1>
      <p style={S.heroSub}>
        There's no one-size-fits-all path to a multi-income career. This 7-question quiz identifies which combination of income streams fits your personality, risk tolerance, and the way you want to spend your time.
      </p>
      <p style={{ ...S.bodyText, fontSize: "14px", marginBottom: "36px" }}>
        Takes about 3 minutes. No right or wrong answers — just honest ones.
      </p>
      <button
        style={{ ...S.btn(), boxShadow: hover ? "0 6px 24px rgba(196,98,45,0.28)" : "none", transform: hover ? "translateY(-1px)" : "none" }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onStart}
      >
        Find my portfolio type →
      </button>
    </div>
  );
}

function Question({ question, qIndex, total, selected, onSelect, onNext, onBack }) {
  const color = "#C4622D";
  const [hover, setHover] = useState(false);
  return (
    <div style={S.card}>
      <div style={S.progressWrap}>
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} style={S.progressDot(i <= qIndex, color)} />
        ))}
      </div>
      <div style={S.qNum(color)}>Question {qIndex + 1} of {total}</div>
      <div style={S.qText}>{question.q}</div>
      <div>
        {question.answers.map((a, i) => (
          <button
            key={i}
            style={S.answerBtn(selected === i, color)}
            onClick={() => onSelect(i)}
          >
            <div style={S.radio(selected === i, color)} />
            {a.text}
          </button>
        ))}
      </div>
      <div style={S.navRow}>
        <button style={S.ghost} onClick={onBack}>
          {qIndex > 0 ? "← Back" : ""}
        </button>
        <button
          style={{
            ...S.btn(selected !== null ? color : "#D0C4B8"),
            cursor: selected !== null ? "pointer" : "not-allowed",
            boxShadow: hover && selected !== null ? "0 6px 24px rgba(196,98,45,0.25)" : "none",
            transform: hover && selected !== null ? "translateY(-1px)" : "none",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => selected !== null && onNext()}
        >
          {qIndex < total - 1 ? "Next →" : "See my result →"}
        </button>
      </div>
    </div>
  );
}

function Result({ typeKey, onRetake }) {
  const t = TYPES[typeKey];
  const [hover, setHover] = useState(false);
  return (
    <div style={S.card}>
      <div style={S.resultEmoji}>{t.emoji}</div>
      <div style={S.resultType(t.color)}>Your Portfolio Career Type</div>
      <h2 style={S.resultTitle}>{t.label}</h2>
      <p style={S.resultTagline}>{t.tagline}</p>

      <div style={S.divider(t.color)} />

      <div style={S.sectionHead}>Your income combination</div>
      <div style={S.combo(t.color)}>{t.combo}</div>
      <div style={{ marginBottom: "20px" }}>
        {t.streams.map((s, i) => (
          <div key={i} style={S.streamItem(t.color)}>
            <div style={S.dot(t.color)} />
            <span>{s}</span>
          </div>
        ))}
      </div>

      <div style={S.divider(t.color)} />

      <div style={S.sectionHead}>What this looks like for you</div>
      <p style={S.bodyText}>{t.description}</p>

      <div style={S.sectionHead}>This fits if…</div>
      <p style={{ ...S.bodyText, fontStyle: "italic", color: "#666" }}>{t.forYou}</p>

      <div style={S.sectionHead}>Your next step</div>
      <div style={S.nextStep(t.color)}>{t.nextStep}</div>

      <div style={{ ...S.divider(t.color), marginBottom: "28px" }} />

      <div style={S.ctaWrap}>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", color: "#1C1C1C", marginBottom: "16px", lineHeight: 1.4 }}>
          Want help designing your specific version of this?
        </p>
        <button
          style={{
            ...S.btn(t.color),
            boxShadow: hover ? `0 6px 24px ${t.color}44` : "none",
            transform: hover ? "translateY(-1px)" : "none",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          Book a free discovery call →
        </button>
        <p style={S.ctaSub}>Not sure yet?</p>
        <button style={{ ...S.ghost, display: "block", margin: "0 auto" }} onClick={onRetake}>
          Retake the quiz
        </button>
      </div>
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("intro"); // intro | quiz | result
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [resultKey, setResultKey] = useState(null);

  const currentAnswer = answers[qIndex];

  function handleSelect(i) {
    const next = [...answers];
    next[qIndex] = i;
    setAnswers(next);
  }

  function handleNext() {
    if (qIndex < QUESTIONS.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      const selected = answers.map((i, qi) => QUESTIONS[qi].answers[i]);
      setResultKey(getResult(selected));
      setScreen("result");
    }
  }

  function handleBack() {
    if (qIndex > 0) setQIndex(qIndex - 1);
    else setScreen("intro");
  }

  function handleRetake() {
    setScreen("intro");
    setQIndex(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setResultKey(null);
  }

  return (
    <>
      <style>{FONTS}</style>
      <div style={S.wrap}>
        <div style={{ ...S.grain }} />
        <div style={{ ...S.circle("#C4622D"), width: 600, height: 600, top: -200, right: -200 }} />
        <div style={{ ...S.circle("#8B6B8F"), width: 400, height: 400, bottom: -100, left: -150 }} />

        {screen === "intro" && <Intro onStart={() => setScreen("quiz")} />}
        {screen === "quiz" && (
          <Question
            question={QUESTIONS[qIndex]}
            qIndex={qIndex}
            total={QUESTIONS.length}
            selected={answers[qIndex]}
            onSelect={handleSelect}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {screen === "result" && <Result typeKey={resultKey} onRetake={handleRetake} />}
      </div>
    </>
  );
}
