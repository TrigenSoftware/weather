import faker from 'faker';

export function getFakeData() {
	return {
		List: [
			faker.lorem.words(),
			faker.lorem.words(),
			faker.lorem.words()
		]
	};
}
