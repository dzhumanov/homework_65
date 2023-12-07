import { Route, Routes } from "react-router-dom";
import Toolbar from "./components/Toolbar/Toolbar";
import Page from "./containers/Page/Page";
import Admin from "./containers/Admin/Admin";
import NewPage from "./containers/Admin/NewPage";
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
          <Route path="/new-page" element={<NewPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
