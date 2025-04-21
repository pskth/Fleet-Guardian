import React from "react";

const NotificationsLink = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8 text-center">
      <a
        href="/notifications"
        className="text-yellow-600 hover:underline font-semibold cursor-pointer"
      >
        Important Notifications
      </a>
    </div>
  );
};

export default NotificationsLink;
