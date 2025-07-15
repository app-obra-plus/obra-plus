import { AxiosResponse } from "axios";
import { ModeloBase } from "./ModeloBase";
import { IAuthResponse } from "../types/IAuthResponse";

class AuthMdl extends ModeloBase {
  constructor() {
    super("/auth");
  }

  async login(data: { email: string; password: string }) {
    return this.defaultPostRequest<IAuthResponse>("/login", data);
  }
}

export const authMdl = new AuthMdl();
