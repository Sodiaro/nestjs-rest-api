import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';
import * as path from "path";
import { registerAs } from '@nestjs/config';

export default registerAs("dbConfig", (): PostgresConnectionOptions => ({
  url: process.env.url,
  type: 'postgres',
  port: Number(process.env.PORT),
  entities: [path.resolve(__dirname,"..") + '/**/*.entity{.ts,.js}'],
  synchronize: true,
}));

