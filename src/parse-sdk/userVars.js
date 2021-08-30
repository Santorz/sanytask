// Parse SDK
// Import Parse minified version
import Parse from "parse/dist/parse.min.js";
import {
  PARSE_APPLICATION_ID,
  PARSE_JAVASCRIPT_KEY,
  PARSE_HOST_URL,
} from "../parse-sdk/config";

Parse.initialize(PARSE_APPLICATION_ID, PARSE_JAVASCRIPT_KEY);
Parse.serverURL = PARSE_HOST_URL;

export const getCurrentLoggedInUser = async () => {
  return await Parse.User.current();
};

export const checkIfUserIsLoggedIn = async () => {
  return (
    (await Parse.User.current()) !== null &&
    (await Parse.User.current()) !== undefined
  );
};
