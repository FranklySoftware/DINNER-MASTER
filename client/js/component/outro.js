(function(){
	App.Component.outro = Backbone.View.extend({
		id:'outro',
		className:'outro',
	    initialize:function(){
	    	var self = this;
		    	self.template = _.template($("#outro-template").html());
		    	self.render(); 
	    },
	    events:{
	    	"click #contact-me":"contactMe"
	    },
	    contactMe:function(e){
	    	var self = this;
	    	var $current = $(e.currentTarget);
	    	var link = $current.attr('data-sender');

	    	$current.addClass('pending');

			var jqxhr = $.get(link,function(){}).done(function(d) {
  				$current.html('Thank you!');
  				$current.addClass('complete');
  				$current.removeClass('pending');
  			}).fail(function(err) {
				console.log( "error" , err );
				$current.removeClass('pending');
			}).always(function() {
				console.log( "Always" );
				$current.html('Thank you!');
  				$current.addClass('complete');
  				$current.removeClass('pending');
			});
	    },
	    render:function(){
	    	var self = this;
				self.$el.append( self.template( App.data.me ) );
	    	return self;
	    }
	});
})();