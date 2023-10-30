import React, { useState } from "react";

const SelectComponent = ({ value, onChange, options }) => {
  return (
    <select value={value} onChange={onChange}>
      <option value="">Select a user</option>

      <option key={options._id} value={options.fullname}>
        {options.fullname}
      </option>
    </select>
  );
};

const TableComponent = ({ users }) => {
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelectChange = (index, event) => {
    const updatedSelectedUsers = [...selectedUsers];
    updatedSelectedUsers[index] = event.target.value;
    setSelectedUsers(updatedSelectedUsers);
  };

  return (
    <>
      {users?.data?.map((user, index) => {
        return (
          <tr key={user._id}>
            <td>
              <SelectComponent
                value={selectedUsers[index] || ""}
                onChange={(event) => handleSelectChange(index, event)}
                options={users}
              />
            </td>
          </tr>
        );
      })}
    </>
  );
};

export default TableComponent;
