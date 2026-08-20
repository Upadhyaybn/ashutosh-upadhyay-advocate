import apiClient from "./apiClient";

import type {
  AdvocateProfile,
  AppointmentRequest,
  CreateResponse,
  EnquiryRequest,
  PracticeArea,
} from "../types/api";

export const getProfile =
  async (): Promise<AdvocateProfile> => {

    const response =
      await apiClient.get<AdvocateProfile>(
        "/api/v1/profile"
      );

    return response.data;
  };

export const getPracticeAreas =
  async (): Promise<PracticeArea[]> => {

    const response =
      await apiClient.get<PracticeArea[]>(
        "/api/v1/practice-areas"
      );

    return response.data;
  };

export const submitEnquiry =
  async (
    request: EnquiryRequest
  ): Promise<CreateResponse> => {

    const response =
      await apiClient.post<CreateResponse>(
        "/api/v1/enquiries",
        request
      );

    return response.data;
  };

export const submitAppointment =
  async (
    request: AppointmentRequest
  ): Promise<CreateResponse> => {

    const response =
      await apiClient.post<CreateResponse>(
        "/api/v1/appointments",
        request
      );

    return response.data;
  };