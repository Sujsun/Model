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
},{"minivents":2}],2:[function(require,module,exports){
module.exports=function(n){var o={},t=[];n=n||this,n.on=function(n,t,e){(o[n]=o[n]||[]).push([t,e])},n.off=function(n,e){n||(o={});for(var f=o[n]||t,i=f.length=e?f.length:0;i--;)e==f[i][0]&&f.splice(i,1)},n.emit=function(n){for(var e,f=o[n]||t,i=0;e=f[i++];)e[0].apply(e[1],t.slice.call(arguments,1))}};
},{}]},{},[1])
//@ sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9zdW5kYXJhc2FuL0RvY3VtZW50cy9UZW5taWxlcy9naXQvbW9kZWwvaW5kZXguanMiLCIvVXNlcnMvc3VuZGFyYXNhbi9Eb2N1bWVudHMvVGVubWlsZXMvZ2l0L21vZGVsL25vZGVfbW9kdWxlcy9taW5pdmVudHMvZGlzdC9taW5pdmVudHMuY29tbW9uanMubWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0R0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbInZhciBFdmVudHMgPSByZXF1aXJlKCdtaW5pdmVudHMnKTtcblxuZnVuY3Rpb24gTW9kZWwgKGF0dHJpYnV0ZXMpIHtcbiAgdGhpcy5hdHRyaWJ1dGVzID0gdHlwZW9mKGF0dHJpYnV0ZXMpID09PSAnb2JqZWN0JyA/IGF0dHJpYnV0ZXMgOiB7fTtcbiAgdGhpcy5ldmVudCA9IG5ldyBFdmVudHMoKTtcbn1cblxuTW9kZWwucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChwcm9wZXJ0eSwgdmFsdWUpIHtcbiAgdmFyIG9iamVjdCxcbiAgICAgIGtleSxcbiAgICAgIG5ld09iamVjdCA9IGNsb25lKHRoaXMuYXR0cmlidXRlcyk7XG5cbiAgaWYgKHR5cGVvZihwcm9wZXJ0eSkgPT09ICdzdHJpbmcnKSB7XG4gICAgb2JqZWN0ID0ge307XG4gICAgb2JqZWN0W3Byb3BlcnR5XSA9IHZhbHVlO1xuICB9IGVsc2Uge1xuICAgIG9iamVjdCA9IGNsb25lKHByb3BlcnR5KTtcbiAgfVxuXG4gIGZvcihrZXkgaW4gb2JqZWN0KSB7XG4gICAgbmV3T2JqZWN0W2tleV0gPSBvYmplY3Rba2V5XTtcbiAgfVxuXG4gIHRyaWdnZXJDaGFuZ2VzKHRoaXMuZXZlbnQsIHRoaXMuYXR0cmlidXRlcywgbmV3T2JqZWN0KTtcblxuICB0aGlzLmF0dHJpYnV0ZXMgPSBuZXdPYmplY3Q7XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICByZXR1cm4gdGhpcy5hdHRyaWJ1dGVzW2tleV07XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUudW5zZXQgPSBmdW5jdGlvbiAocHJvcGVydHkpIHtcbiAgdmFyIG5ld09iamVjdCA9IGNsb25lKHRoaXMuYXR0cmlidXRlcyk7XG4gIGRlbGV0ZSBuZXdPYmplY3RbcHJvcGVydHldO1xuICB0cmlnZ2VyQ2hhbmdlcyh0aGlzLmV2ZW50LCB0aGlzLmF0dHJpYnV0ZXMsIG5ld09iamVjdCk7XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoKSB7XG4gIHRoaXMuZXZlbnQub24uYXBwbHkodGhpcy5ldmVudCwgYXJndW1lbnRzKTtcbn07XG5cbk1vZGVsLnByb3RvdHlwZS50b0pTT04gPSBmdW5jdGlvbiAoKSB7XG4gIHJldHVybiBjbG9uZSh0aGlzLmF0dHJpYnV0ZXMpO1xufTtcblxuZnVuY3Rpb24gdHJpZ2dlckNoYW5nZXMgKGV2ZW50LCBvbGRPYmplY3QsIG5ld09iamVjdCkge1xuICB2YXIgY2hhbmdlcyA9IGZpbmRDaGFuZ2VzKG9sZE9iamVjdCwgbmV3T2JqZWN0KSxcbiAgICAgIGluZGV4LCBjaGFuZ2U7XG4gIGZvcihpbmRleCBpbiBjaGFuZ2VzKSB7XG4gICAgY2hhbmdlID0gY2hhbmdlc1tpbmRleF07XG4gICAgZXZlbnQuZW1pdCgnY2hhbmdlOicgKyBjaGFuZ2UuYXR0cmlidXRlTmFtZSwgY2hhbmdlKTtcbiAgfVxuICBpZiAoY2hhbmdlcy5sZW5ndGggPiAwKSB7XG4gICAgZXZlbnQuZW1pdCgnY2hhbmdlJywgY2hhbmdlcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZmluZENoYW5nZXMgKG9sZE9iamVjdCwgbmV3T2JqZWN0KSB7XG4gIHZhciBrZXksXG4gICAgICBvbGRWYWx1ZSxcbiAgICAgIG5ld1ZhbHVlO1xuXG4gICAgICBjaGFuZ2VkQXR0cmlidXRlcyA9IFtdO1xuXG4gIGZvcihrZXkgaW4gbmV3T2JqZWN0KSB7XG4gICAgbmV3VmFsdWUgPSBuZXdPYmplY3Rba2V5XTtcbiAgICBvbGRWYWx1ZSA9IG9sZE9iamVjdFtrZXldO1xuICAgIGlmKG5ld1ZhbHVlICE9PSBvbGRWYWx1ZSkge1xuICAgICAgY2hhbmdlZEF0dHJpYnV0ZXMucHVzaCh7XG4gICAgICAgIGF0dHJpYnV0ZU5hbWU6IGtleSxcbiAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlLFxuICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmb3Ioa2V5IGluIG9sZE9iamVjdCkge1xuICAgIG5ld1ZhbHVlID0gbmV3T2JqZWN0W2tleV07XG4gICAgaWYobmV3VmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgb2xkVmFsdWUgPSBvbGRPYmplY3Rba2V5XTtcbiAgICAgIGNoYW5nZWRBdHRyaWJ1dGVzLnB1c2goe1xuICAgICAgICBhdHRyaWJ1dGVOYW1lOiBrZXksXG4gICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZSxcbiAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNoYW5nZWRBdHRyaWJ1dGVzO1xufVxuXG5mdW5jdGlvbiBjbG9uZSAob2JqZWN0KSB7XG4gIGlmKHR5cGVvZihvYmplY3QpID09PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG9iamVjdCkpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiB7fTtcbiAgfVxufTtcblxud2luZG93Lk1vZGVsID0gTW9kZWw7XG5cbm1vZHVsZS5leHBvcnRzID0gTW9kZWw7IiwibW9kdWxlLmV4cG9ydHM9ZnVuY3Rpb24obil7dmFyIG89e30sdD1bXTtuPW58fHRoaXMsbi5vbj1mdW5jdGlvbihuLHQsZSl7KG9bbl09b1tuXXx8W10pLnB1c2goW3QsZV0pfSxuLm9mZj1mdW5jdGlvbihuLGUpe258fChvPXt9KTtmb3IodmFyIGY9b1tuXXx8dCxpPWYubGVuZ3RoPWU/Zi5sZW5ndGg6MDtpLS07KWU9PWZbaV1bMF0mJmYuc3BsaWNlKGksMSl9LG4uZW1pdD1mdW5jdGlvbihuKXtmb3IodmFyIGUsZj1vW25dfHx0LGk9MDtlPWZbaSsrXTspZVswXS5hcHBseShlWzFdLHQuc2xpY2UuY2FsbChhcmd1bWVudHMsMSkpfX07Il19
;