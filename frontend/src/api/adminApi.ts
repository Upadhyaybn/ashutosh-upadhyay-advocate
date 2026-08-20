import apiClient from "./apiClient";

import type {
  AdminAppointment,
  AdminEnquiry,
  AdvocateProfile,
  AuditLog,
  PracticeArea,
  PracticeAreaRequest,
  UpdateAdvocateProfileRequest,
  UpdateAppointmentStatusRequest,
  UpdateEnquiryStatusRequest,
  UpdatePracticeAreaStatusRequest,
} from "../types/api";

export const getAdminEnquiries =
  async (): Promise<AdminEnquiry[]> => {

    const response =
      await apiClient.get<AdminEnquiry[]>(
        "/api/v1/admin/enquiries"
      );

    return response.data;
  };

export const updateEnquiryStatus =
  async (
    id: number,
    request: UpdateEnquiryStatusRequest
  ): Promise<AdminEnquiry> => {

    const response =
      await apiClient.patch<AdminEnquiry>(
        `/api/v1/admin/enquiries/${id}/status`,
        request
      );

    return response.data;
  };

export const getAdminAppointments =
  async (): Promise<AdminAppointment[]> => {

    const response =
      await apiClient.get<AdminAppointment[]>(
        "/api/v1/admin/appointments"
      );

    return response.data;
  };

export const updateAppointmentStatus =
  async (
    id: number,
    request: UpdateAppointmentStatusRequest
  ): Promise<AdminAppointment> => {

    const response =
      await apiClient.patch<AdminAppointment>(
        `/api/v1/admin/appointments/${id}/status`,
        request
      );

    return response.data;
  };

export const getAdminProfile =
  async (): Promise<AdvocateProfile> => {

    const response =
      await apiClient.get<AdvocateProfile>(
        "/api/v1/admin/profile"
      );

    return response.data;
  };

export const updateAdminProfile =
  async (
    request: UpdateAdvocateProfileRequest
  ): Promise<AdvocateProfile> => {

    const response =
      await apiClient.put<AdvocateProfile>(
        "/api/v1/admin/profile",
        request
      );

    return response.data;
  };

export const getAdminPracticeAreas =
  async (): Promise<PracticeArea[]> => {

    const response =
      await apiClient.get<PracticeArea[]>(
        "/api/v1/admin/practice-areas"
      );

    return response.data;
  };

export const createPracticeArea =
  async (
    request: PracticeAreaRequest
  ): Promise<PracticeArea> => {

    const response =
      await apiClient.post<PracticeArea>(
        "/api/v1/admin/practice-areas",
        request
      );

    return response.data;
  };

export const updatePracticeArea =
  async (
    id: number,
    request: PracticeAreaRequest
  ): Promise<PracticeArea> => {

    const response =
      await apiClient.put<PracticeArea>(
        `/api/v1/admin/practice-areas/${id}`,
        request
      );

    return response.data;
  };

export const updatePracticeAreaStatus =
  async (
    id: number,
    request: UpdatePracticeAreaStatusRequest
  ): Promise<PracticeArea> => {

    const response =
      await apiClient.patch<PracticeArea>(
        `/api/v1/admin/practice-areas/${id}/status`,
        request
      );

    return response.data;
  };

export const deletePracticeArea =
  async (
    id: number
  ): Promise<void> => {

    await apiClient.delete(
      `/api/v1/admin/practice-areas/${id}`
    );
  };

export const getAuditLogs =
  async (): Promise<AuditLog[]> => {

    const response =
      await apiClient.get<AuditLog[]>(
        "/api/v1/admin/audit-logs"
      );

    return response.data;
  };