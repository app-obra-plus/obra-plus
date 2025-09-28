import { ModeloBase, PaginatedResponse } from "../ModeloBase";
import { CreateAdvertisementDto, IAdvertisementPaginationFilter, IUserAdvertisementsParams, ResponseAdvertisementDto, ResponseAdvertisementGridDto, UpdateAdvertisementDto } from "./advertisementSch";

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

  async listByUserId(page: number, limit: number, filter: IUserAdvertisementsParams) {
    const response = this.defaultGetRequest<PaginatedResponse<ResponseAdvertisementDto>>(`/user/${filter.userId}`, {
      page,
      limit,
      order: 'desc',
      ...{ ...filter, userId: undefined }
    });
    return response;
  }

  async grid(params: {minLatitude: number, maxLatitude: number, minLongitude: number, maxLongitude: number, resolution: number}) {
    const response = this.defaultGetRequest<ResponseAdvertisementGridDto[]>('/grid', params);
    return response;
  }
  

  async getAllPaginated(page: number, limit: number, filter: IAdvertisementPaginationFilter) {
    const response = this.defaultGetRequest<PaginatedResponse<ResponseAdvertisementDto>>('/', {
      page,
      limit,
      order: 'desc',
      ...filter
    });
    return response;
  }
}

export const advertisementMdl = new AdvertisementModel()