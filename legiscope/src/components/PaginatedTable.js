import React from "react";
import PaginationButtons from "./PaginationButtons";
import ContactIcons from "./ContactIcons";
import SocialIcons from "./SocialIcons";
import GraphsButton from "./GraphsButton";

export default function PaginatedTable(props) {
  const list = props.currentList;
  const rowsPerPage = 10;

  const [tableRange, setTableRange] = React.useState([]);
  const [currentGroup, setCurrentGroup] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);

  const calculateNumberPages = (list, rowsPerPage) => {
    const tableRange = [];
    const numPages = Math.ceil(list.length / rowsPerPage);
    for (let i = 1; i <= numPages; i++) {
      tableRange.push(i);
    }
    return tableRange;
  };

  //separate list into currentGroup

  const divideList = (list, page, rowsPerPage) => {
    return list.slice((page - 1) * rowsPerPage, page * rowsPerPage);
  };

  //increase and reduce currentPage by one; for use with left and right PaginationButtons

  function currentPageIncrease() {
    if (currentPage < tableRange.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  }

  function currentPageDecrease() {
    if (currentPage > tableRange[0]) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  }

  //make table and export

  React.useEffect(() => {
    const range = calculateNumberPages(list, rowsPerPage);
    setTableRange([...range]);

    const slice = divideList(list, currentPage, rowsPerPage);
    setCurrentGroup([...slice]);
  }, [list, setTableRange, currentPage, setCurrentGroup]);

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
      <section className="member-list">
        <table className="table">
          <thead>
            <tr className="table-headers">
              <th className="table-header--name">Name</th>
              <th className="table-header--state">State</th>
              <th className="table-header--party">Party</th>
              <th className="table-header--contact">Contact</th>
              <th className="table-header--socials">Socials</th>
              <th className="table-header--button"></th>
            </tr>
            <tr className="table-bottom-border"></tr>
          </thead>
          <tbody>
            {memberGroup.map((member) => (
              <tr className="table-rows" key={member.id}>
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
      </section>
    );
    return memberTable;
  }

  const displayTable = makeTable(currentGroup);

  return (
    <section className="component--table">
      <div className="table-container">
        {" "}
        {displayTable}
        <PaginationButtons
          range={tableRange}
          slice={currentGroup}
          setPage={setCurrentPage}
          increasePage={currentPageIncrease}
          decreasePage={currentPageDecrease}
          page={currentPage}
        />
      </div>
    </section>
  );
}
