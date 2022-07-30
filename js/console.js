const emoji = {
	rocket: String.fromCodePoint(0x1F680),
	memo: String.fromCodePoint(0x1F4DD),
	flame: String.fromCodePoint(0X1F525),
	art: String.fromCodePoint(0x1F3A8),
};

const styleLog = [
	'color: #999',
	'background-color: rgb(22, 21, 18)',
	'font-size: 1.2em',
	'font-family: sans-serif',
].join(';');

const log = function(msg, emote = emoji.rocket) {
	console.log(`%c${emote} ${msg}`, styleLog);
}
