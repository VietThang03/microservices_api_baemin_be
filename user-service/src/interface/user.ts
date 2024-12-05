import { UpdateUserDto } from "src/user/dto/update-user.dto"

export interface User{
    id: number
    username: string
    email: string  
}

export interface UpdateUser{
    id: number
    updateUserApiDto: UpdateUserDto
}

export interface QueryDataUser{
    page: number
    limit: number
    name: string
}

export interface UserLogin{
    username: string
    password: string
}