import React from "react";

export default function RestaurentHeader() {
  return (
    <div className="flex w-full justify-between p-5 ">
      <div>
        <h1>Food Devlivery App</h1>
      </div>
      <div className="flex gap-10">
        <h1>Home</h1>
        <h1>Login/SignUp</h1>
        <h1>Profile</h1>
      </div>
    </div>
  );
}
