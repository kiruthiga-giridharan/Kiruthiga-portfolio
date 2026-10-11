import { contact } from "../data/library";
import { prefersReducedMotion } from "./hooks";

/**
 * Scrolls to a chapter. The page's scroll-padding accounts for the sticky
 * header, so every link lands where scroll snapping would settle.
 */
export function goToSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return;
  const heading = section.querySelector<HTMLElement>("[data-section-heading]");
  const focusHeading = () => heading?.focus({ preventScroll: true });
  if (prefersReducedMotion()) {
    section.scrollIntoView({ block: "start" });
    focusHeading();
  } else {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
    // Move focus once the page has arrived, so the smooth scroll is not interrupted.
    if ("onscrollend" in window) window.addEventListener("scrollend", focusHeading, { once: true });
    else setTimeout(focusHeading, 900);
  }
  history.replaceState(null, "", `#${id}`);
}

export const telHref = `tel:${contact.phone.replace(/[^\d+]/g, "")}`;
