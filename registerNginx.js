const client = require('./services/redisClient.js');

var proxy = require('redbird')({
	port: 80
});

client.on('ready', (err) => {
	if(err) { process.exit(0);	return }
	getImageName();
});

function getImageName() {
	console.log('Waiting for message');
	client.brpop('inputQueue', 0, (err, res) => {
		if(err) { console.log('ERR',err); process.exit(0); return; }
		console.log(res);
		registerNginxUrl(JSON.parse(res[1]).domainName, JSON.parse(res[1]).redirectUrl);
		// registerNginx(JSON.parse(res[1]).domainName, JSON.parse(res[1]).imageName);
		getImageName();
	});
}

/*function registerNginxDocker (domainName, imageName) {
	require('redbird')
    .docker(proxy)
	.register(domainName, imageName);
}*/

function registerNginxUrl (domainName, redirectUrl) {
	proxy.register(domainName, redirectUrl);
}
