var Congo = {
	init: function() {
		var crumbView = new Congo.BreadcrumbView({
			el: '#breadcrumbs'
		});
		crumbView.render();

		var dbs = new Congo.Databases();
		dbs.fetch().then(function(collection, response, options) {
			var databaseList = new Congo.DatabaseListView({
				collection: dbs
			});
			databaseList.render();
		}).fail(function(collection, error) {
			console.warn('Error: %s', error);
		});
	}
};
