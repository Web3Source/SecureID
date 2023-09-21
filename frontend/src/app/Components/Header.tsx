import React from "react";

function Header() {
  return (
    <>
      <div className="flex justify-between px-5 lg:px-20 py-5 bg-black text-gray-300 lg:text-lg font-semibold">
        <div>
          <p>Secure ID</p>
        </div>
        <div>Connect Wallet</div>
      </div>
    </>
  );
}

export default Header;
