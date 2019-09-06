import {
	configure
} from '@trigen/scripts-preset-react-app/storybook/config';
import '@flexis/ui/reboot.st.css';

const stories = require.context(
	process.env.PROJECT_SRC,
	true,
	/\.stories\.tsx$/
);

configure(module, stories);
