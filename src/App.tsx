import { Route, Routes } from "react-router-dom";
import Toolbar from "./components/Toolbar/Toolbar";
import Home from "./containers/Home/Home";
import Page from "./containers/Page/Page";

function App() {
  return (
    <>
      <header>
        <Toolbar />
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pages/:page" element={<Page />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
