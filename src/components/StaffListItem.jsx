import React from "react";
import "./StaffListItem.css";

const StaffListItem = ({ role, name, isSection = false }) => {
  if (isSection) {
    return (
      <div className="staff-section">
        <h3 className="section-title">{role}</h3>
      </div>
    );
  }

  return (
    <div className="staff-item">
      <div className="staff-role">{role}</div>
      <div className="staff-name">{name}</div>
    </div>
  );
};

export default StaffListItem;
