const Docker = require('dockerode');
const docker = new Docker({socketPath: '/var/run/docker.sock', host: 'localhost', port: 2375});

function inspectService (stackName, serviceNameToExpose, domainName, callback) {
	const stackServiceName = stackName + '_' + serviceNameToExpose;
	const serviceinfo = getServiceInfo(stackServiceName);
	if(!serviceinfo) {	
		serviceinfo.inspect((err, data) => {
			console.log(data);
			// let redirectUrl = 'http://127.0.0.1:' + data.Endpoint.Ports[0].PublishedPort;
			// callback(null, domainName, redirectUrl);
		});		
	}
	else {
		console.log('in Else part');
		// inspectService(stackName, serviceNameToExpose, domainName, callback);
	}
}

function getServiceInfo (stackServiceName) {
	return docker.getService(stackServiceName);
}

module.exports = inspectService;
