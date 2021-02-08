import React from 'react';

const EmployeeSelect = ({ value, handleOptionSelect, day, shift }) => {
  const handleChange = (e) => {
    handleOptionSelect(e, day, shift);
  };
  return (
    <td>
      <select className="employee-select" value={value} onChange={handleChange}>
        <option value="">Select a Staff Member</option>
        <option value="X1">X1</option>
        <option value="X2">X2</option>
        <option value="X3">X3</option>
        <option value="X4">X4</option>
        <option value="X5">X5</option>
        <option value="X6">X6</option>
        <option value="X7">X7</option>
      </select>
    </td>
  );
};

export default EmployeeSelect;
