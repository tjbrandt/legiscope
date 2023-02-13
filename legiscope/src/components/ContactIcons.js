import React from "react";

export default function ContactIcons(props) {
  const contactProps = {
    websiteURL: props.websiteURL == null ? false : props.websiteURL,
    contactFormURL: props.contactFormURL == null ? false : props.contactFormURL,
    phoneNumber: props.phoneNumber == null ? false : props.phoneNumber,
  };

  return (
    <div className="table__contact-links">
      <div>
        {contactProps.websiteURL && (
          <a href={contactProps.websiteURL} target="_blank" rel="noreferrer">
            <img
              src="images/external_link_rounded_square.png"
              alt="go to congress person website"
            ></img>
          </a>
        )}
      </div>

      <div>
        {contactProps.contactFormURL && (
          <a
            href={contactProps.contactFormURL}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="images/email_rounded_square.png"
              alt="contact this congress person"
            ></img>
          </a>
        )}
      </div>
      <div className="table__phone">
        {contactProps.phoneNumber && (
          <a href={contactProps.phoneNumber} target="_blank" rel="noreferrer">
            <img
              src="images/smartphone_rounded_square.png"
              alt="call this congress person"
            ></img>
          </a>
        )}
      </div>
    </div>
  );
}
