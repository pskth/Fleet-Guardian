import React from "react";

const UserGreeting = ({ userName }) => {
  return (
    <div className="text-center my-6">
      <h2 className="text-3xl font-semibold text-gray-800">
        Hey {userName}, welcome back!
      </h2>
    </div>
  );
};

export default UserGreeting;