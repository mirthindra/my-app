import React from "react";

const header = () => {
  return (
    <header className="header">
      <h1>Covid-19</h1>
      <select>
        <option value="1">국내</option>
        <option value="2">국외</option>
      </select>
    </header>
  );
};

export default header;
