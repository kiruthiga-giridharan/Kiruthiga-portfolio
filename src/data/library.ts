/**
 * ─────────────────────────────────────────────────────────────────────────
 *  KIRUTHIGA'S LIBRARY: all page content lives here.
 * ─────────────────────────────────────────────────────────────────────────
 *
 *  Sources: Kiruthiga_Giridharan_Data_Operations_Analyst.pdf (public/resume), each project's
 *  GitHub README, and the old portfolio (Trinity photo, recommendations).
 *
 *  • Each book has a fixed `panel` (shown beside the open book) and `pages`.
 *  • Skills link to books with `bookId`.
 */

import fraudInvestigation from "../library/assets/fraud-investigation.png";
import fraudLlmSafety from "../library/assets/fraud-llm-safety.png";
import spamBatch from "../library/assets/spamsieve-batch-csv.png";
import spamMessage from "../library/assets/spamsieve-spam-message.png";
import trinityGraduation from "../library/assets/trinity-graduation.jpg";
import keepsakeCompass from "../library/assets/journey/compass.webp";
import keepsakeDublin from "../library/assets/journey/dublin.webp";
import keepsakeKey from "../library/assets/journey/key.webp";
import keepsakePass from "../library/assets/journey/pass.webp";
import keepsakePen from "../library/assets/journey/pen.webp";
import portrait from "../library/assets/journey/kiruthiga.webp";
import type { Book, Contact, Journey, Recommendation, Shelf, Skill } from "./types";

export const profile = {
  name: "Kiruthiga Giridharan",
  descriptor: "Data Analytics · Process Automation · Applied AI",
  location: "Dublin, Ireland",
};

export const contact: Contact = {
  phone: "+353 892152652",
  email: "kiruthigagiri@gmail.com",
  location: "Dublin, Ireland",
  linkedin: "https://www.linkedin.com/in/kiruthiga-giridharan/",
  github: "https://github.com/kiruthiga-giridharan",
};

/** Served from public/resume, so it keeps its exact file name and content. */
export const resume = {
  href: `${import.meta.env.BASE_URL}resume/Kiruthiga_Giridharan_Data_Operations_Analyst.pdf`,
  fileName: "Kiruthiga_Giridharan_Data_Operations_Analyst.pdf",
};

export const intro = {
  eyebrow: "Welcome to",
  heading: "Kiruthiga’s Library",
  text: "A collection of my work, the things I’ve learned and the ideas I’m exploring.",
  action: "Explore the library",
};

// ── The Career Chapters ──────────────────────────────────────────────────
// Source of truth: Kiruthiga_Giridharan_Data_Operations_Analyst.pdf
// Each career and education book has three pages; the panel holds the role facts.
const circana: Book = {
  id: "circana",
  coverTitle: "Circana",
  coverSubtitle: "Data & Operations Analyst",
  cover: { emblem: "bars", color: "#651C2E" },
  height: 0.98,
  panel: {
    heading: "Data & Operations Analyst",
    gist: "Managed multi-market reporting, improved data quality and automated reporting tasks to support reliable client delivery.",
    meta: [
      { label: "Company", value: "Circana Market Research", wide: true },
      { label: "Dates", value: "March 2024 to Present" },
      { label: "Location", value: "Dublin, Ireland" },
    ],
  },
  pages: [
    {
      title: "From Data to Delivery",
      blocks: [
        { type: "chain", steps: ["Data workflows", "SQL checks", "Dashboards", "Client delivery"] },
        {
          type: "paragraph",
          text: "Managed weekly reporting across five EMEA markets and more than 500 client accounts. Investigated discrepancies, built Power BI and Tableau dashboards, and coordinated with teams and clients to deliver accurate reports on time.",
        },
        {
          type: "tags",
          items: [
            { name: "Azure Data Factory", icon: "azure" },
            { name: "Snowflake", icon: "snowflake" },
            { name: "SQL", icon: "sql" },
            { name: "Power BI", icon: "powerbi" },
            { name: "Tableau", icon: "tableau" },
          ],
        },
      ],
    },
    {
      title: "Making Reporting Faster",
      blocks: [
        {
          type: "compare",
          before: { label: "Before", value: "3 hours", detail: "KPI narratives and discrepancy checks prepared by hand" },
          after: { label: "After", value: "10 minutes", detail: "The same task, AI-assisted" },
        },
        {
          type: "paragraph",
          text: "Automated KPI narratives and discrepancy checks using RAG, LangChain and LangGraph, reducing a three-hour reporting task to ten minutes.",
        },
        {
          type: "callout",
          label: "Working with people",
          text: "Clarified reporting requirements with stakeholders and explained findings to clients in clear, practical language.",
        },
        {
          type: "tags",
          items: [{ name: "RAG" }, { name: "LangChain", icon: "langchain" }, { name: "LangGraph", icon: "langgraph" }],
        },
      ],
    },
    {
      title: "Results That Matter",
      blocks: [
        {
          type: "cards",
          items: [
            { value: "3 h → 10 min", label: "Faster reporting task", detail: "KPI narratives and discrepancy checks" },
            { value: "25%", label: "Fewer data errors", detail: "SQL-based investigation and root-cause analysis" },
            { value: "100%", label: "SLA compliance", detail: "Reliable operational delivery" },
          ],
        },
        { type: "recognition", items: ["Recognised by senior leadership for consistently high-quality, dependable delivery."] },
      ],
    },
  ],
};

const esteeLauder: Book = {
  id: "estee-lauder",
  coverTitle: "Estée Lauder",
  coverSubtitle: "Business Consultant",
  cover: { emblem: "sprig", color: "#1B3F2E" },
  height: 1,
  panel: {
    heading: "Business Consultant",
    gist: "Combined customer-facing sales with commercial analysis to understand purchasing decisions and identify opportunities.",
    meta: [
      { label: "Company", value: "Estée Lauder Companies", wide: true },
      { label: "Dates", value: "September 2022 to March 2024" },
      { label: "Location", value: "Dublin, Ireland" },
      { label: "Role type", value: "Part-time alongside my MSc at Trinity.", wide: true },
    ],
  },
  pages: [
    {
      title: "Customers and Commercial Insight",
      blocks: [
        {
          type: "areas",
          items: [
            { title: "Customer advice", icon: "advice" },
            { title: "Sales and campaign analysis", icon: "sales" },
            { title: "Competitor and CRM analysis", icon: "crm" },
          ],
        },
        {
          type: "paragraph",
          text: "Understood customer preferences, recommended products and supported purchasing decisions. Built Power BI dashboards and Excel models to analyse sales and campaign ROI, and analysed eight competitors using Salesforce and Microsoft Dynamics CRM.",
        },
        {
          type: "tags",
          items: [
            { name: "Power BI", icon: "powerbi" },
            { name: "Excel", icon: "excel" },
            { name: "SQL", icon: "sql" },
            { name: "Salesforce", icon: "salesforce" },
            { name: "Microsoft Dynamics", icon: "dynamics" },
          ],
        },
      ],
    },
    {
      title: "Experience That Inspired Research",
      blocks: [
        { type: "chain", steps: ["Customer conversations", "Research question", "Management project"] },
        {
          type: "paragraph",
          text: "Working with customers gave me a closer view of how people chose cosmetics and what encouraged them to return. That experience inspired my master’s research into customer retention strategies in the cosmetics industry.",
        },
        { type: "note", text: "Alongside customer and sales work, I supported spend analysis, vendor benchmarking and negotiations." },
      ],
    },
    {
      title: "Commercial Results",
      blocks: [
        {
          type: "cards",
          items: [
            { value: "20%+", label: "Conversion growth", detail: "Contributed through sales and campaign ROI analysis" },
            { value: "25%", label: "Better lead follow-up", detail: "Supported by SQL analysis of CRM gaps" },
            { value: "15%", label: "Less manual tracking", detail: "Improved KPI tracking using VLOOKUP" },
            { value: "Up to 30%", label: "Lower procurement costs", detail: "Supported through spend analysis, vendor benchmarking and negotiation" },
          ],
        },
      ],
    },
  ],
};

const tcs: Book = {
  id: "tcs",
  coverTitle: "TCS",
  coverSubtitle: "Junior Analyst",
  cover: { emblem: "globe", color: "#2D1E48" },
  height: 0.96,
  panel: {
    heading: "Junior Analyst",
    gist: "Analysed and reconciled financial and insurance data, automated validation tasks and supported reliable releases.",
    meta: [
      { label: "Company", value: "Tata Consultancy Services", wide: true },
      { label: "Dates", value: "July 2020 to August 2022" },
      { label: "Location", value: "Chennai, India" },
    ],
  },
  pages: [
    {
      title: "Making the Data Agree",
      blocks: [
        { type: "chain", steps: ["SAP data", "SQL reconciliation", "Validation", "Release support"] },
        {
          type: "paragraph",
          text: "Used SQL queries, joins and stored procedures to reconcile SAP financial and insurance data. Supported data validation across more than 15 releases.",
        },
        {
          type: "tags",
          items: [
            { name: "SAP", icon: "sap" },
            { name: "SQL", icon: "sql" },
            { name: "Jira", icon: "jira" },
          ],
        },
      ],
    },
    {
      title: "Less Manual Work, Fewer Repeat Issues",
      blocks: [
        {
          type: "areas",
          items: [
            { title: "Python automation", icon: "code" },
            { title: "Root-cause investigation", icon: "search" },
          ],
        },
        {
          type: "paragraph",
          text: "Built Python scripts for XML and CSV staging and validation. Worked with project teams to investigate discrepancies, document issues and verify corrective actions before release.",
        },
        {
          type: "tags",
          items: [{ name: "Python", icon: "python" }, { name: "XML/CSV" }, { name: "Root-cause analysis" }, { name: "CAPA" }],
        },
      ],
    },
    {
      title: "Results and Recognition",
      blocks: [
        {
          type: "cards",
          items: [
            { value: "100%", label: "Reconciliation accuracy", detail: "SAP financial and insurance data" },
            { value: "20%", label: "Less manual staging time", detail: "Python staging and validation" },
            { value: "30%", label: "Fewer recurring defects", detail: "Root-cause analysis and CAPA" },
          ],
        },
        { type: "recognition", items: ["Top Performer, Q3 FY2021", "Best Project Member, 2021"] },
      ],
    },
  ],
};

// ── The Learning Chapters ────────────────────────────────────────────────
const trinity: Book = {
  id: "trinity",
  coverTitle: "Trinity College Dublin",
  coverSubtitle: "MSc in Management",
  cover: { emblem: "book", color: "#43193F" },
  height: 1,
  panel: {
    heading: "MSc in Management",
    gist: "Connected my engineering background with business thinking and practical commercial experience.",
    meta: [
      { label: "Institution", value: "Trinity College Dublin", wide: true },
      { label: "Dates", value: "2022 to 2023" },
      { label: "Location", value: "Dublin, Ireland" },
      { label: "Result", value: "2:1", wide: true },
    ],
  },
  pages: [
    {
      title: "A New Direction",
      blocks: [
        {
          type: "image",
          src: trinityGraduation,
          alt: "Kiruthiga in a graduation gown and cap, standing beside a bronze statue on the Trinity College Dublin campus.",
          caption: "Graduation day at Trinity College Dublin.",
          width: 900,
          height: 1200,
          kind: "photo",
        },
        {
          type: "paragraph",
          text: "After two years at TCS, I wanted to understand more about how businesses work and make decisions. That interest brought me to Trinity for an MSc in Management and to a new life in Dublin.",
        },
        { type: "tags", label: "Study areas", items: [{ name: "Analytics" }, { name: "Strategy" }, { name: "Operations" }, { name: "Finance" }] },
      ],
    },
    {
      title: "Why Customers Come Back",
      blocks: [
        { type: "callout", label: "Research project", text: "Customer Retention Strategies in the Cosmetics Industry" },
        {
          type: "paragraph",
          text: "My customer-facing work at Estée Lauder inspired this research. I interviewed managers from Lancôme, Clarins, Bobbi Brown and Too Faced to explore what encouraged customers to return.",
        },
        { type: "chain", steps: ["Customer experience", "Manager interviews", "Retention themes"] },
      ],
    },
    {
      title: "What the Interviews Showed",
      blocks: [
        {
          type: "themes",
          items: [
            { title: "Product quality", text: "Managers highlighted satisfaction with product quality as a reason customers returned." },
            { title: "Additional services", text: "Personalised advice and services were described as ways to strengthen customer relationships." },
            { title: "Gifts and incentives", text: "Gifts and promotional benefits were identified as reasons for continued engagement and repeat purchases." },
          ],
        },
        {
          type: "callout",
          label: "Takeaway",
          text: "The interviews highlighted how product quality, customer service and thoughtful incentives can work together to support retention.",
        },
      ],
    },
  ],
};

const anna: Book = {
  id: "anna-university",
  coverTitle: "Anna University",
  coverSubtitle: "Instrumentation & Control Engineering",
  cover: { emblem: "compass", color: "#22354F" },
  height: 0.97,
  panel: {
    heading: "Bachelor of Engineering in Instrumentation and Control Engineering",
    gist: "Built my technical foundation through engineering study and hands-on prototype development.",
    meta: [
      { label: "Institution", value: "Anna University", wide: true },
      { label: "Dates", value: "2016 to 2020" },
      { label: "Location", value: "Chennai, India" },
      { label: "Result", value: "First Class (CGPA 8.2/10)", wide: true },
    ],
  },
  pages: [
    {
      title: "My Engineering Foundation",
      blocks: [
        { type: "monogram", letters: "B.E.", caption: "Break it down, test it, check the result." },
        {
          type: "paragraph",
          text: "My engineering degree gave me a practical approach to solving problems: break them into smaller parts, test ideas and check the results. I graduated with First Class and took that approach into my first role at TCS.",
        },
      ],
    },
    {
      title: "Undergraduate Project: Maternal Health Kit",
      blocks: [
        { type: "kit", measurements: ["Heart rate", "Haemoglobin", "Pulse", "Blood glucose", "Blood pressure"] },
        {
          type: "paragraph",
          text: "My undergraduate project was a Maternal Health Kit prototype, bringing heart rate, haemoglobin, pulse, blood glucose and blood pressure measurements into one device for periodic monitoring during pregnancy.",
        },
      ],
    },
    {
      title: "Recognition and My First Step",
      blocks: [
        { type: "recognition", items: ["Recognised by AICTE", "Best Project of the Year"] },
        {
          type: "paragraph",
          text: "The project gave me experience turning a practical need into a working prototype. After graduation, I joined TCS through campus placement and began applying my technical foundation to business data and operational problems.",
        },
      ],
    },
  ],
};

// ── Beyond the Day Job ───────────────────────────────────────────────────
const fraudRisk: Book = {
  id: "fraud-risk",
  coverTitle: "Fraud Risk",
  coverSubtitle: "AI Safety Platform",
  cover: { art: "target", color: "#6B4A1F" },
  height: 0.95,
  panel: {
    heading: "AI Safety & Fraud Risk Analytics Platform",
    gist: "Identifies suspicious financial transactions and screens AI prompts for unsafe instructions.",
    meta: [],
    tools: ["Python", "SQL", "scikit-learn", "XGBoost", "SHAP", "FastAPI", "Streamlit"],
    links: [
      { label: "GitHub", href: "https://github.com/kiruthiga-giridharan/ai-safety-fraud-risk-platform", kind: "github" },
      { label: "Live demo", href: "https://ai-safety-fraud-risk.streamlit.app/", kind: "demo" },
    ],
  },
  pages: [
    {
      title: "How It Works",
      blocks: [
        {
          type: "callout",
          label: "Everyday example",
          text: "An analyst checks a transaction’s risk level and sees which factors caused it to be flagged. An AI prompt receives an Allow, Review or Flag recommendation.",
        },
        {
          type: "lanes",
          lanes: [
            {
              label: "Fraud",
              steps: [
                { title: "Transaction" },
                { title: "Risk assessment", detail: "Low, medium or high" },
                { title: "Factors explained", detail: "Why it was flagged", emphasis: true },
              ],
            },
            {
              label: "AI safety",
              steps: [
                { title: "AI prompt" },
                { title: "Safety screening" },
                { title: "Allow / Review / Flag", emphasis: true },
              ],
            },
          ],
        },
      ],
    },
    {
      title: "Investigating a Transaction",
      blocks: [
        {
          type: "image",
          src: fraudInvestigation,
          alt: "Screenshot of the Transaction Investigation page: a transaction with a fraud score of 100% and a HIGH risk level, above a bar chart of the factors that raised or lowered the score.",
          caption: "Real screenshot: one transaction’s risk level and the factors behind it.",
          width: 1440,
          height: 950,
          kind: "screenshot",
        },
      ],
    },
    {
      title: "Screening AI Prompts",
      blocks: [
        {
          type: "image",
          src: fraudLlmSafety,
          alt: "Screenshot of the LLM Safety page of the dashboard, which screens AI prompts.",
          caption: "Real screenshot: the AI prompt safety page.",
          width: 1440,
          height: 950,
          kind: "screenshot",
        },
      ],
    },
    {
      title: "How I Built It",
      blocks: [
        {
          type: "list",
          items: [
            "Analysed 6.3 million synthetic mobile-money transactions (the PaySim dataset) with Python and SQL.",
            "Compared machine-learning models, with XGBoost behind the risk scores.",
            "Used SHAP to explain which factors raised or lowered each score.",
            "Trained a prompt classifier that labels prompts as safe, prompt injection or jailbreak.",
            "Served both checks through a FastAPI service and an interactive Streamlit dashboard.",
          ],
        },
      ],
    },
    {
      title: "Results & Limits",
      blocks: [
        {
          type: "metrics",
          items: [
            { value: "6.3M", label: "Transactions analysed", explain: "Synthetic transactions from a payments simulator." },
            { value: "90.96%", label: "Precision", explain: "Of the transactions flagged as fraud, the share that really were, on the synthetic data." },
            { value: "99.84%", label: "Recall", explain: "Of the real frauds, the share the model caught, on the synthetic data." },
          ],
        },
        {
          type: "note",
          text: "These results demonstrate the approach on synthetic data, which makes fraud easier to spot than real banking data. The prompt screener is a first filter, not a complete safeguard.",
        },
      ],
    },
  ],
};

const gmailAssistant: Book = {
  id: "gmail-assistant",
  coverTitle: "Gmail Agent",
  coverSubtitle: "AI-powered assistant",
  cover: { art: "paths", mirror: true, color: "#232B48" },
  height: 1,
  panel: {
    heading: "Gmail AI Assistant | SAP AI Core & MCP",
    gist: "Helps users search, summarise and draft Gmail messages using everyday language.",
    meta: [{ label: "Status", value: "Local proof of concept · no public demo" }],
    tools: ["Python", "LangChain", "LangGraph", "Streamlit", "MCP", "SAP AI Core"],
    links: [
      { label: "GitHub", href: "https://github.com/kiruthiga-giridharan/gmail-mcp-assistant-sap-ai-core", kind: "github" },
    ],
  },
  pages: [
    {
      title: "How It Works",
      blocks: [
        {
          type: "callout",
          label: "Everyday example",
          text: "“Find my latest interview email and draft a reply confirming my availability.”",
        },
        {
          type: "flow",
          steps: [
            { title: "Your request", detail: "In everyday language" },
            { title: "Finds the email", detail: "Gmail tools via MCP" },
            { title: "Drafts a reply", detail: "Language model via SAP AI Core" },
            { title: "You confirm before sending", detail: "Nothing is sent without your approval", emphasis: true },
            { title: "Email sent" },
          ],
        },
      ],
    },
    {
      title: "A Conversation",
      blocks: [{ type: "mockup", kind: "gmail-chat" }],
    },
    {
      title: "How I Built It",
      blocks: [
        {
          type: "list",
          items: [
            "Connects Gmail with language models through SAP AI Core and the Model Context Protocol (MCP).",
            "A local MCP server exposes Gmail actions such as searching, reading threads, drafting and replying.",
            "A LangChain agent, running on LangGraph, decides which Gmail action to use.",
            "A Streamlit chat interface with email thread support.",
          ],
        },
      ],
    },
    {
      title: "Safeguards & Limits",
      blocks: [
        { type: "subheading", text: "Confirmation before sending" },
        {
          type: "paragraph",
          text: "The tools that send email stay switched off until the user explicitly confirms. The assistant can draft freely, but it cannot send anything on its own.",
        },
        { type: "subheading", text: "Limits" },
        {
          type: "list",
          items: [
            "A local proof of concept: there is no public live demo.",
            "Running it requires your own SAP AI Core access and Google OAuth credentials.",
          ],
        },
      ],
    },
  ],
};

const spamSieve: Book = {
  id: "spamsieve",
  coverTitle: "SpamSieve",
  coverSubtitle: "SMS Spam Detector",
  cover: { art: "cursor", color: "#5E2A3A" },
  height: 0.92,
  panel: {
    heading: "SpamSieve | Spam Detection App",
    gist: "Checks individual text messages, or uploaded CSV batches, for spam.",
    meta: [],
    tools: ["Python", "scikit-learn", "Streamlit"],
    links: [
      { label: "GitHub", href: "https://github.com/kiruthiga-giridharan/SpamSeive", kind: "github" },
      { label: "Live demo", href: "https://spamsieve-sms.streamlit.app/", kind: "demo" },
    ],
  },
  pages: [
    {
      title: "How It Works",
      blocks: [
        {
          type: "callout",
          label: "Everyday example",
          text: "Paste “Congratulations! Claim your free prize now” to see its spam probability.",
        },
        { type: "mockup", kind: "spam-single" },
      ],
    },
    {
      title: "Checking One Message",
      blocks: [
        {
          type: "image",
          src: spamMessage,
          alt: "Screenshot of SpamSieve: a message offering a prize jackpot is labelled Spam with 100% spam probability. The sidebar shows the spam threshold slider at 0.50.",
          caption: "Real screenshot: checking one message, with the adjustable threshold on the left.",
          width: 1280,
          height: 760,
          kind: "screenshot",
        },
      ],
    },
    {
      title: "Checking a CSV Batch",
      blocks: [
        {
          type: "image",
          src: spamBatch,
          alt: "Screenshot of SpamSieve’s CSV check: a table of ten messages with a spam probability for each, four flagged as spam.",
          caption: "Real screenshot: checking a CSV batch, with results ready to download.",
          width: 1280,
          height: 980,
          kind: "screenshot",
        },
      ],
    },
    {
      title: "How I Built It",
      blocks: [
        {
          type: "list",
          items: [
            "Trained on the UCI SMS Spam Collection of labelled English text messages.",
            "Links, phone numbers and prices become tokens the model can learn from, instead of being deleted.",
            "Compared four models with cross-validation; a calibrated linear SVM was selected.",
            "An adjustable threshold lets users flag more or fewer messages, and batch results can be downloaded.",
          ],
        },
      ],
    },
    {
      title: "Results & Limits",
      blocks: [
        {
          type: "metrics",
          items: [
            { value: "98.3%", label: "Precision", explain: "Of the messages it flagged as spam on unseen test data, the share that really were spam." },
            { value: "90.1%", label: "Recall", explain: "Of the real spam in the test data, the share it caught." },
          ],
        },
        {
          type: "note",
          text: "On the test set it wrongly flagged 2 of 904 genuine messages. It was trained on English SMS messages, so it suits that kind of text best.",
        },
      ],
    },
  ],
};

// ── The Journey So Far ───────────────────────────────────────────────────

export const journey: Journey = {
  eyebrow: "Meet the Author",
  heading: "The Journey So Far",
  intro: "Hi, I’m Kiruthiga! India is where my story started, Dublin is home for now, and there’s still plenty I’d love to explore.",
  support: "Five keepsakes, each holding a chapter of the journey that brought me here.",
  closing: "Still curious. Still building. Ready for the next chapter.",
  portrait: {
    src: portrait,
    alt: "Kiruthiga Giridharan smiling at night in Times Square, New York, wearing a black dress, with bright city lights behind her.",
    width: 520,
    height: 751,
  },
  chapters: [
    {
      title: "My Foundations",
      object: "Brass drafting compass",
      image: keepsakeCompass,
      wide: false,
      text: "I grew up in India and studied engineering at Anna University. Through campus placement, I joined Tata Consultancy Services, where my professional journey began. Over the next two years, I learned to work through complex problems, collaborate with teams and take responsibility for dependable delivery. It was a strong foundation, and it helped me discover both what I enjoyed and what I wanted to explore next.",
    },
    {
      title: "Wanting Something More",
      object: "Vintage employee-pass holder",
      image: keepsakePass,
      wide: false,
      text: "I enjoyed my time at TCS, but after two years I felt ready to explore beyond the path I already knew. My growing interest in business management led to months of research into courses, universities and the kind of future I wanted. Trinity College Dublin stood out. Choosing to move to Ireland was a leap into the unknown, and one of the best decisions I have made.",
    },
    {
      title: "Finding My Place",
      object: "Dublin boarding pass and graduation tassel",
      image: keepsakeDublin,
      wide: false,
      text: "Trinity and Dublin soon became part of who I am. Alongside my master’s, I worked part-time at Estée Lauder, bringing my interest in cosmetics into everyday conversations with customers. I enjoyed understanding what people wanted, how they chose products and what encouraged them to return. Those experiences inspired my research into customer retention strategies in the cosmetics industry, giving me a meaningful connection between my studies and my work.",
    },
    {
      title: "Growing at Circana",
      object: "Fountain pen and report",
      image: keepsakePen,
      wide: true,
      text: "After months of persistence, I joined Circana as a Data & Operations Analyst. Working with client data, reporting and automation helped me grow in ways I had hoped for and others I had not expected. I strengthened my technical skills, learned from colleagues and clients, and became more confident in turning complicated problems into practical solutions. Circana played an important part in shaping the professional I am today.",
    },
    {
      title: "What Comes Next",
      object: "Brass key",
      image: keepsakeKey,
      wide: true,
      text: "The next chapter is still taking shape, and I’m looking forward to seeing where it leads. Today, I’m building AI and data projects, creating this portfolio and preparing for my next opportunity. I’m carrying forward the lessons, relationships and confidence I gained along the way. I don’t know every detail of the next chapter yet but I’m ready to discover it and build something meaningful.",
    },
  ],
};

export const shelves: Shelf[] = [
  {
    id: "career",
    title: "The Career Chapters",
    tagline: "Turning data into business impact.",
    books: [circana, esteeLauder, tcs],
  },
  {
    id: "learning",
    title: "The Learning Chapters",
    tagline: "Where my foundations took shape.",
    books: [trinity, anna],
  },
  {
    id: "projects",
    title: "Beyond the Day Job",
    tagline: "Ideas I’ve brought to life.",
    books: [spamSieve, fraudRisk, gmailAssistant],
  },
];

/** Every chapter of the library, in page order, for navigation. */
export const chapters = [
  ...shelves.map(({ id, title, tagline }) => ({ id, title, tagline })),
  { id: "tools", title: "The Tool Cabinet", tagline: "The tools behind my work." },
  { id: "notes", title: "Notes from My Colleagues", tagline: "What others say about the author." },
  { id: "author", title: "The Journey So Far", tagline: "Meet the Author" },
];

// ── Notes from My Colleagues ─────────────────────────────────────────────
// Exact wording and attribution from the Recommendations section of
// https://kiruthiga-giridharan.github.io/Portfolio/
export const recommendations: Recommendation[] = [
  {
    quote:
      "A highly dependable and talented professional who adapts quickly, integrates seamlessly, and consistently delivers high-quality results. A strong asset to any organization fortunate enough to have her.",
    name: "Bosko Bjegovic",
    role: "Senior Director AI-Driven Operations, Circana",
  },
  {
    quote:
      "She seamlessly integrated into our team culture, was always open to feedback, using it to continuously grow and elevate her work. A massive asset wherever she goes next.",
    name: "Magdalena Pisarska",
    role: "Sr Manager Data Management, Circana",
  },
  {
    quote:
      "Kiruthiga has excelled in this role, exhibiting one of the highest levels of productivity and professionalism I have witnessed during my 8+ years at the company.",
    name: "Waldemar Baer",
    role: "Account Manager, Circana",
  },
  {
    quote:
      "A clever, fast-thinking, efficient and focused worker who consistently excels and would be a benefit to any employer lucky enough to get her.",
    name: "Kristen Worth",
    role: "Sales Manager, Estée Lauder Companies",
  },
];

// ── The Tool Cabinet ─────────────────────────────────────────────────────
const LAV = "#1F2A46";
const ROSE = "#5A1E2A";
const OCHRE = "#5E4520";
const MAUVE = "#2E2244";
const PINK = "#5C2B3A";
const PLUM = "#1F3A2C";

export const skills: Skill[] = [
  // Technical
  {
    id: "python",
    name: "Python",
    kind: "technical",
    icon: "python",
    color: LAV,
    usedAt: [
      { label: "Tata Consultancy Services", bookId: "tcs" },
      { label: "AI Safety & Fraud Risk Platform", bookId: "fraud-risk" },
      { label: "Gmail AI Assistant", bookId: "gmail-assistant" },
      { label: "SpamSieve", bookId: "spamsieve" },
    ],
    how: "My main language for automation, data analysis and machine learning.",
    example: "SpamSieve is written in Python, from training the classifier to the Streamlit app.",
  },
  {
    id: "sql",
    name: "SQL",
    kind: "technical",
    icon: "sql",
    color: ROSE,
    usedAt: [
      { label: "Circana Market Research", bookId: "circana" },
      { label: "Estée Lauder Companies", bookId: "estee-lauder" },
      { label: "Tata Consultancy Services", bookId: "tcs" },
    ],
    how: "Investigating, validating and reconciling data so the numbers agree before anyone relies on them.",
    example: "At TCS, I reconciled SAP financial and insurance data with 100+ SQL queries, joins and stored procedures, with 100% reconciliation accuracy.",
  },
  {
    id: "power-bi",
    name: "Power BI",
    kind: "technical",
    icon: "powerbi",
    color: OCHRE,
    usedAt: [
      { label: "Circana Market Research", bookId: "circana" },
      { label: "Estée Lauder Companies", bookId: "estee-lauder" },
    ],
    how: "Dashboards that turn processed data into something clients and leaders can act on.",
    example: "At Estée Lauder, Power BI dashboards and Excel models analysed sales performance, contributing to 20%+ conversion growth.",
  },
  {
    id: "tableau",
    name: "Tableau",
    kind: "technical",
    icon: "tableau",
    color: MAUVE,
    usedAt: [{ label: "Circana", bookId: "circana" }],
    how: "Built and maintained dashboards for client reporting and performance analysis.",
    example: "Presented weekly performance data in interactive views to help clients explore trends and understand results.",
  },
  {
    id: "excel",
    name: "Advanced Excel & VLOOKUP",
    short: "Excel",
    kind: "technical",
    icon: "excel",
    color: PINK,
    usedAt: [{ label: "Estée Lauder Companies", bookId: "estee-lauder" }],
    how: "Data models and KPI trackers for quick, repeatable reporting.",
    example: "VLOOKUP-based KPI trackers with dynamic tables cut manual tracking time by 15%.",
  },
  {
    id: "azure",
    name: "Azure Data Factory & Snowflake",
    short: "Azure",
    kind: "technical",
    icon: "azure",
    color: PLUM,
    usedAt: [{ label: "Circana Market Research", bookId: "circana" }],
    how: "Coordinating the data workflows behind weekly reporting.",
    example: "At Circana, I coordinated weekly reporting workflows for five EMEA markets and 500+ client accounts through Azure Data Factory and Snowflake.",
  },
  {
    id: "databricks",
    name: "Databricks (PySpark)",
    short: "Databricks",
    kind: "technical",
    icon: "databricks",
    color: LAV,
    usedAt: [],
    how: "A data platform for processing and analysing large datasets; listed among my core skills.",
  },
  {
    id: "langchain",
    name: "LangChain, LangGraph & RAG",
    short: "LangChain",
    kind: "technical",
    icon: "langchain",
    color: ROSE,
    usedAt: [
      { label: "Circana Market Research", bookId: "circana" },
      { label: "Gmail AI Assistant", bookId: "gmail-assistant" },
    ],
    how: "Building AI workflows and agents that connect language models to data and tools.",
    example: "At Circana, I automated KPI narratives and discrepancy checks with RAG, LangChain and LangGraph, cutting reporting from 3 hours to 10 minutes.",
  },
  {
    id: "mcp",
    name: "MCP & SAP AI Core",
    short: "MCP",
    kind: "technical",
    icon: "mcp",
    color: MAUVE,
    usedAt: [{ label: "Gmail AI Assistant", bookId: "gmail-assistant" }],
    how: "MCP lets a language model use tools in a controlled way; SAP AI Core provides the models.",
    example: "I built a local MCP server that exposes Gmail actions to the assistant, with models served through SAP AI Core.",
  },
  {
    id: "scikit-learn",
    name: "scikit-learn",
    kind: "technical",
    icon: "scikitlearn",
    color: PINK,
    usedAt: [
      { label: "SpamSieve", bookId: "spamsieve" },
      { label: "AI Safety & Fraud Risk Platform", bookId: "fraud-risk" },
    ],
    how: "Training and comparing machine-learning models.",
    example: "SpamSieve compared four models; the selected one reached 98.3% precision on unseen test data.",
  },
  {
    id: "fastapi",
    name: "FastAPI & Streamlit",
    short: "FastAPI",
    kind: "technical",
    icon: "fastapi",
    color: PLUM,
    usedAt: [
      { label: "AI Safety & Fraud Risk Platform", bookId: "fraud-risk" },
      { label: "SpamSieve", bookId: "spamsieve" },
    ],
    how: "FastAPI for APIs that serve a model’s results; Streamlit for interactive apps.",
    example: "The fraud platform serves both of its checks through one FastAPI service and a Streamlit dashboard.",
  },
  {
    id: "crm",
    name: "Salesforce & MS Dynamics CRM",
    short: "Salesforce",
    kind: "technical",
    icon: "salesforce",
    color: LAV,
    usedAt: [{ label: "Estée Lauder Companies", bookId: "estee-lauder" }],
    how: "CRM systems behind my competitor analysis.",
    example: "I led a monthly competitor analysis across 8 competitors using Salesforce and MS Dynamics CRM.",
  },
  {
    id: "sap",
    name: "SAP",
    kind: "technical",
    icon: "sap",
    color: ROSE,
    usedAt: [{ label: "Tata Consultancy Services", bookId: "tcs" }],
    how: "Working with operational and financial data held in SAP systems.",
    example: "At TCS, I reconciled data against SAP systems with 100+ SQL queries.",
  },
  {
    id: "jira-tosca",
    name: "Jira",
    kind: "technical",
    icon: "jira",
    color: OCHRE,
    usedAt: [{ label: "Tata Consultancy Services", bookId: "tcs" }],
    how: "Issue tracking and UAT coordination.",
    example: "At TCS, I supported UAT and issue tracking through Jira.",
  },
  // Business & Delivery Skills
  {
    id: "communication",
    name: "Stakeholder Communication",
    short: "Communication",
    kind: "business",
    icon: "chat",
    color: ROSE,
    usedAt: [
      { label: "Circana Market Research", bookId: "circana" },
      { label: "Estée Lauder Companies", bookId: "estee-lauder" },
    ],
    how: "Clarified requirements, asked questions and explained findings to clients, colleagues and customers.",
    example: "At Circana, kept clients informed about reporting issues and explained the findings and next steps.",
  },
  {
    id: "delivery",
    name: "Operational Delivery",
    short: "Delivery",
    kind: "business",
    icon: "delivery",
    color: LAV,
    usedAt: [{ label: "Circana Market Research", bookId: "circana" }],
    how: "Prioritised reporting tasks and support requests against agreed deadlines.",
    example: "Maintained 100% SLA compliance while triaging more than 80 tickets weekly.",
  },
  {
    id: "root-cause",
    name: "Root-Cause Analysis",
    short: "Investigation",
    kind: "business",
    icon: "investigate",
    color: PLUM,
    usedAt: [
      { label: "Circana Market Research", bookId: "circana" },
      { label: "Tata Consultancy Services", bookId: "tcs" },
    ],
    how: "Investigated discrepancies, identified underlying causes and supported corrective actions.",
    example: "At TCS, root-cause analysis and CAPA helped reduce recurring defects by 30%.",
  },
  {
    id: "onboarding",
    name: "Client Onboarding & Training",
    short: "Onboarding",
    kind: "business",
    icon: "onboard",
    color: MAUVE,
    usedAt: [{ label: "Circana Market Research", bookId: "circana" }],
    how: "Guided new clients through reporting processes with training and self-service resources.",
    example: "Helped reduce onboarding from three weeks to one.",
  },
  {
    id: "commercial",
    name: "Commercial Analysis",
    short: "Commercial Insight",
    kind: "business",
    icon: "growth",
    color: OCHRE,
    usedAt: [{ label: "Estée Lauder Companies", bookId: "estee-lauder" }],
    how: "Connected customer conversations with sales, campaign and competitor analysis.",
    example: "Analysed eight competitors to support commercial strategy.",
  },
  {
    id: "improvement",
    name: "Process Improvement",
    short: "Improvement",
    kind: "business",
    icon: "cycle",
    color: PINK,
    usedAt: [
      { label: "Circana Market Research", bookId: "circana" },
      { label: "Tata Consultancy Services", bookId: "tcs" },
      { label: "Estée Lauder Companies", bookId: "estee-lauder" },
    ],
    how: "Identified repetitive tasks and improved workflows to reduce manual effort.",
    example: "At Estée Lauder, improved KPI tracking reduced manual tracking time by 15%.",
  },
];
