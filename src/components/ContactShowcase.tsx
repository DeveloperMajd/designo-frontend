import Link from "next/link";
import BgImage from "../assets/images/shared/desktop/bg-pattern-call-to-action.svg";
import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";
import { findLabel } from "@/utils/findLabel";

interface ContactShowcaseProps {
  labels: {
    [key: string]: string;
  }[];
}
export const ContactShowcase = ({ labels }: ContactShowcaseProps) => {
  const title = findLabel("contact-show-case-title", labels);
  const text = findLabel("contact-show-case-text", labels);
  const btnText = findLabel("contact-show-case-link", labels);

  return (
    <section className="contact-showcase">
      <div className="container">
        <div className="bg-wrapper">
          <BgImage />
        </div>
        <div className="columns is-multiline is-centered content-wrapper m-0">
          <div className="column is-12-mobile is-10-tablet is-6-desktop content">
            <div className="title h4">{title}</div>
            <div className="text">{text}</div>
          </div>
          <div className="column is-12-mobile  is-10-tablet is-6-desktop btn-wrapper">
            <Link className="btn onDark" href={"/contact"}>
              {btnText}
            </Link>
          </div>
        </div>
      </div>
      {/* Todo: add condition props (has-bg-shape) */}
      {/* <div className="bg-pattern is-right-top is-hidden-touch">
        <BgShape />
      </div> */}
    </section>
  );
};
