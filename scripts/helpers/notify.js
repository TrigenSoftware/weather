import notifier from 'node-notifier';

export function notify(message) {
	notifier.notify({
		message,
		sound: 'Glass'
	});
}

export function notifyError(error) {
	notifier.notify({
		message: `Error: ${error.message}`,
		sound:   'Frog'
	});
}
