import faker from 'faker';

export function getFakeData() {
	return {
		items: [
			{
				id: faker.random.uuid(),
				text: faker.random.words()
			},
			{
				id: faker.random.uuid(),
				text: faker.random.words()
			},
			{
				id: faker.random.uuid(),
				text: faker.random.words()
			},
			{
				id: faker.random.uuid(),
				text: faker.random.words()
			}
		]
	};
}
