import React from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

// CSS
import "react-notifications/lib/notifications.css";

export const createNotification = (type, optional_func, msg) => {
  switch (type) {
    case "delete-success":
      NotificationManager.info(
        "You have successfully deleted this to-do. Click to undo action",
        "Removed to-do",
        5000,
        () => {
          if (optional_func) {
            optional_func();
          }
        }
      );
      break;

    case "mark-done-success":
      NotificationManager.success(
        "You have successfully marked this to-do as done. Click to undo action",
        "Marked to-do as done",
        5000,
        () => {
          if (optional_func) {
            optional_func();
          }
        }
      );
      break;

    case "info":
      if (msg) {
        NotificationManager.info(msg);
      } else {
        NotificationManager.info("Info message");
      }
      break;
    case "success":
      NotificationManager.success("Success message", "Title here");
      break;
    case "warning":
      NotificationManager.warning(
        "Warning message",
        "Close after 3000ms",
        3000
      );
      break;
    case "error":
      NotificationManager.error("Error message", "Click me!", 5000, () => {
        alert("callback");
      });
      break;
    default:
      console.log("Unkown Command");
  }
};

const CustomNotificationManager = () => {
  return <NotificationContainer />;
};

export default CustomNotificationManager;
