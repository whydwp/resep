/* eslint-disable @next/next/no-img-element */
import React from "react";
import Link from "next/link";
import style from "../navbar/navbar.module.css";
import axios from "axios";
import Route from 'next/router'

const Logout = () => {
  const handleLogout = async (e) => {
    e.preventDefault();
    await axios.get("http://localhost:5000/auth/logout", {
      withCredentials: true,
    });
    // console.log(result.message);
    localStorage.removeItem("login");
    Route.push("/login");
  };
  return (
    <>
      <Link href="/profil">
        <li className="nav-item">
          <button className={`${style.iconLogin} btn btn-light`}>
            <img src="/assets/User icon.png" alt="" />
          </button>
        </li>
      </Link>
      <li className="nav-item">
        <button
          className={`${style.navLink} btn btn-light`}
          onClick={handleLogout}
        >
          logout
        </button>
      </li>
    </>
  );
};

export default Logout;
