var Events = require('minivents');

function Model (attributes) {
  this.attributes = typeof(attributes) === 'object' ? attributes : {};
  this.event = new Events();
}

Model.prototype.set = function (property, value) {
  var object,
      key,
      oldObject = clone(this.attributes),
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

  this.attributes = newObject;

  this._triggerChanges(oldObject, newObject);
};

Model.prototype.get = function (key) {
  return this.attributes[key];
};

Model.prototype.unset = function (properties) {
  var index,
      property,
      oldObject = clone(this.attributes),
      newObject = clone(this.attributes);

  if (typeof(properties) === 'string') {
    properties = [properties];
  }

  for(index in properties) {
    property = properties[index];
    delete newObject[property];
  }

  this.attributes = newObject;

  this._triggerChanges(oldObject, newObject);
};

Model.prototype.clear = function () {
  this.attributes = {};
  return this.attributes;
};

Model.prototype.on = function () {
  this.event.on.apply(this.event, arguments);
};

Model.prototype.off = function () {
  this.event.off.apply(this.event, arguments);
};

Model.prototype.emit = function () {
  this.event.emit.apply(this.event, arguments);
};

Model.prototype.toJSON = function () {
  return clone(this.attributes);
};

Model.prototype._triggerChanges = function (oldObject, newObject) {
  var changes = this._findChanges(oldObject, newObject),
      index, change;
  for(index in changes) {
    change = changes[index];
    this.event.emit('change:' + change.attributeName, change);
  }
  if (changes.length > 0) {
    this.event.emit('change', changes);
  }
};

Model.prototype._findChanges = function (oldObject, newObject) {
  var key,
      oldValue,
      newValue,

      change,
      changedAttributes = [];

  for(key in newObject) {
    newValue = newObject[key];
    oldValue = oldObject[key];
    if(newValue !== oldValue) {
      change = {
        attributeName: key,
        oldValue: oldValue,
        newValue: newValue,
        action: 'change',
      };
      if(oldValue === undefined) {
        change.action = 'add';
      }
      changedAttributes.push(change);
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
        action: 'remove',
      });
    }
  }

  return changedAttributes;
};

function clone (object) {
  if(typeof(object) === 'object') {
    return JSON.parse(JSON.stringify(object));
  } else {
    return {};
  }
};

window && (window.Model = Model);

module.exports = Model;