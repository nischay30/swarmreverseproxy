const proxy = require('redbird')({
	port: 80
});

function registerReverseProxy (domainName, redirectUrl, callback) {
	proxy.register(domainName, redirectUrl);
	callback(null);
}

module.exports = registerReverseProxy;
