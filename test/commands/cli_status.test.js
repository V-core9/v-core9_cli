const {expect, test} = require('@oclif/test')

describe('cli_status', () => {
  test
  .stdout()
  .command(['cli_status'])
  .it('runs hello', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })

  test
  .stdout()
  .command(['cli_status', '--name', 'jeff'])
  .it('runs hello --name jeff', ctx => {
    expect(ctx.stdout).to.contain('hello jeff')
  })
})
