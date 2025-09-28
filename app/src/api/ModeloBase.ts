import { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { signOut } from '../stores/useAuthStore';
import api from './api';

const API_URL = 'http://192.168.0.6:3000';
export interface SpringResponseView<T> {
  data: T;
  status: number;
}

export interface IPageableRequest {
  page?: number;
  limit?: number;
  order?: 'ASC' | 'DESC';
}

export interface IPageableResponse {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: IPageableResponse;
}

export class ModeloBase<
  Resource = unknown, 
  Create = unknown, 
  Update = unknown
> {
  apiURL: string;
  modulePath: string;

  constructor(path: string, apiURL: string = API_URL) {
    this.modulePath = path;
    this.apiURL = apiURL;
  }

  private async getAuthHeaders() {
    const token = await AsyncStorage.getItem('token');
    const bearerToken = token ? `Bearer ${token}` : '';
    return {
      Authorization: bearerToken,
    };
  }

  private async verifyResponse(response: AxiosResponse<any>) {
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    }
    if(response.status === 401) {
      signOut()
    }
  }

  async defaultPostRequest<T>(path: string, data?: Object, headers?: Record<string, string>): Promise<AxiosResponse<T>> {
    const authHeaders = await this.getAuthHeaders();
    const response = await api.post<T>(
      this.apiURL + this.modulePath + path,
      data,
      { headers: { ...authHeaders, ...headers } }
    );
    this.verifyResponse(response);
    return response;
  }

  async defaultGetRequest<T>(path: string, params?: Record<string, any>): Promise<AxiosResponse<T>> {
    console.log("params", params)

    const headers = await this.getAuthHeaders();
    const response = await api.get<T>(
      this.apiURL + this.modulePath + path,
      {
        headers,
        params,
      },
    );
    this.verifyResponse(response);
    return response;
  }

  async defaultPutRequest<T>(path: string, data?: Object): Promise<AxiosResponse<T>> {
    const headers = await this.getAuthHeaders();
    const response = await api.put<T>(
      this.apiURL + this.modulePath + path,
      data,
      { headers }
    );
    this.verifyResponse(response);
    return response;
  }

  async defaultDeleteRequest<T>(path: string): Promise<AxiosResponse<T>> {
    const headers = await this.getAuthHeaders();
    const response = await api.delete<T>(
      this.apiURL + this.modulePath + path,
      { headers }
    );
    this.verifyResponse(response);
    return response;
  }

  
  async create(data: Create) {
    return this.defaultPostRequest<Resource>("/", data as Object);
  }

  async getById(id: string) {
    return this.defaultGetRequest<Resource>(`/${id}`);
  }

  async getAll() {
    return this.defaultGetRequest<Resource[]>(`/`);
  }

  async delete(id: string) {
    return this.defaultDeleteRequest<Resource>(`/${id}`);
  }

  async update(id: string, data: Update) {
    return this.defaultPutRequest<Resource>(`/${id}`, data as Object);
  }
}

export interface ISpringResponse<T> {
  data: T;
  status: number;
}
