import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`;

// ─── Types ────────────────────────────────────────────────────────────────────

const TYPES = {
  STABILIZER: {
    id: "STABILIZER",
    label: "The Stabilizer",
    tagline: "Anchored income. Freedom to build on the side.",
    combo: "Anchor Income + Service-Based Offer",
    streams: ["A reliable anchor: full-time employment with enough money to give you breathing room", "A service-based offer: targeting who you want to help, building off your current skills and experience", "Client income as it grows"],
    description: "You're not ready to go all-in on uncertainty, and you don't have to be. Your portfolio career is built on a reliable \"anchor\" income that gives you room to experiment. Over time, the experiment can give you confidence without having to quit tomorrow.",
    forYou: "You value security but don't want all of your income reliant on one employer. You're good at your job and you don't hate it. You just want more of yourself in your working life.",
    energizes: "Building something that you own, freedom, and creative expression.",
    drains: "Being forced to choose between security and creativity, as if you can't have both.",
    shadow: "The day job can become a place to hide. With no urgency or timeline, it's easy to fall back on the full-time job. Treat it like a real channel with a real cadence, even while it's small.",
    timeline: [
      { when: "Next 90 days", what: "Figure out who you would love to help. Reach out to 5–10 people to hold informational interviews to build your offering." },
      { when: "6 months", what: "Land your first client by sharing your offer to your target audience." },
      { when: "1 year", what: "Decide what you want to do next with your first offer and your full-time role." },
    ],
    whyHeldBack: "You think you have to quit to have a portfolio career. You don't. The stability is exactly what lets you experiment without desperation.",
    nextStep: "Start by figuring out who you want to help and how you can help them while you still have the stability to experiment without pressure.",
    goFurther: [
      { title: "Is growing on LinkedIn the new job security?", url: "https://maggieblackburn.beehiiv.com/p/is-growing-on-linkedin-the-new-job-security" },
      { title: "Create your own stability", url: "https://maggieblackburn.beehiiv.com/p/create-your-own-stability" },
      { title: "What if you literally cannot build alongside your 9-5?", url: "https://maggieblackburn.beehiiv.com/p/what-if-you-literally-cannot-build-alongside-your-9-5" },
    ],
    color: "#3b9db6",
    emoji: "🌿",
  },
  EXPERT: {
    id: "EXPERT",
    label: "The Advisor",
    tagline: "Deep work. High trust. Premium relationships.",
    combo: "High-Trust Client Work + 1:1 Advising",
    streams: ["Your anchor income: Fractional, consulting, or freelance retainers", "1:1 advising or coaching clients", "Occasional advisory days or speaking as you grow"],
    description: "You're the kind of person people seek out specifically. Your portfolio career is built around your expertise: in one lane as a leader bringing that expertise to growing companies, and in another as an advisor/mentor helping individuals navigate the territory you've already crossed.",
    forYou: "You love working closely with people, you have deep skills in a specific domain, and you want to make serious income without being trapped in one company's org chart.",
    energizes: "Deep, high-trust work where you're brought in by name. Being the person someone specifically wanted in the room.",
    drains: "Shallow, transactional, high-volume work. Selling yourself to strangers who don't yet know what you're worth.",
    shadow: "You tend to undercharge and over-deliver, and you can stay trapped trading hours for money with no leverage. Raise your rates and productize the thing you keep repeating.",
    timeline: [
      { when: "Next 90 days", what: "Network. Tell everyone you know that you're interested in fractional and advising opportunities in your area of expertise." },
      { when: "6 months", what: "One or two retainers, plus a handful of advising clients alongside." },
      { when: "1 year", what: "A premium, referral-driven practice you fully control." },
    ],
    whyHeldBack: "You keep waiting to feel 'expert enough.' But the people who seek you out already think you are. The gap is positioning, not ability.",
    nextStep: "Identify your fractional offer first: it's your fastest path to premium income. Then start taking 1:1 advising clients alongside it.",
    goFurther: [
      { title: "From Full-time to Fractional with Emily Hollender", url: "https://maggieblackburn.beehiiv.com/p/from-full-time-to-fractional-with-emily-hollender" },
      { title: "Let's talk about pricing", url: "https://maggieblackburn.beehiiv.com/p/lets-talk-about-pricing" },
    ],
    color: "#573b30",
    emoji: "💎",
  },
  EDUCATOR: {
    id: "EDUCATOR",
    label: "The Educator",
    tagline: "Teach what you know. Scale what works.",
    combo: "1:1 Coaching or Mentoring + Group Programs",
    streams: ["Your anchor income / premium offer: 1:1 coaching, mentoring, or advising", "Your signature offer: Group cohort, workshop, or mastermind launches", "Content or community to build your audience over time"],
    description: "You love teaching and you're good at it. Your portfolio career combines the intimacy of 1:1 coaching with the scale and energy of group programs. The 1:1 work funds and informs the group work, and the group work lets you help more people at once without multiplying your hours.",
    forYou: "You want to develop a methodology or a transformation you help people through, and you want to reach more people without burning out on back-to-back solo calls.",
    energizes: "Watching someone transform, and the energy of a room full of people learning at once. Impact that scales beyond your calendar.",
    drains: "Back-to-back solo calls with no leverage. Being stuck one-to-one forever with no way to reach more people. Selling constantly. You want to teach, not pitch.",
    shadow: "You'll build the elaborate course before anyone's asked for it. Perfectionism delays the launch. Run the tiny beta first, then build what people actually need.",
    timeline: [
      { when: "Next 90 days", what: "Take a handful of 1:1 clients to sharpen your framework and proof." },
      { when: "6 months", what: "Run a small beta cohort using what you learned 1:1." },
      { when: "1 year", what: "A repeatable group program you can iterate on over time." },
    ],
    whyHeldBack: "Perfectionism. You care a lot about your clients and spend time delivering them the best experience, leaving you little time to promote and get new clients.",
    nextStep: "Start with a handful of 1:1 clients to sharpen your framework. Then package what you learn into a small group cohort with a waitlist.",
    goFurther: [
      { title: "Selling from the heart", url: "https://maggieblackburn.beehiiv.com/p/how-to-sell-without-feeling-salesy" },
      { title: "How I built this: my Just Start career experiment", url: "https://maggieblackburn.beehiiv.com/p/how-i-built-just-start" },
    ],
    color: "#3b9db6",
    emoji: "✏️",
  },
  CONNECTOR: {
    id: "CONNECTOR",
    label: "The Connector",
    tagline: "Build the room. Own the relationship.",
    combo: "Community + Consulting or Coaching",
    streams: ["Anchor income: Consulting or coaching engagements", "Paid community (membership or subscription)", "Events, workshops, or retreats"],
    description: "You're at your best when you're bringing people together. Your portfolio career is built around cultivating a community of people who share a problem, an identity, or a goal. Consulting or coaching engagements give you the \"anchor\" income, while you build out your community.",
    forYou: "You're a natural host and connector. You remember people. You make introductions. And you've noticed that the most valuable thing about your career isn't what you know. It's who you know and how you make them feel.",
    energizes: "Bringing people together and being the hub they orbit. Watching connections you made turn into something real.",
    drains: "Isolated, heads-down solo work. Cold, relationship-free transactions with no human thread.",
    shadow: "You'll give endless value for free and struggle to convert free events to a paid community.",
    timeline: [
      { when: "Next 90 days", what: "Decide who your community is for and how it will provide real value. Talk to target community members!" },
      { when: "6 months", what: "Introduce a paid tier once you've proved value and is something people would miss." },
      { when: "1 year", what: "A self-sustaining community, plus paid consulting and coaching engagements as needed." },
    ],
    whyHeldBack: "You undervalue connection because it comes so easily to you. The thing you do effortlessly is exactly the thing others will pay for.",
    nextStep: "Start a free community first (Slack, Substack, WhatsApp). Prove people want to gather. Charge for it when they'd miss it.",
    goFurther: [
      { title: "How to build a support system when you're pivoting", url: "https://maggieblackburn.beehiiv.com/p/how-to-build-a-support-system-when-youre-pivoting-to-something-new" },
      { title: "5K on LinkedIn & 7 habits that got me here", url: "https://maggieblackburn.beehiiv.com/p/5k-on-linkedin-and-7-habits-that-got-me-here" },
    ],
    color: "#573b30",
    emoji: "🔗",
  },
  CREATOR: {
    id: "CREATOR",
    label: "The Creator",
    tagline: "Build an audience. Monetize what you love.",
    combo: "Content Platform + Multiple Monetization Streams",
    streams: ["A content channel you own (newsletter, podcast, YouTube, or social)", "Brand partnerships, sponsorships, or affiliate income", "Digital products, paid community, or memberships"],
    description: "You want to build something in public—and get paid for it. Your portfolio career is built around a content channel you own, with multiple monetization streams that grow alongside your audience. The goal isn't one viral moment. It's compounding: every piece of content you publish makes the next one more valuable.",
    forYou: "You have ideas you want to share and ultimately want to scale your impact to more people.",
    energizes: "Seeing your content reach people you've never met. Building something that earns while you sleep. Having a platform that's genuinely yours.",
    drains: "Client work with no creative control. Being paid for your time instead of your ideas. Doing work that disappears the moment you stop showing up.",
    shadow: "Chasing trends and platform algorithms instead of building something that compounds. Consistency over time matters more than any single piece of content.",
    timeline: [
      { when: "Next 90 days", what: "Pick one long-form piece of content you OWN (e.g. newsletter or podcast), one social channel (e.g. LinkedIn, Instagram), and one topic you could talk about for years. Publish consistently—1x a week is okay to start!" },
      { when: "6 months", what: "Increase your publishing rhythm to 3x per week and set up your first monetization experiment." },
      { when: "1 year", what: "Multiple income streams tied to your content—partnerships, products, or a paid community." },
    ],
    whyHeldBack: "You think you need a bigger audience before you can monetize. You don't. The right 1,000 people are worth more than a million passive followers.",
    nextStep: "Pick your platform and your topic. Commit to 90 days of consistent publishing before you change anything.",
    goFurther: [
      { title: "What if you didn't have to choose one thing?", url: "https://maggieblackburn.beehiiv.com/p/what-if-you-didnt-have-to-choose-one-thing-portfolio-career" },
      { title: "How to experiment your way to a career you actually like", url: "https://maggieblackburn.beehiiv.com/p/how-to-experiment-your-way-to-a-career-you-actually-like" },
    ],
    color: "#3b9db6",
    emoji: "✈️",
  },
};

// ─── Questions ────────────────────────────────────────────────────────────────

const QUESTIONS = [
  {
    id: 1,
    q: "What does your ideal Monday morning look like?",
    answers: [
      { text: "I'm working on a team at a company I believe in.", types: ["STABILIZER", "EXPERT"] },
      { text: "I'm deep in work for a client who specifically needs my expertise.", types: ["EXPERT", "CONNECTOR"] },
      { text: "I'm teaching or coaching—helping someone work through a real challenge.", types: ["EDUCATOR", "STABILIZER"] },
      { text: "I'm in the middle of conversations, introductions, or building something with people.", types: ["CONNECTOR", "EDUCATOR"] },
      { text: "I'm creating—writing, recording, or publishing something for my audience.", types: ["CREATOR", "EDUCATOR"] },
    ],
  },
  {
    id: 2,
    q: "How do you feel about income unpredictability?",
    answers: [
      { text: "I need a reliable baseline—variable income stresses me out more than I want to admit.", types: ["STABILIZER", "EXPERT"] },
      { text: "I can handle variation if I have a clear client pipeline I trust.", types: ["EXPERT", "STABILIZER"] },
      { text: "I want income tied to the transformation I provide—programs and clients who invest to grow.", types: ["EDUCATOR", "CONNECTOR"] },
      { text: "I want content and products to generate income whether or not I show up that day.", types: ["CREATOR", "EDUCATOR"] },
      { text: "I'm okay with unpredictability as long as I have strong relationships and referrals.", types: ["CONNECTOR", "STABILIZER"] },
    ],
  },
  {
    id: 3,
    q: "Your favorite way to help someone is...",
    answers: [
      { text: "One-on-one, over time. Real depth with real people I know well.", types: ["EXPERT", "STABILIZER"] },
      { text: "In a group—the energy when people learn and grow together is unmatched.", types: ["EDUCATOR", "CONNECTOR"] },
      { text: "Through content or products they can use on their own terms, anytime.", types: ["CREATOR", "EDUCATOR"] },
      { text: "By making the right introduction or building the room where the right people meet.", types: ["CONNECTOR", "EXPERT"] },
      { text: "By being a steady, trusted sounding board—someone they can reliably count on.", types: ["STABILIZER", "CONNECTOR"] },
    ],
  },
  {
    id: 4,
    q: "What's your relationship with content creation?",
    answers: [
      { text: "It's central to my plan—building an audience online is how I'll grow.", types: ["CREATOR", "EDUCATOR"] },
      { text: "I'd use it to attract clients, but referrals and relationships are my real engine.", types: ["EXPERT", "STABILIZER"] },
      { text: "I haven't done much yet, but I can see the value and I'd like to start building something.", types: ["STABILIZER", "CREATOR"] },
      { text: "I love it when it's in service of a community I'm genuinely invested in building.", types: ["CONNECTOR", "EDUCATOR"] },
      { text: "I see it as my teaching medium—content is how I share my methodology at scale.", types: ["EDUCATOR", "CREATOR"] },
    ],
  },
  {
    id: 5,
    q: "When you imagine your working life 2 years from now, what stands out most?",
    answers: [
      { text: "I've built a stable income stream alongside my job that gives me real options.", types: ["STABILIZER", "EXPERT"] },
      { text: "I have a small number of high-trust clients who rely on me for serious ongoing work.", types: ["EXPERT", "CONNECTOR"] },
      { text: "I'm running coaching or group programs—people pay me to teach what I know.", types: ["EDUCATOR", "STABILIZER"] },
      { text: "I've built a community people couldn't imagine losing.", types: ["CONNECTOR", "EDUCATOR"] },
      { text: "I've built a real audience—people follow my content and I monetize it in multiple ways.", types: ["CREATOR", "EDUCATOR"] },
    ],
  },
  {
    id: 6,
    q: "How do you feel about selling your services or products?",
    answers: [
      { text: "I like 1:1 conversations—selling feels honest when I know I can genuinely help.", types: ["EXPERT", "STABILIZER"] },
      { text: "I want programs and systems that sell themselves—structure over constant hustle.", types: ["STABILIZER", "EDUCATOR"] },
      { text: "I prefer being pulled in by referrals and trust, not pitching cold.", types: ["CONNECTOR", "EXPERT"] },
      { text: "I want my content to do the selling—I'd rather publish than pitch.", types: ["CREATOR", "CONNECTOR"] },
      { text: "I love when my students' results sell for me—transformation speaks louder than outreach.", types: ["EDUCATOR", "CREATOR"] },
    ],
  },
  {
    id: 7,
    q: "Complete the sentence: 'The thing I want most from my work is...'",
    answers: [
      { text: "...the security to build something on the side without risking everything.", types: ["STABILIZER", "CONNECTOR"] },
      { text: "...to be the trusted expert people call when something important comes up.", types: ["EXPERT", "STABILIZER"] },
      { text: "...to help people transform and build a repeatable business around that transformation.", types: ["EDUCATOR", "EXPERT"] },
      { text: "...to build a room full of the right people and be the reason they know each other.", types: ["CONNECTOR", "EDUCATOR"] },
      { text: "...to build an audience around my ideas and get paid for my perspective.", types: ["CREATOR", "CONNECTOR"] },
    ],
  },
  {
    id: 8,
    q: "Where are you right now?",
    answers: [
      { text: "Employed full-time and curious about what else might be possible.", types: ["STABILIZER", "CONNECTOR"] },
      { text: "Employed but creatively restless—I want to build something that reaches people.", types: ["CREATOR", "STABILIZER"] },
      { text: "Already consulting or freelancing and looking to build more leverage and income.", types: ["EXPERT", "CONNECTOR"] },
      { text: "Running my own business and trying to scale without just adding more hours.", types: ["EDUCATOR", "EXPERT"] },
      { text: "Investing my energy in building relationships and community—that's where my focus is.", types: ["CONNECTOR", "EDUCATOR"] },
    ],
  },
  {
    id: 9,
    q: "What drains you fastest at work?",
    answers: [
      { text: "Uncertainty about income—I need to know the money is actually coming in.", types: ["STABILIZER", "EXPERT"] },
      { text: "Shallow or generic work where I can't go deep or use my real expertise.", types: ["EXPERT", "EDUCATOR"] },
      { text: "Repeating myself one-to-one with no way to reach or impact more people.", types: ["EDUCATOR", "CREATOR"] },
      { text: "Working in isolation—I need people energy, relationships, and real connection.", types: ["CONNECTOR", "EDUCATOR"] },
      { text: "Creating work that disappears—no audience, no ownership, nothing that compounds.", types: ["CREATOR", "CONNECTOR"] },
    ],
  },
  {
    id: 10,
    q: "What's the hardest challenge you're facing right now?",
    answers: [
      { text: "Finding clients or customers consistently.", types: ["STABILIZER", "EXPERT"] },
      { text: "Positioning—I'm not sure how to explain what I do or charge what I'm worth.", types: ["EXPERT", "CONNECTOR"] },
      { text: "Building and launching a scalable offer or program I can teach repeatedly.", types: ["EDUCATOR", "STABILIZER"] },
      { text: "Growing and monetizing a community that people genuinely value.", types: ["CONNECTOR", "EDUCATOR"] },
      { text: "Building an audience and getting visible enough to attract real opportunities.", types: ["CREATOR", "STABILIZER"] },
    ],
  },
];

// ─── Scoring ─────────────────────────────────────────────────────────────────

// Deterministic tie-break order when scores are equal
const PRIORITY = ["STABILIZER", "EXPERT", "EDUCATOR", "CONNECTOR", "CREATOR"];

function getResult(answers) {
  const scores = Object.keys(TYPES).reduce((a, k) => ({ ...a, [k]: 0 }), {});
  const primaryHits = Object.keys(TYPES).reduce((a, k) => ({ ...a, [k]: 0 }), {});
  answers.forEach(({ types }) => {
    types.forEach((t, i) => {
      scores[t] += i === 0 ? 2 : 1;
      if (i === 0) primaryHits[t] += 1;
    });
  });
  const ranked = Object.keys(TYPES).sort((a, b) =>
    (scores[b] - scores[a]) ||
    (primaryHits[b] - primaryHits[a]) ||
    (PRIORITY.indexOf(a) - PRIORITY.indexOf(b))
  );
  const total = Object.values(scores).reduce((s, v) => s + v, 0) || 1;
  return {
    primary: ranked[0],
    secondary: ranked[1],
    scores,
    // how dominant the primary is, 0–100
    strength: Math.round((scores[ranked[0]] / total) * 100),
  };
}

// ─── Brand tokens ────────────────────────────────────────────────────────────
const BROWN = "#573b30";
const BLUE  = "#3b9db6";
const BG    = "#341d12";
const CARD  = "#fdfbf8";
const TEXT  = "#2e1f18";
const MID   = "#000000";
const BORDER= "#ddd5cc";

// Brand palette—Primary #341d12, Secondary #3b9db6, Tertiary #cdd492 (+ white/black only)
const GOLD   = "#ffffff"; // italic accent word + meta text
const CREAM  = "#ffffff"; // headline + body on dark bg
const CREAM_MUTED = "#ffffff"; // softer body copy

// ─── Ornamental border band (top & bottom) ───────────────────────────────────

// ─── Simple line icons per archetype ──────────────────────────────────────────
function TypeIcon({ id, color, size = 26 }) {
  const common = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth: 1.5, strokeLinecap: "round", strokeLinejoin: "round", xmlns: "http://www.w3.org/2000/svg" };
  switch (id) {
    case "STABILIZER": // anchor
      return (<svg {...common}><circle cx="12" cy="5" r="2" /><path d="M12 7v13" /><path d="M5 12a7 7 0 0 0 14 0" /><path d="M8 12H5M19 12h-3" /></svg>);
    case "EXPERT": // diamond
      return (<svg {...common}><path d="M6 3h12l3 6-9 12L3 9Z" /><path d="M3 9h18M9 3 6 9l6 12 6-12-3-6" /></svg>);
    case "EDUCATOR": // pencil
      return (<svg {...common}><path d="M4 20h4L19 9a2 2 0 0 0-3-3L5 17v3Z" /><path d="M14 7l3 3" /></svg>);
    case "CONNECTOR": // connected nodes
      return (<svg {...common}><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="12" cy="18" r="2.5" /><path d="M8.5 6H15.5M7.1 8.2 10.9 15.8M16.9 8.2 13.1 15.8" /></svg>);
    case "CREATOR": // palette
      return (<svg {...common}><path d="M12 3C7 3 3 7 3 12s4 9 9 9c.6 0 1-.5 1-1v-1.5c0-.3.2-.5.5-.5H16a3 3 0 0 0 3-3C19 7.9 16 3 12 3z" /><circle cx="8.5" cy="11" r="1.3" /><circle cx="12" cy="7.5" r="1.3" /><circle cx="15.5" cy="11" r="1.3" /></svg>);
    default:
      return null;
  }
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const SERIF = "'Times New Roman Condensed', 'Times New Roman', Times, serif";
const SANS  = "'Agrandir', 'Inter', sans-serif";
const SERIF_STYLE = { fontFamily: SERIF, fontStretch: "condensed", letterSpacing: "-0.04em" };

const S = {
  wrap: {
    minHeight: "100vh",
    background: BG,
    fontFamily: SANS,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "80px 20px 100px",
    position: "relative",
    overflow: "hidden",
  },
  card: {
    position: "relative", zIndex: 1,
    background: CARD,
    border: `1px solid ${BORDER}`,
    borderRadius: "20px",
    padding: "52px 48px",
    maxWidth: "640px",
    width: "100%",
    boxShadow: "0 2px 32px rgba(87,59,48,0.08)",
  },
  topLabel: {
    fontFamily: SANS,
    fontSize: "10.5px",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: MID,
    marginBottom: "24px",
  },
  heroTitle: {
    ...SERIF_STYLE,
    fontSize: "48px",
    fontWeight: 400,
    lineHeight: 1.1,
    color: TEXT,
    margin: "0 0 20px",
  },
  heroSub: {
    fontFamily: SANS,
    fontSize: "15.5px",
    lineHeight: 1.75,
    color: MID,
    margin: "0 0 32px",
    fontWeight: 300,
  },
  btn: (color = BROWN) => ({
    display: "inline-block",
    background: color,
    color: "#FFF",
    border: "none",
    borderRadius: "100px",
    padding: "14px 34px",
    fontFamily: SANS,
    fontSize: "14px",
    fontWeight: 500,
    cursor: "pointer",
    transition: "transform 0.15s, box-shadow 0.15s",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
  }),
  progressWrap: {
    display: "flex", gap: "5px", marginBottom: "40px",
  },
  progressDot: (filled, color) => ({
    flex: 1, height: "2px", borderRadius: "2px",
    background: filled ? color : BORDER,
    transition: "background 0.4s",
  }),
  qNum: {
    ...SERIF_STYLE,
    fontSize: "14px",
    fontStyle: "italic",
    color: MID,
    marginBottom: "10px",
  },
  qText: {
    ...SERIF_STYLE,
    fontSize: "27px",
    fontWeight: 400,
    lineHeight: 1.35,
    color: TEXT,
    marginBottom: "32px",
  },
  answerBtn: (selected, color) => ({
    width: "100%",
    textAlign: "left",
    padding: "15px 20px",
    marginBottom: "9px",
    border: `1.5px solid ${selected ? color : BORDER}`,
    borderRadius: "10px",
    background: selected ? color + "12" : CARD,
    cursor: "pointer",
    fontFamily: SANS,
    fontSize: "14.5px",
    lineHeight: 1.55,
    fontWeight: selected ? 400 : 300,
    color: selected ? TEXT : MID,
    transition: "all 0.18s",
    display: "flex",
    alignItems: "center",
    gap: "13px",
  }),
  radio: (selected, color) => ({
    width: "17px", height: "17px", borderRadius: "50%", flexShrink: 0,
    border: `1.5px solid ${selected ? color : BORDER}`,
    background: selected ? color : "transparent",
    transition: "all 0.18s",
  }),
  navRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "30px",
  },
  ghost: {
    background: "none", border: "none", cursor: "pointer",
    fontFamily: SANS,
    fontSize: "13px",
    fontWeight: 400,
    color: MID,
    padding: "10px 0",
    letterSpacing: "0.02em",
  },
  resultEmoji: {
    fontSize: "48px", marginBottom: "14px",
  },
  resultType: (color) => ({
    fontFamily: SANS,
    fontSize: "10.5px",
    fontWeight: 600,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: color,
    marginBottom: "10px",
  }),
  resultTitle: {
    ...SERIF_STYLE,
    fontSize: "42px",
    fontWeight: 400,
    lineHeight: 1.1,
    color: TEXT,
    marginBottom: "10px",
  },
  resultTagline: {
    ...SERIF_STYLE,
    fontStyle: "italic",
    fontSize: "18px",
    color: MID,
    marginBottom: "28px",
    fontWeight: 400,
  },
  divider: (color) => ({
    height: "1px",
    background: color + "28",
    margin: "22px 0",
  }),
  sectionHead: {
    fontFamily: SANS,
    fontSize: "10px",
    fontWeight: 500,
    letterSpacing: "0.16em",
    textTransform: "uppercase",
    color: MID,
    marginBottom: "10px",
  },
  combo: (color) => ({
    ...SERIF_STYLE,
    fontSize: "21px",
    fontWeight: 700,
    color: color,
    marginBottom: "18px",
    lineHeight: 1.3,
  }),
  bodyText: {
    fontFamily: SANS,
    fontSize: "14.5px",
    fontWeight: 300,
    lineHeight: 1.8,
    color: MID,
    marginBottom: "20px",
  },
  streamItem: {
    display: "flex", gap: "10px",
    fontFamily: SANS,
    fontSize: "14px",
    fontWeight: 300,
    lineHeight: 1.6,
    color: MID,
    marginBottom: "7px",
    alignItems: "flex-start",
  },
  dot: (color) => ({
    width: "6px", height: "6px", borderRadius: "50%",
    background: color, flexShrink: 0, marginTop: "8px",
  }),
  nextStep: (color) => ({
    background: color + "0e",
    border: `1px solid ${color}28`,
    borderLeft: `3px solid ${color}`,
    borderRadius: "8px",
    padding: "15px 18px",
    fontFamily: SANS,
    fontSize: "14px",
    fontWeight: 300,
    lineHeight: 1.75,
    color: TEXT,
    marginBottom: "22px",
  }),
  inputLabel: {
    fontFamily: SANS,
    fontSize: "13px",
    fontWeight: 500,
    color: TEXT,
    marginBottom: "8px",
    display: "block",
    letterSpacing: "0.02em",
  },
  input: (focused) => ({
    width: "100%",
    padding: "14px 16px",
    borderRadius: "10px",
    border: `1.5px solid ${focused ? BROWN : BORDER}`,
    background: focused ? "#fff" : "#F7F4F0",
    fontFamily: SANS,
    fontSize: "15px",
    fontWeight: 300,
    color: TEXT,
    outline: "none",
    boxSizing: "border-box",
    transition: "border 0.18s, background 0.18s",
  }),
  formCard: {
    background: "#fff",
    borderRadius: "16px",
    padding: "32px",
    marginTop: "32px",
    boxShadow: "0 2px 20px rgba(87,59,48,0.07)",
  },
  disclaimer: {
    fontFamily: SANS,
    fontSize: "12px",
    fontWeight: 300,
    color: MID,
    textAlign: "center",
    marginTop: "16px",
    lineHeight: 1.6,
  },
  ctaWrap: {
    textAlign: "center",
    paddingTop: "8px",
  },
  ctaSub: {
    fontFamily: SANS,
    fontSize: "12px",
    fontWeight: 300,
    color: MID,
    marginTop: "14px",
    letterSpacing: "0.02em",
  },
};

// ─── Screens ──────────────────────────────────────────────────────────────────

function Intro({ onStart }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{
      width: "100%",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      zIndex: 1,
    }}>
    <div style={{
      flex: 1,
      width: "100%",
      maxWidth: "680px",
      margin: "0 auto",
      boxSizing: "border-box",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "80px 24px 64px",
    }}>
      <h1 style={{
        ...SERIF_STYLE,
        fontSize: "clamp(34px, 7vw, 60px)",
        fontWeight: 400,
        lineHeight: 1.05,
        color: CREAM,
        margin: "0 0 8px",
        width: "100%",
        maxWidth: "100%",
        overflowWrap: "break-word",
      }}>
        What kind of portfolio career is actually{" "}
        <span style={{ fontStyle: "italic", color: GOLD }}>right for you?</span>
      </h1>
      <p style={{
        fontFamily: SANS,
        fontSize: "17px",
        lineHeight: 1.7,
        color: CREAM_MUTED,
        fontWeight: 300,
        width: "100%",
        maxWidth: "560px",
        margin: "28px auto 40px",
      }}>
        There's no one-size-fits-all path to a multi-income career. This quiz identifies which combination of income streams fits your personality, your risk tolerance, and the way you want to spend your time.
      </p>
      <button
        style={{
          background: "#ffffff",
          color: BG,
          border: "none",
          borderRadius: "4px",
          padding: "18px 48px",
          fontFamily: SANS,
          fontSize: "14px",
          fontWeight: 600,
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "transform 0.15s, box-shadow 0.15s, background 0.15s",
          boxShadow: hover ? "0 10px 30px rgba(0,0,0,0.28)" : "0 4px 14px rgba(0,0,0,0.2)",
          transform: hover ? "translateY(-2px)" : "none",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        onClick={onStart}
      >
        Find out
      </button>
      <p style={{
        fontFamily: SANS,
        fontSize: "12px",
        fontWeight: 600,
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: GOLD,
        marginTop: "44px",
      }}>
        10 Questions &middot; 5 Minutes
      </p>
    </div>

    <div style={{
      width: "100%",
      background: "#f4f1ed",
      padding: "48px 24px 64px",
      borderTop: `10px solid ${BLUE}`,
    }}>
      <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
        <p style={{
          fontFamily: SANS,
          fontSize: "11px",
          fontWeight: 600,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: BG,
          marginBottom: "28px",
        }}>
          The Five Archetypes
        </p>
        <div style={{
          display: "flex",
          flexWrap: "nowrap",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: "12px",
        }}>
          {Object.values(TYPES).map((t) => (
            <div key={t.id} style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
              flex: "1 1 0",
              textAlign: "center",
            }}>
              <TypeIcon id={t.id} color={BLUE} />
              <span style={{
                fontFamily: SANS,
                fontSize: "12.5px",
                fontWeight: 400,
                lineHeight: 1.3,
                color: BG,
              }}>
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div style={{
        maxWidth: "680px",
        margin: "40px auto 0",
        textAlign: "center",
        fontFamily: SANS,
        fontSize: "12px",
        color: "#999",
        lineHeight: 1.6,
      }}>
        © Copyright Maggie Blackburn, all rights reserved&nbsp;&nbsp;/&nbsp;&nbsp;
        <a href="https://maggie-blackburn.com" target="_blank" rel="noopener noreferrer" style={{ color: "#999", textDecoration: "underline" }}>
          maggie-blackburn.com
        </a>
      </div>
    </div>
    </div>
  );
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];
const POSTCARD = "#f4f1ed"; // beige card
const OUTLINE = "#341d12";  // brand brown outline
const HILITE = "#cdd492";   // tertiary green highlight

function Question({ question, qIndex, total, selected, onSelect, onNext, onBack }) {
  const [hover, setHover] = useState(false);
  const isLast = qIndex >= total - 1;

  const stackCard = (transform) => ({
    position: "absolute",
    inset: 0,
    background: POSTCARD,
    border: `1.5px solid ${OUTLINE}`,
    borderRadius: "10px",
    transform,
    zIndex: 0,
  });

  return (
    <div style={{ width: "100%", maxWidth: "760px", display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 1 }}>
      <div style={{ width: "100%", paddingRight: "26px", boxSizing: "border-box" }}>
      <div style={{ position: "relative", width: "100%" }}>
        {/* postcards peeking out behind */}
        <div style={stackCard("translate(22px, 22px) rotate(2deg)")} />
        <div style={stackCard("translate(11px, 11px) rotate(1deg)")} />

        {/* active card */}
        <div style={{
          position: "relative",
          zIndex: 1,
          background: POSTCARD,
          border: `1.5px solid ${OUTLINE}`,
          borderRadius: "10px",
          padding: "clamp(28px, 6vw, 56px) clamp(20px, 5vw, 52px) clamp(24px, 4vw, 40px)",
        }}>
          <h2 style={{
            ...SERIF_STYLE,
            fontSize: "clamp(24px, 4.5vw, 40px)",
            fontWeight: 400,
            lineHeight: 1.15,
            textAlign: "center",
            color: OUTLINE,
            margin: "0 0 10px",
          }}>{question.q}</h2>
          <p style={{
            fontFamily: SANS,
            fontSize: "12px",
            fontWeight: 400,
            color: "#8a7060",
            textAlign: "center",
            margin: `0 0 clamp(20px, 3.5vw, 36px)`,
            letterSpacing: "0.01em",
          }}>If two feel equally true, pick the one that energizes you more on a hard week.</p>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "10px 14px",
            marginBottom: "28px",
          }}>
            {question.answers.map((a, i) => {
              const on = selected === i;
              return (
                <button
                  key={i}
                  onClick={() => onSelect(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    width: "100%",
                    textAlign: "left",
                    padding: "12px 16px",
                    borderRadius: "100px",
                    border: `1.5px solid ${OUTLINE}`,
                    background: on ? HILITE : "transparent",
                    cursor: "pointer",
                    fontFamily: SANS,
                    fontSize: "clamp(13px, 2vw, 15px)",
                    fontWeight: 400,
                    color: OUTLINE,
                    transition: "background 0.15s",
                  }}
                >
                  <span style={{ fontWeight: 700 }}>{LETTERS[i]}:</span>
                  <span style={{ flex: 1 }}>{a.text}</span>
                  {on && <span style={{ fontWeight: 700 }}>✓</span>}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => selected !== null && onNext()}
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              disabled={selected === null}
              style={{
                background: selected !== null && hover ? OUTLINE : "transparent",
                color: selected !== null && hover ? POSTCARD : OUTLINE,
                border: `1.5px solid ${OUTLINE}`,
                borderRadius: "100px",
                padding: "13px 40px",
                fontFamily: SANS,
                fontSize: "14px",
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                cursor: selected !== null ? "pointer" : "not-allowed",
                opacity: selected !== null ? 1 : 0.4,
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {isLast ? "See Result" : "Next"}
            </button>
          </div>

          {/* progress counter */}
          <div style={{
            position: "absolute",
            left: "28px",
            bottom: "20px",
            fontFamily: SANS,
            fontSize: "13px",
            fontWeight: 500,
            color: OUTLINE,
          }}>{qIndex + 1}/{total}</div>
        </div>
      </div>
      </div>

      {/* back link */}
      <button
        onClick={onBack}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          fontFamily: SANS,
          fontSize: "13px",
          color: "#ffffff",
          opacity: 0.7,
          marginTop: "32px",
          letterSpacing: "0.04em",
        }}
      >
        ← Back
      </button>
    </div>
  );
}

// ─── Tarot-style card icon ────────────────────────────────────────────────────
function ArchetypeIcon({ color }) {
  return (
    <svg width="72" height="88" viewBox="0 0 72 88" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginBottom: "20px" }}>
      <rect x="2" y="2" width="68" height="84" rx="7" fill="#EEEAE4" stroke={color} strokeWidth="1.5"/>
      <rect x="7" y="7" width="58" height="74" rx="4" fill="none" stroke={color} strokeWidth="0.75" opacity="0.5"/>
      <path d="M10 10 Q14 10 14 14" fill="none" stroke={color} strokeWidth="1" opacity="0.6"/>
      <path d="M62 10 Q58 10 58 14" fill="none" stroke={color} strokeWidth="1" opacity="0.6"/>
      <path d="M10 78 Q14 78 14 74" fill="none" stroke={color} strokeWidth="1" opacity="0.6"/>
      <path d="M62 78 Q58 78 58 74" fill="none" stroke={color} strokeWidth="1" opacity="0.6"/>
      <line x1="22" y1="36" x2="50" y2="36" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="18" y1="44" x2="54" y2="44" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="22" y1="52" x2="50" y2="52" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

// ─── Focusable input ──────────────────────────────────────────────────────────
function Field({ label, type = "text", value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ marginBottom: "20px" }}>
      <label style={S.inputLabel}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={S.input(focused)}
      />
    </div>
  );
}

// ─── Gate screen ──────────────────────────────────────────────────────────────
function Gate({ typeKey, result, answers, onReveal }) {
  const t = TYPES[typeKey];
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hover, setHover] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    if (!name.trim() || !email.trim()) {
      setError("Please fill in both fields to continue.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);

    const responseLog = QUESTIONS.map((q, i) => ({
      question: q.q,
      answer: answers[i] !== null ? q.answers[answers[i]].text : "",
    }));

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          firstName: name.trim(),
          archetype: t.label,
          secondaryArchetype: TYPES[result.secondary].label,
          responses: responseLog,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
    } catch {
      // Non-blocking—don't prevent user from seeing results if the API call fails
    }
    setLoading(false);
    onReveal(name, email);
  }

  return (
    <div style={{ ...S.card, textAlign: "center" }}>
      <ArchetypeIcon color={t.color} />
      <div style={{ ...S.topLabel, textAlign: "center" }}>Your Archetype Is Ready</div>
      <h2 style={{ ...S.resultTitle, marginBottom: "16px" }}>{t.label}</h2>
      <p style={{ ...S.heroSub, fontSize: "15px", marginBottom: "0" }}>
        Enter your details below and we'll send your full results, including your income combination, recommended next step, and how to get started.
      </p>
      <div style={S.formCard}>
        <Field label="First Name" value={name} onChange={setName} placeholder="Your first name" />
        <Field label="Email Address" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
        {error && (
          <p style={{ fontFamily: SANS, fontSize: "13px", color: "#c0392b", marginBottom: "12px", textAlign: "left" }}>
            {error}
          </p>
        )}
        <button
          style={{
            ...S.btn(BG),
            width: "100%",
            padding: "16px",
            borderRadius: "10px",
            fontSize: "13px",
            letterSpacing: "0.1em",
            boxShadow: hover ? `0 6px 24px ${BG}44` : "none",
            transform: hover ? "translateY(-1px)" : "none",
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Saving…" : "Reveal My Results"}
        </button>
        <p style={S.disclaimer}>
          By submitting, you'll be added to Maggie Blackburn's email list.<br />You can unsubscribe any time.
        </p>
      </div>
    </div>
  );
}

function Result({ result, firstName, onRetake, onExplore }) {
  const t = TYPES[result.primary];
  const s = TYPES[result.secondary];
  const [pdfLoading, setPdfLoading] = useState(false);
  const name = (firstName || "").trim();
  const greeting = name ? `${name}, here's the thing about ${t.label}s.` : `Here's the thing about ${t.label}s.`;

  async function handleDownloadPDF() {
    setPdfLoading(true);
    const html2pdf = (await import("html2pdf.js")).default;
    const element = document.getElementById("result-pdf-content");
    await html2pdf().set({
      margin: [12, 12, 12, 12],
      filename: `${t.label.replace(/\s+/g, "-").toLowerCase()}-portfolio-career-results.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    }).from(element).save();
    setPdfLoading(false);
  }

  return (
    <div style={S.card}>
      <div id="result-pdf-content">
      <div style={{ marginBottom: "14px" }}><TypeIcon id={t.id} color={t.color} size={48} /></div>
      <div style={S.resultType(t.color)}>Your Portfolio Career Type</div>
      <h2 style={S.resultTitle}>{t.label}</h2>
      <p style={S.resultTagline}>{t.tagline}</p>

      {/* Primary + secondary blend */}
      <div style={{
        background: t.color + "0e",
        border: `1px solid ${t.color}28`,
        borderRadius: "10px",
        padding: "14px 18px",
        fontFamily: SANS,
        fontSize: "14px",
        fontWeight: 300,
        lineHeight: 1.6,
        color: TEXT,
        marginTop: "4px",
      }}>
        Your primary archetype is <strong style={{ fontWeight: 500, color: t.color }}>{t.label}</strong>
        {" "}with your secondary archetype as{" "}
        <strong style={{ fontWeight: 500, color: s.color }}>{s.label}</strong>.
        {" "}When the two pull in different directions, lead with your {t.label} instincts.
      </div>

      <div style={S.divider(t.color)} />

      <div style={S.sectionHead}>Your income combination</div>
      <div style={S.combo(t.color)}>{t.combo}</div>
      <div style={S.sectionHead}>What you might do</div>
      <div style={{ marginBottom: "20px" }}>
        {t.streams.map((str, i) => (
          <div key={i} style={S.streamItem}>
            <div style={S.dot(t.color)} />
            <span>{str}</span>
          </div>
        ))}
      </div>

      <div style={S.divider(t.color)} />

      <div style={S.sectionHead}>{greeting}</div>
      <p style={S.bodyText}>{t.description}</p>

      <div style={S.sectionHead}>This fits if...</div>
      <p style={{ ...S.bodyText, fontStyle: "italic" }}>{t.forYou}</p>

      {/* Energizes / Drains */}
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "8px" }}>
        <div style={{ flex: "1 1 220px" }}>
          <div style={S.sectionHead}>What energizes you</div>
          <p style={S.bodyText}>{t.energizes}</p>
        </div>
        <div style={{ flex: "1 1 220px" }}>
          <div style={S.sectionHead}>What drains you</div>
          <p style={S.bodyText}>{t.drains}</p>
        </div>
      </div>

      <div style={S.sectionHead}>What to watch out for</div>
      <p style={S.bodyText}>{t.shadow}</p>

      <div style={S.divider(t.color)} />

      <div style={S.sectionHead}>Your path, roughly</div>
      <div style={{ marginBottom: "20px" }}>
        {t.timeline.map((step, i) => (
          <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "12px", alignItems: "flex-start" }}>
            <div style={{
              fontFamily: SANS,
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: t.color,
              flex: "0 0 96px",
              paddingTop: "2px",
            }}>{step.when}</div>
            <div style={{ ...S.bodyText, marginBottom: 0, flex: 1 }}>{step.what}</div>
          </div>
        ))}
      </div>

      <div style={S.sectionHead}>Why you've held back</div>
      <p style={{ ...S.bodyText, fontStyle: "italic" }}>{t.whyHeldBack}</p>

      <div style={S.sectionHead}>Your next step</div>
      <div style={S.nextStep(t.color)}>{t.nextStep}</div>

      {t.goFurther && t.goFurther.length > 0 && (
        <>
          <div style={S.divider(t.color)} />
          <div style={S.sectionHead}>Go further with these resources</div>
          <div style={{ marginBottom: "20px" }}>
            {t.goFurther.map((g, i) => (
              <div key={i} style={{
                borderLeft: `3px solid ${t.color}`,
                paddingLeft: "14px",
                marginBottom: "14px",
              }}>
                {g.url ? (
                  <a
                    href={g.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: SANS,
                      fontSize: "14.5px",
                      fontWeight: 500,
                      lineHeight: 1.45,
                      color: t.color,
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                    }}
                  >
                    {g.title} →
                  </a>
                ) : (
                  <div style={{
                    fontFamily: SANS,
                    fontSize: "14.5px",
                    fontWeight: 500,
                    lineHeight: 1.45,
                    color: TEXT,
                  }}>{g.title}</div>
                )}
                {g.note && (
                  <div style={{ ...S.bodyText, marginBottom: 0, marginTop: "4px" }}>{g.note}</div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <div style={{ ...S.divider(t.color), marginBottom: "28px" }} />

      </div>{/* end result-pdf-content */}

      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <button
          onClick={handleDownloadPDF}
          disabled={pdfLoading}
          style={{
            background: "transparent",
            border: `1.5px solid ${t.color}`,
            borderRadius: "100px",
            padding: "11px 28px",
            fontFamily: SANS,
            fontSize: "13px",
            fontWeight: 500,
            color: t.color,
            cursor: pdfLoading ? "wait" : "pointer",
            letterSpacing: "0.05em",
          }}
        >
          {pdfLoading ? "Generating PDF…" : "↓ Download your results as PDF"}
        </button>
      </div>

      <div style={S.ctaWrap}>
        <button style={{ ...S.ghost, display: "block", margin: "0 auto" }} onClick={onRetake}>
          Retake the quiz
        </button>
        <button
          style={{ ...S.ghost, display: "block", margin: "12px auto 0", opacity: 0.7 }}
          onClick={onExplore}
        >
          Explore all five archetypes →
        </button>
      </div>
    </div>
  );
}

// ─── Explore screen ───────────────────────────────────────────────────────────
function Explore({ result, onBack }) {
  return (
    <div style={{ ...S.card, maxWidth: "720px" }}>
      <button
        onClick={onBack}
        style={{ background: "none", border: "none", cursor: "pointer", fontFamily: SANS, fontSize: "13px", color: TEXT, opacity: 0.6, padding: 0, marginBottom: "32px", display: "block" }}
      >
        ← Back to your results
      </button>

      <p style={{ ...SERIF_STYLE, fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 400, color: TEXT, marginBottom: "8px", lineHeight: 1.1 }}>
        The Five Archetypes
      </p>
      <p style={{ fontFamily: SANS, fontSize: "15px", color: TEXT, opacity: 0.6, fontWeight: 300, marginBottom: "40px", lineHeight: 1.6 }}>
        Your primary is <strong style={{ fontWeight: 600, opacity: 1 }}>{TYPES[result.primary].label}</strong> and your secondary is <strong style={{ fontWeight: 600, opacity: 1 }}>{TYPES[result.secondary].label}</strong>. Here's how all five compare.
      </p>

      {Object.values(TYPES).map((t) => {
        const isPrimary = t.id === result.primary;
        const isSecondary = t.id === result.secondary;
        return (
          <div key={t.id} style={{
            border: `1.5px solid ${isPrimary ? t.color : isSecondary ? t.color + "88" : "#e8e0d8"}`,
            borderRadius: "10px",
            padding: "28px 28px 24px",
            marginBottom: "16px",
            background: isPrimary ? t.color + "08" : "transparent",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
              <TypeIcon id={t.id} color={t.color} size={22} />
              <span style={{ ...SERIF_STYLE, fontSize: "22px", fontWeight: 400, color: TEXT }}>{t.label}</span>
              {isPrimary && (
                <span style={{ fontFamily: SANS, fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", background: t.color, color: "#fff", borderRadius: "100px", padding: "3px 10px", marginLeft: "4px" }}>
                  Your primary
                </span>
              )}
              {isSecondary && (
                <span style={{ fontFamily: SANS, fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", background: t.color + "22", color: t.color, borderRadius: "100px", padding: "3px 10px", marginLeft: "4px", border: `1px solid ${t.color}44` }}>
                  Your secondary
                </span>
              )}
            </div>
            <p style={{ fontFamily: SANS, fontSize: "13px", fontWeight: 500, color: t.color, marginBottom: "10px", letterSpacing: "0.02em" }}>{t.tagline}</p>
            <p style={{ fontFamily: SANS, fontSize: "14px", fontWeight: 300, color: TEXT, lineHeight: 1.7, marginBottom: "14px" }}>{t.description}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              <div style={{ background: "#f4f1ed", borderRadius: "8px", padding: "12px 14px" }}>
                <p style={{ fontFamily: SANS, fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: t.color, marginBottom: "4px" }}>Energizes</p>
                <p style={{ fontFamily: SANS, fontSize: "13px", fontWeight: 300, color: TEXT, lineHeight: 1.5 }}>{t.energizes}</p>
              </div>
              <div style={{ background: "#f4f1ed", borderRadius: "8px", padding: "12px 14px" }}>
                <p style={{ fontFamily: SANS, fontSize: "10px", fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: t.color, marginBottom: "4px" }}>Drains</p>
                <p style={{ fontFamily: SANS, fontSize: "13px", fontWeight: 300, color: TEXT, lineHeight: 1.5 }}>{t.drains}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("intro");
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [result, setResult] = useState(null);
  const [firstName, setFirstName] = useState("");

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
      setResult(getResult(selected));
      setScreen("gate");
    }
  }

  function handleBack() {
    if (qIndex > 0) setQIndex(qIndex - 1);
    else setScreen("intro");
  }

  function handleReveal(name) {
    setFirstName(name);
    setScreen("result");
  }

  function handleRetake() {
    setScreen("intro");
    setQIndex(0);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setResult(null);
    setFirstName("");
  }

  return (
    <>
      <style>{FONTS}</style>
      <div style={{
        ...S.wrap,
        justifyContent: screen === "intro" ? "center" : "flex-start",
        padding: screen === "intro" ? 0 : S.wrap.padding,
      }}>
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
        {screen === "gate" && <Gate typeKey={result.primary} result={result} answers={answers} onReveal={handleReveal} />}
        {screen === "result" && <Result result={result} firstName={firstName} onRetake={handleRetake} onExplore={() => setScreen("explore")} />}
        {screen === "explore" && <Explore result={result} onBack={() => setScreen("result")} />}
      </div>
    </>
  );
}
