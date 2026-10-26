import Link from "next/link";
import BgImage from "../assets/images/shared/desktop/bg-pattern-call-to-action.svg";
import { useLabel } from "@/lib/labels";

export const ContactShowcase = () => {
  const title = useLabel("contact-show-case-title");
  const text = useLabel("contact-show-case-text");
  const btnText = useLabel("contact-show-case-link");

  return (
    <section className="contact-showcase">
      <div className="container overflow-hidden">
        <div className="bg-wrapper">
          <BgImage />
        </div>
        <div className="columns is-multiline is-centered content-wrapper m-0">
          <div className="column is-12-mobile is-10-tablet is-6-desktop content">
            {title && <div className="title h4">{title}</div>}
            {text && <div className="text">{text}</div>}
          </div>
          <div className="column is-12-mobile  is-10-tablet is-6-desktop btn-wrapper">
            <Link className="btn onDark" href={"/contact"}>
              {btnText}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
