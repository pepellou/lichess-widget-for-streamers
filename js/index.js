onPageLoad(() => {

	getById('run').onClick(() => {
		log('Running widget', emoji.flame);
	});

	log('Setting lichess widget streamer up!');

});
