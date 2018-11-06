# meteor-bug-tracker
Easy bug tracking for Meteor.

## Specifications

* [ ] The `BugTracker.add` function detects the error type and adds it to the respective collection
  * [ ] If the Bug is a native Error, add it to `"BTN<native>Errors"`, for native errors [read here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error#Error_types)
  * [ ] If the Bug is a Meteor.Error, add it to `"BTMeteorErrors"`
  * [ ] If the Bug is a custom Error, add it to `"BT<CustomName>Errors"`
  * [ ] Each of the above types has a respective collections
  
* [ ] Instead of adding each instance of the same error again,
  * [ ] the stack will be stringified and hashed
  * [ ] if the hash already exists, push only the current timestamp and user

* [ ] The BugTacker keeps a reference to all BT-Collections
  * [ ] Collections can be obtained single by name or as list
* [ ] Custom types can be added, by providing a name and the constructor

* [x] Document schemas (see aldeed:Collection2) need ot be attached manually
  * [ ] To do that get the collection by name and attach your schema to it
* [x] Meteor methods and Publications need to be defined and added by yourself
* [ ] CreatedBy needs to be added from surrounding environment by yourself

## Installation and Usage

Install via `meteor add eduhack:bug-tacker`

Use for example inside a meteor method or publication via:

```javascript
import BugTracker from 'meteor/eduhack:bug-tracker'

Meteor.methods({
  'riskyMethod' (args) {
    try {
      // ...something risky
    } catch (error) {
      BugTracker.track(error, {
        isClient: false,
        createdBy: this.userId,
        timeStamp: new Date()
      })
    }
  }
})
```