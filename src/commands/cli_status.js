const { Command, flags } = require('@oclif/command');
const fs = require('fs');

const repo_list = require('../../data/repo_list');


const config = {
  dir: {
    cfg_dir: process.env.home + '/.v9',
    cfg_file: process.env.home + '/.v9/config.json',
    projects: process.env.home + '/.v9/projects',
  }
};

configDirCheck = async () => {

  var dir_status = false;
  try {
    fs.readdirSync(config.dir.cfg_dir, 'utf8');
    dir_status = true;
  } catch (e) {
    //console.log(e);
  }

  console.log(dir_status === true ? '📂 Found Root Config Directory. ✅' : '📂 Missing Root Config Directory. 🔻');

  return dir_status;
};

configFileCheck = async () => {

  var file_status = false;
  try {
    fs.readFileSync(config.dir.cfg_file, 'utf8');
    file_status = true;
  } catch (e) {
    //console.log(e);
  }

  console.log(file_status === true ? '📑 Found Root Config File. ✅' : '📑 Missing Root Config File. 🔻');

  return file_status;
};

repoDirsCheck = async () => {

  var dir_status = false;
  try {
    fs.readdirSync(config.dir.projects);
    dir_status = true;
  } catch (e) {
    //console.log(e);
  }

  console.log(dir_status === true ? '🧱 Found Repo Directory. ✅' : '🧱 Missing Repo Directory. 🔻');

  return dir_status;
};

repoListCheck = async () => {

  //console.log(repo_list);
  var none_found = true;

  var projects = null;
  try {
    projects = fs.readdirSync(config.dir.projects);
  } catch (e) {
    //console.log(e);
  }


  if (projects !== null) {
    for (var i = 0; i < projects.length; i++) {
      if (Object.keys(repo_list).indexOf(projects[i]) > -1) {
        console.log(repo_list[projects[i]]);
        none_found = false;
      }
    }
  }

  if (none_found === true) console.log('🧱 Missing All Projects. 🔻');

  return projects;
};


class CliStatusCommand extends Command {
  async run() {
    const { flags } = this.parse(CliStatusCommand);
    const checklist = flags.checklist || false;
    this.log(`🩺 v9_cli system check triggered for [ -c >> ${checklist} ]`);


    var check_array = null;

    if (typeof checklist === 'string') {
      console.log(checklist);
      check_array = checklist.split(' ');

      if (check_array.indexOf('cfg_dir') > -1) {
        configDirCheck();
      }

      if (check_array.indexOf('cfg_file') > -1) {
        configFileCheck();
      }

      if (check_array.indexOf('repo_dir') > -1) {
        repoDirsCheck();
      }

      if (check_array.indexOf('repo_list') > -1) {
        repoListCheck();
      }

    }


    if (checklist === false) {
      await configDirCheck();
      await configFileCheck();
      await repoDirsCheck();
      await repoListCheck();
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
