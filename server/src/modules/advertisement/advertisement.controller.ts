import { validateSchema } from '../../utils/validateRequest';
import { AdvertisementService } from './advertisement.service';
import { CreateAdvertisementSchema } from './dto/CreateAdvertisementDto';
import { Request, Response } from 'express';
import { UpdateAdvertisementSchema } from './dto/UpdateAdvertisementDto';
import { AdvertisementMapQuerySchema } from './dto/AdvertisementMapQueryDto';


 const advertisementService = new AdvertisementService;

 export async function createAdvertisement(req : Request, res: Response){

   const advertisementData = validateSchema(CreateAdvertisementSchema, req.body);
   const userId = (req as any).auth.userId;
   const advertisementDb = await advertisementService.createAdvertisement(advertisementData, userId);
   return res.status(201).json(advertisementDb);
 }

export async function getAdvertisementById(req : Request, res: Response){

   const {id} = req.params;
   const advertisementDb = await advertisementService.getAdvertisementbyId(id);
   return res.status(200).json(advertisementDb);
}

export async function updateAdvertisement(req : Request, res: Response){

  const {id} = req.params;
  const advertisementData = validateSchema(UpdateAdvertisementSchema, req.body);
  const advertisementDb = await advertisementService.updateAdvertisement(id, advertisementData);
  return res.status(200).json(advertisementDb);
}


export async function getAdvertisementGridFilter(req : Request, res: Response){
  
    const dto = AdvertisementMapQuerySchema.parse({
      resolution: req.query.resolution,
      boundingBox: {
        minLatitude: req.query.minLatitude,
        maxLatitude: req.query.maxLatitude,
        minLongitude: req.query.minLongitude,
        maxLongitude: req.query.maxLongitude,
      },
      filter: {
        categoryId: req.query. categoryId ?? undefined,
        priceMax: req.query. priceMax ?? undefined,
      },
    });

  const grids = await advertisementService.getAdvertisementGridFilter(dto);
  return res.status(200).json(grids);
}

