import React, { useContext } from "react";
import "./Contact.scss";
import { illustration, contactInfo } from "../../portfolio";
import { Fade } from "react-reveal";
import email from "../../assets/lottie/email";
import DisplayLottie from "../../components/displayLottie/DisplayLottie";
import StyleContext from "../../contexts/StyleContext";
import ContactForm from "../../components/ContactForm/ContactForm";

export default function Contact() {
  const { isDark } = useContext(StyleContext);

  return (
    <Fade bottom duration={1000} distance="20px">
      <div className="main contact-margin-top" id="contact">
        <div className="contact-div-main">
          <div className="contact-header">
            <h1 className="heading contact-title">{contactInfo.title}</h1>
            <p
              className={
                isDark
                  ? "dark-mode contact-subtitle"
                  : "subTitle contact-subtitle"
              }
            >
              {contactInfo.subtitle}
            </p>
          </div>

          <div className="contact-body">
            <div
              className={
                isDark
                  ? "dark-mode contact-text-div contact-form-wrap"
                  : "contact-text-div contact-form-wrap"
              }
            >
              <ContactForm />
            </div>

            <div className="contact-image-div">
              {illustration.animated ? (
                <DisplayLottie animationData={email} />
              ) : (
                <img
                  alt="Man working"
                  src={require("../../assets/images/contactMailDark.svg")}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
}