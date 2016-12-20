Congo.Database = Backbone.Model.extend({

});

Congo.Databases = Backbone.Collection.extend({
	model: Congo.Database,
	url: '/mongo-api/dbs'
});

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
		var compiled = _.template(template, this.model);

		$(this.el).html(compiled);

		return this;
	}
});

Congo.DatabaseListView = Backbone.View.extend({
	tagName: 'table',
	className: 'table table-striped',
	render: function() {
		var dbs = new Congo.Databases();
		dbs.fetch().then(function(models) {
			var els = [];

			models.forEach(function(model) {
				els.push(new Congo.DatabaseView({
					model: model
				}).render().el);
			});

			$(this.el).html(els);
			$('#database-list').html(this.el);
		}.bind(this));
	}
});
