var Congo = {
	init: function() {
		// data
		Congo.databases = new Congo.DatabaseCollection();

		// views
		Congo.breadcrumbs = new Congo.BreadcrumbView({
			el: '#nav'
		});

		Congo.Details = new Congo.DetailsView({
			el: '#details',
			template: '#database-details-template'
		});

		// go
		this.start();
	},

	start: function() {
		Congo.databases.fetch();
	}
};
