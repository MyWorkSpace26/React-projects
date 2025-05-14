import { useCallback } from "react";
import { validateLogin, validateRegistration } from "../utils/validators";

export const useValidation = (type = "login") => {
  const validator =
    type === "registration" ? validateRegistration : validateLogin;

  const validate = useCallback(
    (formData) => {
      const errors = validator(formData);
      const isValid = Object.keys(errors).length === 0;
      return { errors, isValid };
    },
    [validator]
  );

  return validate;
};
