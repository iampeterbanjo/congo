Congo.ListView = Backbone.View.extend({
	initialize: function() {
		this.collection.bind('reset', this.render, this);
		this.collection.bind('add', this.render, this);
		this.collection.bind('remove', this.render, this);

		this.render();
	},

	render: function() {
		var els = [];
		var self = this;

		this.collection.each(function(model) {
			els.push(new self.ItemView({
				model: model
			}).render().el);
		});

		this.$el.html(els);
		return this;
	}
});

Congo.View = Backbone.View.extend({
	initialize: function() {
		this.render();
	},

	render: function() {
		var data = this.model ? this.model.toJSON() : {};
		var source = $(this.template).html();
		var compiled = _.template(source, data);
		this.$el.html(compiled);

		return this;
	}
});

Congo.DetailsView = Backbone.View.extend({
	initialize: function() {
		this.render();
	},

	render: function() {
		var source = $(this.options.template).html();
		var compiled = _.template(source);
		this.$el.html(compiled);

		var listView = new Congo.DatabaseListView({
			collection: Congo.databases
		});
		var optionView = new Congo.DatabaseOptionView();

		var $databaseList = this.$('#database-list');
		var $databaseOption = this.$('#database-options');

		$databaseList.append(listView.render().el);
		$databaseOption.append(optionView.render().el);

		this.$el.append($databaseList);
		this.$el.append($databaseOption);

		return this;
	}
});
