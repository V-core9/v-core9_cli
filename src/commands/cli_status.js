const { Command, flags } = require('@oclif/command');
const v_fs = require('v_file_system');

const repo_list = require('../../data/repo_list');

const root_dir = process.env.home + '/.v9';

const config = {
  dir: {
    cfg_dir: root_dir,
    cfg_file: root_dir + '/config.json',
    projects: root_dir + '/projects',
  }
};


repoListCheck = async () => {

  for (var i = 0; i < Object.keys(repo_list).length; i++){
    repo_list[Object.keys(repo_list)[i]].cloned_status = false;
  }

  var none_found = true;

  var projects = await v_fs.listDir(config.dir.projects);

  if (projects.length !== 0) {
    for (let i = 0; i < projects.length; i++) {
      if (Object.keys(repo_list).indexOf(projects[i]) > -1) {
        repo_list[projects[i]].cloned_status = true;
        none_found = false;
      }
    }
  }

  console.log('\n🏭 Projects dirs status:');
  for (let i = 0; i < Object.keys(repo_list).length; i++){
    console.log('  '+(repo_list[Object.keys(repo_list)[i]].cloned_status === true ? '🟩' : '🔻')+' '+Object.keys(repo_list)[i] );
  }

  if (none_found === true) console.log('🧱 Missing All Projects. 🔻');

  return projects;
};


class CliStatusCommand extends Command {
  async run() {
    const { flags } = this.parse(CliStatusCommand);
    const checklist = flags.checklist || 'cfg_dir cfg_file repo_dir repo_list';
    this.log(`\n🩺 v9_cli system check triggered for [ -c >> ${checklist} ]`);


    var check_array = null;

    if (typeof checklist === 'string') {

      check_array = checklist.split(' ');

      if (check_array.indexOf('cfg_dir') > -1) {
        console.log('\n📂 Checking Root Config Directory : '+(await v_fs.listDir(config.dir.cfg_dir) !== false ? '🟩 Found' : '🔻 Missing'));
      }

      if (check_array.indexOf('cfg_file') > -1) {
        console.log('\n📑 Checking Root Config File : '+(await v_fs.read(config.dir.cfg_file) !== false ? '🟩 Found' : '🔻 Missing'));
      }

      if (check_array.indexOf('repo_dir') > -1) {
        console.log('\n🧱 Checking Projects Directory : '+(await v_fs.listDir(config.dir.projects) !== false ? '🟩 Found' : '🔻 Missing'));
      }

      if (check_array.indexOf('repo_list') > -1) {
        repoListCheck();
      }

    }


  }
}

CliStatusCommand.description = `Check the status of CLI tool and system.
...
Look for into the config directory and config file.
Check the status of the repos directory.
Provide data about repos and their status.

Flags Additional Options:
  -c, --checklist  >>  [ "cfg_dir", "cfg_file", "repo_dir" ]

Example:
  v9 cli_status -c='cfg_dir cfg_file repo_dir'
`;

CliStatusCommand.flags = {
  checklist: flags.string({ char: 'c', description: 'Check the CLI system status, will check all if empty.' }),
};

module.exports = CliStatusCommand;
