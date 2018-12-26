import faker from 'faker';

export function getFakeData() {
	return {
		value: faker.lorem.words()
	};
}
