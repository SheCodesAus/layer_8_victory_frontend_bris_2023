import React, { useState } from "react";
import "./Dropdown.css";


const Dropdown = ({arrayValues=[""],  onChange}) => {
    const [selectedValue, setSelectedValue] = useState("");
  
    const onChangeDropDown = (event) => {
        setSelectedValue(event.target.value);
        onChange(event.target.value)
      };
  
    return (
      <div className="dropdown-container">
        <select onChange={onChangeDropDown} value={selectedValue}>
          <option value="">Select</option>
          {arrayValues.map((currentValue, index) => (
            <option key={index} value={currentValue}>
              {currentValue}
            </option>
          ))}
        </select>
        {setSelectedValue && <p className="selected-value">Selected Value: {selectedValue}</p>}
      </div>
    );
  };
  
  export default Dropdown;