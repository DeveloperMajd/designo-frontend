import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/images/shared/desktop/logo-light.png";
import { SocialIcons } from "./SocialIcons";
import { ContactShowcase } from "./ContactShowcase";
import { Address } from "./Global/Address";
import type { SiteData } from "@/lib/cms/site";
import { useLabel } from "@/lib/labels";

interface FooterProps {
  showContactShowcase: boolean;
  menu: SiteData["menu"];
  contact: SiteData["contact"];
}

export const Footer = ({ showContactShowcase, menu, contact }: FooterProps) => {
  const { addressLines, phone, email, socials } = contact;

  const contactUs = useLabel("contact-us");
  const phoneLabel = useLabel("phone", "Phone : ");
  const emailLabel = useLabel("email", "Email : ");

  return (
    <>
      {showContactShowcase && <ContactShowcase />}
      <footer className={`footer ${showContactShowcase ? "" : "contact-page"}`}>
        <section>
          <div className={`container ${showContactShowcase ? "has-box" : ""}`}>
            <div className="columns is-multiline">
              <div className="column nav-col is-12 is-flex">
                <div className="logo">
                  <Image src={Logo} alt="logo" />
                </div>
                <div className="line is-hidden-tablet"></div>
                <div className="footer-items-wrapper">
                  <div className="footer-items">
                    {menu.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        target={item.newTab ? "_blank" : undefined}
                        className="nav-item footer-item"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="line is-hidden-mobile"></div>
              <div className="column is-12">
                <div className="columns">
                  {addressLines.length > 0 && (
                    <div className="column address is-4-tablet">
                      <Address lines={addressLines} />
                    </div>
                  )}

                  <div className="column contact-info is-4-tablet">
                    {contactUs && (
                      <strong className="contact-us">{contactUs}</strong>
                    )}
                    {phone && (
                      <p>
                        <strong>{phoneLabel}</strong>
                        <a href={phone.href}>{phone.display}</a>
                      </p>
                    )}
                    {email && (
                      <p>
                        <strong>{emailLabel}</strong>
                        <a
                          href={`mailto:${email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {email}
                        </a>
                      </p>
                    )}
                  </div>
                  {socials.length > 0 && (
                    <div className="column social-col is-4-tablet is-flex">
                      <SocialIcons socials={socials} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
};
