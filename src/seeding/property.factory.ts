import { setSeederFactory } from 'typeorm-extension';
import { Faker } from '@faker-js/faker';
// import { User } from 'src/entities/user.entity';
import { Property } from '../entities/property.entity';

export const PropertyFactory = setSeederFactory(Property, (faker) => {
  const property = new Property();

  property.name = faker.location.street();
  property.price = +faker.commerce.price({min:1000, max: 10000000});
  property.description = faker.lorem.sentence();

  return property;
});
