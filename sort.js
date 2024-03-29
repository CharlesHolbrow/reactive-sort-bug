Numbers = new Meteor.Collection('names');

if (Meteor.isClient) {
  Template.hello.numbers = function() {
    return Numbers.find();
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {

    // publish the Numbers collection, sorted descending
    Meteor.publish('numbers', function() {
      return Numbers.find({}, {sort:{n:-1}, limit:100});
    });

    // Add example documents: {n:1}, {n:2} ... {n:6}
    if (Numbers.find().count() === 0) {
      for (var i = 0; i < 6; i++) {
        var max = Numbers.find({}, {sort:{n:-1}, limit:1}).fetch()[0] || {n:0};
        Numbers.insert({n:max.n + 1});
      }
    }

  });
}

if (Meteor.isClient) {
  Meteor.startup(function() {
    Meteor.subscribe('numbers');
  });
}
