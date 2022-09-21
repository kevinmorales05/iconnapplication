import { ImageSourcePropType } from "react-native";

export interface ProductInterface {
    ratingValue: number;
    price: number;
    name: string;
    image: ImageSourcePropType;
    quantity: number;
    productId: string;
    oldPrice?: number;
    porcentDiscount?: number;
}