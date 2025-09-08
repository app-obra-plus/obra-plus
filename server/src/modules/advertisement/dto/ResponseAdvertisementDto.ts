import { AdvertisementStatus } from "../../../generated/prisma";

export interface ResponseAdvertisementDto {
    id: string
    title: string;
    description: string;
    price: number;
    status: AdvertisementStatus;
    isDonation: boolean;
    user_id: string;
    category_id: string;
    advertisementAddressId: string;
}
