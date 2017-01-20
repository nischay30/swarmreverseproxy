const client = require('./redisClient.js').duplicate();

function pushReverseProxyInfo (domainName, redirectUrl, callback) {
	let obj = {
		domainName: domainName,
		redirectUrl: redirectUrl
	}
	client.lpush('inputQueue', JSON.stringify(obj), (err, res) => {
		if(err) { console.log('ERR',err); process.exit(0); return; }
		client.quit();
		callback(null);
	});
}

module.exports = pushReverseProxyInfo;
