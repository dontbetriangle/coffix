Meteor.methods({
  removeOrder: function (theId) {
    Orders.remove({'_id' : theId});
    console.log('removed Order' + theId);
  },
  updateOrder: function (theId) {
  	Orders.update({'_id': theId},{$set: {complete: true}});
  },
  newOrder: function(theOrder){
  	Orders.insert(theOrder);
  },
  getServerTime: function () {
            var _time = Date.now();
            return moment(_time).format();
        }

});