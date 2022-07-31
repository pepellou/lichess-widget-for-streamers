onPageLoad(() => {

	log('Setting lichess widget streamer up!');

	getById('login').onClick(() => {
		auth.login();
	});

});
