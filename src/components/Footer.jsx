import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faXTwitter,
  faLinkedin,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faCity } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <footer
      className="text-white text-center py-2"
      style={{
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        backgroundColor: "#0d4e92",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="d-flex justify-content-center">
              <a
                href="https://www.bursa.bel.tr/"
                target="_blank"
                className="text-white text-decoration-none me-3"
              >
                <FontAwesomeIcon icon={faCity} style={{ fontSize: "20px" }} />
              </a>
              <a
                href="https://www.facebook.com/bursabuyuksehir"
                target="_blank"
                className="text-white text-decoration-none me-3"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  style={{ fontSize: "24px" }}
                />
              </a>
              <a
                href="https://www.instagram.com/bursabuyuksehir/"
                target="_blank"
                className="text-white text-decoration-none me-3"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  style={{ fontSize: "24px" }}
                />
              </a>
              <a
                href="https://twitter.com/bursabuyuksehir"
                target="_blank"
                className="text-white text-decoration-none me-3"
              >
                <FontAwesomeIcon
                  icon={faXTwitter}
                  style={{ fontSize: "24px" }}
                />
              </a>
              <a
                href="https://www.linkedin.com/company/bursa-buyuksehir-belediyesi/"
                target="_blank"
                className="text-white text-decoration-none me-3"
              >
                <FontAwesomeIcon
                  icon={faLinkedin}
                  style={{ fontSize: "24px" }}
                />
              </a>
              <a
                href="https://www.youtube.com/c/BursaB%C3%BCy%C3%BCk%C5%9FehirBelediyesi16"
                target="_blank"
                className="text-white text-decoration-none"
              >
                <FontAwesomeIcon
                  icon={faYoutube}
                  style={{ fontSize: "24px" }}
                />
              </a>
            </div>
            <p className="mt-1 mb-0" style={{ fontSize: "12px" }}>
              Tüm Hakları Saklıdır © | 2024
            </p>
            <p className="mb-0" style={{ fontSize: "12px" }}>
              Designed by Ayşe METİN
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
