import initStoryshots, {
	getMatchOptions
} from '@trigen/scripts-plugin-storybook/jest/storyshots';

initStoryshots({
	getMatchOptions(info) {

		const options = getMatchOptions(info);
		const failureThreshold = 0.03;

		return {
			failureThresholdType: 'percent',
			failureThreshold,
			...options
		};
	}
});
