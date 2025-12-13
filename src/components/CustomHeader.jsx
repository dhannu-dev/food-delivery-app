import React from 'react'

export default function CustomHeader() {
  return (
  <div className="flex w-full justify-between p-5 ">
      <div>
        <h1>Food Devlivery App</h1>
      </div>
      <div className="flex gap-10">
        <h1>Home</h1>
        <h1>Login</h1>
        <h1>SignUp</h1>
        <h1>Cart(0)</h1>
        <h1>Add Restaurent</h1>
      </div>
    </div>
  )
}
