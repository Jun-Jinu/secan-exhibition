import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState(null);

  const handleMouseEnter = (menu) => {
    setOpenDropdown(menu);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setOpenMobileDropdown(null);
  };

  const toggleMobileDropdown = (menu) => {
    setOpenMobileDropdown(openMobileDropdown === menu ? null : menu);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenMobileDropdown(null);
  };

  const menuItems = {
    INFO: [
      { title: "전시소개", path: "/info/exhibition" },
      { title: "오프닝 애니", path: "/info/opening-ani" },
      { title: "2025 STAFF", path: "/info/staff" },
    ],
    ANIMATION: [
      { title: "졸업작품", path: "/animation/graduation" },
      { title: "과제작품", path: "/animation/assignment" },
    ],
    COMICS: [
      { title: "졸업작품", path: "/comics/graduation" },
      { title: "학년작품", path: "/comics/assignment" },
    ],
    ARTWORK: [
      { title: "졸업작품", path: "/artwork/graduation" },
      { title: "과제작품", path: "/artwork/assignment" },
    ],
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          SECAN
        </Link>

        {/* 데스크톱 메뉴 */}
        <ul className="nav-menu desktop-menu">
          {Object.keys(menuItems).map((menu) => (
            <li
              key={menu}
              className="nav-item dropdown"
              onMouseEnter={() => handleMouseEnter(menu)}
              onMouseLeave={handleMouseLeave}
            >
              <span className="nav-link main-menu">{menu}</span>
              {openDropdown === menu && (
                <div className="dropdown-menu">
                  {menuItems[menu].map((item, index) => (
                    <Link key={index} to={item.path} className="dropdown-item">
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>

        {/* 모바일 햄버거 버튼 */}
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* 모바일 사이드바 메뉴 */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-sidebar-header">
          <button className="mobile-close-button" onClick={closeMobileMenu}>
            ✕
          </button>
        </div>
        <ul className="mobile-menu">
          {Object.keys(menuItems).map((menu) => (
            <li key={menu} className="mobile-menu-item">
              <button className="mobile-menu-button-item" onClick={() => toggleMobileDropdown(menu)}>
                {menu}
                <span className="mobile-arrow">{openMobileDropdown === menu ? "∧" : "∨"}</span>
              </button>
              {openMobileDropdown === menu && (
                <ul className="mobile-submenu">
                  {menuItems[menu].map((item, index) => (
                    <li key={index}>
                      <Link to={item.path} className="mobile-submenu-item" onClick={closeMobileMenu}>
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      {isMobileMenuOpen && <div className="mobile-overlay" onClick={closeMobileMenu}></div>}
    </nav>
  );
};

export default Navigation;
