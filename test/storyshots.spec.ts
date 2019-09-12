import initStoryshots from '@trigen/scripts-plugin-storybook/jest/storyshots';

if (process.platform === 'linux') {

	process.env.SEED = JSON.stringify(584);
	process.env.DISABLE_BROWSER_SYNC = JSON.stringify(true);
	jest.setTimeout(60000);

	initStoryshots();

} else {
	it('should skip storyshots', () => {});
}
