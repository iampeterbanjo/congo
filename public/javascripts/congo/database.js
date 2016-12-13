Congo.DatabaseView = Backbone.View.extend({
	tagName: 'tr',
	
	events: {
		'click a': 'sayHello'
	},

	sayHello: function() {
		alert('Row says hello');
	},
	
	render: function() {
		$(this.el).html('<td><a href="#">DB Name</a></td>');

		return this;
	}
});

Congo.DatabaseListView = Backbone.View.extend({
	tagName: 'table',
	className: 'table table-stripped',
	render: function() {
		var els = [];

		for (var i = 5; i >= 0; i--) {
			els.push(new Congo.DatabaseView().render().el);
		}

		$(this.el).html(els);
		$('#database-list').html(this.el);
	}
});
