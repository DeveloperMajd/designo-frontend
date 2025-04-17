import Image from "next/image";
import Link from "next/link";
import Logo from "../assets/images/shared/desktop/logo-light.png";
import { SocialIcons } from "./SocialIcons";
import { ContactShowcase } from "./ContactShowcase";
import { ContactType, LabelsType, MenuType } from "@/utils/baseTypes";
import { findLabel } from "@/utils/findLabel";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";

interface footerProps {
  showContactShowcase: boolean;
  contactData: ContactType;
  mainMenu?: MenuType;
  labels: LabelsType;
}

export const Footer = ({
  showContactShowcase,
  contactData,
  mainMenu,
  labels,
}: footerProps) => {
  const address = contactData?.attributes.address;
  const phone = contactData?.attributes.phone;
  const email = contactData?.attributes.email;
  const socials = contactData?.attributes.socials;

  const formattedPhone = formatPhoneNumber(phone ?? "", "Germany");

  const contactUs = findLabel("contact-us", labels);
  const phoneLabel = findLabel("phone", labels);
  const emailLabel = findLabel("email", labels);

  return (
    <>
      {showContactShowcase && <ContactShowcase labels={labels} />}
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
                    {contactUs && (
                      <strong className="contact-us">{contactUs}</strong>
                    )}
                    <p>
                      <strong>{phoneLabel ?? "Phone : "}</strong>
                      <a href={`tel:${phone}`}>{formattedPhone}</a>
                    </p>
                    <p>
                      <strong>{emailLabel ?? "Email : "}</strong>
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
