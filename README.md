v-core9_cli
===========

yup

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/v-core9_cli.svg)](https://npmjs.org/package/v-core9_cli)
[![Downloads/week](https://img.shields.io/npm/dw/v-core9_cli.svg)](https://npmjs.org/package/v-core9_cli)
[![License](https://img.shields.io/npm/l/v-core9_cli.svg)](https://github.com/V-core9/v-core9_cli/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g v-core9_cli
$ v9 COMMAND
running command...
$ v9 (-v|--version|version)
v-core9_cli/0.0.0 win32-x64 node-v16.13.0
$ v9 --help [COMMAND]
USAGE
  $ v9 COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`v9 clone`](#v9-clone)
* [`v9 hello`](#v9-hello)
* [`v9 help [COMMAND]`](#v9-help-command)
* [`v9 status`](#v9-status)

## `v9 clone`

Clone a repo or all

```
USAGE
  $ v9 clone

OPTIONS
  -n, --name=name  name of project to clone

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/clone.js](https://github.com/V-core9/v-core9_cli/blob/v0.0.0/src/commands/clone.js)_

## `v9 hello`

Describe the command here

```
USAGE
  $ v9 hello

OPTIONS
  -n, --name=name  name to print

DESCRIPTION
  ...
  Extra documentation goes here
```

_See code: [src/commands/hello.js](https://github.com/V-core9/v-core9_cli/blob/v0.0.0/src/commands/hello.js)_

## `v9 help [COMMAND]`

display help for v9

```
USAGE
  $ v9 help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v3.2.17/src/commands/help.ts)_

## `v9 status`

Check the status of CLI tool and system.

```
USAGE
  $ v9 status

OPTIONS
  -c, --checklist=checklist  Check the CLI system status, will check all if empty.

DESCRIPTION
  ...
  Look for into the config directory and config file.
  Check the status of the repos directory.
  Provide data about repos and their status.

  Flags Additional Options:
    -c, --checklist  >>  [ "cfg_dir", "cfg_file", "repo_dir" ]

  Example:
    v9 cli_status -c='cfg_dir cfg_file repo_dir'
```

_See code: [src/commands/status.js](https://github.com/V-core9/v-core9_cli/blob/v0.0.0/src/commands/status.js)_
<!-- commandsstop -->
