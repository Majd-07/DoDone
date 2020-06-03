import React from "react";
import { FaSun } from "react-icons/fa";

export const Header = () => {
  return (
    <header className="header">
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="dodone-logo" />
        </div>

        <div className="settings">
          <ul>
            <li>+</li>
            <li>
              <FaSun />
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
