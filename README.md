# Model
A simple javascript model class with event emitters

##Example:
```javascript
var person = {
  name: 'Sundarasan',
  age: 24,
  height: 5.8,
  language: 'Tamil'
};

/**
 * Creates instance of Model
 */
var personModel = new Model(person);

/**
 * Sets a property with given value
 */
personModel.set('name', 'Surendar');

/**
 * Sets n number of property
 */
personModel.set({ age: 32 });

/**
 * Unsets a property
 */
personModel.unset('height');

personModel.unset(['height', 'language']);

/**
 * Gets value of a property
 */
personModel.get('name');

/**
 * Returns the model JSON
 */
personModel.toJSON();

/**
 * Attaches event to model
 */
// Attaching "change" event for a attribute
personModel.on('change:name', function (event) {
  /**
   * event = {
   *   attributeName: "name",
   *   oldValue: <OldValue>,
   *   newValue: <NewValue>,
   *   action: <"add"/"remove"/"change">
   * };
   */
});

// Attaching "change" event for whole model
personModel.on('change', function (eventsArray) {
  /**
   * eventsArray = [{
   *   attributeName: <PropertyName>,
   *   oldValue: <OldValue>,
   *   newValue: <NewValue>,
   *   action: <"add"/"remove"/"change">
   * },
   * ...
   * ...
   * ];
   */
});
```