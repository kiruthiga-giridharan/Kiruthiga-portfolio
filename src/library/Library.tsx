import { useCallback, useState } from "react";
import { intro } from "../data/library";
import type { Book } from "../data/types";
import { Bookcase } from "./Bookcase";
import { allBooks, chapterOf, volumeOf } from "./books";
import { BookView } from "./BookView";
import { Footer } from "./Footer";
import { goToSection } from "./navigation";
import { TopBar } from "./TopBar";
import { ArrowDownIcon } from "./icons";
import welcomeScene from "./assets/welcome-landscape.webp";
import "./library.css";

/** A few warm dust motes drifting through the lamp light. */
const DUST = [
  { left: "38%", top: "30%", animationDelay: "-2s" },
  { left: "61%", top: "42%", animationDelay: "-7s" },
  { left: "45%", top: "64%", animationDelay: "-11s" },
  { left: "56%", top: "22%", animationDelay: "-4s" },
  { left: "33%", top: "52%", animationDelay: "-9s" },
  { left: "66%", top: "60%", animationDelay: "-14s" },
];

export function Library() {
  const [reading, setReading] = useState<{ book: Book; trigger: HTMLElement | null } | null>(null);

  const openBook = useCallback((book: Book, trigger: HTMLElement) => setReading({ book, trigger }), []);

  /** Opens a book from a skill card; focus returns to the skill that was chosen. */
  const openBookById = useCallback((bookId: string, trigger: HTMLElement) => {
    const book = allBooks.find((entry) => entry.id === bookId);
    if (book) setReading({ book, trigger });
  }, []);

  const closeBook = useCallback(() => setReading(null), []);

  return (
    <div className="library" id="top">
      <a className="skip-link" href="#career">
        Skip to the shelves
      </a>
      <TopBar />

      <main>
        <section className="intro" aria-labelledby="intro-title">
          <div className="intro__scene" aria-hidden="true">
            <img src={welcomeScene} alt="" width="1697" height="805" />
            <div className="intro__dust">
              {DUST.map((mote, index) => (
                <span key={index} style={mote} />
              ))}
            </div>
          </div>
          <div className="intro__content">
            <h1 id="intro-title">
              <span className="intro__eyebrow">{intro.eyebrow}</span> {intro.heading}
            </h1>
            <span className="intro__rule" aria-hidden="true">
              <span />
            </span>
            <p className="intro__text">{intro.text}</p>
            <a
              className="intro__cue"
              href="#career"
              onClick={(event) => {
                event.preventDefault();
                goToSection("career");
              }}
            >
              {intro.action}
              <ArrowDownIcon className="icon" />
            </a>
          </div>
        </section>

        <Bookcase openBookId={reading?.book.id ?? null} onOpenBook={openBook} onOpenBookById={openBookById} />
      </main>

      <Footer />

      {reading && (
        <BookView
          key={reading.book.id}
          book={reading.book}
          volume={volumeOf(reading.book.id)}
          chapterTitle={chapterOf(reading.book.id)}
          trigger={reading.trigger}
          onClosed={closeBook}
        />
      )}
    </div>
  );
}
