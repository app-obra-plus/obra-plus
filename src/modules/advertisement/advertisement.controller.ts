import { validateSchema } from "../../utils/validateRequest";
import { AdvertisementService } from "./service/advertisement.service";
import { CreateAdvertisementSchema } from "./dto/CreateAdvertisementDto";
import { Request, Response } from "express";
import { UpdateAdvertisementSchema } from "./dto/UpdateAdvertisementDto";
import { AdvertisementMapQuerySchema } from "./dto/AdvertisementMapQueryDto";
import {
  parseAdvertisementPaginationParams
} from "../../utils/pagination/pagination";
import { ImageService } from "../../infra/blob/image.service";
import { MulterRequest } from "../../types/multer.types";
import { AdvertisementImageService } from "./service/advertisementImage.service";
import { AdvertisementGridService } from "./service/advertisementGrid.service";
import { AdvertisementPaginationQuerySchema } from '../../utils/pagination/pagination.schema';
import { AdvertisementsBatchRequestSchema } from "./dto/AdvertisementsBatchRequestDto";

const advertisementService = new AdvertisementService();
const imageServer = new ImageService();
const advertisementImageService = new AdvertisementImageService();
const advertisementGridService = new AdvertisementGridService();

export async function createAdvertisement(req: Request, res: Response) {
  const advertisementData = validateSchema(CreateAdvertisementSchema, req.body);
  const userId = (req as any).auth.userId;
  const advertisementDb = await advertisementService.createAdvertisement(
    advertisementData,
    userId
  );
  return res.status(201).json(advertisementDb);
}

export async function getAdvertisementById(req: Request, res: Response) {
  const { id } = req.params;
  const advertisementDb = await advertisementService.getAdvertisementbyId(id);
  return res.status(200).json(advertisementDb);
}

export async function updateAdvertisement(req: Request, res: Response) {
  const { id } = req.params;
  const advertisementData = validateSchema(UpdateAdvertisementSchema, req.body);
  const advertisementDb = await advertisementService.updateAdvertisement(
    id,
    advertisementData
  );
  return res.status(200).json(advertisementDb);
}

export async function getAdvertisementGridFilter(req: Request, res: Response) {
  const dto = AdvertisementMapQuerySchema.parse({
    resolution: req.query.resolution,
    boundingBox: {
      minLatitude: req.query.minLatitude,
      maxLatitude: req.query.maxLatitude,
      minLongitude: req.query.minLongitude,
      maxLongitude: req.query.maxLongitude,
    },
    filter: {
      categoryId: req.query.categoryId ?? undefined,
      priceMax: req.query.priceMax ?? undefined,
    },
  });

  const grids = await advertisementGridService.getAdvertisementGridFilter(dto);
  return res.status(200).json(grids);
}

export async function getAdvertisementsPage(req: Request, res: Response) {
  const parsed = AdvertisementPaginationQuerySchema.parse(req.query);
  const params = parseAdvertisementPaginationParams(parsed);
  const advertisements = await advertisementService.getAdvertisementsPage(
    params
  );
  return res.status(200).json(advertisements);
}

export async function deleteAdvertisement(req: Request, res: Response){

  const {id} = req.params;
  const userId = (req as any).auth.userId;
  await advertisementService.deleteAdvertisement(id, userId);

  return res.status(204).send();
}

export async function uploadAdvertisementsImage(req: Request, res: Response) {
  const { id } = req.params;
  const files = (req as MulterRequest).files as Express.Multer.File[];

  const uploadedImages = await Promise.all(
    files.map(async (file) => {
      const image = await imageServer.upload(file);
      return image;
    })
  );

  const savedImages = await advertisementImageService.saveMultipleImages(
    id,
    uploadedImages
  );
  return res.status(200).json(savedImages);
}

export async function deleteAdvertisementsImage(req: Request, res: Response) {
  const { id } = req.params;
  await advertisementImageService.deleteImageById(id);
  return res.status(204).send();
}

export async function getUserAdvertisements(req: Request, res: Response){

  const { userId } = req.params;
  const parsed = AdvertisementPaginationQuerySchema.parse(req.query);
  const params = parseAdvertisementPaginationParams(parsed);
  const advertisements = await advertisementService.getUserAdvertisements(userId,params);

  return res.status(200).json(advertisements);
}

export async function getAdvertisementsByIds(req: Request, res: Response) {
  
  const { ids } = AdvertisementsBatchRequestSchema.parse(req.body);
  const parsed = AdvertisementPaginationQuerySchema.parse(req.query);
  const params = parseAdvertisementPaginationParams(parsed);
  const advertisements = await advertisementService.getByIds(ids,params);

  return res.json(advertisements);
}
