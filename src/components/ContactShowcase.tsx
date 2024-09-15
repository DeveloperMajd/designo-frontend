import Link from "next/link";
import BgImage from "../assets/images/shared/desktop/bg-pattern-call-to-action.svg";
import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";

export const ContactShowcase = () => {
  return (
    <section className="contact-showcase">
      <div className="container">
        <div className="bg-wrapper">
          <BgImage />
        </div>
        <div className="columns is-multiline is-centered content-wrapper m-0">
          <div className="column is-12-mobile is-10-tablet is-6-desktop content">
            <div className="title h4">Let’s talk about your project</div>
            <p className="text">
              Ready to take it to the next level? Contact us today and find out
              how our expertise can help your business grow.
            </p>
          </div>
          <div className="column is-12-mobile  is-10-tablet is-6-desktop btn-wrapper">
            <Link className="btn onDark" href={"/contact"}>
              get in touch
            </Link>
          </div>
        </div>
      </div>
      {/* Todo: add condition props (has-bg-shape) */}
      <div className="bg-pattern is-right-top is-hidden-touch">
        <BgShape />
      </div>
    </section>
  );
};
