const { Command, flags } = require('@oclif/command');

const cliCheck = require('../helpers/cli_check');

class StatusCommand extends Command {
  async run() {
    const { flags } = this.parse(StatusCommand);
    const checklist = flags.checklist || 'cfg_dir cfg_file repo_dir repo_list';
    this.log(`\n🩺 v9_cli system check triggered for [ -c >> ${checklist} ]`);


    var check_array = checklist.split(' ');

    if (check_array.indexOf('cfg_dir') > -1) {
      console.log('\n📂 Checking Root Config Directory : ' + await cliCheck.cfgDir());
    }

    if (check_array.indexOf('cfg_file') > -1) {
      console.log('\n📑 Checking Root Config File : ' + await cliCheck.cfgFile());
    }

    if (check_array.indexOf('repo_dir') > -1) {
      console.log('\n🧱 Checking Projects Directory : ' + await cliCheck.projectsDir());
    }

    if (check_array.indexOf('repo_list') > -1) {
      await cliCheck.projects();
    }
  }
}

StatusCommand.description = `Check the status of CLI tool and system.
...
Look for into the config directory and config file.
Check the status of the repos directory.
Provide data about repos and their status.

Flags Additional Options:
  -c, --checklist  >>  [ "cfg_dir", "cfg_file", "repo_dir" ]

Example:
  v9 cli_status -c='cfg_dir cfg_file repo_dir'
`;

StatusCommand.flags = {
  checklist: flags.string({ char: 'c', description: 'Check the CLI system status, will check all if empty.' }),
};

module.exports = StatusCommand;
