import { Route, Routes } from "react-router-dom";
import Toolbar from "./components/Toolbar/Toolbar";
import Home from "./containers/Home/Home";
import Page from "./containers/Page/Page";
import Admin from "./containers/Admin/Admin";

function App() {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/:pageName" element={<Page />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
