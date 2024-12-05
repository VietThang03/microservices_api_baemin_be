import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthApiDto } from './create-auth-api.dto';

export class UpdateAuthApiDto extends PartialType(CreateAuthApiDto) {}
