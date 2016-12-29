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

Congo.LayoutView = Backbone.View.extend({
	render: function() {
		var source = $(this.template).html();
		var compiled = _.template(source);
		this.$el.html(compiled);

		// loop over regions and make them available on this
		_.each(this.regions, function(selector, name) {
			this[name] = this.$(selector);
		}.bind(this));

		// emit an event to say that regions are ready
		if (this.layoutReady) {
			this.layoutReady();
		}

		return this;
	}
});
