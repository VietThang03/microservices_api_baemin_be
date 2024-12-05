
export interface User{
    sub: string
    iss: string
    id: number
    username: string
    email: string  
    iat: number
    exp: number
}
export interface QueryDataUser{
    page: number
    limit: number
    name: string
}