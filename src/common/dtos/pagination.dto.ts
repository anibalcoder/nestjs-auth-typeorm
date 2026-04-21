import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    default: 10,
    description: 'Número máximo de elementos que serán devueltos',
  })
  @IsNumber()
  @IsPositive()
  @IsOptional()
  limit?: number;

  @ApiProperty({
    default: 0,
    description: 'Cuántos registros deben omitirse desde el inicio',
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  offset?: number;
}
