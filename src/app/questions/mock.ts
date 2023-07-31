import { faker } from '@faker-js/faker';

function generateCommenter() {
    return {
        id: faker.datatype.number(),
        name: faker.person.fullName(),
        imageUrl: faker.image.avatar(),
    };
}

function generateData() {
    return {
        reward: faker.datatype.float({ min: 0, max: 1, precision: 0.01 }),
        id: faker.datatype.number(),
        title: faker.lorem.sentence(),
        href: '#',
        author: { 
            name: faker.person.fullName(),
            href: '#' 
        },
        date: `${faker.datatype.number({ min: 1, max: 10 })}d ago`,
        dateTime: faker.date.past().toISOString(),
        status: faker.helpers.arrayElement(['resolved', 'unresolved']),
        totalComments: faker.datatype.number({ min: 1, max: 20 }),
        commenters: Array.from({ length: faker.datatype.number({ min: 1, max: 10 }) }, generateCommenter),
    };
}

export const discussions = Array.from(({length: 10}), generateData)
