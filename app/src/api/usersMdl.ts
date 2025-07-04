import { SignUpForm } from "../schemas/signUpSchema";
import { ModeloBase } from "./ModeloBase";

class UserMdl extends ModeloBase {
  constructor() {
    super("/users")
  }

  async create(data: SignUpForm) {
    return this.defaultPostRequest("", data);
  }
}

export const userMdl = new UserMdl();
