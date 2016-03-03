;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

Model.prototype.unset = function (properties) {
  var index,
      property,
      newObject = clone(this.attributes);

  if (typeof(properties) === 'string') {
    properties = [properties];
  }

  for(index in properties) {
    property = properties[index];
    delete newObject[property];
  }
  
  triggerChanges(this.event, this.attributes, newObject);

  this.attributes = newObject;
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
},{"minivents":2}],2:[function(require,module,exports){
module.exports=function(n){var o={},t=[];n=n||this,n.on=function(n,t,e){(o[n]=o[n]||[]).push([t,e])},n.off=function(n,e){n||(o={});for(var f=o[n]||t,i=f.length=e?f.length:0;i--;)e==f[i][0]&&f.splice(i,1)},n.emit=function(n){for(var e,f=o[n]||t,i=0;e=f[i++];)e[0].apply(e[1],t.slice.call(arguments,1))}};
},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdW5kYXJhc2FuL0RvY3VtZW50cy9UZW5taWxlcy9naXQvbW9kZWwvaW5kZXguanMiLCIvVXNlcnMvc3VuZGFyYXNhbi9Eb2N1bWVudHMvVGVubWlsZXMvZ2l0L21vZGVsL25vZGVfbW9kdWxlcy9taW5pdmVudHMvZGlzdC9taW5pdmVudHMuY29tbW9uanMubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUhBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgRXZlbnRzID0gcmVxdWlyZSgnbWluaXZlbnRzJyk7XG5cbmZ1bmN0aW9uIE1vZGVsIChhdHRyaWJ1dGVzKSB7XG4gIHRoaXMuYXR0cmlidXRlcyA9IHR5cGVvZihhdHRyaWJ1dGVzKSA9PT0gJ29iamVjdCcgPyBhdHRyaWJ1dGVzIDoge307XG4gIHRoaXMuZXZlbnQgPSBuZXcgRXZlbnRzKCk7XG59XG5cbk1vZGVsLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAocHJvcGVydHksIHZhbHVlKSB7XG4gIHZhciBvYmplY3QsXG4gICAgICBrZXksXG4gICAgICBuZXdPYmplY3QgPSBjbG9uZSh0aGlzLmF0dHJpYnV0ZXMpO1xuXG4gIGlmICh0eXBlb2YocHJvcGVydHkpID09PSAnc3RyaW5nJykge1xuICAgIG9iamVjdCA9IHt9O1xuICAgIG9iamVjdFtwcm9wZXJ0eV0gPSB2YWx1ZTtcbiAgfSBlbHNlIHtcbiAgICBvYmplY3QgPSBjbG9uZShwcm9wZXJ0eSk7XG4gIH1cblxuICBmb3Ioa2V5IGluIG9iamVjdCkge1xuICAgIG5ld09iamVjdFtrZXldID0gb2JqZWN0W2tleV07XG4gIH1cblxuICB0cmlnZ2VyQ2hhbmdlcyh0aGlzLmV2ZW50LCB0aGlzLmF0dHJpYnV0ZXMsIG5ld09iamVjdCk7XG5cbiAgdGhpcy5hdHRyaWJ1dGVzID0gbmV3T2JqZWN0O1xufTtcblxuTW9kZWwucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgcmV0dXJuIHRoaXMuYXR0cmlidXRlc1trZXldO1xufTtcblxuTW9kZWwucHJvdG90eXBlLnVuc2V0ID0gZnVuY3Rpb24gKHByb3BlcnRpZXMpIHtcbiAgdmFyIGluZGV4LFxuICAgICAgcHJvcGVydHksXG4gICAgICBuZXdPYmplY3QgPSBjbG9uZSh0aGlzLmF0dHJpYnV0ZXMpO1xuXG4gIGlmICh0eXBlb2YocHJvcGVydGllcykgPT09ICdzdHJpbmcnKSB7XG4gICAgcHJvcGVydGllcyA9IFtwcm9wZXJ0aWVzXTtcbiAgfVxuXG4gIGZvcihpbmRleCBpbiBwcm9wZXJ0aWVzKSB7XG4gICAgcHJvcGVydHkgPSBwcm9wZXJ0aWVzW2luZGV4XTtcbiAgICBkZWxldGUgbmV3T2JqZWN0W3Byb3BlcnR5XTtcbiAgfVxuICBcbiAgdHJpZ2dlckNoYW5nZXModGhpcy5ldmVudCwgdGhpcy5hdHRyaWJ1dGVzLCBuZXdPYmplY3QpO1xuXG4gIHRoaXMuYXR0cmlidXRlcyA9IG5ld09iamVjdDtcbn07XG5cbk1vZGVsLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5ldmVudC5vbi5hcHBseSh0aGlzLmV2ZW50LCBhcmd1bWVudHMpO1xufTtcblxuTW9kZWwucHJvdG90eXBlLnRvSlNPTiA9IGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGNsb25lKHRoaXMuYXR0cmlidXRlcyk7XG59O1xuXG5mdW5jdGlvbiB0cmlnZ2VyQ2hhbmdlcyAoZXZlbnQsIG9sZE9iamVjdCwgbmV3T2JqZWN0KSB7XG4gIHZhciBjaGFuZ2VzID0gZmluZENoYW5nZXMob2xkT2JqZWN0LCBuZXdPYmplY3QpLFxuICAgICAgaW5kZXgsIGNoYW5nZTtcbiAgZm9yKGluZGV4IGluIGNoYW5nZXMpIHtcbiAgICBjaGFuZ2UgPSBjaGFuZ2VzW2luZGV4XTtcbiAgICBldmVudC5lbWl0KCdjaGFuZ2U6JyArIGNoYW5nZS5hdHRyaWJ1dGVOYW1lLCBjaGFuZ2UpO1xuICB9XG4gIGlmIChjaGFuZ2VzLmxlbmd0aCA+IDApIHtcbiAgICBldmVudC5lbWl0KCdjaGFuZ2UnLCBjaGFuZ2VzKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaW5kQ2hhbmdlcyAob2xkT2JqZWN0LCBuZXdPYmplY3QpIHtcbiAgdmFyIGtleSxcbiAgICAgIG9sZFZhbHVlLFxuICAgICAgbmV3VmFsdWUsXG5cbiAgICAgIGNoYW5nZSxcbiAgICAgIGNoYW5nZWRBdHRyaWJ1dGVzID0gW107XG5cbiAgZm9yKGtleSBpbiBuZXdPYmplY3QpIHtcbiAgICBuZXdWYWx1ZSA9IG5ld09iamVjdFtrZXldO1xuICAgIG9sZFZhbHVlID0gb2xkT2JqZWN0W2tleV07XG4gICAgaWYobmV3VmFsdWUgIT09IG9sZFZhbHVlKSB7XG4gICAgICBjaGFuZ2UgPSB7XG4gICAgICAgIGF0dHJpYnV0ZU5hbWU6IGtleSxcbiAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlLFxuICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWUsXG4gICAgICAgIGFjdGlvbjogJ2NoYW5nZScsXG4gICAgICB9O1xuICAgICAgaWYob2xkVmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjaGFuZ2UuYWN0aW9uID0gJ2FkZCc7XG4gICAgICB9XG4gICAgICBjaGFuZ2VkQXR0cmlidXRlcy5wdXNoKGNoYW5nZSk7XG4gICAgfVxuICB9XG5cbiAgZm9yKGtleSBpbiBvbGRPYmplY3QpIHtcbiAgICBuZXdWYWx1ZSA9IG5ld09iamVjdFtrZXldO1xuICAgIGlmKG5ld1ZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgIG9sZFZhbHVlID0gb2xkT2JqZWN0W2tleV07XG4gICAgICBjaGFuZ2VkQXR0cmlidXRlcy5wdXNoKHtcbiAgICAgICAgYXR0cmlidXRlTmFtZToga2V5LFxuICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWUsXG4gICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgYWN0aW9uOiAncmVtb3ZlJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBjaGFuZ2VkQXR0cmlidXRlcztcbn1cblxuZnVuY3Rpb24gY2xvbmUgKG9iamVjdCkge1xuICBpZih0eXBlb2Yob2JqZWN0KSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge307XG4gIH1cbn07XG5cbndpbmRvdy5Nb2RlbCA9IE1vZGVsO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGVsOyIsIm1vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKG4pe3ZhciBvPXt9LHQ9W107bj1ufHx0aGlzLG4ub249ZnVuY3Rpb24obix0LGUpeyhvW25dPW9bbl18fFtdKS5wdXNoKFt0LGVdKX0sbi5vZmY9ZnVuY3Rpb24obixlKXtufHwobz17fSk7Zm9yKHZhciBmPW9bbl18fHQsaT1mLmxlbmd0aD1lP2YubGVuZ3RoOjA7aS0tOyllPT1mW2ldWzBdJiZmLnNwbGljZShpLDEpfSxuLmVtaXQ9ZnVuY3Rpb24obil7Zm9yKHZhciBlLGY9b1tuXXx8dCxpPTA7ZT1mW2krK107KWVbMF0uYXBwbHkoZVsxXSx0LnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpKX19OyJdfQ==
;