import Image from "next/image";
import { type Session, SiteLocale, siteCopy } from "@/data/site";

export default function SessionCard({
  session,
  locale,
  featured = false,
  priority = false
}: {
  session: Session;
  locale: SiteLocale;
  featured?: boolean;
  priority?: boolean;
}) {
  return (
    <article className={`session-card ${featured ? "session-card--featured" : ""}`}>
      <a className="session-card__image" href={session.youtube} target="_blank" rel="noreferrer" aria-label={`${siteCopy[locale].common.play}: ${session.title}`}>
        <Image
          src={session.image}
          alt={locale === "zh"
            ? `${session.title} — NeoBee Session ${session.number} 现场画面`
            : `${session.title} — NeoBee Club Session ${session.number}`}
          fill
          priority={priority}
          sizes={featured ? "(max-width: 900px) 100vw, 62vw" : "(max-width: 760px) 100vw, 50vw"}
        />
        <span className="play-mark" aria-hidden="true">Play ↗</span>
      </a>
      <div className="session-card__meta">
        <span>Session {session.number}</span>
        <span className="session-card__meta-detail">
          {session.venue && (
            <a href={session.venue.url} target="_blank" rel="noreferrer">
              {session.venue.name} · {session.venue.location[locale]}
            </a>
          )}
          <span>{session.year} · {session.duration}</span>
        </span>
      </div>
      <h3>{session.title}</h3>
      <p>{session.description[locale]}</p>
    </article>
  );
}
