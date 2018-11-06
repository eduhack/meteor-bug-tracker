import { Meteor } from 'meteor'
import { Mongo } from 'meteor/mongo'
import { check, Match } from 'meteor/check'
import { SHA256 } from 'meteor/sha'

const _collections = {}
const _constructors = {}

//  ///////////////////////////////////////////////////////
//
//  INTERNAL
//
//  ///////////////////////////////////////////////////////

function namePattern (name) {
  return `BT${name}Errors`
}

function registerCollection (name) {
  check(name, String)
  const collectionName = namePattern(name)
  _collections[ name ] = new Mongo.Collection(collectionName)
  return collectionName
}

function registerConstructor (name, Constructor) {
  if (_constructors[ name ]) {
    throw new Error(`Constructor ${name} already registered.`)
  }
  _constructors[ name ] = Constructor
}

function _track (error, { isClient, createdBy, timeStamp }) {
  const name = error.constructor.name
  const collection = collection(namePattern(name))
  if (!collection) {
    throw new Error(`no collection found by constructor [${name}]`)
  }

  const { message } = error
  const { stack } = error.stack
  const hash = SHA256(JSON.stringify({ message, stack }))
  const timeStamp = new Date()
  const entry = { timeStamp }
  if (createdBy) {
    entry.createdBy = createdBy
  }

  const existingDoc = collection.findOne({ hash })
  if (existingDoc) {
    return collection.update(existingDoc._id, { $push: { entries: entry } })
  } else {
    return collection.insert({
      message,
      stack,
      hash,
      entries: [ entry ]
    })
  }
}

//  ///////////////////////////////////////////////////////
//
//  PUBLIC
//
//  ///////////////////////////////////////////////////////

function register (Constructor) {
  check(Constructor, Function)
  check(Constructor.name, String)
  const name = Constructor.name
  registerConstructor(name, Constructor)
  return registerCollection(name)
}

function isRegistered (error) {
  const Constructor = _constructors[ error.constructor.name ]
  return (Constructor === error.constructor)
}

function collection (name) {
  check(name, String)
  const collectionName = namePattern(name)
  return _collections[ collectionName ]
}

function allCollections () {
  return Object.values(_collections)
}

function track (error, { isClient = false, createdBy, timeStamp = new Date() }) {
  check(error, Match.Where(isDefined))
  check(isClient, Boolean)
  check(createdBy, Match.Maybe(String))
  check(timeStamp, Date)

  if (isRegistered(error)) {
    _track(error, { isClient, createdBy, timeStamp })
  } else {
    throw new Error(`Unknown Error type [${error.constructor.name}]`)
  }
}

//  ///////////////////////////////////////////////////////
//
//  BOOTSTRAP DEFAULTS AND EXPORT
//
//  ///////////////////////////////////////////////////////

export const Defaults = [
  global.Error,
  global.RangeError,
  global.ReferenceError,
  global.SyntaxError,
  global.TypeError,
  global.URIError,
  Meteor.ERROR
]

const BugTracker = {
  register,
  isRegistered,
  collection,
  allCollections,
  track
}

export { BugTracker as default }
