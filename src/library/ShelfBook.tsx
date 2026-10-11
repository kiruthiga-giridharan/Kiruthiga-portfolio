import type { CSSProperties } from "react";
import type { Book, CoverEmblem } from "../data/types";
import { useCoverArt } from "./coverArt";
import { BookOpenIcon } from "./icons";

type ShelfBookProps = {
  book: Book;
  volume: number;
  isOpen: boolean;
  onOpen: (book: Book, trigger: HTMLElement) => void;
};

/** Gold-tooled emblems, drawn with a single line weight. */
const EMBLEMS: Record<CoverEmblem, React.JSX.Element> = {
  bars: (
    <>
      <path d="M8 34V20M15 34V12M22 34V16M29 34V8" />
      <path d="M4 36h30" />
    </>
  ),
  sprig: (
    <>
      <path d="M19 36C19 26 18 16 21 6" />
      <path d="M19 27c-5-1-8-5-8-9 5 1 8 4 8 9ZM19.5 20c4-1 7-4 7-8-4 1-7 4-7 8ZM19 15c-3.5-.5-6-3.5-6-7 3.5.5 6 3.5 6 7Z" />
    </>
  ),
  book: (
    <>
      <path d="M19 12c-4-3-9-4-15-3v22c6-1 11 0 15 3 4-3 9-4 15-3V9c-6-1-11 0-15 3Z" />
      <path d="M19 12v22" />
    </>
  ),
  compass: (
    <>
      <circle cx="19" cy="9" r="3" />
      <path d="M17.6 11.6 9 35M20.4 11.6 29 35M12 27c4 2.5 10 2.5 14 0" />
    </>
  ),
  globe: (
    <>
      <circle cx="19" cy="21" r="14" />
      <path d="M5 21h28M19 7c-5 4-5 24 0 28M19 7c5 4 5 24 0 28M7.5 13.5h23M7.5 28.5h23" />
    </>
  ),
};

/** The cover face, shared by the shelf book and the open-book view. */
export function CoverFace({ book, volume, art }: { book: Book; volume: number; art: string | null }) {
  const emblem = book.cover.emblem;
  return (
    <span className={`cover${emblem ? " cover--emblem" : ""}`} style={art ? ({ "--art": `url("${art}")` } as CSSProperties) : undefined}>
      <span className="cover__art" />
      <span className="cover__cloth" />
      {/* Career and education covers keep only a title, an emblem and a subtitle. */}
      {!emblem && <span className="cover__series">Kiruthiga Giridharan / {String(volume).padStart(2, "0")}</span>}
      <span className="cover__titles">
        <span className="cover__title">{book.coverTitle}</span>
        {emblem && (
          <svg className="cover__emblem" viewBox="0 0 38 40" aria-hidden="true">
            {EMBLEMS[emblem]}
          </svg>
        )}
        <span className="cover__subtitle">{book.coverSubtitle}</span>
      </span>
    </span>
  );
}

export function ShelfBook({ book, volume, isOpen, onOpen }: ShelfBookProps) {
  const art = useCoverArt(book.cover.art, book.cover.color, book.cover.mirror);
  const style = {
    "--cover": book.cover.color,
    "--height": book.height ?? 1,
  } as CSSProperties;

  return (
    <button
      type="button"
      className={`book${isOpen ? " is-out" : ""}`}
      style={style}
      onClick={(event) => onOpen(book, event.currentTarget)}
      aria-haspopup="dialog"
      aria-label={`Open book: ${book.panel.heading}${book.coverTitle !== book.panel.heading ? `, ${book.coverTitle}` : ""}`}
      data-book-id={book.id}
    >
      <span className="book__shadow" aria-hidden="true" />
      <span className="book__body" aria-hidden="true">
        <span className="book__spine">
          <span className="book__spine-text">Kiruthiga Giridharan</span>
        </span>
        <span className="book__pages" />
        <span className="book__front" data-cover>
          <CoverFace book={book} volume={volume} art={art} />
        </span>
      </span>
      {/* A brass label on the shelf edge beneath the book: always reserved, revealed on hover/focus. */}
      <span className="book__label" aria-hidden="true">
        <BookOpenIcon className="icon" />
        Open book
      </span>
    </button>
  );
}
