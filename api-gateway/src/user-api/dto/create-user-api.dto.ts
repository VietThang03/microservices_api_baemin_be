import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserApiDto {
    @IsEmail()
    @IsNotEmpty({
        message:"Email không được để trống!!!"
    })
    email: string;
  
   
    @MinLength(6)
    @MaxLength(50)
    @IsNotEmpty({
        message:"Password không được để trống!!!"
    })
    password: string;
  
    @IsString()
    @IsNotEmpty({
        message: "Name không được để trống!!!"
    })
    username: string;
}

