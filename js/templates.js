const user = {
	"id":"pepellou",
	"username":"pepellou",
	"perfs":{
		"chess960":{
			"games":5288,
			"rating":2012,
			"rd":45,
			"prog":0
		},
		"antichess":{
			"games":939,
			"rating":1731,
			"rd":63,
			"prog":-18
		},
		"atomic":{
			"games":347,
			"rating":1717,
			"rd":94,
			"prog":33
		},
		"racingKings":{
			"games":479,
			"rating":1910,
			"rd":94,
			"prog":-1
		},
		"racer":{
			"runs":8,
			"score":60
		},
		"ultraBullet":{
			"games":878,
			"rating":1841,
			"rd":110,
			"prog":52,
			"prov":true
		},
		"blitz":{
			"games":16634,
			"rating":2212,
			"rd":45,
			"prog":-4
		},
		"kingOfTheHill":{
			"games":372,
			"rating":2016,
			"rd":107,
			"prog":122
		},
		"crazyhouse":{
			"games":14440,
			"rating":2267,
			"rd":45,
			"prog":0
		},
		"threeCheck":{
			"games":674,
			"rating":1970,
			"rd":105,
			"prog":-48
		},
		"streak":{
			"runs":7,
			"score":62
		},
		"storm":{
			"runs":176,
			"score":61
		},
		"bullet":{
			"games":27702,
			"rating":2276,
			"rd":45,
			"prog":11
		},
		"correspondence":{
			"games":1,
			"rating":1630,
			"rd":325,
			"prog":0,
			"prov":true
		},
		"horde":{
			"games":988,
			"rating":1936,
			"rd":78,
			"prog":6
		},
		"puzzle":{
			"games":4560,
			"rating":2451,
			"rd":92,
			"prog":0
		},
		"classical":{
			"games":375,
			"rating":2375,
			"rd":67,
			"prog":24
		},
		"rapid":{
			"games":4982,
			"rating":2233,
			"rd":45,
			"prog":-27
		}
	},
	"patron":true,
	"createdAt":1440287200063,
	"online":true,
	"profile":{
		"country":"US",
		"location":"Eagan, MN",
		"bio":"https://imgur.com/X4UD3PC",
		"firstName":"Pepe",
		"lastName":"Doval",
		"fideRating":2072,
		"links":"https://eaganchess.com/\r\nhttp://www.twitch.tv/pepellou\r\nhttps://twitter.com/pepellou\r\nhttps://github.com/pepellou"
	},
	"seenAt":1663026721924,
	"playTime":{
		"total":18377734,
										"tv":1210616
	},
	"url":"https://lichess.org/@/pepellou",
	"count":{
		"all":80094,
		"rated":74118,
		"ai":222,
		"draw":2225,
		"drawH":2194,
		"loss":13868,
		"lossH":13832,
		"win":64001,
		"winH":63846,
		"bookmark":7607,
		"playing":0,
		"import":66,
		"me":0
	},
	"followable":true,
	"following":false,
	"blocking":false,
	"followsYou":false
};

const inSet = (e, s) => s.indexOf(e) >= 0;

const knownVariants = [
	'chess960',
	'crazyhouse',
	'antichess',
	'racingKings',
	'atomic',
	'ultraBullet',
	'blitz',
	'rapid',
	'kingOfTheHill',
	'threeCheck',
	'bullet',
	'correspondence',
	'horde',
	'classical',
];

const filterKeys = (o, f) => {
	let filtered = {};
	for (key in o) {
		if (f(key)) {
			filtered[key] = o[key];
		}
	}
	return filtered;
};

const sortKeys = (o, s) => {
	let sorted = {};
	let keys = [];
	for (key in o) {
		keys.push(key);
	}
	keys.sort(s);
	for (i in keys) {
		const key = keys[i];
		sorted[key] = o[key];
	}
	return sorted;
};

let perfs = user.perfs;

/*********************/

onPageLoad(() => {

	const templates = [...getById('templates').element.children]
		.map(t => t.id)
		.filter(id => /^template_/.test(id))
		.map(id => id.replace(/^template_/g, ''))
		.map(id => ({
			id: id,
			template: getById(`template_${id}`).content().replace('&gt;', '>')
		}));

	templates.forEach(o => {
		Handlebars.registerPartial(
			o.id,
			o.template
		);
	});

	Handlebars.registerPartial(
		"perf",
		getById('template_perf').content()
	);

	const sortByGamesAsc = (a, b) => perfs[a].games - perfs[b].games;
	const sortByGamesDesc = (a, b) => perfs[b].games - perfs[a].games;
	const sortByRatingAsc = (a, b) => perfs[a].rating - perfs[b].rating;
	const sortByRatingDesc = (a, b) => perfs[b].rating - perfs[a].rating;

	perfs = filterKeys(perfs, ((key) => inSet(key, knownVariants)));
	perfs = sortKeys(perfs, sortByRatingDesc);


	user.perfs = perfs;
	user.flag = `img/flags/${user.profile.country}.png`;

	var templateProfile = Handlebars.compile(getById('template_profile').content().replace('&gt;', '>'));

	const profile = getById('profile');
	profile.content(templateProfile({ user: user }));
});
