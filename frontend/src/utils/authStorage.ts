const TOKEN_KEY =
  "advocate_admin_token";

export const saveToken = (
  token: string
): void => {

  const cleanToken =
    token?.trim();

  if (
    !cleanToken ||
    cleanToken === "undefined" ||
    cleanToken === "null"
  ) {
    throw new Error(
      "Invalid authentication token received from server."
    );
  }

  localStorage.setItem(
    TOKEN_KEY,
    cleanToken
  );
};

export const getToken =
  (): string | null => {

    const token =
      localStorage.getItem(
        TOKEN_KEY
      );

    if (
      !token ||
      token === "undefined" ||
      token === "null"
    ) {
      return null;
    }

    return token;
  };

export const removeToken =
  (): void => {

    localStorage.removeItem(
      TOKEN_KEY
    );
  };

export const isAuthenticated =
  (): boolean => {

    return getToken() !== null;
  };