import apiClient from "./apiClient";

import type {
  LoginResponse,
  RawLoginResponse,
} from "../types/api";

export interface LoginRequest {
  username: string;
  password: string;
}

export const loginAdmin =
  async (
    request: LoginRequest
  ): Promise<LoginResponse> => {

    const response =
      await apiClient.post<RawLoginResponse>(
        "/api/v1/auth/login",
        request
      );

    const data =
      response.data;

    const token =
      data.token ??
      data.accessToken ??
      data.jwt ??
      data.access_token;

    if (
      !token ||
      typeof token !== "string"
    ) {
      throw new Error(
        "Login succeeded but the server did not return a JWT token."
      );
    }

    return {
      token,
      tokenType:
        data.tokenType,
      expiresIn:
        data.expiresIn,
      username:
        data.username,
      role:
        data.role,
    };
  };