import Img1 from "../assets/home/desktop/illustration-passionate.svg";
import Img2 from "../assets/home/desktop/illustration-resourceful.svg";
import Img3 from "../assets/home/desktop/illustration-friendly.svg";

export const InfoHighlights = () => {
  return (
    <section className="info-highlights">
      <div className="container">
        <div className="columns">
          <div className="column is-12-tablet is-4-desktop">
            <div className="img-wrapper">
              <span className="overlay" />
              <Img1 />
            </div>
            <div className="content">
              <div className="title h3">PASSIONATE</div>
              <div className="description">
                Each project starts with an in-depth brand research to ensure we
                only create products that serve a purpose. We merge art, design,
                and technology into exciting new solutions.
              </div>
            </div>
          </div>
          <div className="column is-12-tablet is-4-desktop">
            <div className="img-wrapper">
              <span className="overlay" />
              <Img2 />
            </div>
            <div className="content">
              <div className="title h3">RESOURCEFUL</div>
              <div className="description">
                Everything that we do has a strategic purpose. We use an agile
                approach in all of our projects and value customer
                collaboration. It guarantees superior results that fulfill our
                clients’ needs.
              </div>
            </div>
          </div>
          <div className="column is-12-tablet is-4-desktop">
            <div className="img-wrapper">
              <span className="overlay" />
              <Img3 />
            </div>
            <div className="content">
              <div className="title h3">FRIENDLY</div>
              <div className="description">
                We are a group of enthusiastic folks who know how to put people
                first. Our success depends on our customers, and we strive to
                give them the best experience a company can provide.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
