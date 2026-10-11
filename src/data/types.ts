/** Types for the library content in `library.ts`. */

export type Contact = {
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
};

export type ExternalLink = {
  label: string;
  href: string;
  kind: "github" | "demo";
};

/** Icon names map to files in src/library/assets/icons (see icons.ts). */
export type ToolIcon =
  | "python"
  | "sql"
  | "powerbi"
  | "tableau"
  | "excel"
  | "azure"
  | "databricks"
  | "sap"
  | "jira"
  | "tosca"
  | "langchain"
  | "langgraph"
  | "mcp"
  | "scikitlearn"
  | "streamlit"
  | "fastapi"
  | "salesforce"
  | "dynamics"
  | "gmail"
  | "pandas"
  | "sqlite"
  | "model"
  | "snowflake"
  /* Symbols for the Business & Delivery Skills */
  | "chat"
  | "delivery"
  | "investigate"
  | "onboard"
  | "growth"
  | "cycle";

export type CompareSide = { label: string; value: string; detail: string };

/** Line icons for the illustrated areas (see PageContent). */
export type AreaIcon = "advice" | "sales" | "crm" | "code" | "search";

export type FlowStep = { title: string; detail?: string; emphasis?: boolean };

/** The building blocks that make up a page inside a book. */
export type Block =
  | { type: "paragraph"; text: string; lead?: boolean }
  | { type: "subheading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "facts"; items: { label: string; value: string }[] }
  | { type: "callout"; label: string; text: string }
  | { type: "note"; text: string }
  /** Vertical sequence of labelled steps. */
  | { type: "flow"; steps: FlowStep[]; caption?: string; start?: number }
  /** Several short horizontal flows, one per row. */
  | { type: "lanes"; lanes: { label: string; steps: FlowStep[] }[]; caption?: string }
  /** Recurring activities grouped by how often they happen. */
  | { type: "routine"; groups: { when: string; items: string[] }[] }
  /** Results, each with a plain explanation of what the number means. */
  | { type: "metrics"; items: { value: string; label: string; explain: string }[] }
  | {
      type: "toolsSkills";
      tools: { name: string; icon: ToolIcon; use: string }[];
      skills: { name: string; example: string }[];
      /** Set when pagination shows only one column of the block. */
      part?: "tools" | "skills";
    }
  | { type: "timeline"; items: { when: string; title: string; detail: string }[] }
  | {
      type: "image";
      src: string;
      alt: string;
      caption: string;
      width: number;
      height: number;
      /** Screenshots are shown whole; photos fill their frame. */
      kind: "screenshot" | "photo";
    }
  | { type: "monogram"; letters: string; caption: string }
  | { type: "mockup"; kind: "spam-single" | "gmail-chat"; from?: number; to?: number }
  /** A compact recognition block, kept apart from performance metrics. */
  | { type: "recognition"; items: string[] }
  /** A highlighted subsection with its own heading. */
  | { type: "feature"; title: string; text: string }
  /** A horizontal chain showing how one thing led to the next. */
  | { type: "chain"; steps: string[]; caption?: string; start?: number }
  /** Labelled illustration of the maternal health monitoring prototype. */
  | { type: "kit"; measurements: string[] }
  /** Verified results as compact cards: a figure, what it measured and, optionally, how it was achieved. */
  | { type: "cards"; items: { value: string; label: string; detail?: string }[] }
  /** Tools as small icon labels beneath the work they supported. */
  | { type: "tags"; items: { name: string; icon?: ToolIcon }[]; label?: string }
  /** Short qualitative themes, each with a one-line explanation. */
  | { type: "themes"; items: { title: string; text: string }[] }
  /** A before-and-after comparison for one improved task. */
  | { type: "compare"; before: CompareSide; after: CompareSide; caption?: string }
  /** Two or three small illustrated areas of work. */
  | { type: "areas"; items: { title: string; icon: AreaIcon }[] }
  /** Tools, each with how it was applied, in a single readable list. */
  | { type: "tools"; items: { name: string; icon: ToolIcon; use: string }[] }
  /** A short line of strengths separated by dots. */
  | { type: "strengths"; items: string[] };

export type BookPage = {
  title: string;
  blocks: Block[];
};

/** The fixed editorial panel beside an open book. */
export type InfoPanel = {
  heading: string;
  gist: string;
  /** Items marked `wide` span the full width; the rest sit side by side. */
  meta: { label: string; value: string; wide?: boolean }[];
  tools?: string[];
  links?: ExternalLink[];
};

/** Artworks from the original ThreeUI cover atlas, recoloured per book. */
export type CoverArt = "chip" | "paths" | "cursor" | "orbits" | "target" | "frames" | "compass";

/** Small gold-tooled emblems for the career covers. */
export type CoverEmblem = "bars" | "sprig" | "globe" | "book" | "compass";

export type Book = {
  id: string;
  /** Short title printed on the cover. */
  coverTitle: string;
  /** Small uppercase line under the cover title. */
  coverSubtitle: string;
  /** Leather colour, plus either atlas artwork (gilt-embossed) or a small gold emblem. */
  cover: { art?: CoverArt; emblem?: CoverEmblem; color: string; mirror?: boolean };
  /** Relative height on the shelf, from 0.86 to 1. */
  height?: number;
  panel: InfoPanel;
  pages: BookPage[];
};

export type Shelf = {
  id: string;
  title: string;
  tagline: string;
  books: Book[];
};

export type Skill = {
  id: string;
  name: string;
  kind: "technical" | "business";
  /** Short label printed on the miniature book. */
  short?: string;
  icon?: ToolIcon;
  color: string;
  /** Where it was used. `bookId` links to the matching book. Empty if no role or project is documented. */
  usedAt: { label: string; bookId?: string }[];
  how: string;
  example?: string;
};

export type Recommendation = {
  quote: string;
  name: string;
  role: string;
};

export type Journey = {
  eyebrow: string;
  heading: string;
  intro: string;
  support: string;
  closing: string;
  portrait: { src: string; alt: string; width: number; height: number };
  chapters: { title: string; object: string; image: string; wide: boolean; text: string }[];
};
