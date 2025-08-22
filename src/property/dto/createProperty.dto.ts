import { IsString, IsInt, Length, IsPositive } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  @Length(3, 20, { message: 'error on length' })
  name: string;

  @IsString()
  @Length(2, 100, { groups: ['create'] })
  @Length(2, 100, { groups: ['update'] })
  description: string;

  @IsInt()
  @IsPositive()
  price: number;
}
