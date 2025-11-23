// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;



import React, { useState } from "react";
import Sidebar from "./components/Layout/Sidebar";
import Topbar from "./components/Layout/Topbar";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div style={{ display: "flex" }}>
      <Topbar />
      <Sidebar onNavigate={setPage} />

      <main style={{ marginLeft: 260, marginTop: 80, width: "100%" }}>
        {page === "home" && <HomePage />}
        {page === "dashboard" && <DashboardPage />}
      </main>
    </div>
  );
}
