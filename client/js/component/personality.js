(function(){
	App.Component.personality = Backbone.View.extend({
		id:'personality',
		className:'personality',
	    initialize:function(){
	    	var self = this;
		    	self.template = _.template($("#personality-template").html());
		    	self.render();
	    },

	    render: function() {

	    	if( !App.data.me.personality && !App.data.me.groupPersonality ) return;

	    	var sample = {Openness: 0, Conscientiousness: 0, Extraversion: 0, Agreeableness: 0, EmotionalRange: 0};
				var childHTML = {Openness: '', Conscientiousness: '', Extraversion: '', Agreeableness: '', EmotionalRange: ''};

	    	var data = [];
	    	var me = App.data.me.personality,
	    		group = App.data.me.groupPersonality;
	    		//sector = App.data.me.sectorPersonality;

	    	//console.log(me,company,sector);

	    	for (var label in sample) {
					var childView = '<div class="children-view ui-flex">';
					_.each(me[label]['children'], function(c, i){
						childView += '<div class="child-view"><p class="roboto">'+ c.name + '</p>';
						childView += '<div class="bar-wrapper-child">';
						var range = c.percentage*100 / 20;
						for (var dot = 1; dot<6; dot++){
							childView += '<div class="bar">';
							if (range > 0 ){
								childView += '<span class='+label+'></span>';
							}else{
								childView += '<span class="per-block-default-color"></span>';
							}
							childView += '</div>';
							range -= 1;
						}
						childView += '</div></div>';
					});

					childView += '</div>';

					childHTML[label] = childView;

	    		if(me){ data.push({name: label, value: me[label]['pct'], class: 'me' }); }
	    	}

	    	data = _.groupBy(data, 'name');
	    	console.log(data);

	    	var self = this;
	    	self.$el.append(self.template(data));

				for (var perLabel in childHTML) {
					var perEl = self.$el.find("#"+perLabel+'-children');
					var newItem = $(childHTML[perLabel]);
					perEl.html(newItem);
				}

	    	return self;
	    }
	});
	App.Component.headerPersonality = Backbone.View.extend({
		id:'headerPersonality',
		className:'headerPersonality',
	    initialize:function(){
	    	var self = this;
		    	self.template = _.template($("#header-personality-template").html());
		    	self.render();
	    },
	    render: function() {

	    	if( !App.data.me.personality && !App.data.me.groupPersonality ) return;

	    	var sample = {Openness: 0, Conscientiousness: 0, Extraversion: 0, Agreeableness: 0, EmotionalRange: 0};

	    	var data = [];
	    	var me = App.data.me.personality;

	    	for (var label in sample) {
	    		if(me){ data.push({name: label, value: me[label]['pct'], class: 'me' }); }
	    		//if(group){ data.push({name: label, value: group[label], class: 'company' }); }
	    		//if(sector){ data.push({name: label, value: sector[label], class: 'sector' }); }
	    	}

	    	data = _.groupBy(data, 'name');
	    	console.log(data);

	    	var self = this;
	    	self.$el.append(self.template(data));


	    	return self;
	    }
		});
})();
