import React from "react";

export default function SocialIcons(props) {
  const socialProps = {
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
  };

  return (
    <div>
      <div className="table__social-links">
        <div title="Twitter">
          {socialProps.twitterAccount && (
            <a
              href={socialProps.twitterAccount}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="images/twitter_rounded_square.png"
                alt="go to twitter page"
              ></img>
            </a>
          )}
        </div>
        <div title="Facebook">
          {socialProps.facebookAccount && (
            <a
              href={socialProps.facebookAccount}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="images/facebook_rounded_square.png"
                alt="go to facebook page"
              ></img>
            </a>
          )}
        </div>
        <div title="YouTube">
          {socialProps.youtubeAccount && (
            <a
              href={socialProps.youtubeAccount}
              target="_blank"
              rel="noreferrer"
            >
              <img
                src="images/youtube_rounded_square.png"
                alt="go to youtube page"
              ></img>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
