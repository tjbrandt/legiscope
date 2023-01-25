import React from "react";

import ContactIcons from "./ContactIcons";
import GraphsButton from "./GraphsButton";
// import Loading from "./Loading";
import SocialIcons from "./SocialIcons";

//using a lazy render apprach to getting Details -> as of 01/10/23, I don't fully understand what's going on, but it seems to work. in case it doesn't work out later on, attempt to fix or revert to basic import approach

export default function Table(props) {
  const senatorList = props.senatorList;
  const representativeList = props.representativeList;

  function makeTable(chamberList) {
    const memberGroup = chamberList.map((profile) => {
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
          <tr>
            <th>Name</th>
            <th>State</th>
            <th>Party</th>
            <th>Contact</th>
            <th>Socials</th>
            <th>Temp:Button</th>
            <th>Temp: ID</th>
          </tr>
        </thead>
        <tbody>
          {memberGroup.map((member) => (
            <tr>
              <td>{member.name}</td>
              <td>{member.state}</td>
              <td>{member.party}</td>
              <td>{member.contact}</td>
              <td>{member.socials}</td>
              <td>{member.button}</td>
              <td>{member.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
    return memberTable;
  }

  const senatorDetailsTable = makeTable(senatorList);
  const representativeDetailsTable = makeTable(representativeList);
  const currentTable =
    props.currentList === "senate"
      ? senatorDetailsTable
      : representativeDetailsTable;

  return (
    <section>
      <div className="table">
        <section>{currentTable}</section>
      </div>
    </section>
  );
}
