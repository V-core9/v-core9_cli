const { Command, flags } = require('@oclif/command');

const config = require('../config');
const repo_list = require('../data/repo_list');

const v_execute = require('v_execute');

class CloneCommand extends Command {
  async run() {
    const { flags } = this.parse(CloneCommand);
    const name = flags.name || Object.keys(repo_list);

    for (let i = 0; i < name.length; i++) {

      if (Object.keys(repo_list).indexOf(name[i]) > -1) {
        console.log(name[i]);
        console.log(await v_execute(`cd ${config.dir.projects} && git clone ${repo_list[name[i]].repo}`));
      } else {
        this.log('Project Does Not Exist');
      }
    }
  }
}

CloneCommand.description = `Clone a repo or all
...
Extra documentation goes here
`;

CloneCommand.flags = {
  name: flags.string({ char: 'n', description: 'name of project to clone' }),
};

module.exports = CloneCommand;
