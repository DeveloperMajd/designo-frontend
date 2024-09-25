import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/images/shared/desktop/logo-light.png";
import { SocialIcons } from "./SocialIcons";
import { ContactShowcase } from "./ContactShowcase";
import { ContactType, MenuType } from "@/utils/baseTypes";
import { findLabel } from "@/utils/findLabel";

type footerType = boolean;

interface footerProps {
  data: footerType;
  contactData: ContactType;
  mainMenu?: MenuType;
  labels: {
    [key: string]: string;
  }[];
}

export const Footer = ({
  data,
  contactData,
  mainMenu,
  labels,
}: footerProps) => {
  const address = contactData?.attributes.address;
  const phone = contactData?.attributes.phone;
  const email = contactData?.attributes.email;
  const socials = contactData?.attributes.socials;

  const formattedPhone = phone?.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");

  const contactUs = findLabel("contact-us", labels);

  return (
    <>
      {data && <ContactShowcase labels={labels} />}
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
                    {mainMenu?.attributes.items.data.map((item, index) => (
                      <Link
                        key={index}
                        href={item.attributes.url}
                        target={item.attributes.target}
                        className="nav-item footer-item"
                      >
                        {item.attributes.title}
                      </Link>
                    ))}
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
                    {contactUs && <p>{contactUs}</p>}
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
