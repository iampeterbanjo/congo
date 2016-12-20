Congo.Database = Backbone.Model.extend({
	url: function() {
		return '/mongo-api/dbs/' + this.id;
	},
	idAttribute: 'name'
});

Congo.DatabaseCollection = Backbone.Collection.extend({
	model: Congo.Database,
	url: '/mongo-api/dbs'
});

Congo.DatabaseOptionView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},

	events: {
		'submit form': 'addDb'
	},

	addDb: function(event) {
		event.preventDefault();

		var newDbName = $('#newDb').val();
		var model = new Congo.Database({
			name: newDbName
		});
		model.save();
		Congo.databases.add(model);
		$('#newDb').val('');
	},

	render: function() {
		var source = $('#new-db-template').html();
		var compiled = _.template(source);
		this.$el.html(compiled);

		return this;
	}
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
		var compiled = _.template(template, this.model.toJSON());
		this.$el.html(compiled);

		return this;
	}
});

Congo.DatabaseListView = Backbone.View.extend({
	tagName: 'table',
	className: 'table table-striped',

	initialize: function() {
		this.collection.bind('reset', this.render, this);
		this.collection.bind('add', this.render, this);
		this.collection.bind('remove', this.render, this);

		this.render();
		this.renderOptionView();
	},

	renderOptionView: function() {
		this.optionView = new Congo.DatabaseOptionView({
			el: '#db-options'
		});
	},

	render: function() {
		var els = [];

		this.collection.each(function(model) {
			els.push(new Congo.DatabaseView({
				model: model
			}).render().el);
		});

		this.$el.html(els);
		$('#database-list').append(this.el);
	}
});
