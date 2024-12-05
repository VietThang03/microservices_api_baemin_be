import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService {
  constructor(
    private prismaCient: PrismaService
  ){

  }
  async getProduct() {
    return await this.prismaCient.foods.findMany();
  }
}
