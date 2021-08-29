// Parse SDK
// Import Parse minified version
import Parse from "parse/dist/parse.min.js";

export const registerNewUser = async function (
  firstName,
  lastName,
  email,
  password
) {
  // Note that these values come from state variables that we've declared before
  const emailValue = email;
  const passwordValue = password;
  const fName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  const lName = lastName.charAt(0).toUpperCase() + lastName.slice(1);
  try {
    // Since the signUp method returns a Promise, we need to call it using await
    const createdUser = await Parse.User.signUp(emailValue, passwordValue, {
      email: emailValue,
      firstName: fName,
      lastName: lName,
    });
    // Auto-logout
    Parse.User.logOut();
    // When successful
    return {
      status: "success",
      message: `Email: ${createdUser.getUsername()} was successfully registered.`,
    };
  } catch (error) {
    // signUp can fail if any parameter is blank or failed an uniqueness check on the server
    return {
      status: "failure",
      message: `Error! ${error}`,
    };
  }
};
