import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axiosApi from "../../axiosApi";

const Toolbar: React.FC = () => {
  const [pages, setPages] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axiosApi.get("pages.json");
      const pageKeys = Object.keys(response.data);
      setPages(pageKeys);
    };

    fetchData();
  }, []);

  const sortedArray = ["home", ...pages.filter((page) => page !== "home")];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <NavLink to="/" className="navbar-brand">
          Homework 65
        </NavLink>
        <ul className="navbar-nav mr-auto flex-row gap-2 flex-nowrap">
          {sortedArray.map((page) => (
            <li className="nav-item" key={page}>
              <NavLink className="nav-link" to={`/pages/${page}`}>
                {page.charAt(0).toUpperCase() + page.slice(1)}
              </NavLink>
            </li>
          ))}
          <li className="nav-item">
            <NavLink to="/new-page" className="nav-link">
              New page
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;
