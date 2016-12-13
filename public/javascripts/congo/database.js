Congo.DatabaseView = Backbone.View.extend({
	tagName: 'tr',
	
	events: {
		'click a': 'sayHello',
		'click button': 'sayHello'
	},

	sayHello: function() {
		alert('Row says hello');
	},
	
	render: function() {
		var template = $('#database-list-template').html();
		var compiled = _.template(template, {name: "Templated name"});

		$(this.el).html(compiled);

		return this;
	}
});

Congo.DatabaseListView = Backbone.View.extend({
	tagName: 'table',
	className: 'table table-striped',
	render: function() {
		var els = [];

		for (var i = 5; i >= 0; i--) {
			els.push(new Congo.DatabaseView().render().el);
		}

		$(this.el).html(els);
		$('#database-list').html(this.el);
	}
});
