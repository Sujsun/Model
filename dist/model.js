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

  this._triggerChanges(this.attributes, newObject);

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

  this._triggerChanges(this.attributes, newObject);

  this.attributes = newObject;
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
},{"minivents":2}],2:[function(require,module,exports){
module.exports=function(n){var o={},t=[];n=n||this,n.on=function(n,t,e){(o[n]=o[n]||[]).push([t,e])},n.off=function(n,e){n||(o={});for(var f=o[n]||t,i=f.length=e?f.length:0;i--;)e==f[i][0]&&f.splice(i,1)},n.emit=function(n){for(var e,f=o[n]||t,i=0;e=f[i++];)e[0].apply(e[1],t.slice.call(arguments,1))}};
},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdW5kYXJhc2FuL0RvY3VtZW50cy9UZW5taWxlcy9naXQvbW9kZWwvaW5kZXguanMiLCIvVXNlcnMvc3VuZGFyYXNhbi9Eb2N1bWVudHMvVGVubWlsZXMvZ2l0L21vZGVsL25vZGVfbW9kdWxlcy9taW5pdmVudHMvZGlzdC9taW5pdmVudHMuY29tbW9uanMubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2SUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBFdmVudHMgPSByZXF1aXJlKCdtaW5pdmVudHMnKTtcblxuZnVuY3Rpb24gTW9kZWwgKGF0dHJpYnV0ZXMpIHtcbiAgdGhpcy5hdHRyaWJ1dGVzID0gdHlwZW9mKGF0dHJpYnV0ZXMpID09PSAnb2JqZWN0JyA/IGF0dHJpYnV0ZXMgOiB7fTtcbiAgdGhpcy5ldmVudCA9IG5ldyBFdmVudHMoKTtcbn1cblxuTW9kZWwucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgdmFyIG9iamVjdCxcbiAgICAgIGtleSxcbiAgICAgIG5ld09iamVjdCA9IGNsb25lKHRoaXMuYXR0cmlidXRlcyk7XG5cbiAgaWYgKHR5cGVvZihwcm9wZXJ0eSkgPT09ICdzdHJpbmcnKSB7XG4gICAgb2JqZWN0ID0ge307XG4gICAgb2JqZWN0W3Byb3BlcnR5XSA9IHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIG9iamVjdCA9IGNsb25lKHByb3BlcnR5KTtcbiAgfVxuXG4gIGZvcihrZXkgaW4gb2JqZWN0KSB7XG4gICAgbmV3T2JqZWN0W2tleV0gPSBvYmplY3Rba2V5XTtcbiAgfVxuXG4gIHRoaXMuX3RyaWdnZXJDaGFuZ2VzKHRoaXMuYXR0cmlidXRlcywgbmV3T2JqZWN0KTtcblxuICB0aGlzLmF0dHJpYnV0ZXMgPSBuZXdPYmplY3Q7XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzW2tleV07XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbiAocHJvcGVydGllcykge1xuICB2YXIgaW5kZXgsXG4gICAgICBwcm9wZXJ0eSxcbiAgICAgIG5ld09iamVjdCA9IGNsb25lKHRoaXMuYXR0cmlidXRlcyk7XG5cbiAgaWYgKHR5cGVvZihwcm9wZXJ0aWVzKSA9PT0gJ3N0cmluZycpIHtcbiAgICBwcm9wZXJ0aWVzID0gW3Byb3BlcnRpZXNdO1xuICB9XG5cbiAgZm9yKGluZGV4IGluIHByb3BlcnRpZXMpIHtcbiAgICBwcm9wZXJ0eSA9IHByb3BlcnRpZXNbaW5kZXhdO1xuICAgIGRlbGV0ZSBuZXdPYmplY3RbcHJvcGVydHldO1xuICB9XG5cbiAgdGhpcy5fdHJpZ2dlckNoYW5nZXModGhpcy5hdHRyaWJ1dGVzLCBuZXdPYmplY3QpO1xuXG4gIHRoaXMuYXR0cmlidXRlcyA9IG5ld09iamVjdDtcbn07XG5cbk1vZGVsLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5hdHRyaWJ1dGVzID0ge307XG4gIHJldHVybiB0aGlzLmF0dHJpYnV0ZXM7XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZXZlbnQub24uYXBwbHkodGhpcy5ldmVudCwgYXJndW1lbnRzKTtcbn07XG5cbk1vZGVsLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZXZlbnQub2ZmLmFwcGx5KHRoaXMuZXZlbnQsIGFyZ3VtZW50cyk7XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgdGhpcy5ldmVudC5lbWl0LmFwcGx5KHRoaXMuZXZlbnQsIGFyZ3VtZW50cyk7XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gY2xvbmUodGhpcy5hdHRyaWJ1dGVzKTtcbn07XG5cbk1vZGVsLnByb3RvdHlwZS5fdHJpZ2dlckNoYW5nZXMgPSBmdW5jdGlvbiAob2xkT2JqZWN0LCBuZXdPYmplY3QpIHtcbiAgdmFyIGNoYW5nZXMgPSB0aGlzLl9maW5kQ2hhbmdlcyhvbGRPYmplY3QsIG5ld09iamVjdCksXG4gICAgICBpbmRleCwgY2hhbmdlO1xuICBmb3IoaW5kZXggaW4gY2hhbmdlcykge1xuICAgIGNoYW5nZSA9IGNoYW5nZXNbaW5kZXhdO1xuICAgIHRoaXMuZXZlbnQuZW1pdCgnY2hhbmdlOicgKyBjaGFuZ2UuYXR0cmlidXRlTmFtZSwgY2hhbmdlKTtcbiAgfVxuICBpZiAoY2hhbmdlcy5sZW5ndGggPiAwKSB7XG4gICAgdGhpcy5ldmVudC5lbWl0KCdjaGFuZ2UnLCBjaGFuZ2VzKTtcbiAgfVxufTtcblxuTW9kZWwucHJvdG90eXBlLl9maW5kQ2hhbmdlcyA9IGZ1bmN0aW9uIChvbGRPYmplY3QsIG5ld09iamVjdCkge1xuICB2YXIga2V5LFxuICAgICAgb2xkVmFsdWUsXG4gICAgICBuZXdWYWx1ZSxcblxuICAgICAgY2hhbmdlLFxuICAgICAgY2hhbmdlZEF0dHJpYnV0ZXMgPSBbXTtcblxuICBmb3Ioa2V5IGluIG5ld09iamVjdCkge1xuICAgIG5ld1ZhbHVlID0gbmV3T2JqZWN0W2tleV07XG4gICAgb2xkVmFsdWUgPSBvbGRPYmplY3Rba2V5XTtcbiAgICBpZihuZXdWYWx1ZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIGNoYW5nZSA9IHtcbiAgICAgICAgYXR0cmlidXRlTmFtZToga2V5LFxuICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWUsXG4gICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZSxcbiAgICAgICAgYWN0aW9uOiAnY2hhbmdlJyxcbiAgICAgIH07XG4gICAgICBpZihvbGRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNoYW5nZS5hY3Rpb24gPSAnYWRkJztcbiAgICAgIH1cbiAgICAgIGNoYW5nZWRBdHRyaWJ1dGVzLnB1c2goY2hhbmdlKTtcbiAgICB9XG4gIH1cblxuICBmb3Ioa2V5IGluIG9sZE9iamVjdCkge1xuICAgIG5ld1ZhbHVlID0gbmV3T2JqZWN0W2tleV07XG4gICAgaWYobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb2xkVmFsdWUgPSBvbGRPYmplY3Rba2V5XTtcbiAgICAgIGNoYW5nZWRBdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBrZXksXG4gICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZSxcbiAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgICBhY3Rpb246ICdyZW1vdmUnLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNoYW5nZWRBdHRyaWJ1dGVzO1xufTtcblxuZnVuY3Rpb24gY2xvbmUgKG9iamVjdCkge1xuICBpZih0eXBlb2Yob2JqZWN0KSA9PT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmplY3QpKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4ge307XG4gIH1cbn07XG5cbndpbmRvdyAmJiAod2luZG93Lk1vZGVsID0gTW9kZWwpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IE1vZGVsOyIsIm1vZHVsZS5leHBvcnRzPWZ1bmN0aW9uKG4pe3ZhciBvPXt9LHQ9W107bj1ufHx0aGlzLG4ub249ZnVuY3Rpb24obix0LGUpeyhvW25dPW9bbl18fFtdKS5wdXNoKFt0LGVdKX0sbi5vZmY9ZnVuY3Rpb24obixlKXtufHwobz17fSk7Zm9yKHZhciBmPW9bbl18fHQsaT1mLmxlbmd0aD1lP2YubGVuZ3RoOjA7aS0tOyllPT1mW2ldWzBdJiZmLnNwbGljZShpLDEpfSxuLmVtaXQ9ZnVuY3Rpb24obil7Zm9yKHZhciBlLGY9b1tuXXx8dCxpPTA7ZT1mW2krK107KWVbMF0uYXBwbHkoZVsxXSx0LnNsaWNlLmNhbGwoYXJndW1lbnRzLDEpKX19OyJdfQ==
;