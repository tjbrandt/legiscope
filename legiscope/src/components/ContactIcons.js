import React from "react";

export default function ContactIcons(props) {
  const contactProps = {
    websiteURL: props.websiteURL == null ? false : props.websiteURL,
    contactFormURL: props.contactFormURL == null ? false : props.contactFormURL,
    phoneNumber: props.phoneNumber == null ? false : props.phoneNumber,
  };

  return (
    <div className="table__contact-links">
      <div title="Member's Website">
        {contactProps.websiteURL && (
          <a href={contactProps.websiteURL} target="_blank" rel="noreferrer">
            <img
              src="images/external_link_rounded_square.png"
              alt="go to member's website"
            ></img>
          </a>
        )}
      </div>

      <div title="Contact This Member">
        {contactProps.contactFormURL && (
          <a
            href={contactProps.contactFormURL}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="images/email_rounded_square.png"
              alt="contact this congress member"
            ></img>
          </a>
        )}
      </div>
      <div title={`Call This Member at ${contactProps.phoneNumber}`}>
        {contactProps.phoneNumber && (
          <a
            href={`tel:${contactProps.phoneNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            <img
              src="images/smartphone_rounded_square.png"
              alt="call this congress member"
            ></img>
          </a>
        )}
      </div>
    </div>
  );
}
