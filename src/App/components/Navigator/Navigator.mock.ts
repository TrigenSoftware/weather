import faker from 'faker';

export function getFakeData() {
	return {
		pass: '/',
		name: faker.lorem.words()
	};
}
