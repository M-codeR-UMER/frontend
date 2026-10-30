import axios, { type AxiosInstance, type InternalAxiosRequestConfig } from "axios";
import type { components } from "~/api/generated/client";

type DoctorCreate = components["schemas"]["DoctorCreate"];
type DoctorRead = components["schemas"]["DoctorRead"];
type PatientCreate = components["schemas"]["PatientCreate"];
type PatientRead = components["schemas"]["PatientRead"];
type Doctor = components["schemas"]["Doctor"];
type HTTPValidationError = components["schemas"]["HTTPValidationError"];

type DoctorSignupResponse = DoctorRead;
type DoctorSignupError = HTTPValidationError;

type DoctorLoginRequest = components["schemas"]["Body_login_doctor_doctor_token_post"];
type DoctorLoginResponse = {
  access_token: string;
  token_type: string;
  expires_in?: number;
};

type DoctorDashboardResponse = Doctor;

type PatientSignupResponse = PatientRead;
type PatientSignupError = HTTPValidationError;

type PatientLoginRequest = components["schemas"]["Body_login_patient_patient_token_post"];
type PatientLoginResponse = {
  access_token: string;
  token_type: string;
  expires_in?: number;
};

interface PatientDashboardData {
  id?: string;
  email: string;
  name: string | null;
}

function getApiBaseUrl(): string {
  const configuredUrl = import.meta.env.VITE_API_BASE_URL;

  if (configuredUrl) {
    return configuredUrl.replace(/\/+$/, "");
  }

  if (import.meta.env.DEV) {
    return "http://127.0.0.1:8000";
  }

  throw new Error("VITE_API_BASE_URL must be configured in production.");
}

export interface ApiError extends Error {
  message: string;
  details?: HTTPValidationError["detail"];
  status?: number;
}

export interface AuthTokens {
  access_token: string;
  token_type: string;
  expires_in?: number;
}

class ApiClient {
  private static instance: ApiClient;
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private tokenType: string = "bearer";

  private constructor() {
    this.client = axios.create({
      baseURL: getApiBaseUrl(),
      timeout: 10_000,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.accessToken) {
          config.headers.Authorization = `${this.tokenType} ${this.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.clearTokens();
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }
        }
        return Promise.reject(this.normalizeError(error));
      },
    );
  }

  static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient();
    }
    return ApiClient.instance;
  }

  private normalizeError(error: any): ApiError {
    let message = error.message || "Request failed";
    let details: HTTPValidationError["detail"] | undefined;
    let status = error.response?.status;

    if (error.response?.data?.detail) {
      details = error.response.data.detail;
      message = error.response.data.detail.map((d: any) => d.msg).join(", ");
    } else if (error.response?.data?.message) {
      message = error.response.data.message;
    } else if (error.response?.statusText) {
      message = error.response.statusText;
    }

    const apiError = new Error(message) as ApiError;
    apiError.details = details;
    apiError.status = status;
    return apiError;
  }

  setTokens(tokens: AuthTokens) {
    this.accessToken = tokens.access_token;
    this.tokenType = tokens.token_type;
  }

  clearTokens() {
    this.accessToken = null;
    this.tokenType = "bearer";
  }

  getAuthHeaders(): Record<string, string> {
    if (!this.accessToken) return {};
    return { Authorization: `${this.tokenType} ${this.accessToken}` };
  }

  async doctorSignup(data: DoctorCreate): Promise<DoctorRead> {
    const response = await this.client.post<DoctorSignupResponse>("/doctor/signup", data);
    return response.data;
  }

  async doctorLogin(credentials: { email: string; password: string }): Promise<AuthTokens> {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", credentials.email);
    formData.append("password", credentials.password);
    formData.append("scope", "");
    formData.append("client_id", "");
    formData.append("client_secret", "");

    const response = await this.client.post<DoctorLoginResponse>("/doctor/token", formData.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const tokens: AuthTokens = {
      access_token: response.data.access_token,
      token_type: response.data.token_type,
      expires_in: response.data.expires_in,
    };

    this.setTokens(tokens);
    return tokens;
  }

  async doctorLogout(): Promise<void> {
    await this.client.post("/doctor/logout");
    this.clearTokens();
  }

  async getDoctorDashboard(): Promise<Doctor> {
    const response = await this.client.get<DoctorDashboardResponse>("/doctor/dashboard");
    return response.data;
  }

  async patientSignup(data: PatientCreate): Promise<PatientRead> {
    const response = await this.client.post<PatientSignupResponse>("/patient/signup", data);
    return response.data;
  }

  async patientLogin(credentials: { email: string; password: string }): Promise<AuthTokens> {
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("username", credentials.email);
    formData.append("password", credentials.password);
    formData.append("scope", "");
    formData.append("client_id", "");
    formData.append("client_secret", "");

    const response = await this.client.post<PatientLoginResponse>("/patient/token", formData.toString(), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    const tokens: AuthTokens = {
      access_token: response.data.access_token,
      token_type: response.data.token_type,
      expires_in: response.data.expires_in,
    };

    this.setTokens(tokens);
    return tokens;
  }

  async patientLogout(): Promise<void> {
    await this.client.post("/patient/logout");
    this.clearTokens();
  }

  async getPatientDashboard(): Promise<PatientDashboardData> {
    const response = await this.client.get<PatientDashboardData>("/patient/dashboard");
    return response.data;
  }

  isAuthenticated(): boolean {
    return !!this.accessToken;
  }

  getClient(): AxiosInstance {
    return this.client;
  }
}

export const apiClient = ApiClient.getInstance();