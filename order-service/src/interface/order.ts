import { UpdateOrderDto } from "src/order/dto/update-order.dto"
import { User } from "./user"
import { CreateOrderDto } from "src/order/dto/create-order.dto"

export interface DataUpdateOrder{
    id: string
    updateOrderApiDto: UpdateOrderDto
}

export interface OrderQueryData{
    page: string
    limit: string
    user: User
}

export interface CreateOrder{
    user: User
    createOrderApiDto: CreateOrderDto
}