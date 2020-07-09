import * as Yup from 'yup';

const LoginPOSTSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
  rememberMe: Yup.boolean().required(),
});

export { LoginPOSTSchema };
