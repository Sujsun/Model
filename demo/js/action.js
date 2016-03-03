var object = {
  name: 'Sundarasan',
  age: 24,
};

var model = new Model(object);

model.on('change:name', function (change) {
  console.log('Changed "name":', change);
});

model.on('change', function (change) {
  console.log('Model changed:', change);
});

model.set('name', 'Surendar');

model.set('height', 5.8);

model.unset('age');