const v_fs = require('v_file_system');
const repo_list = require('../data/repo_list');
const config = require('../config/');

const simpleGit = require('simple-git');

const boxen = require('boxen');

const cliCheck = {
  projects: async () => {

    var none_found = true;
    const repoKeys = Object.keys(repo_list);
    var projects = await v_fs.listDir(config.dir.projects);

    for (var i = 0; i < repoKeys.length; i++) {
      repo_list[repoKeys[i]].cloned_status = false;
    }

    if (projects.length !== 0) {
      for (let i = 0; i < projects.length; i++) {
        if (repoKeys.indexOf(projects[i]) > -1) {

          repo_list[projects[i]].cloned_status = true;
          none_found = false;
        }
      }
    }

    for (let i = 0; i < repoKeys.length; i++) {
      console.log('\n🏭 Projects dirs status:');
      var title = repoKeys[i];
      try {
        process.chdir(config.dir.projects+'/'+repoKeys[i]);
        var repo_item = await simpleGit().status();
        console.log(boxen(repo_list[repoKeys[i]].cloned_status === true ? '🟩 Cloned'+'\n\n📑 git status \n > Ahead : ' + repo_item.ahead + '\n < Behind : ' + repo_item.behind + '\n @ Current : ' + repo_item.current + '\n # Tracking : ' + repo_item.tracking  : '🔻 Missing', {title: title}));
      } catch (error) {
        console.log(boxen('🔻 Missing', {title: title}));
      }

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
