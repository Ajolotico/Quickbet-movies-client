"use client";

import { useState, useEffect } from "react";
import logo from "../assets/logo.svg";
import userIcon from "../assets/userIcon.svg";
import userLogged from "../assets/loggeduser.png";
import Image from "next/image";
import Login from "./Login";
import { createPortal } from "react-dom";

export default function Navbar({ onAuthChange }) {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
    onAuthChange(!!token);
  }, [onAuthChange]);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const handleLoginSuccess = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
    setShowLogin(false);
    onAuthChange(true);
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;

    setIsLoggingOut(true);
    try {
      const response = await fetch("http://localhost:5001/auth/logout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Logout failed");
      }

      localStorage.removeItem("authToken");
      setIsLoggedIn(false);
      onAuthChange(false);
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="bg-[#000] flex row-span-1 justify-between px-10 py-3">
      <div className="flex row-auto items-center gap-x-10">
        <Image src={logo} alt="Logo" width={164} height={42} />
        <h3>Popular</h3>
        <h3>Favorites</h3>
      </div>
      <div className="flex row-auto items-center">
        <Image
          src={isLoggedIn ? userLogged : userIcon}
          alt={isLoggedIn ? "Logged in user" : "Login"}
          width={32}
          height={32}
          onClick={isLoggedIn ? handleLogout : toggleLogin}
          className={`cursor-pointer ${isLoggingOut ? "opacity-50" : ""}`}
        />
      </div>
      {showLogin &&
        createPortal(
          <Login
            onClose={() => setShowLogin(false)}
            onLoginSuccess={handleLoginSuccess}
          />,
          document.body
        )}
    </div>
  );
}
