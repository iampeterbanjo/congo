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

Congo.ItemView = Congo.View.extend({
	remove: function () {
		var confirmed = confirm("Delete this? You sure?");
		if (confirmed) {
			this.model.destroy();
		}
	}
});

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

Congo.AppLayout = Backbone.View.extend({
	hideEverything: function() {
		this.$(this.options.detailRegion).empty();
		this.$(this.options.editorRegion).hide();
	},
	
	renderEditor: function(thing) {
		this.hideEverything();
		var docJSON = JSON.stringify(thing, null,'  ');
		//render out the ace editor
		this.$(this.options.editorRegion).show();
		var editor = ace.edit("ace-editor");
		var JsonMode = require("ace/mode/json").Mode;
		editor.getSession().setMode(new JsonMode());
		editor.setValue(docJSON);   
		editor.selection.clearSelection();
	},

	renderDetails: function (detailView) {
		this.hideEverything();
		//pass the region in on init...
		this.$(this.options.detailRegion).empty();
		detailView.render();
		this.$(this.options.detailRegion).append(detailView.el);
	}
});
