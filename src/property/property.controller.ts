import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Body,
  HttpCode,
  ParseIntPipe,
  Query,
  ParseBoolPipe,
  UsePipes,
  ValidationPipe,
  Delete,
} from '@nestjs/common';
import { create } from 'domain';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { IdParamDto } from './dto/idParam.dto';
import { ParseIdPipe } from './pipes/parseIdpipes';
import { z } from "zod";
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { createPropertySchema } from './dto/createPropertyZod.dto';
import type { CreatePropertyZodDto } from './dto/createPropertyZod.dto';
import { Headers } from '@nestjs/common';
import {PropertyService} from './property.service'
import { UpdatePropertyDto } from './dto/updateProperty.dto';




@Controller('property')
export class PropertyController {
  constructor(private propertyService: PropertyService) {
    // Don't create your dependency, instead use DI in NestJs
    // this.propertyService = new PropertyService();

  }
  @Get()
  findAll() {
   return this.propertyService.findAll()
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.propertyService.findOne(id)
  }

  @Post()
  // @UsePipes(new ZodValidationPipe(createPropertySchema))
  create(
    @Body() dto: CreatePropertyZodDto,
  ) {
    return this.propertyService.create(dto);
  }

  @Patch(':id')
  update(@Param('id', ParseIdPipe) id, 
  @Body() 
  body: UpdatePropertyDto,
  @Headers('host') header,
) {
    return this.propertyService.update(id, body);
  }

  @Delete(":id")
  delete(@Param("id", ParseIdPipe) id){
    return this.propertyService.delete(id);
  }
}
