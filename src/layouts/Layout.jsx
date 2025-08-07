import React from "react";
import "./Layout.css";

const Layout = ({ children, backgroundImage, className = "", overlay = false, overlayType = "dark" }) => {
  const layoutClasses = [
    "layout",
    className,
    backgroundImage ? "bg-image" : "",
    overlay ? `bg-overlay bg-overlay-${overlayType}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  const layoutStyle = backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {};

  return (
    <div className={layoutClasses} style={layoutStyle}>
      <div className="layout-content">{children}</div>
    </div>
  );
};

export default Layout;
