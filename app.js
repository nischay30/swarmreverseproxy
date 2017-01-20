const async = require('async');

const deployStack = require('./services/deployStack');
const inspectService = require('./services/inspectService');
const registerReverseProxy = require('./services/registerReverseProxy');

function app (composeFilePath, stackName, serviceNameToExpose, domainName) {
	async.waterfall([
			deployStack.bind(null, composeFilePath, stackName),
			inspectService.bind(null, stackName, serviceNameToExpose, domainName),
			registerReverseProxy.bind(null)
		], (err, results) => {
			if(err) { process.exit(0)}
			console.log('hi Sucessfully deployed with reverser proxy configuration');
	});
}

module.exports = app;
