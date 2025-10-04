"use client";
import React from "react";

const Logout = () => {
  const handleLogOut = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      window.location.href = "/";
    }
  };

  return <div onClick={handleLogOut}>Log out</div>;
};

export default Logout;
