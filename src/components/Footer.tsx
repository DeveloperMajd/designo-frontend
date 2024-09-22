import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/images/shared/desktop/logo-light.png";
import { SocialIcons } from "./SocialIcons";
import { ContactShowcase } from "./ContactShowcase";
import { ContactType } from "@/utils/baseTypes";

type footerType = boolean;

interface footerProps {
  data: footerType;
  contactData: ContactType;
}

export const Footer = ({ data, contactData }: footerProps) => {
  const address = contactData?.attributes.address;
  const phone = contactData?.attributes.phone;
  const email = contactData?.attributes.email;
  const socials = contactData?.attributes.socials;

  const formattedPhone = phone?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

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
                  {address && (
                    <div
                      className="column address is-4-tablet"
                      dangerouslySetInnerHTML={{
                        __html: address,
                      }}
                    />
                  )}

                  <div className="column contact-info is-4-tablet">
                    <p>Contact Us (Central Office)</p>
                    <p>
                      Phone: <a href={`tel:${phone}`}>{formattedPhone}</a>
                    </p>
                    <p>
                      Email:{" "}
                      <a
                        href={`mailto:${email}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {email}
                      </a>
                    </p>
                  </div>
                  {socials && (
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
