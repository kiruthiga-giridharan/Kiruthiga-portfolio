import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { skills } from "../data/library";
import type { Skill } from "../data/types";
import { BookOpenIcon, CloseIcon } from "./icons";
import { ToolIconMark } from "./ToolIconMark";

type ToolCabinetProps = {
  /** Opens a book. `trigger` receives focus when that book closes. */
  onOpenBook: (bookId: string, trigger: HTMLElement) => void;
};

/**
 * Column counts for a row of `count` books: one line when wide, two even
 * lines on medium screens, and lines of at most five on phones, so no book
 * is ever left alone at the end of a row.
 */
function columns(count: number) {
  const narrowLines = Math.ceil(count / 5);
  return {
    "--cols-wide": count,
    "--cols-mid": Math.ceil(count / 2),
    "--cols-narrow": Math.ceil(count / narrowLines),
  } as CSSProperties;
}

const ROWS: { kind: Skill["kind"]; label: string }[] = [
  { kind: "technical", label: "Technical skills" },
  { kind: "business", label: "Business & Delivery Skills" },
];

export function ToolCabinet({ onOpenBook }: ToolCabinetProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);
  const selected = skills.find((skill) => skill.id === selectedId) ?? null;

  return (
    <div className="cabinet">
      <p className="cabinet__hint">
        <BookOpenIcon className="icon" />
        Pick a book to see it in practice.
      </p>

      <div className="cabinet__case">
        {ROWS.map((row) => {
          const rowSkills = skills.filter((skill) => skill.kind === row.kind);
          return (
            <div className={`cabinet__row cabinet__row--${row.kind}`} key={row.kind} role="group" aria-labelledby={`tray-${row.kind}`}>
              <p className="cabinet__row-label" id={`tray-${row.kind}`}>
                {row.label}
              </p>
              <div className="cabinet__stage">
                <ul className="tray" style={columns(rowSkills.length)}>
                  {rowSkills.map((skill) => (
                    <li key={skill.id}>
                      <button
                        type="button"
                        className="mini"
                        style={{ "--cover": skill.color } as CSSProperties}
                        aria-haspopup="dialog"
                        aria-label={`${skill.name}: open skill card`}
                        title={skill.name}
                        onClick={(event) => {
                          lastTrigger.current = event.currentTarget;
                          setSelectedId(skill.id);
                        }}
                      >
                        {skill.icon && <ToolIconMark icon={skill.icon} className="mini__icon" />}
                        <span className="mini__label">{skill.short ?? skill.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <SkillCard
          skill={selected}
          onClose={() => {
            setSelectedId(null);
            // Wait until the modal has gone, otherwise the page is still inert and focus is refused.
            const trigger = lastTrigger.current;
            requestAnimationFrame(() => trigger?.focus({ preventScroll: true }));
          }}
          onOpenBook={(bookId) => {
            // Close the card first so only one dialog is ever open; the book returns focus to the skill.
            setSelectedId(null);
            const trigger = lastTrigger.current;
            if (trigger) onOpenBook(bookId, trigger);
          }}
        />
      )}
    </div>
  );
}

/** The skill card, opened as a centred modal over the dimmed library. */
function SkillCard({ skill, onClose, onOpenBook }: { skill: Skill; onClose: () => void; onOpenBook: (bookId: string) => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      dialog.querySelector<HTMLElement>(".skill-card__x")?.focus({ preventScroll: true });
    }
    return () => dialog?.close();
  }, []);

  return (
    <dialog
      ref={dialogRef}
      className="skill-dialog"
      aria-labelledby="skill-card-title"
      style={{ "--cover": skill.color } as CSSProperties}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="skill-card">
        <button type="button" className="skill-card__x" onClick={onClose} aria-label="Close card">
          <CloseIcon className="icon" />
        </button>
        <p className="skill-card__kind">{skill.kind === "technical" ? "Technical skill" : "Business & delivery skill"}</p>
        <h3 className="skill-card__title" id="skill-card-title">
          {skill.icon && <ToolIconMark icon={skill.icon} />}
          {skill.name}
        </h3>
        <div className="skill-card__grid">
          <div>
            <p className="skill-card__label">Where I used it</p>
            {skill.usedAt.length ? (
              <ul className="skill-card__places">
                {skill.usedAt.map((place) => (
                  <li key={place.label}>
                    {place.bookId ? (
                      <button type="button" onClick={() => onOpenBook(place.bookId!)}>
                        <BookOpenIcon className="icon" />
                        <span>
                          {place.label}
                          <small>Open the book</small>
                        </span>
                      </button>
                    ) : (
                      place.label
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="skill-card__empty">Listed in my résumé skills. No specific role or project is documented here yet.</p>
            )}
          </div>
          <div>
            <p className="skill-card__label">How I used it</p>
            <p>{skill.how}</p>
            {skill.example && (
              <>
                <p className="skill-card__label">Example</p>
                <p>{skill.example}</p>
              </>
            )}
          </div>
        </div>
        <button type="button" className="skill-card__close" onClick={onClose}>
          Close card
        </button>
      </div>
    </dialog>
  );
}
