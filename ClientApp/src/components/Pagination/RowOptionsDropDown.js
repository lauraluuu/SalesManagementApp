import React from "react";
import { Dropdown } from "semantic-ui-react";

const RowOptionsDropDown = (props) => {
  const rowOptions = [
    {
      key: "1",
      text: " 1",
      value: "1",
    },
    {
      key: "5",
      text: " 5",
      value: "5",
    },
    {
      key: "10",
      text: " 10",
      value: "10",
    },
  ];

  const setRow = (event, { value }) => {
    props.handleRowOptionsDropDown(value);
  };

  return (
    <div>
      <span>
        Show rows:{" "}
        <Dropdown
          inline
          options={rowOptions}
          defaultValue={rowOptions[1].value}
          onChange={setRow}
        />
      </span>
    </div>
  )
}

export default RowOptionsDropDown;
