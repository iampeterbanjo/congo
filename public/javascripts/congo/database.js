Congo.Database = Backbone.Model.extend({
	url: function() {
		return '/mongo-api/dbs/' + this.id;
	},

	validate: function(attrs) {
		if (_.isEmpty(attrs.name)) {
			return 'Name required';
		}
	},

	idAttribute: 'name'
});

Congo.DatabaseCollection = Backbone.Collection.extend({
	model: Congo.Database,
	url: '/mongo-api/dbs'
});

Congo.DatabaseOptionView = Congo.View.extend({
	events: {
		'submit form': 'addDb'
	},

	template: '#new-db-template',

	addDb: function(event) {
		event.preventDefault();

		var newDbName = $('#newDb').val();
		var model = new Congo.Database({
			name: newDbName
		});
		model.save();
		Congo.databases.add(model);
		$('#newDb').val('');
	}
});

Congo.DatabaseView = Congo.ItemView.extend({
	tagName: 'tr',
	
	events: {
		'click button': 'remove'
	},

	template: '#database-list-template'
});

Congo.DatabaseListView = Congo.ListView.extend({
	tagName: 'table',
	className: 'table table-striped',

	ItemView: Congo.DatabaseView
});

Congo.DatabaseLayoutView = Congo.LayoutView.extend({
	template: '#database-details-template',

	regions: {
		databaseList: '#database-list',
		databaseOptions: '#database-options' 
	},

	layoutReady: function() {
		var databaseListView = new Congo.DatabaseListView({
			collection: this.collection
		});
		var optionView = new Congo.DatabaseOptionView();

		this.databaseList.append(databaseListView.render().el);
		this.databaseOptions.append(optionView.render().el);
	}
});
