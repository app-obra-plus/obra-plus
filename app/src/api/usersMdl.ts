import { SignUpForm } from "../schemas/signUpSchema";
import { IAuthResponse } from "../types/IAuthResponse";
import { ModeloBase } from "./ModeloBase";

class UserMdl extends ModeloBase {
  constructor() {
    super("/users")
  }

  async create(data: SignUpForm) {
    return this.defaultPostRequest<IAuthResponse>("", data);
  }
}

export const userMdl = new UserMdl();
