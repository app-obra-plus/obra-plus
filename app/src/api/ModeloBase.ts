import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.1.85:3000';

export interface SpringResponseView<T> {
  data: T;
  status: number;
}

export class ModeloBase<Resource, Create extends object, Update extends object> {
  apiURL: string;
  modulePath: string;

  constructor(path: string, apiURL: string = API_URL) {
    this.modulePath = path;
    this.apiURL = apiURL;
  }

  private async getAuthHeaders() {
    const token = await AsyncStorage.getItem('token');
    return {
      Authorization: token || '',
    };
  }

  async defaultPostRequest<T>(path: string, data?: Object): Promise<AxiosResponse<T>> {
    const headers = await this.getAuthHeaders();
    const response = await axios.post<T>(
      this.apiURL + this.modulePath + path,
      data,
      { headers }
    );
    return response;
  }

  async defaultGetRequest<T>(path: string, params?: Object): Promise<AxiosResponse<T>> {
    const headers = await this.getAuthHeaders();
    const response = await axios.get<T>(
      this.apiURL + this.modulePath + path,
      {
        headers,
        params,
      },
    );
    return response;
  }

  async defaultPutRequest<T>(path: string, data?: Object): Promise<AxiosResponse<T>> {
    const headers = await this.getAuthHeaders();
    const response = await axios.put<T>(
      this.apiURL + this.modulePath + path,
      data,
      { headers }
    );
    return response;
  }

  async defaultDeleteRequest<T>(path: string): Promise<AxiosResponse<T>> {
    const headers = await this.getAuthHeaders();
    const response = await axios.delete<T>(
      this.apiURL + this.modulePath + path,
      { headers }
    );
    return response;
  }

  
  async create(data: Create) {
    return this.defaultPostRequest<Resource>("/", data);
  }

  async getById(id: number) {
    return this.defaultGetRequest<Resource>(`/${id}`);
  }

  async getAll() {
    return this.defaultGetRequest<Resource[]>(`/`);
  }

  async delete(id: number) {
    return this.defaultDeleteRequest<Resource>(`/${id}`);
  }

  async update(id: number, data: Update) {
    return this.defaultPutRequest<Resource>(`/${id}`, data);
  }
}

export interface ISpringResponse<T> {
  data: T;
  status: number;
}
