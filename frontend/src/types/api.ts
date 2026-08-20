export type EnquiryStatus =
  | "NEW"
  | "REVIEWED"
  | "CONTACTED"
  | "APPOINTMENT_SCHEDULED"
  | "CLOSED";

export type AppointmentStatus =
  | "REQUESTED"
  | "REVIEWED"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

export interface AdvocateProfile {
  id: number;
  fullName: string;
  designation: string | null;
  professionalBio: string | null;
  qualification: string | null;
  courtsOfPractice: string | null;
  languages: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  officeAddress: string | null;
  officeHours: string | null;
  photoUrl: string | null;
}

export interface UpdateAdvocateProfileRequest {
  fullName: string;
  designation: string;
  professionalBio: string;
  qualification: string;
  courtsOfPractice: string;
  languages: string;
  phone: string;
  whatsapp: string;
  email: string;
  officeAddress: string;
  officeHours: string;
  photoUrl: string;
}

export interface PracticeArea {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  detailedDescription: string | null;
  displayOrder: number;
  active: boolean;
}

export interface PracticeAreaRequest {
  name: string;
  slug: string;
  shortDescription: string;
  detailedDescription: string;
  displayOrder: number;
  active: boolean;
}

export interface UpdatePracticeAreaStatusRequest {
  active: boolean;
}

export interface UpdateEnquiryStatusRequest {
  status: EnquiryStatus;
}

export interface UpdateAppointmentStatusRequest {
  status: AppointmentStatus;
}

export interface CreateResponse {
  id: number;
  message: string;
}

export interface RawLoginResponse {
  token?: string;
  accessToken?: string;
  jwt?: string;
  access_token?: string;
  tokenType?: string;
  expiresIn?: number;
  username?: string;
  role?: string;
}

export interface LoginResponse {
  token: string;
  tokenType?: string;
  expiresIn?: number;
  username?: string;
  role?: string;
}

export interface EnquiryRequest {
  fullName: string;
  mobile: string;
  email?: string;
  cityDistrict?: string;
  category?: string;
  description: string;
  consent: boolean;
}

export interface AppointmentRequest {
  fullName: string;
  mobile: string;
  email?: string;
  preferredDate: string;
  preferredTime?: string;
  matterCategory: string;
  communicationMethod: string;
  shortNote?: string;
  consent: boolean;
}

export interface AdminEnquiry {
  id: number;
  fullName: string;
  mobile: string;
  email: string | null;
  cityDistrict: string | null;
  category: string | null;
  description: string;
  status: EnquiryStatus;
  consent: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface AdminAppointment {
  id: number;
  fullName: string;
  mobile: string;
  email: string | null;
  preferredDate: string;
  preferredTime: string | null;
  matterCategory: string;
  communicationMethod: string;
  shortNote: string | null;
  status: AppointmentStatus;
  consent: boolean;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface AuditLog {
  id: number;
  username: string;
  action: string;
  entityType: string;
  entityId: number | null;
  createdAt: string;
}