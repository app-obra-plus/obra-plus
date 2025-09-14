import { Request, Response } from "express";
import { AddressService } from "./address.service";
import { validateSchema } from "../../utils/validateRequest";
import { CreateAddressSchema } from "./dto/CreateAddressDto";
import {getPaginationParams} from "../../utils/pagination/pagination";
import { PaginationQueryBase } from '../../utils/pagination/pagination.types';

const addressService = new AddressService();

export async function createAddress(req: Request, res: Response) {
  const addressData = validateSchema(CreateAddressSchema, req.body);
  const userId = (req as any).auth.userId;
  const addressDb = await addressService.createAddress(addressData, userId);
  return res.status(201).json(addressDb);
}

export async function getAddress(req: Request, res: Response) {
  const { addressId } = req.params;
  const address = await addressService.getAddressById(addressId);
  return res.status(200).json(address);
}

export async function getAllAddress(req: Request, res: Response) {
  const { userId } = req.params;
  const query: PaginationQueryBase = req.query;
  const params = getPaginationParams(query);

  const address = await addressService.getAllAddresses(userId, params);
  return res.status(200).json(address);
}

export async function updateAddress(req: Request, res: Response) {
  const { addressId } = req.params;
  const address = req.body;
  const addressUpdated = await addressService.updateAddress(addressId, address);
  return res.status(200).json(addressUpdated);
}

export async function deleteAddress(req: Request, res: Response) {
  const { addressId } = req.params;
  addressService.deleteAddress(addressId);
  return res.status(204).send();
}
