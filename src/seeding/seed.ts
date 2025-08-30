import { DataSource, DataSourceOptions } from "typeorm";
import { pgConfig } from "../../dbConfig";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { PropertyFactory } from "./property.factory";
import { PropertyFeatureFactory } from "./propertyFeature.factory";
import { UserFactory } from "./user.factory";
import { MainSeeder } from "./main.seeder";




const options : DataSourceOptions & SeederOptions = {
    ...pgConfig,
    factories:[PropertyFactory, UserFactory, PropertyFeatureFactory],
    seeds:[MainSeeder],
};

const dataSource = new DataSource(options);
dataSource.initialize().then(async () =>{
    await dataSource.synchronize(true);
    await runSeeders(dataSource);
    process.exit();
})