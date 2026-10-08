import Lettering from "../../components/Lettering/Lettering";
import useDocumentTitle from "../../lib/useDocumentTitle";
import { ABOUT } from "../../data/site";
import collage from "../../assets/images/about/about-collage.webp";
import collageMobile from "../../assets/images/about/about-collage-mobile.webp";
import "./About.css";

export default function About() {
  useDocumentTitle("About Us");
  return (
    <section className="about">
      <div className="about__content">
        <p className="about__eyebrow">{ABOUT.eyebrow}</p>
        <Lettering className="about__lettering" />
        <div className="about__text">
          <p className="about__lead">
            <strong>{ABOUT.leadName}</strong>
            {ABOUT.lead}
          </p>
          <p className="about__body">{ABOUT.body}</p>
        </div>
      </div>

      <picture className="about__art" aria-hidden="true">
        <source media="(max-width: 767px)" srcSet={collageMobile} width="393" height="421" />
        <img src={collage} width="1482" height="1061" alt="" loading="lazy" decoding="async" />
      </picture>
    </section>
  );
}
