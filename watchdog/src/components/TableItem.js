import React from "react";
import Graphs from "./Graphs";

export default function Details(props) {
  const profile = {
    name: `${props.title} ${props.firstName} ${props.lastName}`,
    state: props.state,
    party: props.party,
    twitterAccount:
      props.twitterAccount == null
        ? false
        : `https://twitter.com/search?q=${props.twitterAccount}&src=typed_query&f=top`,
    facebookAccount:
      props.facebookAccount == null
        ? false
        : `https://www.facebook.com/search/top?q=${props.facebookAccount}`,
    youtubeAccount:
      props.youtubeAccount == null
        ? false
        : `https://www.youtube.com/results?search_query=${props.youtubeAccount}&sp=EgIQAg%253D%253D`,
    websiteURL: props.websiteURL == null ? false : props.websiteURL,
    contactFormURL: props.contactFormURL == null ? false : props.contactFormURL,
    phoneNumber: props.phoneNumber == null ? false : props.phoneNumber,
    dwNominate: props.dwNominate,
    missedVotesPercent: props.missedVotesPercent,
    votesWithPartyPercent: props.votesWithPartyPercent,
    votesAgainstPartyPercent: props.votesAgainstPartyPercent,
    imageURL: props.imageURL,
  };

  //states
  // 1. Source of elements in Details div
  // 2. Replacement image in case there is an error with loading congress-person's portrait

  const [details, setDetails] = React.useState(profile);
  const [defaultImage, setDefaultImage] = React.useState(
    "congressprofiles/Noimgavailable.jpg"
  );

  function replaceImage(error) {
    error.target.src = defaultImage;
  }

  return (
    <section>
      <div className="personal-details">
        <div className="personal-details__image">
          <img
            src={profile.imageURL}
            alt="congress profile"
            onError={replaceImage}
          ></img>
        </div>
        <div className="personal-details__name">
          <span>
            {details.name}, {props.id}
          </span>
        </div>
        <div className="personal-details__state">
          {" "}
          <span>{details.state}</span>{" "}
        </div>
        <div className="personal-details_party">
          <span>{details.party}</span>
        </div>
      </div>
      <div className="personal-details__website">
        <div>
          {details.websiteURL && (
            <a href={details.websiteURL} target="_blank" rel="noreferrer">
              <img
                src="images/external_link_rounded_square.png"
                alt="go to congress person website"
              ></img>
              Website
            </a>
          )}
        </div>
      </div>
      <div className="personal-details__contact">
        <div>
          {details.contactFormURL && (
            <a href={details.contactFormURL} target="_blank" rel="noreferrer">
              <img
                src="images/email_rounded_square.png"
                alt="contact this congress person"
              ></img>
              Contact
            </a>
          )}
        </div>
        <div>
          {details.phoneNumber && (
            <a href={details.phoneNumber} target="_blank" rel="noreferrer">
              <img
                src="images/smartphone_rounded_square.png"
                alt="call this congress person"
              ></img>
              {details.phoneNumber}
            </a>
          )}
        </div>
      </div>
      <div className="personal-details__socials">
        <div className="socials__twitter">
          {details.twitterAccount && (
            <a href={details.twitterAccount} target="_blank" rel="noreferrer">
              <img
                src="images/twitter_rounded_square.png"
                alt="go to twitter page"
              ></img>
            </a>
          )}
        </div>
        <div className="socials_facebook">
          {details.facebookAccount && (
            <a href={details.facebookAccount} target="_blank" rel="noreferrer">
              <img
                src="images/facebook_rounded_square.png"
                alt="go to facebook page"
              ></img>
            </a>
          )}
        </div>
        <div className="socials_youtube">
          {details.youtubeAccount && (
            <a href={details.youtubeAccount} target="_blank" rel="noreferrer">
              <img
                src="images/youtube_rounded_square.png"
                alt="go to youtube page"
              ></img>
            </a>
          )}
        </div>
      </div>

      {/* <Graphs
        id={details.id}
        dwNominate={details.dwNominate}
        missedVotesPercent={details.missedVotesPercent}
        votesWithPartyPercent={details.votesWithPartyPercent}
        votesAgainstPartyPercent={details.votesAgainstPartyPercent}
      /> */}
    </section>
  );
}
