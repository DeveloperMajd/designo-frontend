import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/images/shared/desktop/logo-light.png";
import { SocialIcons } from "./SocialIcons";
import { ContactShowcase } from "./ContactShowcase";

type footerType = boolean;

interface footerProps {
  data: footerType;
}

export const Footer = ({ data }: footerProps) => {
  return (
    <>
      {data && <ContactShowcase />}
      <footer className="footer">
        <section>
          <div className={`container ${data ? "has-box" : ""}`}>
            <div className="columns is-multiline">
              <div className="column nav-col is-12 is-flex">
                <div className="logo">
                  <Image src={Logo} alt="logo" />
                </div>
                <div className="line is-hidden-tablet"></div>
                <div className="footer-items-wrapper">
                  <div className="footer-items">
                    <Link href="/" className="nav-item footer-item">
                      out compoany
                    </Link>
                    <Link href="/" className="nav-item footer-item">
                      locations
                    </Link>
                    <Link href="/" className="nav-item footer-item">
                      contact
                    </Link>
                  </div>
                </div>
              </div>
              <div className="line is-hidden-mobile"></div>
              <div className="column is-12">
                <div className="columns">
                  <div className="column address is-4-tablet">
                    <p>Designo Central Office</p>
                    <p>3886 Wellington Street</p>
                    <p>Toronto, Ontario M9C 3J5</p>
                  </div>
                  <div className="column contact-info is-4-tablet">
                    <p>Contact Us (Central Office)</p>
                    <p>P : +1 253-863-8967</p>
                    <p>M : contact@designo.co</p>
                  </div>
                  <div className="column social-col is-4-tablet is-flex">
                    <SocialIcons />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};
