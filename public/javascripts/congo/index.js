var Congo = {
	init: function() {
		var crumbView = new Congo.BreadcrumbView({
			el: '#breadcrumbs'
		});
		crumbView.render();

		var databaseList = new Congo.DatabaseListView();
		databaseList.render();
	}
};
