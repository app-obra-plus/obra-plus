import axios, { AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://10.0.0.190:3000';

export interface SpringResponseView<T> {
  data: T;
  status: number;
}

export class ModeloBase {
  apiURL: string;
  modulePath: string;

  constructor(path: string) {
    this.modulePath = path;
    this.apiURL = API_URL;
  }

  private async getAuthHeaders() {
    const token = await AsyncStorage.getItem('token');
    return {
      Authorization: token || '',
    };
  }

  async defaultPostRequest<T>(path: string, data?: Object): Promise<AxiosResponse<T>> {
    const headers = await this.getAuthHeaders();
    console.log(this.apiURL + this.modulePath + path)
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
      }
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
}

export interface ISpringResponse<T> {
  data: T;
  status: number;
}
