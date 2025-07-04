import { AxiosResponse } from "axios";
import { ModeloBase } from "./ModeloBase";

class AuthMdl extends ModeloBase {
  constructor() {
    super("/auth");
  }

  async login(data: { email: string; password: string }): Promise<AxiosResponse<{ token: string }>> {
    return this.defaultPostRequest("/login", data);
  }
}

export const authMdl = new AuthMdl();
