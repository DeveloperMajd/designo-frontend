import BgImage from "../assets/shared/desktop/bg-pattern-call-to-action.svg";
import BgShape from "../assets/shared/desktop/bg-pattern-leaf.svg";

export const PageBanner = () => {
  return (
    <section className="page-banner is-full-width">
      <div className="container">
        <div className="bg-wrapper">
          <BgImage />
        </div>
        <div className="columns is-multiline is-centered content-wrapper m-0">
          <div className="column is-12-mobile is-10-tablet is-6-desktop is-5-fullhd content">
            <div className="title h4">Web Design</div>
            <p className="text">
              We build websites that serve as powerful marketing tools and bring
              memorable brand experiences.
            </p>
          </div>
        </div>
      </div>
      {/* Todo: add condition props (has-bg-shape) */}
      <div className="bg-shape is-left-bottom is-hidden-touch">
        <BgShape />
      </div>
    </section>
  );
};
