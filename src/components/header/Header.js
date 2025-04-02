import React, {useContext} from "react";
import { HashLink as Link } from "react-router-hash-link";
import Headroom from "react-headroom";
import "./Header.scss";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import StyleContext from "../../contexts/StyleContext";
import {
  greeting,
  workExperiences,
  skillsSection,
  openSource,
  achievementSection,
  resumeSection
} from "../../portfolio";

function Header() {
  const {isDark} = useContext(StyleContext);
  const viewExperience = workExperiences.display;
  const viewOpenSource = openSource.display;
  const viewSkills = skillsSection.display;
  const viewAchievement = achievementSection.display;
  const viewResume = resumeSection.display;

  return (
    <Headroom>
      <header className={isDark ? "dark-menu header" : "header"}>
        <a href="/" className="logo">
          <span className="grey-color"> &lt;</span>
          <span className="logo-name">{greeting.username}</span>
          <span className="grey-color">/&gt;</span>
        </a>
        <input className="menu-btn" type="checkbox" id="menu-btn" />
        <label
          className="menu-icon"
          htmlFor="menu-btn"
          style={{color: "white"}}
        >
          <span className={isDark ? "navicon navicon-dark" : "navicon"}></span>
        </label>
        <ul className={isDark ? "dark-menu menu" : "menu"}>
          {viewSkills && (
            <li>
            <Link smooth to="/#skills">Skills</Link>
          </li>
          )}
          {viewExperience && (
            <li>
            <Link smooth to="/#experience">Work Experiences</Link>
          </li>
          )}
          {viewOpenSource && (
            <li>
            <Link smooth to="/#opensource">Open Source</Link>
          </li>
          )}
          {viewAchievement && (
            <li>
            <Link smooth to="/#achievements">Achievements</Link>
          </li>
          )}
          {viewResume && (
            <li>
            <Link smooth to="/#resume">Resume</Link>
          </li>
          )}
          <li>
          <Link to="/" state={{ scrollTo: "contact" }}>
            Contact Me
          </Link>
        </li>
        <li>
          <Link to="/messages">Messages</Link>
        </li>
          <li>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a>
              <ToggleSwitch />
            </a>
          </li>
        </ul>
      </header>
    </Headroom>
  );
}
export default Header;
