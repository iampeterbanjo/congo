var Congo = {
	init: function() {
		// data
		Congo.databases = new Congo.DatabaseCollection();

		// views
		Congo.breadcrumbs = new Congo.BreadcrumbView({
			el: '#breadcrumbs'
		});
		
		Congo.databaseList = new Congo.DatabaseListView({
			collection: Congo.databases
		});

		// go
		this.start();
	},

	start: function() {
		Congo.databases.fetch();
	}
};
