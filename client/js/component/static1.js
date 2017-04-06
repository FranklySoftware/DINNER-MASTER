(function(){
	App.Component.static1 = Backbone.View.extend({
		id:'static1',
		className:'static1',
	    initialize:function(){
	    	var self = this;
		    	self.template = _.template($("#static1-template").html());
		    	self.render();
	    },
	    render:function(){
				var self = this;
				self.$el.append( self.template({

				}) );
	    	return self;
	    }
	});
	App.Component.static2 = Backbone.View.extend({
		id:'static2',
		className:'static1',
			initialize:function(){
				var self = this;
					self.template = _.template($("#static2-template").html());
					self.render();
			},
			render:function(){
				var self = this;
				self.$el.append( self.template({

				}) );
				return self;
			}
	});
	App.Component.static3 = Backbone.View.extend({
			id:'static3',
			className:'static1',
				initialize:function(){
					var self = this;
						self.template = _.template($("#static3-template").html());
						self.render();
				},
				render:function(){
					var self = this;
					self.$el.append( self.template({

					}) );
					return self;
				}
		});
})();
