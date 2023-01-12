import "./App.css";
import Loading from "./components/Loading";
// import Table from "./components/Table";
import React, { Suspense } from "react";
const Table = React.lazy(() => import("./components/Table"));

function App() {
  return (
    <div className="App">
      <h1>This is the list for senators</h1>
      <Suspense fallback={<Loading />}>
        <Table />
      </Suspense>
    </div>
  );
}

export default App;
