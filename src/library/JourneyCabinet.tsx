import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { journey } from "../data/library";
import { ArrowLeftIcon, ArrowRightIcon } from "./icons";

const pad = (value: number) => String(value).padStart(2, "0");

/** The Journey So Far: a walnut keepsake cabinet with a stable story panel beside it. */
export function JourneyCabinet() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const total = journey.chapters.length;
  const chapter = journey.chapters[active];

  const select = (index: number, focus = false) => {
    const next = (index + total) % total;
    setActive(next);
    if (focus) tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent, index: number) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowDown: index + 1,
      ArrowLeft: index - 1,
      ArrowUp: index - 1,
      Home: 0,
      End: total - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      select(moves[event.key], true);
    }
  };

  return (
    <div className="journey">
      <div className="journey__intro">
        <div>
          <p className="journey__lead">{journey.intro}</p>
          <p className="journey__support">{journey.support}</p>
        </div>
      </div>

      <div className="journey__body">
        <div className="keepsakes">
          <div className="keepsakes__grid" role="tablist" aria-label="Keepsakes">
            {journey.chapters.map((item, index) => (
              <button
                key={item.title}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`keepsake-${index}`}
                aria-selected={index === active}
                aria-controls="journey-story"
                tabIndex={index === active ? 0 : -1}
                className={`keepsake${item.wide ? " keepsake--wide" : ""}`}
                onClick={() => select(index)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className="keepsake__niche">
                  <img src={item.image} alt="" width="280" height="226" draggable={false} />
                </span>
                <span className="keepsake__plate">
                  <span>{pad(index + 1)}</span>
                  {item.title}
                </span>
                <span className="sr-only">: {item.object}</span>
              </button>
            ))}
          </div>
          <p className="keepsakes__hint">Choose a keepsake to read its chapter.</p>
        </div>

        <article
          className="story"
          id="journey-story"
          role="tabpanel"
          aria-labelledby={`keepsake-${active}`}
          aria-live="polite"
        >
          <p className="story__chapter">
            Chapter {pad(active + 1)} / {pad(total)}
          </p>
          <h3 className="story__title" key={chapter.title}>
            {chapter.title}
          </h3>
          <p className="story__text">{chapter.text}</p>
          <span className="story__rule" aria-hidden="true" />
          <div className="story__nav">
            <button type="button" className="story__button" onClick={() => select(active - 1)} disabled={active === 0}>
              <ArrowLeftIcon className="icon" />
              Previous
            </button>
            <button type="button" className="story__button story__button--next" onClick={() => select(active + 1)} disabled={active === total - 1}>
              Next
              <ArrowRightIcon className="icon" />
            </button>
          </div>
        </article>
      </div>

      <p className="journey__closing">{journey.closing}</p>
    </div>
  );
}
