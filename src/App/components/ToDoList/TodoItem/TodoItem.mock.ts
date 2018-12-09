import faker from 'faker';

export function getFakeData() {
	return {
		name: faker.lorem.words()
	};
}
