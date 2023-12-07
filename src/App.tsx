import { Route, Routes } from "react-router-dom";
import Toolbar from "./components/Toolbar/Toolbar";
import Page from "./containers/Page/Page";
import Admin from "./containers/Admin/Admin";
import "./App.css";

function App() {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Page />} />
          <Route path="/pages/:pageName" element={<Page />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
