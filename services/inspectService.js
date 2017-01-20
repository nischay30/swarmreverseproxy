const Docker = require('dockerode');
const docker = new Docker({socketPath: '/var/run/docker.sock', host: 'localhost', port: 2375});


function inspectService (stackName, serviceNameToExpose, domainName, callback) {
	let stackServiceName = stackName + '_' + serviceNameToExpose;
	let serviceinfo = docker.getService(stackServiceName);
	serviceinfo.inspect((err, data) => {
		let redirectUrl = 'http://127.0.0.1:' + data.Endpoint.Ports[0].PublishedPort;
		callback(null, domainName, redirectUrl);
	});
}

module.exports = inspectService;