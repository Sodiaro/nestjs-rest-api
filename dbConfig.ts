// import { PostgresConnectionCredentialsOptions } from "typeorm/driver/postgres/PostgresConnectionCredentialsOptions.js";
import { DataSourceOptions } from 'typeorm';
// import { Property } from 'src/entities/property.entities'

export const pgConfig:DataSourceOptions  = {
    url: 'postgresql://neondb_owner:npg_O2cTzjKu6Rtx@ep-hidden-sea-adm6yelt-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require',
    type: 'postgres',
    port: 5432,
    // entities: [Property],
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,

}