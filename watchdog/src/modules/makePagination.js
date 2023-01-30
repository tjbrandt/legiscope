// //this module allows to take the current congress list and paginate it; currently, going to put 10 items per page

// import { useState, useEffect } from "react";

// //take list and calculate number of pages needed

// const calculateNumberPages = (list, rowsPerPage) => {
//   const pagesArray = [];
//   const numPages = Math.ceil(list.length / rowsPerPage);
//   for (let i = 1; i <= numPages; i++) {
//     pagesArray.push(i);
//   }
//   return pagesArray;
// };

// //separate list into groups

// const groupList = (list, page, rowsPerPage) => {
//   return list.slice((page - 1) * rowsPerPage, page * rowsPerPage);
// };

// //make table and export

// const makePaginatedTable = (list, page, rowsPerPage) => {
//     const [pagesArray, setpagesArray] = React.useState([]);
//     const [groupList, setgroupList] = React.useState([]);

//     React.useEffect(()=> {
//         const range = calculateNumberPages(list, rowsPerPage);
//         setpagesArray([...range]);

//         const slice = groupList(list, page, rowsPerPage);
//         setgroupList([...slice])

//     }, [list, setpagesArray, page, setgroupList])

// };

// export default makePaginatedTable;
