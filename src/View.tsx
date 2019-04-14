import * as React from "react";

export interface OrderDetail {
  id: number;
  seller_id: number;
  seller_info: {
    email: string;
    nickname: string;
    phone: string;
    address: string;
  };
  buyer_id: number;
  buyer_info: {
    email: string;
    nickname: string;
    phone: string;
    address: string;
  };
  status: number;
  time: string;
  total_price: number;
  address: string;
  phone: string;
  products: {
    product: {
      id: number;
      name: string;
      unit: string;
      category_id: string;
      img: string;
    };
    count: number;
    price: number;
  }[];
  delivery_info: {
    id: number;
    orderId: number;
    time: string;
    info: string;
    status: number;
  }[];
}

export interface Product {
  id: number;
  name: string;
  unit: string;
  category_id: number;
  img: string;
}

export interface UserInfo {
  id: number;
  email: string;
  address: string;
  nickname: string;
  phone: string;
}
