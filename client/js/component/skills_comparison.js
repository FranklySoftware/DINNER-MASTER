(function(){
	App.Component.skillsComparison = Backbone.View.extend({
		id:'skills',
		className:'skills',
	    initialize:function(){
	    	var self = this;
		    	self.template = _.template($("#skills-comparison-template").html());
		    	self.render(); 
	    },
	    render:function(){
	    	if(!App.data.me.skills) return console.log('No interests found.');
	    	if(!App.data.me.skills.length) return console.log('No interests found.');
	    	
	    	var self = this;
    		var niche = App.data.me.skillsMatched.slice(10, App.data.me.skillsMatched.length );
    			niche = niche.reverse().slice(0,5);

    		self.$el.append( self.template( { 
    			niche:niche,
    			totalEventSkills : App.data.me.totalEventSkills
    		} ));
    		self.graph_el = self.$el.find('#comparison_graph');


	    	new App.Chart.comparisonChart( self.graph_el );

	    	return self;
	    }
	});
})();