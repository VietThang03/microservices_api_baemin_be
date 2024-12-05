import { Injectable } from '@nestjs/common';
import { CreateAuthApiDto } from './dto/create-auth-api.dto';
import { UpdateAuthApiDto } from './dto/update-auth-api.dto';

@Injectable()
export class AuthApiService {
  create(createAuthApiDto: CreateAuthApiDto) {
    return 'This action adds a new authApi';
  }

  findAll() {
    return `This action returns all authApi`;
  }

  findOne(id: number) {
    return `This action returns a #${id} authApi`;
  }

  update(id: number, updateAuthApiDto: UpdateAuthApiDto) {
    return `This action updates a #${id} authApi`;
  }

  remove(id: number) {
    return `This action removes a #${id} authApi`;
  }
}
