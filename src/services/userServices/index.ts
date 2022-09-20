import axios from "axios";
import {strapiServer} from 'api/strapi'

type TForm = {
  identifier: "string";
  password: "string";
};

export const loginService = async ({ identifier, password }: TForm) =>
  await axios.post(`${strapiServer}/auth/local/`, {
    identifier,
    password,
  });


type TSignUpForm = {
  username: "string",
  email: "email",
  password: "string"
}

export const signUpService = async ({username, email, password}: TSignUpForm) => 
  await axios.post(`${strapiServer}/auth/local/register`, {
    username,
    email,
    password
  })
