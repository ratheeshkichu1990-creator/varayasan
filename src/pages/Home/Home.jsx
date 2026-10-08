import Lettering from "../../components/Lettering/Lettering";
import ProfileArtwork from "../../components/ProfileArtwork/ProfileArtwork";
import useDocumentTitle from "../../lib/useDocumentTitle";
import "./Home.css";

export default function Home() {
  useDocumentTitle(null);
  return (
    <section className="home">
      <Lettering className="home__lettering" />
      <div className="home__art">
        <ProfileArtwork />
      </div>
    </section>
  );
}
