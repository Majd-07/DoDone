import React, { Component } from "react";

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
            <li>Dark Mode</li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
