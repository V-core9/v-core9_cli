
const v_fs = require('v_file_system');

const repo_list = require('../data/repo_list');


const config = require('../config/');


const cliCheck = {
  projects: async () => {

    for (var i = 0; i < Object.keys(repo_list).length; i++) {
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
    for (let i = 0; i < Object.keys(repo_list).length; i++) {
      console.log('  ' + (repo_list[Object.keys(repo_list)[i]].cloned_status === true ? '🟩' : '🔻') + ' ' + Object.keys(repo_list)[i]);
    }

    if (none_found === true) console.log('🧱 Missing All Projects. 🔻');

    return projects;
  },

  cfgDir: async () => {
    return (await v_fs.listDir(config.dir.cfg_d) !== false ? '🟩 Found' : '🔻 Missing');
  },


  cfgFile: async () => {
    return (await v_fs.read(config.dir.cfg_f) !== false ? '🟩 Found' : '🔻 Missing');
  },

  projectsDir: async () => {
    return (await v_fs.listDir(config.dir.projects) !== false ? '🟩 Found' : '🔻 Missing');
  },
};

module.exports = cliCheck;
