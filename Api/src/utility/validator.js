import Joi from "joi";

export const signUp = Joi.object().keys({
  email: Joi.string().email().trim().lowercase().required(),
  username: Joi.string().required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,30}$/)
    .message('Password must contain at least one uppercase letter, one lowercase letter, one of these symbols (@$!%*?&#) , one digit, and be between 6 and 30 characters in length.')
    .required(),
    confirmPassword: Joi.string().required(),
});

export const Login = Joi.object().keys({
  email: Joi.string().email().trim().lowercase().required(),
  password: Joi.string()
    .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,30}$/)
    .message('Password must contain at least one uppercase letter, one lowercase letter, one of these symbols (@$!%*?&#) , one digit, and be between 8 and 30 characters in length.')
    .required(),
});

export const transaction = Joi.object().keys({
  distanceTravelled: Joi.number().required(),
  tripAmount: Joi.number().required()
});

export const vehicleClass = Joi.object({
  className: Joi.string().required(),
  requirements: Joi.string().required(),
});

export const serviceClass = Joi.object({
  className: Joi.string().required(),
  requirements: Joi.string().required(),
});

export const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: "",
        }
    }
}

