import axios, { AxiosError } from "axios";
import { ModeloBase, PaginatedResponse, SpringResponseView } from "../ModeloBase";
import { CreateAdvertisementDto, ResponseAdvertisementDto, ResponseAdvertisementGridDto, UpdateAdvertisementDto } from "./addvertisementSch";

function createFormData(uris: string[], fieldName = "files") {
  const formData = new FormData();

  uris.forEach((uri, index) => {
    formData.append(fieldName, {
      uri,
      name: `image_${index}.jpg`,
      type: "image/jpeg",
    } as any);
  });

  return formData;
}

class AdvertisementModel extends ModeloBase<ResponseAdvertisementDto, CreateAdvertisementDto, UpdateAdvertisementDto> {
  constructor() {
    super("/advertisements");
  }

  async uploadImages(advertisementId: string, uris: string[]) {
    const formData = new FormData();

    uris.forEach((uri, index) => {
      const filename = uri.split("/").pop() || `image${index}.jpg`;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : "image/jpeg";

      formData.append("images", {
        uri,
        name: filename,
        type,
      } as any);
    });

    console.log("Iniciou");
    const response = await this.defaultPostRequest(`/${advertisementId}/images/`, formData, {
      'Content-Type': 'multipart/form-data',
    }).finally(() => { console.log("Finalizou") });
  }

  async listByUserId(page: number, limit: number, userId: string) {
    const response = this.defaultGetRequest<PaginatedResponse<ResponseAdvertisementDto>>(`/user/${userId}`, {
      page,
      limit,
      order: 'desc'
    });
    return response;
  }

  async grid(params: {minLatitude: number, maxLatitude: number, minLongitude: number, maxLongitude: number, resolution: number}) {
    const response = this.defaultGetRequest<ResponseAdvertisementGridDto[]>('/grid', params);
    return response;
  }

  async getAllPaginated(page: number, limit: number, categoryId?: string, priceMax?: number) {
    const response = this.defaultGetRequest<PaginatedResponse<ResponseAdvertisementDto>>('/', {
      page,
      limit,
      order: 'desc',
      categoryId,
      priceMax
    });
    return response;
  }
}

export const advertisementMdl = new AdvertisementModel()