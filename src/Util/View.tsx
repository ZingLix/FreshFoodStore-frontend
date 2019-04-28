import * as React from "react";

export interface OrderDetail {
  id: number;
  seller_id: number;
  seller_info: UserInfo;
  buyer_id: number;
  buyer_info: UserInfo;
  status: number;
  time: string;
  total_price: number;
  address: string;
  phone: string;
  realname: string;
  products: {
    product: Product;
    count: number;
    price: number;
  }[];
  delivery_info: DeliveryInfo[];
}

export interface Product {
  id: number;
  name: string;
  unit: string;
  category_id: number;
  img: string;
}

export interface DeliveryInfo {
  id: number;
  orderId: number;
  time: string;
  info: string;
  status: number;
}

export interface UserInfo {
  id: number;
  email: string;
  address: string;
  nickname: string;
  realname:string;
  phone: string;
}

export interface InventoryItem {
  id: number;
  sellerId: number;
  productId: number;
  count: number;
  price: number;
  time: string;
}