// Master View


(function(){
	App.View.home = Backbone.View.extend({
		id:"home-view",
		initialize:function(){

	    	var self = this;
		    	self.$parent = $('#backbone-app');
		    	self.render();

	    },
/*	    toggleInfoBlock: function(e) {

	    	e.preventDefault();
	    	var $target = $(e.currentTarget);
	    		$target.toggleClass('active');
	    		$target.siblings('p').toggleClass('active');

	    },*/
	    toggleInfoBlock: function(e) {
	    	e.preventDefault();
	    	var $target = $(e.currentTarget);

				$target.toggleClass('active');
				$target.parent().toggleClass('active');
				$target.parent().parent().toggleClass('active');
				//$target.parent().toggleClass('active');
	    		//$target.siblings('p').toggleClass('active');

	    },
	    scrollToAnchor:function(e){

				console.log('scroll to anchor');
				e.preventDefault();
				var $target = $(e.currentTarget);
				var href = $( $target.attr('href') ).offset();
				console.log(href);
				if (href){
					var adjust = href.top;
					if (adjust > 0){adjust += 75}//account for header button padding to next section
					$('html, body').animate({ scrollTop: adjust }, 500);
				}
				return false;

	    },
	    render:function(){

	    	var self = this;
				self.$el.append( new App.Component.headerPersonality().$el );
				self.$el.append( new App.Component.footprint().$el );
				self.$el.append( new App.Component.static1().$el );
	    		self.$el.append( new App.Component.focus().$el );
	    		//self.$el.append( new App.Component.skillsComparison().$el );
					self.$el.append( new App.Component.static2().$el );
	    		self.$el.append( new App.Component.personality().$el );
					self.$el.append( new App.Component.static3().$el );
	    		self.$el.append( new App.Component.outro().$el );
	    		self.$parent.append( self.$el );

					/*$(".info-block span").click(self.toggleInfoBlock);
				$("a[href*=\\#]").click(self.scrollToAnchor);*/

			$(".info-block").click(self.toggleInfoBlock);
			$("a[href*=\\#]").click(self.scrollToAnchor);

	    	return self;
	    }
	});
})();
