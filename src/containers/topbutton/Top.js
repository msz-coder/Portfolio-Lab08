// src/containers/topbutton/Top.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Top.scss";

export default function Top() {
  const location = useLocation();

  function TopEvent() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  function scrollFunction() {
    const button = document.getElementById("topButton");
    if (!button) return;
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      button.style.visibility = "visible";
    } else {
      button.style.visibility = "hidden";
    }
  }

  useEffect(() => {
    if (location.pathname === "/") {
      window.onscroll = scrollFunction;
      window.onload = scrollFunction;
    } else {
      window.onscroll = null;
      window.onload = null;
    }

    return () => {
      window.onscroll = null;
      window.onload = null;
    };
  }, [location.pathname]);

  return (
    <button onClick={TopEvent} id="topButton" title="Go to top">
      <i className="fas fa-hand-point-up" aria-hidden="true"></i>
    </button>
  );
}