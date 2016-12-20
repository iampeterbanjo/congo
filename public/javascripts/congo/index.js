var Congo = {
	init: function() {
		var crumbView = new Congo.BreadcrumbView({
			el: '#breadcrumbs'
		});
		crumbView.render();

		var dbs = new Congo.Databases();
		var databaseList = new Congo.DatabaseListView({
			collection: dbs
		});
		databaseList.render();
		dbs.fetch().fail(function(collection, error) {
			console.warn('Error: %s', error);
		});
	}
};
