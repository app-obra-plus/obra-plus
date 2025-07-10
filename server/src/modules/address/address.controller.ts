import { Request, Response} from "express";
import { AddressService } from './address.service';
import { validateSchema } from "../../utils/validateRequest";
import { CreateAddressSchema } from "./dto/CreateAddressDto";


const addressService = new AddressService;

export async function createAddress(req: Request, res:Response){

    const addressData = validateSchema(CreateAddressSchema, req.body);
    const userId = (req as any).auth.userId;
    const addressDb = await addressService.createAddress(addressData, userId);
    return res.status(201).json(addressDb);
}

