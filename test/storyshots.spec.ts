import initStoryshots from '@trigen/scripts-plugin-storybook/jest/storyshots';

if (process.platform === 'linux') {
	initStoryshots();
} else {
	it('skip storyshots', () => {});
}
