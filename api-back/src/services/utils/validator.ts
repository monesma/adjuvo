const alphanunericRegex = /^[0-9a-zA-Z]+$/;
const emailRegex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
import ResponseRequest from "../../frameworks/common/ResponseRequest";
import ResponseError from "../../frameworks/common/ResponseError";

export const isAlphanumeric = (word: string): boolean => {
  return alphanunericRegex.test(word);
};

function isPasswordValid(password: string) {
  // Vérifie si le mot de passe respecte tous les critères
  const minLength = /.{8,}/; // Au moins 8 caractères
  const hasLetter = /[a-zA-Z]/; // Au moins une lettre
  const hasDigit = /\d/; // Au moins un chiffre
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/; // Au moins un caractère spécial

  return (
      minLength.test(password) &&
      hasLetter.test(password) &&
      hasDigit.test(password) &&
      hasSpecialChar.test(password)
  );
}

export const isValidateEmail = (email: string): boolean | ResponseRequest => {
  if (!emailRegex.test(email)) {
    return new ResponseRequest({
      status: 401,
      error: new ResponseError({
        error: "Wrong Email",
        msg: "You have to use a correct email address",
      }),
      content: null,
    });
  }

  return true;
};

export const isValidatePassword = (
  password: string,
): boolean | ResponseRequest => {
  if (!isPasswordValid(password)) {
    return new ResponseRequest({
      status: 401,
      error: new ResponseError({
        error: "Wrong caracter password",
        msg: "You have to create password between 8 and 255 caracters minimum 1 letter, 1 number and 1 specific caracter",
      }),
      content: null,
    });
  }

  if (password.length <= 8 || password.length >= 255) {
    return new ResponseRequest({
      status: 401,
      error: new ResponseError({
        error: "Wrong caracter password",
        msg: "You have to create password between 8 and 255 caracters",
      }),
      content: null,
    });
  }

  return true;
};
