import React from "react";

export default function Header() {
  const [showDropdown, setShowDropdown] = React.useState("icon");

  function handleClick() {
    setShowDropdown((prevShow) => (prevShow === "icon" ? "list" : "icon"));
  }

  return (
    <section className="header--container">
      <div className="header">
        <div className="header--logo-legiscope"></div>
        <nav className="header--nav" onClick={handleClick}>
          {" "}
          <div
            className={`${"header--nav-bars"} ${
              showDropdown === "icon"
                ? "header--nav-bars__active"
                : "header--nav-bars__inactive"
            }`}
          >
            <span className="header--nav-bar"></span>
            <span className="header--nav-bar"></span>
            <span className="header--nav-bar"></span>
          </div>
        </nav>
      </div>
      <ul
        className={`${"header--nav-list"} ${
          showDropdown === "list"
            ? "header--nav-list__active"
            : "header--nav-list__inactive"
        }`}
      >
        <li className="nav-list--source">
          Source:{" "}
          <a
            href="https://www.propublica.org/datastore/api/propublica-congress-api"
            target="_blank"
            rel="noreferrer"
            title="go to propublica congress api website"
          >
            {" "}
            ProPublica Congress API{" "}
            <img
              className="nav-list--link-icon"
              src="images/external_link_icon_white.png"
              alt="link to propublica"
            ></img>
          </a>{" "}
        </li>
        <li className="nav-list--github">
          {" "}
          <a
            href="https://github.com/tjbrandt/legiscope"
            target="_blank"
            rel="noreferrer"
            title="go to github repository for legiscope"
          >
            {" "}
            See this project on GitHub{" "}
            <img
              className="nav-list--link-icon"
              src="images/external_link_icon_white.png"
              alt="link to github repository"
            ></img>
          </a>{" "}
        </li>
      </ul>
    </section>
  );
}
