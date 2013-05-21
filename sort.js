Numbers = new Meteor.Collection('names');

if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to sort.";
    {{}}
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });

  Template.hello.numbers = function() {
    return Numbers.find();
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    var max = Numbers.find({}, {sort:{n:-1}, limit:1}).fetch()[0] || {n:0};

    Numbers.insert({n:max.n + 1});
  });
}
