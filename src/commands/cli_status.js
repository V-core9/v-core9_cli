const { Command, flags } = require('@oclif/command');
const fs = require('fs');

const repo_list = {
  'v_to_md5': {
    repo: 'https://github.com/V-core9/v_to_md5',
    npm: 'https://www.npmjs.com/package/v_to_md5',
  },

  'v_to_sha256': {
    repo: 'https://github.com/V-core9/v_to_sha256',
    npm: 'https://www.npmjs.com/package/v_to_sha256',
  },

  'v_file_system': {
    repo: 'https://github.com/V-core9/v_file_system',
    npm: 'https://www.npmjs.com/package/v_fs',
  },

  'v_scrolls': {
    repo: 'https://github.com/V-core9/v_scrolls',
    npm: 'https://www.npmjs.com/package/v_scrolls',
  },

  'v_database': {
    repo: 'https://github.com/V-core9/v_database',
    npm: 'https://www.npmjs.com/package/v_database',
  },

  'v_execute': {
    repo: 'https://github.com/V-tech-tools/v_execute',
    npm: 'https://www.npmjs.com/package/v_execute',
  },

};

config_dir_check = async () => {

  var dir_status = false;
  try {
    fs.readdirSync(process.env.home + '/.v9', 'utf8');
    dir_status = true;
  } catch (e) {
    //console.log(e);
  }

  console.log(dir_status === true ? '📂 Found Root Config Directory. ✅' : '📂 Missing Root Config Directory. 🔻');

  return dir_status;
};

config_file_check = async () => {

  var file_status = false;
  try {
    fs.readFileSync(process.env.home + '/.v9/config.json', 'utf8');
    file_status = true;
  } catch (e) {
    //console.log(e);
  }

  console.log(file_status === true ? '📑 Found Root Config File. ✅' : '📑 Missing Root Config File. 🔻');

  return file_status;
};

repo_dirs_check = async () => {

  var dir_status = false;
  try {
    fs.readdirSync(process.env.home + '/.v9_repos');
    dir_status = true;
  } catch (e) {
    //console.log(e);
  }

  console.log(dir_status === true ? '🧱 Found Repo Directory. ✅' : '🧱 Missing Repo Directory. 🔻');

  return dir_status;
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
        config_dir_check();
      }

      if (check_array.indexOf('cfg_file') > -1) {
        config_file_check();
      }

      if (check_array.indexOf('repo_dir') > -1) {
        repo_dirs_check();
      }

    }

    if (checklist === false){
      await config_dir_check();
      await config_file_check();
      await repo_dirs_check();
    }

  }
}

CliStatusCommand.description = `Check the status of CLI tool and system.
...
Look for into the config directory and config file.
Check the status of the repos directory.
Provide data about repos and their status.
`;

CliStatusCommand.flags = {
  checklist: flags.string({ char: 'c', description: 'Checklist of things to verify. [ "cfg_dir", "cfg_file", "repo_dir" ]' }),
};

module.exports = CliStatusCommand;
