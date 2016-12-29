var Congo = {
	init: function() {
		// data
		Congo.databases = new Congo.DatabaseCollection();

		// views
		Congo.breadcrumbs = new Congo.BreadcrumbView({
			el: '#nav'
		});

		// go
		this.start();
	},

	showDatabases: function() {
		var databaseLayout = new Congo.DatabaseLayoutView({
			collection: Congo.databases
		});

		$('#details').append(databaseLayout.render().el);
		Congo.databases.fetch();
	},

	start: function() {
		this.showDatabases();
	}
};
