import BgImage from "../assets/images/shared/desktop/bg-pattern-call-to-action.svg";
import BgShape from "../assets/images/shared/desktop/bg-pattern-leaf.svg";

export type PageBannerType = {
  __component: "components.page-banner";
  Title: string;
  Content: string;
};

interface PageBannerProps {
  data: PageBannerType;
}

export const PageBanner = ({ data }: PageBannerProps) => {
  const { Title, Content } = data;

  return (
    <section className="page-banner is-full-width">
      <div className="container">
        <div className="bg-wrapper">
          <BgImage />
        </div>
        <div className="columns is-multiline is-centered content-wrapper m-0">
          <div className="column is-12-mobile is-10-tablet is-6-desktop is-5-fullhd content">
            <div className="title h4">{Title}</div>
            <div
              className="text"
              dangerouslySetInnerHTML={{ __html: Content }}
            />
          </div>
        </div>
      </div>
      {/* Todo: add condition props (has-bg-shape) */}
      <div className="bg-pattern is-left-bottom is-hidden-touch">
        <BgShape />
      </div>
    </section>
  );
};
