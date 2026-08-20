import axios from "axios";

interface ApiErrorResponse {
  message?: string;

  validationErrors?:
    Record<string, string> | null;
}

export const getApiErrorMessage = (
  error: unknown
): string => {

  if (
    axios.isAxiosError<ApiErrorResponse>(
      error
    )
  ) {

    const validationErrors =
      error.response?.data?.validationErrors;

    if (
      validationErrors &&
      Object.keys(validationErrors).length > 0
    ) {

      return Object.values(
        validationErrors
      ).join(" | ");
    }

    return (
      error.response?.data?.message ||
      error.message ||
      "Request failed"
    );
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "Unexpected error occurred";
};