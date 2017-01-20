const spawn = require('child_process').spawn;

function deployStack(composeFilePath, stackName, callback) {
	const deploy = spawn('docker', ['stack', 'deploy', '--compose-file', 'docker-compose.yml', stackName], {cwd: composeFilePath});
	deploy.stdout.on('data', (data) => {
		console.log(`stdout: ${data}`);
	});

	deploy.stderr.on('data', (data) => {
		console.log(`stderr: ${data}`);
	});

	deploy.on('close', (code) => {
		console.log('Successfully Deployed');
		callback(null);
	})
}
module.exports = deployStack;

