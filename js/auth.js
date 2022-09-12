const { OAuth2AuthCodePKCE } = window.OAuth2AuthCodePKCE;

const oauth = new OAuth2AuthCodePKCE({
	authorizationUrl: 'https://lichess.org/oauth',
	tokenUrl: 'https://lichess.org/api/token',
	clientId: 'lichess-widget-for-streamers',
	scopes: [
		'email:read',
		'preference:read',
		'team:read',
		//'follow:read',  // to get the list of users I follow
		//'board:play',   // to share the chat of the current game
		'challenge:read',
	],
	redirectUrl: 'https://pepellou.github.io/lichess-widget-for-streamers/index',
	onAccessTokenExpiry(refreshAccessToken) {
		console.log("Expired! Access token needs to be renewed.");
		alert("We will try to get a new access token via grant code or refresh token.");
		return refreshAccessToken();
	},
	onInvalidGrant(refreshAuthCodeOrRefreshToken) {
		console.log("Expired! Auth code or refresh token needs to be renewed.");
		alert("Redirecting to auth server to obtain a new auth grant code.");
		return refreshAuthCodeOrRefreshToken();
	}
});

const auth = {
	login: function() {
		log('Authorizing...', emoji.memo);
		oauth.fetchAuthorizationCode();
	}
};

onPageLoad(() => {

	oauth.isReturningFromAuthServer()
		.then(hasAuthCode => {
			return (!hasAuthCode)
				? null
				: oauth.getAccessToken().then((response) => {
					api.me( (user) => { db.saveObject('user', user) } );
				})
		})
		.catch((err) => {
			if (err) { console.log(err); }
		});

});
