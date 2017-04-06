(function(){
	App.Component.footprint = Backbone.View.extend({
		id:'footprint',
		className:'footprint',
	    initialize:function(){
	    	var self = this;
		    	self.template = _.template($("#digital-footprint-template").html());
		    	self.render();
	    },
	    render:function(){
	    	var self = this;
	    	var blocksFound = (App.data.me.digitalFootprint/1000).toFixed(0);
 			var leftOver = Math.abs( 10 - (((blocksFound/10)%1).toFixed(1)*10) );
			var blocks = [];
			for(var i=0; i < blocksFound; i++){ blocks.push({class:'found'}); }
			for(var i=0; i < leftOver+20; i++){ blocks.push({class:''}); }
	    	self.$el.append( self.template({
	    		companyName: App.data.me.company,
	    		blocks:blocks,
	    		percentage:App.data.me.digitalFootprintPercentage,
					companyPercentage:App.data.me.companyDigitalFootprintPercentage,
					groupPercentage:App.data.me.groupDigitalFootprintPercentage

	    	}) );
	    	return self;
	    }
	});
})();
