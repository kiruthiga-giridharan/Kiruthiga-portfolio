import type { JSX } from "react";
import type { AreaIcon, Block } from "../data/types";
import { ToolIconMark } from "./ToolIconMark";

export function PageContent({ blocks }: { blocks: Block[] }) {
  return (
    <div className="pc">
      {blocks.map((block, index) => (
        <PageBlock key={index} block={block} />
      ))}
    </div>
  );
}

function PageBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "paragraph":
      return <p className={block.lead ? "pc__lead" : "pc__p"}>{block.text}</p>;
    case "subheading":
      return <h4 className="pc__sub">{block.text}</h4>;
    case "list":
      return (
        <ul className="pc__list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "facts":
      return (
        <dl className="pc__facts">
          {block.items.map((fact) => (
            <div key={fact.label}>
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      );
    case "callout":
      return (
        <aside className="pc__callout">
          <p className="pc__label">{block.label}</p>
          <p>{block.text}</p>
        </aside>
      );
    case "note":
      return <p className="pc__note">{block.text}</p>;
    case "flow":
      return (
        <figure className="pc__flow">
          <ol>
            {block.steps.map((step, index) => (
              <li key={step.title} className={step.emphasis ? "is-key" : undefined}>
                <span className="pc__flow-num" aria-hidden="true">
                  {(block.start ?? 0) + index + 1}
                </span>
                <span>
                  <strong>{step.title}</strong>
                  {step.detail && <small>{step.detail}</small>}
                </span>
              </li>
            ))}
          </ol>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "lanes":
      return (
        <figure className="pc__lanes">
          {block.lanes.map((lane) => (
            <div className="pc__lane" key={lane.label}>
              <p className="pc__label">{lane.label}</p>
              <ol aria-label={lane.label}>
                {lane.steps.map((step) => (
                  <li key={step.title} className={step.emphasis ? "is-key" : undefined}>
                    <strong>{step.title}</strong>
                    {step.detail && <small>{step.detail}</small>}
                  </li>
                ))}
              </ol>
            </div>
          ))}
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "routine":
      return (
        <div className="pc__routine">
          {block.groups.map((group) => (
            <section key={group.when}>
              <h4>{group.when}</h4>
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      );
    case "metrics":
      return (
        <dl className="pc__metrics">
          {block.items.map((item) => (
            <div key={item.label}>
              <dd className="pc__metric-value">{item.value}</dd>
              <dt>
                <strong>{item.label}</strong>
                <span>{item.explain}</span>
              </dt>
            </div>
          ))}
        </dl>
      );
    case "toolsSkills":
      return (
        <div className={`pc__toolsskills${block.part ? " is-single" : ""}`}>
          {block.part !== "skills" && (
            <section>
              <h4>Technical Toolkit</h4>
              <ul>
                {block.tools.map((tool) => (
                  <li key={tool.name}>
                    <ToolIconMark icon={tool.icon} />
                    <span>
                      <strong>{tool.name}</strong>
                      <small>{tool.use}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
          {block.part !== "tools" && (
            <section>
              <h4>Professional Skills</h4>
              <ul>
                {block.skills.map((skill) => (
                  <li key={skill.name}>
                    <span>
                      <strong>{skill.name}</strong>
                      <small>{skill.example}</small>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      );
    case "timeline":
      return (
        <ol className="pc__timeline">
          {block.items.map((item) => (
            <li key={`${item.when}-${item.title}`}>
              <span className="pc__when">{item.when}</span>
              <strong>{item.title}</strong>
              <small>{item.detail}</small>
            </li>
          ))}
        </ol>
      );
    case "image":
      return (
        <figure className={`pc__figure pc__figure--${block.kind}`}>
          {block.kind === "photo" ? (
            // Photographs stay static: no link, zoom or enlargement.
            <span className="pc__photo">
              <img src={block.src} alt={block.alt} width={block.width} height={block.height} draggable={false} />
            </span>
          ) : (
            <a href={block.src} target="_blank" rel="noopener noreferrer" aria-label={`${block.alt} Open full size in a new tab.`}>
              <img src={block.src} alt={block.alt} width={block.width} height={block.height} />
            </a>
          )}
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
    case "monogram":
      return (
        <figure className="pc__monogram" aria-label={block.caption}>
          <svg viewBox="0 0 320 150" aria-hidden="true" focusable="false">
            <g fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.35">
              <circle cx="160" cy="75" r="62" />
              <circle cx="160" cy="75" r="48" />
              <path d="M40 75 H 280 M160 8 V 142" />
              <path d="M98 75 A 62 62 0 0 1 222 75" strokeDasharray="2 4" />
              <path d="M70 120 L 110 40 L 150 120 Z M 170 120 L 210 40 L 250 120 Z" />
            </g>
            <text x="160" y="92" textAnchor="middle" className="pc__monogram-letters">
              {block.letters}
            </text>
          </svg>
          <figcaption>{block.caption}</figcaption>
        </figure>
      );
    case "mockup":
      return block.kind === "spam-single" ? <SpamMockup /> : <GmailMockup from={block.from} to={block.to} />;
    case "recognition":
      return (
        <section className="pc__recognition" aria-label="Recognition">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="pc__star">
            <path d="M12 2.8l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 16.8l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z" />
          </svg>
          <div>
            <h4>Recognition</h4>
            <ul>
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </section>
      );
    case "feature":
      return (
        <section className="pc__feature">
          <h4>{block.title}</h4>
          <p>{block.text}</p>
        </section>
      );
    case "chain":
      return (
        <figure className="pc__chain">
          <ol>
            {block.steps.map((step, index) => (
              <li key={step}>
                <span className="pc__chain-num" aria-hidden="true">
                  {(block.start ?? 0) + index + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "kit":
      return <KitIllustration measurements={block.measurements} />;
    case "cards":
      return (
        <dl className={`pc__cards${block.items.some((item) => item.detail) ? " pc__cards--rows" : ""}`}>
          {block.items.map((item) => (
            <div key={item.label}>
              <dd>{item.value}</dd>
              <dt>
                {item.label}
                {item.detail && <small>{item.detail}</small>}
              </dt>
            </div>
          ))}
        </dl>
      );
    case "tags":
      return (
        <div className="pc__tagset">
          {block.label && <p className="pc__label">{block.label}</p>}
          <ul className="pc__tags" aria-label={block.label ?? "Tools used"}>
            {block.items.map((tag) => (
              <li key={tag.name}>
                {tag.icon && <ToolIconMark icon={tag.icon} />}
                {tag.name}
              </li>
            ))}
          </ul>
        </div>
      );
    case "themes":
      return (
        <ol className="pc__themes">
          {block.items.map((theme, index) => (
            <li key={theme.title}>
              <span className="pc__chain-num" aria-hidden="true">
                {index + 1}
              </span>
              <span>
                <strong>{theme.title}</strong>
                <small>{theme.text}</small>
              </span>
            </li>
          ))}
        </ol>
      );
    case "compare":
      return (
        <figure className="pc__compare">
          <div className="pc__compare-sides">
            {[block.before, block.after].map((side, index) => (
              <div key={side.label} className={index ? "is-after" : undefined}>
                <p className="pc__label">{side.label}</p>
                <strong>{side.value}</strong>
                <small>{side.detail}</small>
              </div>
            ))}
            <span className="pc__compare-arrow" aria-hidden="true">
              →
            </span>
          </div>
          {block.caption && <figcaption>{block.caption}</figcaption>}
        </figure>
      );
    case "areas":
      return (
        <ul className={`pc__areas pc__areas--${block.items.length}`}>
          {block.items.map((area) => (
            <li key={area.title}>
              <svg viewBox="-24 -24 48 48" aria-hidden="true" focusable="false">
                {AREA_ICONS[area.icon]}
              </svg>
              <span>{area.title}</span>
            </li>
          ))}
        </ul>
      );
    case "tools":
      return (
        <ul className="pc__tools">
          {block.items.map((tool) => (
            <li key={tool.name}>
              <ToolIconMark icon={tool.icon} />
              <span>
                <strong>{tool.name}</strong>
                <small>{tool.use}</small>
              </span>
            </li>
          ))}
        </ul>
      );
    case "strengths":
      return (
        <div className="pc__strengths">
          <h4>Professional strengths</h4>
          <p>{block.items.join(" · ")}</p>
        </div>
      );
  }
}

/** Line icons for illustrated areas, drawn around the origin (about 40px across). */
const AREA_ICONS: Record<AreaIcon, JSX.Element> = {
  advice: (
    <path d="M-16 -12 h26 a5 5 0 0 1 5 5 v12 a5 5 0 0 1 -5 5 h-14 l-8 7 v-7 h-4 a5 5 0 0 1 -5 -5 v-12 a5 5 0 0 1 5 -5 Z M-9 -2 h16 M-9 4 h10" />
  ),
  sales: <path d="M-18 16 h36 M-13 16 v-10 M-4 16 v-18 M5 16 v-12 M14 16 v-24 M-15 -2 l9 -8 l9 5 l11 -11" />,
  crm: (
    <path d="M-8 -6 a6 6 0 1 0 0.01 0 Z M-19 14 a11 9 0 0 1 22 0 M10 -10 a5 5 0 1 0 0.01 0 Z M5 3 a9 7 0 0 1 14 9" />
  ),
  code: <path d="M-10 -10 l-10 10 l10 10 M10 -10 l10 10 l-10 10 M5 -16 l-10 32" />,
  search: <path d="M-4 -4 m-11 0 a11 11 0 1 0 22 0 a11 11 0 1 0 -22 0 M4 4 l14 14 M-9 -4 h10" />,
};

/** Icons for each measurement, drawn at the origin (about 44px across). */
const KIT_ICONS: Record<string, JSX.Element> = {
  "Heart rate": (
    <path d="M0 14 C -18 2 -20 -10 -10 -14 C -4 -16 0 -11 0 -8 C 0 -11 4 -16 10 -14 C 20 -10 18 2 0 14 Z M -20 0 H -10 L -6 -7 L -1 7 L 3 -3 H 20" />
  ),
  Haemoglobin: (
    <g>
      <path d="M0 -17 C 9 -5 13 2 13 7 A 13 13 0 0 1 -13 7 C -13 2 -9 -5 0 -17 Z" />
      <text x="0" y="11" textAnchor="middle" className="pc__kit-icon-text">Hb</text>
    </g>
  ),
  Pulse: <path d="M-20 2 H -12 L -8 -10 L -3 12 L 2 -6 L 6 2 H 20" />,
  "Blood glucose": (
    <g>
      <rect x="-14" y="-16" width="20" height="30" rx="4" />
      <rect x="-10" y="-12" width="12" height="9" rx="1.5" />
      <path d="M14 -6 C 18 0 19 4 14 8 C 9 4 10 0 14 -6 Z" />
    </g>
  ),
  "Blood pressure": (
    <g>
      <rect x="-20" y="-9" width="24" height="18" rx="5" />
      <circle cx="13" cy="0" r="8" />
      <path d="M13 0 L 17 -4" />
    </g>
  ),
};

/** Labelled prototype illustration: a central kit with a module for each measurement. */
function KitIllustration({ measurements }: { measurements: string[] }) {
  const cx = 170;
  const cy = 150;
  const radius = 108;
  return (
    <figure className="pc__kit">
      <svg viewBox="0 0 340 300" role="img" aria-label={`Prototype illustration: one kit measuring ${measurements.join(", ").toLowerCase()}.`}>
        {measurements.map((label, index) => {
          const angle = -Math.PI / 2 + (index * 2 * Math.PI) / measurements.length;
          const x = cx + radius * Math.cos(angle);
          const y = cy + radius * Math.sin(angle);
          const below = Math.sin(angle) > 0.2;
          return (
            <g key={label}>
              <line x1={cx} y1={cy} x2={x} y2={y} className="pc__kit-link" />
              <circle cx={x} cy={y} r="27" className="pc__kit-module" />
              <g transform={`translate(${x} ${y})`} className="pc__kit-icon">
                {KIT_ICONS[label]}
              </g>
              <text x={x} y={below ? y + 42 : y - 34} textAnchor="middle" className="pc__kit-label">
                {label}
              </text>
            </g>
          );
        })}
        <rect x={cx - 38} y={cy - 26} width="76" height="52" rx="10" className="pc__kit-hub" />
        <text x={cx} y={cy - 3} textAnchor="middle" className="pc__kit-hub-text">Health</text>
        <text x={cx} y={cy + 12} textAnchor="middle" className="pc__kit-hub-text">kit</text>
      </svg>
      <figcaption>Illustration of the prototype. Not a clinically certified device.</figcaption>
    </figure>
  );
}

/** Illustrations of the apps, clearly labelled so they are not mistaken for real output. */
function SpamMockup() {
  return (
    <figure className="pc__mockup">
      <p className="pc__badge">Illustrative mockup · not real model output</p>
      <ol>
        <li>
          <span className="pc__label">1 · Message</span>
          <span className="pc__mock-box">Congratulations! Claim your free prize now</span>
        </li>
        <li>
          <span className="pc__label">2 · Spam probability</span>
          <span className="pc__meter" aria-hidden="true">
            <span className="pc__meter-fill" />
            <span className="pc__meter-mark" />
          </span>
          <small>Bar: an example value. Marker: your adjustable threshold.</small>
        </li>
        <li>
          <span className="pc__label">3 · Classification</span>
          <span className="pc__mock-box pc__mock-box--strong">Above the threshold → spam</span>
        </li>
      </ol>
    </figure>
  );
}

const GMAIL_CONVERSATION = [
  { kind: "user", text: "Find my latest interview email and draft a reply confirming my availability." },
  { kind: "assistant", text: "I found the most recent interview email and drafted a reply confirming your availability." },
  { kind: "draft", label: "Draft reply", text: "Thank you for the invitation. I’m happy to confirm my availability…" },
  { kind: "confirm", label: "Waiting for you", text: "The send tool stays off until you confirm." },
] as const;

function GmailMockup({ from = 0, to = GMAIL_CONVERSATION.length }: { from?: number; to?: number }) {
  return (
    <figure className="pc__mockup">
      {from === 0 && <p className="pc__badge">Illustrative mockup · example conversation, not a screenshot</p>}
      <ol className="pc__chat" start={from + 1}>
        {GMAIL_CONVERSATION.slice(from, to).map((message) => (
          <li key={message.kind} className={`pc__bubble${message.kind === "assistant" ? "" : ` pc__bubble--${message.kind}`}`}>
            {"label" in message && <span className="pc__label">{message.label}</span>}
            {message.text}
            {message.kind === "confirm" && (
              <span className="pc__mock-actions" aria-hidden="true">
                <span>Confirm &amp; send</span>
                <span>Edit draft</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}
