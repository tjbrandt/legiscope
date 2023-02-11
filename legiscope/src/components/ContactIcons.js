import React from "react";

export default function ContactIcons(props) {
  const contactProps = {
    websiteURL: props.websiteURL == null ? false : props.websiteURL,
    contactFormURL: props.contactFormURL == null ? false : props.contactFormURL,
    phoneNumber: props.phoneNumber == null ? false : props.phoneNumber,
  };

  const [contactInfo, setContactInfo] = React.useState(contactProps);

  return (
    <div className="table__contact-links">
      <div>
        {contactInfo.websiteURL && (
          <a href={contactInfo.websiteURL} target="_blank" rel="noreferrer">
            <img
              src="images/external_link_rounded_square.png"
              alt="go to congress person website"
            ></img>
          </a>
        )}
      </div>

      <div>
        {contactInfo.contactFormURL && (
          <a href={contactInfo.contactFormURL} target="_blank" rel="noreferrer">
            <img
              src="images/email_rounded_square.png"
              alt="contact this congress person"
            ></img>
          </a>
        )}
      </div>
      <div className="table__phone">
        {contactInfo.phoneNumber && (
          <a href={contactInfo.phoneNumber} target="_blank" rel="noreferrer">
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
