import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { PropertyType } from '../entities/propertyType.entity';
import { User } from '../entities/user.entity';
import { Property } from '../entities/property.entity';
import { faker } from '@faker-js/faker';
import { PropertyFeature } from '../entities/propertyFeature.entity';

export class MainSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
    
  ): Promise<any> {
    const typeRepo = dataSource.getRepository(PropertyType);
    const propertyTypes = await typeRepo.save([
      { value: 'Condo' },
      { value: 'Apartment' },
    ]);

    const userFactory = factoryManager.get(User);

    console.log('seeding users....');
    const users = await userFactory.saveMany(10);

    const PropertyFactory = factoryManager.get(Property);
    const PropertyFeatureFactory = factoryManager.get(PropertyFeature);

    console.log('seeding users....');

    const properties = await Promise.all(
      Array(50)
        .fill('')
        .map(async () => {
          const property = await PropertyFactory.make({
            user: faker.helpers.arrayElement(users),
            type: faker.helpers.arrayElement(propertyTypes),
            PropertyFeature: await PropertyFeatureFactory.save(),
          });
          return property;
        }),
    );
    const propertyRepo = dataSource.getRepository(Property);
    await propertyRepo.save(properties);
  }
}
