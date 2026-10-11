import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties, MouseEvent, ReactNode } from "react";
import type { Book } from "../data/types";
import { useCoverArt } from "./coverArt";
import { useReducedMotion } from "./hooks";
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon, ExternalIcon, GitHubIcon } from "./icons";
import { PageContent } from "./PageContent";
import { mergeUnits, packPages, toUnits } from "./paginate";
import type { PhysicalPage } from "./paginate";
import { CoverFace } from "./ShelfBook";

type BookViewProps = {
  book: Book;
  volume: number;
  chapterTitle: string;
  trigger: HTMLElement | null;
  onClosed: () => void;
};

type Turn = { from: number; to: number; dir: "next" | "prev"; id: number };

const INTERACTIVE = "a, button, input, textarea, select, label, summary, [data-no-turn]";
const pad = (value: number) => String(value).padStart(2, "0");

/** On wide screens the cover lies open beside the pages; on narrow screens it stands open. */
const coverAngle = () => (window.matchMedia("(max-width: 960px)").matches ? -100 : -172);

/** Transform that maps the book onto the shelf book's position and size. */
function flipFrom(from: DOMRect, to: DOMRect) {
  const dx = from.left + from.width / 2 - (to.left + to.width / 2);
  const dy = from.top + from.height / 2 - (to.top + to.height / 2);
  return `translate(${dx}px, ${dy}px) scale(${from.width / to.width}, ${from.height / to.height})`;
}

export function BookView({ book, volume, chapterTitle, trigger, onClosed }: BookViewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const pagerRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const reducedMotion = useReducedMotion();
  const openingRef = useRef({ trigger, reducedMotion });
  const [angle] = useState(coverAngle);
  const angleRef = useRef(angle);
  const art = useCoverArt(book.cover.art, book.cover.color, book.cover.mirror);

  // ── pagination: pieces are measured at the real page size and packed into pages ──
  const measureRef = useRef<HTMLDivElement>(null);
  const [narrow, setNarrow] = useState(false);
  const [layoutVersion, setLayoutVersion] = useState(0);
  const [pages, setPages] = useState<PhysicalPage[] | null>(null);
  const units = useMemo(() => book.pages.map((authored) => toUnits(authored, narrow)), [book, narrow]);

  useLayoutEffect(() => {
    const root = measureRef.current;
    const body = root?.querySelector<HTMLElement>(".bv-page__body");
    if (!root || !body) return;
    const style = getComputedStyle(body);
    const width = body.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
    // On phones the two tool columns stack, so each item flows separately.
    const isNarrow = width < 290 || window.matchMedia("(max-width: 760px)").matches;
    if (isNarrow !== narrow) {
      setNarrow(isNarrow);
      return;
    }
    const available = body.clientHeight - parseFloat(style.paddingTop) - parseFloat(style.paddingBottom) - 2;
    const titles = book.pages.map((_, index) => {
      const element = root.querySelector<HTMLElement>(`[data-title="${index}"]`)!;
      return element.offsetHeight + parseFloat(getComputedStyle(element).marginBottom);
    });
    const heights = units.map((list, index) =>
      list.map((_, unit) => root.querySelector<HTMLElement>(`[data-unit="${index}-${unit}"]`)!.offsetHeight),
    );
    const grid = root.querySelector<HTMLElement>(".pc");
    const gap = grid ? parseFloat(getComputedStyle(grid).rowGap) || 14 : 14;
    setPages(packPages(book.pages, units, { title: titles, units: heights, available, gap, innerGap: 20, continued: 0 }));
  }, [book, units, narrow, layoutVersion]);

  // Re-measure when the book changes size or web fonts finish loading.
  useEffect(() => {
    const target = bookRef.current;
    if (!target) return;
    let width = target.clientWidth;
    let height = target.clientHeight;
    const observer = new ResizeObserver(() => {
      if (target.clientWidth !== width || target.clientHeight !== height) {
        width = target.clientWidth;
        height = target.clientHeight;
        setLayoutVersion((version) => version + 1);
      }
    });
    observer.observe(target);
    document.fonts?.ready.then(() => setLayoutVersion((version) => version + 1));
    return () => observer.disconnect();
  }, []);

  const total = pages?.length ?? book.pages.length;
  const [requestedPage, setPage] = useState(0);
  const page = Math.min(requestedPage, total - 1);
  const [turn, setTurn] = useState<Turn | null>(null);
  const [coverOpen, setCoverOpen] = useState(reducedMotion);

  // ── opening: the book comes off the shelf, then its cover opens onto page 1 ──
  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });

    const { trigger: origin, reducedMotion: still } = openingRef.current;
    const target = bookRef.current;
    const cover = coverRef.current;
    if (still || !target || !cover) return;
    const shelfBook = origin?.querySelector("[data-cover]") ?? origin;
    if (shelfBook) {
      target.animate([{ transform: flipFrom(shelfBook.getBoundingClientRect(), target.getBoundingClientRect()) }, { transform: "none" }], {
        duration: 640,
        easing: "cubic-bezier(0.2, 0.72, 0.24, 1)",
      });
    }
    const opening = cover.animate([{ transform: "rotateY(0deg)" }, { transform: `rotateY(${angleRef.current}deg)` }], {
      duration: 900,
      delay: 520,
      easing: "cubic-bezier(0.45, 0.05, 0.3, 1)",
      fill: "forwards",
    });
    opening.onfinish = () => {
      setCoverOpen(true);
      opening.cancel();
    };
  }, []);

  // ── closing: the cover closes and the book returns to its shelf ──
  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const finish = () => {
      dialogRef.current?.close();
      onClosed();
      trigger?.focus({ preventScroll: true });
    };
    const target = bookRef.current;
    const cover = coverRef.current;
    if (reducedMotion || !target || !cover || !trigger?.isConnected) {
      finish();
      return;
    }
    dialogRef.current?.classList.add("is-closing");
    const closing = cover.animate([{ transform: `rotateY(${angleRef.current}deg)` }, { transform: "rotateY(0deg)" }], {
      duration: 460,
      easing: "cubic-bezier(0.4, 0, 0.6, 1)",
      fill: "forwards",
    });
    closing.onfinish = () => {
      const shelfBook = trigger.querySelector("[data-cover]") ?? trigger;
      const back = target.animate(
        [{ transform: "none" }, { transform: flipFrom(shelfBook.getBoundingClientRect(), target.getBoundingClientRect()) }],
        { duration: 440, easing: "cubic-bezier(0.4, 0, 0.6, 1)", fill: "forwards" },
      );
      back.onfinish = finish;
    };
  }, [onClosed, reducedMotion, trigger]);

  // ── page turning ──
  const goTo = useCallback(
    (direction: 1 | -1) => {
      const target = page + direction;
      if (target < 0 || target >= total) return;
      if (!reducedMotion) {
        setTurn((previous) => ({ from: page, to: target, dir: direction > 0 ? "next" : "prev", id: (previous?.id ?? 0) + 1 }));
      }
      setPage(target);
    },
    [page, total, reducedMotion],
  );

  useEffect(() => {
    if (!turn) return;
    const timer = window.setTimeout(() => setTurn(null), 860);
    return () => window.clearTimeout(timer);
  }, [turn]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      if ((event.target as HTMLElement | null)?.closest?.("input, textarea, select")) return;
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goTo(1);
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        goTo(-1);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [goTo]);

  // If the focused arrow becomes disabled on the first or last page, keep focus in the pager.
  useEffect(() => {
    const active = document.activeElement as HTMLButtonElement | null;
    if (active && dialogRef.current?.contains(active) && active.disabled) pagerRef.current?.focus({ preventScroll: true });
  }, [page]);

  const onPageClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest(INTERACTIVE)) return;
    if (window.getSelection()?.toString()) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    goTo(event.clientX - bounds.left < bounds.width * 0.22 ? -1 : 1);
  };

  const renderPage = (index: number, interactive: boolean): ReactNode => {
    const content = pages?.[index];
    if (!content) return null;
    return (
      <article
        className="bv-page"
        aria-label={`Page ${index + 1} of ${total}: ${content.title}`}
        onClick={interactive ? onPageClick : undefined}
      >
        <header className="bv-page__head" aria-hidden="true">
          <span>
            {book.coverTitle} / {pad(volume)}
          </span>
          <span>{pad(index + 1)}</span>
        </header>
        <div className="bv-page__body">
          <h3 className="bv-page__title">{content.title}</h3>
          <PageContent blocks={mergeUnits(content.units)} />
        </div>
        {interactive && index < total - 1 && <span className="bv-page__curl" aria-hidden="true" />}
      </article>
    );
  };

  const shown = turn?.dir === "prev" ? turn.from : page;
  const current = pages?.[page] ?? { title: book.pages[0].title, continued: false };
  const style = { "--cover": book.cover.color, "--open-angle": `${angle}deg` } as CSSProperties;

  return (
    <dialog
      ref={dialogRef}
      className="bookview"
      aria-labelledby="bookview-title"
      style={style}
      onCancel={(event) => {
        event.preventDefault();
        requestClose();
      }}
    >
      <div className="bookview__layout">
        <div className="bookview__stage">
          <div className="bv-book" ref={bookRef}>
            <span className="bv-book__board" aria-hidden="true" />
            <span className="bv-book__block" aria-hidden="true" />
            {/* Hidden copy of every piece at the real page size, used only for measuring. */}
            <div className="bv-page bv-measure" ref={measureRef} aria-hidden="true" inert>
              <header className="bv-page__head">
                <span>measure</span>
              </header>
              <div className="bv-page__body">
                {book.pages.map((authored, index) => (
                  <div key={index}>
                    <h3 className="bv-page__title" data-title={index}>
                      {authored.title}
                    </h3>
                    {units[index].map((unit, unitIndex) => (
                      <div key={unitIndex} data-unit={`${index}-${unitIndex}`}>
                        <PageContent blocks={[unit.block]} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="bv-book__pages">
              {renderPage(shown, true)}
              {turn && (
                <div key={turn.id} className={`bv-leaf bv-leaf--${turn.dir}`} aria-hidden="true" inert onAnimationEnd={() => setTurn(null)}>
                  {renderPage(turn.dir === "next" ? turn.from : turn.to, false)}
                </div>
              )}
            </div>
            <div ref={coverRef} className={`bv-cover${coverOpen ? " is-open" : ""}`} aria-hidden="true" onClick={() => goTo(-1)}>
              <span className="bv-cover__front">
                <CoverFace book={book} volume={volume} art={art} />
              </span>
              <span className="bv-cover__inside" style={art ? ({ "--art": `url("${art}")` } as CSSProperties) : undefined}>
                <span className="bv-cover__motif" />
              </span>
            </div>
          </div>
        </div>

        <aside className="bookview__panel">
          <button ref={closeRef} type="button" className="bookview__x" onClick={requestClose} aria-label="Close book">
            <CloseIcon className="icon" />
          </button>

          <p className="bookview__eyebrow">
            Volume {pad(volume)} · {chapterTitle}
          </p>
          <h2 className={`bookview__title${book.panel.heading.length > 40 ? " bookview__title--long" : ""}`} id="bookview-title">
            {book.panel.heading}
          </h2>
          <p className="bookview__gist">{book.panel.gist}</p>

          <div className="bookview__details">
            {book.panel.meta.length > 0 && (
              <dl className="bookview__meta">
                {book.panel.meta.map((item) => (
                  <div key={item.label} className={item.wide ? "is-wide" : undefined}>
                    <dt>{item.label}</dt>
                    <dd>{item.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            {book.panel.tools && (
              <div className="bookview__tools">
                <p className="bookview__label">Tools used</p>
                <ul>
                  {book.panel.tools.map((tool) => (
                    <li key={tool}>{tool}</li>
                  ))}
                </ul>
              </div>
            )}
            {book.panel.links && (
              <div className="bookview__links">
                {book.panel.links.map((link) => (
                  <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="bookview__link">
                    {link.kind === "github" ? <GitHubIcon className="icon" /> : <ExternalIcon className="icon" />}
                    {link.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                ))}
              </div>
            )}
          </div>

          <div className="bookview__pager" ref={pagerRef} tabIndex={-1} aria-label="Pages">
            <button type="button" className="round" onClick={() => goTo(-1)} disabled={page === 0} aria-label="Previous page">
              <ArrowLeftIcon className="icon" />
            </button>
            <div className="bookview__position">
              <p className="bookview__page-title" aria-live="polite">
                <span className="sr-only">
                  Page {page + 1} of {total}:{" "}
                </span>
                {current.title}
              </p>
              <p className="bookview__counter" aria-hidden="true">
                Page {pad(page + 1)} / {pad(total)}
              </p>
            </div>
            <button type="button" className="round" onClick={() => goTo(1)} disabled={page === total - 1} aria-label="Next page">
              <ArrowRightIcon className="icon" />
            </button>
          </div>

          <div className="bookview__footer">
            <p className="bookview__hint">Click the page · ← → keys</p>
            <button type="button" className="bookview__close" onClick={requestClose}>
              Close book
            </button>
          </div>
        </aside>
      </div>
    </dialog>
  );
}
