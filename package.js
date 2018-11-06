/* eslint-env meteor */

Package.describe({
  name: 'eduhack:bug-tracker',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: 'Easy bug tracking for Meteor',
  // URL to the Git repository containing the source code for this package.
  git: 'git@github.com:eduhack/meteor-bug-tracker.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.6')
  api.use('ecmascript')
  api.use('meteor')
  api.use('mongo')
  api.mainModule('bug-tracker.js')
})

Package.onTest(function (api) {
  api.use('ecmascript')
  api.use('tinytest')
  api.use('eduhack:bug-tracker')
  api.mainModule('bug-tracker.tests.js')
})
