var Events = require('minivents');

function Model (attributes) {
  this.attributes = typeof(attributes) === 'object' ? attributes : {};
  this.event = new Events();
}

Model.prototype.set = function (property, value) {
  var object,
      key,
      newObject = clone(this.attributes);

  if (typeof(property) === 'string') {
    object = {};
    object[property] = value;
  } else {
    object = clone(property);
  }

  for(key in object) {
    newObject[key] = object[key];
  }

  triggerChanges(this.event, this.attributes, newObject);

  this.attributes = newObject;
};

Model.prototype.get = function (key) {
  return this.attributes[key];
};

Model.prototype.unset = function (property) {
  var newObject = clone(this.attributes);
  delete newObject[property];
  triggerChanges(this.event, this.attributes, newObject);
};

Model.prototype.on = function () {
  this.event.on.apply(this.event, arguments);
};

Model.prototype.toJSON = function () {
  return clone(this.attributes);
};

function triggerChanges (event, oldObject, newObject) {
  var changes = findChanges(oldObject, newObject),
      index, change;
  for(index in changes) {
    change = changes[index];
    event.emit('change:' + change.attributeName, change);
  }
  if (changes.length > 0) {
    event.emit('change', changes);
  }
}

function findChanges (oldObject, newObject) {
  var key,
      oldValue,
      newValue;

      changedAttributes = [];

  for(key in newObject) {
    newValue = newObject[key];
    oldValue = oldObject[key];
    if(newValue !== oldValue) {
      changedAttributes.push({
        attributeName: key,
        oldValue: oldValue,
        newValue: newValue,
      });
    }
  }

  for(key in oldObject) {
    newValue = newObject[key];
    if(newValue === undefined) {
      oldValue = oldObject[key];
      changedAttributes.push({
        attributeName: key,
        oldValue: oldValue,
        newValue: newValue,
      });
    }
  }

  return changedAttributes;
}

function clone (object) {
  if(typeof(object) === 'object') {
    return JSON.parse(JSON.stringify(object));
  } else {
    return {};
  }
};

window.Model = Model;

module.exports = Model;