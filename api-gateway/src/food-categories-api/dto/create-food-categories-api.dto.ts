import { IsNotEmpty } from "class-validator"

export class CreateFoodCategoriesApiDto {
    @IsNotEmpty({
        message: "Name không được để trống!!!"
    })
    name: string

    description?: string
}