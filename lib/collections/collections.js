Orders = new Mongo.Collection('orders');

Orders.attachSchema(new SimpleSchema({
	userId: {
		type: String,
		autoValue: function(){	return this.userId;	},
		autoform: { omit: true}
	},
	userName: {
		type: String,
		autoValue: function(){ return Meteor.user().username; },
		autoform: { omit: true}
	},
	createdAt: {
		type: Date,
		autoValue: function(){
			if (this.isInsert){ return new Date(); }
			else { this.unset(); }
		},
		autoform: { omit: true}
	},
	extras: {
      type: String,
      label: "Extra",
      optional: true
   },
   mainOrder: {
      type: String,
      label: "Coffee",
      optional: false
   },
   collectTime: {
   	type: Date,
   	min: function(){return new Date();},
   	max: function(){return moment("16:30","HH:mm").toDate();},
   	label: "Collection Time",
   	optional: false,
   	autoValue: function(){
   		if (this.isInsert){
	   		t = this.value;
	   		return moment(t,"HH:mm").toDate();
	   	}
	   	else {
	   		this.unset();
	   	}
   	},
   	// min: function() { 
   	// 	return new Date();
   	// }
   },
   complete: {
   		type: Boolean,
   		defaultValue: false

   }
}));

ItemNames = new Mongo.Collection('itemNames');

ItemNames.attachSchema(new SimpleSchema({
	item: {
		type: String,
		label: "Item Name",
		max: 30
	}
}));

SimpleSchema.messages({
	minDate: "You must select a time after: " + moment().format('HH:mm'),
	maxDate: "You must select a time before close of business today"
});

ExtraItems = new Mongo.Collection('extraItems');

ExtraItems.attachSchema(new SimpleSchema({
	item: {
		type: String,
		label: "Extra Name",
		max: 30
	}
}));

OpenTimes = new Mongo.Collection('openTimes');

OpenTimes.attachSchema(new SimpleSchema({
	open: {
		type: Date,
		label: "Open Time",
		optional: false,
		autoValue: function(){
   		t = this.value;
   		return moment(t,"HH:mm").toDate();
   		} 
	},
	close: {
		type: Date,
		label: "Close Time",
		optional: false,
		autoValue: function(){
   		t = this.value;
   		return moment(t,"HH:mm").toDate();
   		}
	}
}));