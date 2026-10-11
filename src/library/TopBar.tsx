import { useEffect, useRef, useState } from "react";
import { chapters, contact, profile } from "../data/library";

/** Every chapter plus the closing Contact section. */
const navItems = [...chapters, { id: "contact", title: "Contact" }];
import { prefersReducedMotion } from "./hooks";
import { LinkedInIcon, MailIcon, PhoneIcon } from "./icons";
import { goToSection, telHref } from "./navigation";

function useActiveChapter() {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const elements = navItems
      .map((chapter) => document.getElementById(chapter.id))
      .filter((element): element is HTMLElement => Boolean(element));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    elements.forEach((element) => observer.observe(element));
    // Above the first shelf, no chapter is active.
    const onScroll = () => {
      const first = elements[0];
      if (first && first.getBoundingClientRect().top > window.innerHeight * 0.5) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return active;
}

export function TopBar() {
  const active = useActiveChapter();
  const listRef = useRef<HTMLOListElement>(null);

  // On narrow screens the chapter row scrolls; keep the active chapter in view.
  useEffect(() => {
    const list = listRef.current;
    const link = list?.querySelector<HTMLElement>('[aria-current="location"]');
    if (!list || !link || list.scrollWidth <= list.clientWidth) return;
    const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
    list.scrollTo({ left: Math.max(0, left), behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, [active]);

  return (
    <>
    <header className="topbar">
      <div className="topbar__inner">
        <a className="topbar__identity" href="#top" aria-label={`${profile.name}, back to the top`}>
          <span className="topbar__name">{profile.name}</span>
          <span className="topbar__descriptor">{profile.descriptor}</span>
        </a>

        <nav className="topbar__contact" aria-label="Contact">
          <a href={telHref} className="topbar__link">
            <PhoneIcon className="icon" />
            <span className="topbar__text">{contact.phone}</span>
            <span className="topbar__short" aria-hidden="true">Call</span>
          </a>
          <a href={`mailto:${contact.email}`} className="topbar__link">
            <MailIcon className="icon" />
            <span className="topbar__text">{contact.email}</span>
            <span className="topbar__short" aria-hidden="true">Email</span>
          </a>
          <a
            href={contact.linkedin}
            className="topbar__link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile (opens in a new tab)"
          >
            <LinkedInIcon className="icon" />
            <span>LinkedIn</span>
          </a>
        </nav>
      </div>
    </header>

      <nav className="chapters" aria-label="Library chapters">
        <ol ref={listRef}>
          {navItems.map((chapter) => (
            <li key={chapter.id}>
              <a
                href={`#${chapter.id}`}
                aria-current={active === chapter.id ? "location" : undefined}
                onClick={(event) => {
                  event.preventDefault();
                  goToSection(chapter.id);
                }}
              >
                {chapter.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
