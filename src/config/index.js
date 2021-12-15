
const root_dir = process.env.home + '/.v9';

const config = {
  dir: {
    cfg_d: root_dir,
    cfg_f: root_dir + '/config.json',
    projects: root_dir + '/projects',
  }
};

module.exports = config;
