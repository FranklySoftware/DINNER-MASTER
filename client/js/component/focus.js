(function(){
	App.Component.focus = Backbone.View.extend({
		id:'focus',
		className:'focus',
	    initialize:function(){
	    	var self = this;
		    	self.template = _.template($("#focus-template").html());
		    	self.render();
	    },
	    render:function(){

	    	var data = {};
				data.company = {};
				data.group = {};
	    	data.your = {};
				data.your.list = App.data.me.subjects.slice(0,4);
				// _.each(data.your.list, function(d,i){ d.relevance = (+d.relevance*100).toFixed(0); });
				if(!data.your.list.length){ data.your.list =[{text:"-"}];  }

				if (typeof (App.data.me.companySubjects) != 'undefined'){
					data.companyName = App.data.me.company;
					data.company.list = App.data.me.companySubjects.slice(0,4);
					// _.each(data.company.list, function(d,i){ d.relevance = (+d.relevance*100).toFixed(0); });
					if(!data.company.list.length){ data.company.list =[{text:"-"}];  }
				}

				if (typeof (App.data.me.groupSubjects) != 'undefined'){
					data.group.list = App.data.me.groupSubjects.slice(0,4);
					console.log('datagroup list:');
					console.log(data.group.list);
					// _.each(data.company.list, function(d,i){ d.relevance = (+d.relevance*100).toFixed(0); });
					if(!data.group.list.length){ data.group.list =[{text:"-"}];  }
				}

	    	var self = this;
	    		self.$el.append( self.template(data) );
	    	return self;
	    }
	});
})();
