export interface Url {
  id: number;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  expiresAt?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface CreateUrlRequest {
  originalUrl: string;
  expiresAt?: string;
}