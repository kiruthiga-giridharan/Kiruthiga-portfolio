import type { ReactNode } from "react";
import { chapters, journey, recommendations, shelves } from "../data/library";
import type { Book } from "../data/types";
import { JourneyCabinet } from "./JourneyCabinet";
import { volumeOf } from "./books";
import { BlackMarbleQuarter, BrassSet, LavenderVase, MarbleArch, Room, StoneCylinder, StoneSphere } from "./Decor";
import { ShelfBook } from "./ShelfBook";
import { ToolCabinet } from "./ToolCabinet";

type BookcaseProps = {
  openBookId: string | null;
  onOpenBook: (book: Book, trigger: HTMLElement) => void;
  onOpenBookById: (bookId: string, trigger: HTMLElement) => void;
};

/** Objects resting on each shelf, as in the reference close-ups. */
const DECOR: Record<string, { before?: ReactNode; after?: ReactNode }> = {
  career: { before: <BrassSet />, after: <LavenderVase /> },
  learning: { before: <StoneCylinder />, after: <BlackMarbleQuarter /> },
  projects: { before: <StoneSphere />, after: <MarbleArch /> },
};

function ChapterLabel({ id, eyebrow, children }: { id: string; eyebrow?: string; children?: ReactNode }) {
  const index = chapters.findIndex((chapter) => chapter.id === id);
  const chapter = chapters[index];
  return (
    <header className="row__label">
      {eyebrow && <p className="row__eyebrow">{eyebrow}</p>}
      <p className="row__number">
        {String(index + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
      </p>
      <h2 id={`${id}-title`} tabIndex={-1} data-section-heading>
        {chapter.title}
      </h2>
      <span className="row__rule" aria-hidden="true">
        <span />
      </span>
      {!eyebrow && <p className="row__tagline">{chapter.tagline}</p>}
      {children}
    </header>
  );
}

export function Bookcase({ openBookId, onOpenBook, onOpenBookById }: BookcaseProps) {
  return (
    <div className="bookcase">
      {shelves.map((shelf) => {
        const decor = DECOR[shelf.id] ?? {};
        return (
          <section className={`row row--${shelf.id}`} id={shelf.id} key={shelf.id} aria-labelledby={`${shelf.id}-title`}>
            <Room art={shelf.id === "career"} />
            <ChapterLabel id={shelf.id} />
            <div className="row__stage">
              {decor.before && (
                <span className="row__decor" aria-hidden="true">
                  {decor.before}
                </span>
              )}
              <ul className="row__books" aria-label={`${shelf.title} books`}>
                {shelf.books.map((book) => (
                  <li key={book.id}>
                    <ShelfBook book={book} volume={volumeOf(book.id)} isOpen={openBookId === book.id} onOpen={onOpenBook} />
                  </li>
                ))}
              </ul>
              {decor.after && (
                <span className="row__decor row__decor--end" aria-hidden="true">
                  {decor.after}
                </span>
              )}
            </div>
            <div className="plank" aria-hidden="true" />
          </section>
        );
      })}

      <section className="row row--tools" id="tools" aria-labelledby="tools-title">
        <Room />
        <ChapterLabel id="tools" />
        <ToolCabinet onOpenBook={onOpenBookById} />
      </section>

      <section className="row row--notes" id="notes" aria-labelledby="notes-title">
        <Room />
        <ChapterLabel id="notes" />
        <div className="row__stage">
          <ul className="notes">
            {recommendations.map((note) => (
              <li key={note.name}>
                <figure className="note">
                  <span className="note__clip" aria-hidden="true" />
                  <blockquote>
                    <p>“{note.quote}”</p>
                  </blockquote>
                  <figcaption>
                    <strong>{note.name}</strong>
                    <span>{note.role}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>
        <div className="plank" aria-hidden="true" />
      </section>

      <section className="row row--author" id="author" aria-labelledby="author-title">
        <Room />
        <ChapterLabel id="author" eyebrow="Meet the Author">
          {/* The author's photo: framed, static and shown at its natural proportions. */}
          <figure className="row__portrait">
            <img
              src={journey.portrait.src}
              alt={journey.portrait.alt}
              width={journey.portrait.width}
              height={journey.portrait.height}
              draggable={false}
            />
          </figure>
        </ChapterLabel>
        <JourneyCabinet />
      </section>
    </div>
  );
}
