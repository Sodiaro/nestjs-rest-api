import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions.js';
import * as path from "path";

export default (): PostgresConnectionOptions => ({
  url: process.env.url,
  type: 'postgres',
  port: Number(process.env.PORT),
  entities: [path.resolve(__dirname,"..") + '/**/*.entity{.ts,.js}'],

  synchronize: false,
});

