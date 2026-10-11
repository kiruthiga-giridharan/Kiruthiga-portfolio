import { contact, resume } from "../data/library";
import { Room } from "./Decor";
import { DocumentIcon, GitHubIcon, LinkedInIcon, MailIcon, PhoneIcon } from "./icons";
import { telHref } from "./navigation";

export function Footer() {
  return (
    <footer className="footer" id="contact" aria-labelledby="contact-title">
      <Room art />
      <div className="footer__inner">
        <p className="footer__status">
          <span className="footer__status-dot" aria-hidden="true" />
          Open to opportunities
        </p>
        <h2 className="footer__title" id="contact-title" tabIndex={-1} data-section-heading>
          The next chapter could start with you.
        </h2>
        <p className="footer__lead">Exploring opportunities in data analytics, operations and process automation.</p>
        <span className="row__rule" aria-hidden="true">
          <span />
        </span>
        <a className="button button--brass" href={`mailto:${contact.email}`}>
          <MailIcon className="icon" />
          Get in touch
        </a>
        <ul className="footer__contact">
          <li>
            <a href={telHref}>
              <PhoneIcon className="icon" />
              {contact.phone}
            </a>
          </li>
          <li>
            <a href={`mailto:${contact.email}`}>
              <MailIcon className="icon" />
              {contact.email}
            </a>
          </li>
          <li>{contact.location}</li>
          <li>
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)">
              <LinkedInIcon className="icon" />
              LinkedIn
            </a>
          </li>
          <li>
            <a href={resume.href} target="_blank" rel="noopener noreferrer" aria-label="View résumé (PDF, opens in a new tab)">
              <DocumentIcon className="icon" />
              Résumé
            </a>
          </li>
          <li>
            <a href={contact.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)">
              <GitHubIcon className="icon" />
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
