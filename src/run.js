const core = require('@actions/core');
const input = require('./input');
const execSync = require('./execSync');
const isTuistInstalled = require('./isTuistInstalled');
const installTuist = require('./installTuist');
const { tuistEnvPath } = require('./constants');
const ensureDarwin = require('./ensureDarwin');

module.exports = async () => {
  try {
    const command = input.command();
    const args = input.args();

    ensureDarwin();
    await installTuist();

    let execCommand = `${tuistEnvPath}/tuistexec ${command}`;
    if (args) {
      execCommand = `${execCommand} ${args}`;
    }

    console.log(`command: ${execCommand}`);
    execSync(execCommand);
  } catch (error) {
    console.log(error);
    core.setFailed(error.message);
  }
};
