import React, { Suspense } from "react";

import ContactIcons from "./ContactIcons";
import GraphsButton from "./GraphsButton";
import Loading from "./Loading";
import SocialIcons from "./SocialIcons";
// import Details from "./Details";
const TableItem = React.lazy(() => import("./TableItem"));

//using a lazy render apprach to getting Details -> as of 01/10/23, I don't fully understand what's going on, but it seems to work. in case it doesn't work out later on, attempt to fix or revert to basic import approach

export default function Table(props) {
  const senatorList = props.senatorList;
  const representativeList = props.representativeList;

  function makeTable(chamberList) {
    const memberGroup = chamberList.map((profile) => {
      let { firstName, lastName, party, state, title, id } =
        profile.personalDetails;

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
        button: (
          <GraphsButton
            id={id}
            changeGraphs={props.changeGraphs}
            list={title === "Sen." ? senatorList : representativeList}
            title={title}
          />
        ),
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
              <td>{member.party}</td>
              <td>{member.state}</td>
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

  return (
    <section>
      <div className="table">
        <h1>This is the list for senators</h1>
        <Suspense fallback={<Loading />}>
          <section>{senatorDetailsTable}</section>
        </Suspense>
        <h1>This is the list for representatives</h1>
        <section>{representativeDetailsTable}</section>
      </div>
    </section>
  );
}
