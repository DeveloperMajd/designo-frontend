import CardImg1 from "../assets/web-design/desktop/image-express.jpg";
import CardImg2 from "../assets/web-design/desktop/image-transfer.jpg";
import CardImg3 from "../assets/web-design/desktop/image-photon.jpg";
import CardImg4 from "../assets/web-design/desktop/image-builder.jpg";
import CardImg5 from "../assets/web-design/desktop/image-blogr.jpg";
import CardImg6 from "../assets/web-design/desktop/image-camp.jpg";
import Image from "next/image";

export const ProjectsCards = () => {
  return (
    <section className="projects-cards">
      <div className="container">
        <div className="columns is-multiline is-variable is-3-desktop main-columns">
          {/* card 1 */}
          <div className="column is-12-mobile is-12-tablet is-4-desktop project-card">
            <div className="columns">
              <div className="column is-12-mobile is-6-tablet is-12-desktop card-image">
                <Image
                  src={CardImg1}
                  alt="Express"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              <div className="column is-12-mobile is-6-tablet is-12-desktop card-content">
                <div className="title h3">Express</div>
                <div className="text">
                  A multi-carrier shipping website for ecommerce businesses
                </div>
              </div>
            </div>
          </div>
          {/* card 2 */}
          <div className="column is-12-mobile is-12-tablet is-4-desktop project-card">
            <div className="columns">
              <div className="column is-12-mobile is-6-tablet is-12-desktop card-image">
                <Image
                  src={CardImg2}
                  alt="Transfer"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>

              <div className="column is-12-mobile is-6-tablet is-12-desktop card-content">
                <div className="title h3">Transfer</div>
                <div className="text">
                  Site for low-cost money transfers and sending money within
                  seconds
                </div>
              </div>
            </div>
          </div>
          {/* card 3 */}
          <div className="column is-12-mobile is-12-tablet is-4-desktop project-card">
            <div className="columns">
              <div className="column is-12-mobile is-6-tablet is-12-desktop card-image">
                <Image
                  src={CardImg3}
                  alt="Photon"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              <div className="column is-12-mobile is-6-tablet is-12-desktop card-content">
                <div className="title h3">Photon</div>
                <div className="text">
                  A state-of-the-art music player with high-resolution audio and
                  DSP effects
                </div>
              </div>
            </div>
          </div>
          {/* card 4 */}
          <div className="column is-12-mobile is-12-tablet is-4-desktop project-card">
            <div className="columns">
              <div className="column is-12-mobile is-6-tablet is-12-desktop card-image">
                <Image
                  src={CardImg4}
                  alt="Builder"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              <div className="column is-12-mobile is-6-tablet is-12-desktop card-content">
                <div className="title h3">Builder</div>
                <div className="text">
                  Connects users with local contractors based on their location
                </div>
              </div>
            </div>
          </div>
          {/* card 5 */}
          <div className="column is-12-mobile is-12-tablet is-4-desktop project-card">
            <div className="columns">
              <div className="column is-12-mobile is-6-tablet is-12-desktop card-image">
                <Image
                  src={CardImg5}
                  alt="Blogr"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              <div className="column is-12-mobile is-6-tablet is-12-desktop card-content">
                <div className="title h3">Blogr</div>
                <div className="text">
                  Blogr is a platform for creating an online blog or publication
                </div>
              </div>
            </div>
          </div>
          {/* card 6 */}
          <div className="column is-12-mobile is-12-tablet is-4-desktop project-card">
            <div className="columns">
              <div className="column is-12-mobile is-6-tablet is-12-desktop card-image">
                <Image
                  src={CardImg6}
                  alt="Camp"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                  }}
                />
              </div>
              <div className="column is-12-mobile is-6-tablet is-12-desktop card-content">
                <div className="title h3">Camp</div>
                <div className="text">
                  Get expert training in coding, data, design, and digital
                  marketing
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
