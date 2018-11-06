/* eslint-evn mocha */

import {BugTracker, Defaults} from 'meteor/eduhack:bug-tracker'

describe('Native errors', function () {

  it('has a collection for native errors', function () {
    assert.fail()
  })

  it('detects a native error type', function () {
    assert.fail()
  })

  it('adds a native error to the respective collection', function () {
    assert.fail()
  })
})

describe('Meteor errors', function () {
  it('has a collection for Meteor errors', function () {
    assert.fail()
  })

  it('detects a Meteor error type', function () {
    assert.fail()
  })

  it('adds a Meteor error to the respective collection', function () {
    assert.fail()
  })
})

describe('Custom errors', function () {

  it('creates a new collection for custom errors', function () {
    assert.fail()
  })

  it('detects a registered custom error type', function () {
    assert.fail()
  })

  it('throws if the added error is not registered (thus unknown)', function () {
    assert.fail()
  })
})