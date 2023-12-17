import Joi from "joi";
import { User } from "../interfaces";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const Valid = async (user: User) => {
  try {
    const result = await schema.validateAsync(user);
    if (result) {
      return {
         error: null,
         result
      };
    }
  } catch (error) {
    console.log(error);

    return {
      error,
      result:false
    };
  }
};
