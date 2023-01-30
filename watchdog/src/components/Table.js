import React from "react";

import ContactIcons from "./ContactIcons";
import GraphsButton from "./GraphsButton";
// import Loading from "./Loading";
import SocialIcons from "./SocialIcons";

//using a lazy render apprach to getting Details -> as of 01/10/23, I don't fully understand what's going on, but it seems to work. in case it doesn't work out later on, attempt to fix or revert to basic import approach

export default function Table(props) {
  const currentList = props.currentList;

  function makeTable(list) {
    const memberGroup = list.map((profile) => {
      let { firstName, lastName, party, state, id } = profile.personalDetails;

      let {
        twitterAccount,
        facebookAccount,
        youtubeAccount,
        websiteURL,
        contactFormURL,
        phoneNumber,
      } = profile.contactInfo;

      return {
        id: id,
        name: `${firstName} ${lastName}`,
        party: party,
        state: state,
        contact: (
          <ContactIcons
            websiteURL={websiteURL}
            contactFormURL={contactFormURL}
            phoneNumber={phoneNumber}
          />
        ),
        socials: (
          <SocialIcons
            twitterAccount={twitterAccount}
            facebookAccount={facebookAccount}
            youtubeAccount={youtubeAccount}
          />
        ),
        button: <GraphsButton id={id} changeGraphs={props.changeGraphs} />,
      };
    });
    const memberTable = (
      <table>
        <thead>
          <tr className="table-headers">
            <th className="table-header--name">Name</th>
            <th className="table-header--state">State</th>
            <th className="table-header--party">Party</th>
            <th className="table-header--contact">Contact</th>
            <th className="table-header--socials">Socials</th>
          </tr>
        </thead>
        <tbody>
          {memberGroup.map((member) => (
            <tr className="table-rows">
              <td className="table-data--name">{member.name}</td>
              <td className="table-data--state">{member.state}</td>
              <td className="table-data--party">{member.party}</td>
              <td className="table-data--contact">{member.contact}</td>
              <td className="table-data--socials">{member.socials}</td>
              <td className="table-data--button">{member.button}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    return memberTable;
  }

  const displayTable = makeTable(currentList);

  // const senatorDetailsTable = makeTable(senatorList);
  // const representativeDetailsTable = makeTable(representativeList);
  // const currentTable =
  //   props.currentList === "senate"
  //     ? senatorDetailsTable
  //     : representativeDetailsTable;

  return (
    <section>
      <div className="table">
        <section>{displayTable}</section>
      </div>
    </section>
  );
}
