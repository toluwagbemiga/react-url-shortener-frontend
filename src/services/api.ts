import axios from 'axios';
import { Url, ApiResponse, CreateUrlRequest } from '../types';

// Configuration for different backends
const BACKENDS = {
  laravel: 'http://localhost:8000/api/v1',
  nestjs: 'http://localhost:3001/api/v1',
};

class ApiService {
  private baseURL: string;

  constructor(backend: 'laravel' | 'nestjs' = 'laravel') {
    this.baseURL = BACKENDS[backend];
  }

  setBackend(backend: 'laravel' | 'nestjs') {
    this.baseURL = BACKENDS[backend];
  }

  async createUrl(data: CreateUrlRequest): Promise<Url> {
    const response = await axios.post<ApiResponse<Url>>(`${this.baseURL}/urls`, data);
    return response.data.data;
  }

  async getUrls(): Promise<Url[]> {
    const response = await axios.get<ApiResponse<Url[]>>(`${this.baseURL}/urls`);
    return response.data.data;
  }

  async getUrlStats(shortCode: string): Promise<Url> {
    const response = await axios.get<ApiResponse<Url>>(`${this.baseURL}/urls/${shortCode}/stats`);
    return response.data.data;
  }

  async redirectUrl(shortCode: string): Promise<{ originalUrl: string; clicks: number }> {
    const response = await axios.get<ApiResponse<{ originalUrl: string; clicks: number }>>(`${this.baseURL}/urls/${shortCode}`);
    return response.data.data;
  }
}

export const apiService = new ApiService();