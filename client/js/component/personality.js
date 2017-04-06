(function(){
	App.Component.personality = Backbone.View.extend({
		id:'personality',
		className:'personality',
	    initialize:function(){
	    	var self = this;
		    	self.template = _.template($("#personality-template").html());
		    	self.render();
	    },
	    // events:{
	    // 	"click .tabs-nav a":function(e){
	    // 		var self = this;
	    // 		var currentEl = $(e.currentTarget);
	    // 			// Toggle tabs
	    // 			currentEl.siblings().removeClass('active');
	    // 			currentEl.addClass('active');
	    // 			// Toggle tab content
	    // 			var tabId = currentEl.attr('data-tab');
	    // 			self.$el.find('.tab-content').removeClass('active');
	    // 			self.$el.find('#'+tabId).addClass('active');
	    // 	}
	    // },
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
	    		//if(group){ data.push({name: label, value: group[label], class: 'company' }); }
	    		//if(sector){ data.push({name: label, value: sector[label], class: 'sector' }); }
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
	    },
	    renderBarChart: function() {
	    	// var self = this;

	    	// if( !App.data.me.personality && !App.data.me.companyPersonality ) return;

	    	// var data = [];
	    	// var labels = [
	    	// 	{name: "Agreeableness", display: "amenable"},
	    	// 	{name: "Conscientiousness", display: "diligent"},
	    	// 	{name: "EmotionalRange", display: "emotional range"},
	    	// 	{name: "Extraversion", display: "extraverted"},
	    	// 	{name: "Openness", display: "open to change"}
	    	// ];
	    	// var colors = {
	    	// 	me: "#e60f75",
	    	// 	company: "#5ab2e5",
	    	// 	sector:  '#e2e2e2'
	    	// };
	    	// var me = App.data.me.personality,
	    	// 	company = App.data.me.companyPersonality,
	    	// 	sector = App.data.me.sectorPersonality;

	    	// console.log(me, company, sector);
	    	// for (var label in me) {
	    	// 	data.push({name: label, value: me[label], color: colors.me });
	    	// 	data.push({name: label, value: company[label], color: colors.company });
	    	// 	data.push({name: label, value: sector[label], color: colors.sector });
	    	// }

	    	// console.log(data);

	    	// // console.log('todo')
	    	// var margin = {top: 0, right: 0, bottom: 0, left: 0},
	    	//     width = 500 - margin.left - margin.right,
	    	//     height = 400 - margin.top - margin.bottom;

	    	// var x = d3.scale.linear()
	    	//     // .range([0, width]);
	    	//     .range([0, (window.innerWidth <= width) ? width - 150 : width]);

	    	// var y = d3.scale.ordinal()
	    	//     .rangeRoundBands([0, height], 0.1);

	    	// // var xAxis = d3.svg.axis()
	    	// //     .scale(x)
	    	// //     .orient("bottom");

	    	// // var yAxis = d3.svg.axis()
	    	// //     .scale(y)
	    	// //     .orient("left")
	    	// //     .tickSize(0)
	    	// //     .tickPadding(6);
	    	// // console.log('drawing svg');
	    	// // d3.select(self.$el.find("#radar1").get(0))
	    	// var svg = d3.select(self.$el.find("#personalityBars").get(0)).append("svg")
	    	//     // .attr("width", width + margin.left + margin.right)
	    	//     .attr("width", (window.innerWidth <= width) ? width - 150 : width)
	    	//     .attr("height", height + margin.top + margin.bottom)
	    	//     .style("width", '100%')
	    	//     .style("margin", "0")
	    	//   .append("g")
	    	//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	    	// // d3.tsv("data.tsv", type, function(error, data) {
	    	//   x.domain(d3.extent(data, function(d) { return d.value; })).nice();
	    	//   y.domain(data.map(function(d) { return d.name; }));



	    	//   svg.selectAll(".bar")
	    	//       .data(data)
	    	//     .enter().append("rect")
	    	//     	.attr("class", "bar")
	    	//       // .attr("class", function(d) { return "bar bar--" + (d.value < 0 ? "negative" : "positive"); })
	    	//       .attr('fill', function(d) { return d.color })
	    	//       .attr("x", function(d) { return x(Math.min(0, d.value)); })
	    	//       .attr("y", function(d, i) { return y(d.name) + ((i % 3) * (y.rangeBand() / 4)); })
	    	//       .attr("width", function(d) { return Math.abs(x(d.value) - x(0)); })
	    	//       .attr("height", y.rangeBand() / 4 - 10)
	    	//   svg.selectAll('.barend')
	    	//   	.data(data)
	    	//   	.enter().append("ellipse")
	    	//        .attr('fill', function(d) { return d.color })
	    	//       .attr("cx", function(d) { return x(Math.max(0, d.value)) - 1; })
	    	//       .attr("cy", function(d, i) { return y(d.name) + ((i % 3) * (y.rangeBand() / 4)) + 4; })
	    	//       .attr("rx", 7.5 / 2)
	    	//       .attr("ry", 7.5 / 2)

	    	//    svg.append("g")
    	 //        .attr("transform", "translate(2,18)")
	    	//    	.selectAll(".label")
	    	//   	.data(labels)
	    	//   	.enter().append('text')
	    	//   	.attr('class', 'label')
	    	//   	.attr("y", function(d) { return y(d.name) + (y.rangeBand() * 0.6)  })
	    	//   	.text(function(d) { return d.display });
	    	//   // svg.append("g")
	    	//   //     .attr("class", "x axis")
	    	//   //     .attr("transform", "translate(0," + height + ")")
	    	//   //     .call(xAxis);

	    	//   // svg.append("g")
	    	//   //     .attr("class", "y axis")
	    	//   //     .attr("transform", "translate(" + x(0) + ",0)")
	    	//   //     .call(yAxis);
	    	// // });

	    	// function type(d) {
	    	//   d.value = +d.value;
	    	//   return d;
	    	// }
	    },
	    renderRadarChart:function(){

	  //   	if( !App.data.me.personality && !App.data.me.companyPersonality ) return;
	  //   	var self = this;


	  //   	var radarData_1 = [],
	  //   		radarData_2 = [];

	  //   	var me = App.data.me.personality,
	  //   		company = App.data.me.companyPersonality,
	  //   		sector = App.data.me.sectorPersonality;

	  //   	if( company ){
	  //   		var companyRadarPrep = {
	  //   			className: 'blue',
			// 	    axes: [
			// 	      	{axis: "open to change", value: company.Openness , yOffset: 10, xOffset: -50},
			// 	      	{axis: "dilligent", value: company.Conscientiousness, yOffset: -20 },
			// 	      	{axis: "extraverted", value: company.Extraversion , xOffset: -20, yOffset:-6 },
			// 	      	{axis: "agreeable", value: company.Agreeableness , xOffset: -50, yOffset:-6 },
			// 	      	{axis: "emotional range", value: company.EmotionalRange, yOffset: -20, xOffset: -110}
			// 	    ]
			// 	};
	  //   		radarData_1.push( companyRadarPrep );
	  //   		radarData_2.push( companyRadarPrep );
	  //   	};
	  //   	if( me ){
	  //   		radarData_1.push({
			//     	className: 'pink', // optional, can be used for styling
			// 	    axes: [
			// 	      	{axis: "open to change", value: me.Openness , yOffset: 10, xOffset: -50},
			// 	      	{axis: "dilligent", value: me.Conscientiousness, yOffset: -20 },
			// 	      	{axis: "extraverted", value: me.Extraversion , xOffset: -20, yOffset:-6 },
			// 	      	{axis: "agreeable", value: me.Agreeableness , xOffset: -50, yOffset:-6 },
			// 	      	{axis: "emotional range", value: me.EmotionalRange, yOffset: -20, xOffset: -110}
			// 	    ]}
			//     );
	  //   	};
	  //   	if( sector ){
	  //   		radarData_2.push({
	  //   			className: 'pink', // optional, can be used for styling
			// 	    axes: [
			// 	      	{value: sector.Openness },
			// 	      	{value: sector.Conscientiousness },
			// 	      	{value: sector.Extraversion },
			// 	      	{value: sector.Agreeableness },
			// 	      	{value: sector.EmotionalRange }
			// 	    ]}
			//     );
	  //   	};

	  //   	var chart = RadarChart.chart();
		 //    	chart.config({
			// 		factor: 0.7, //scales chart
			// 		w: 400,
			// 		h: 400,
			// 		factorLegend: true,
			// 		color: function(){},
			// 		axisLine: true,
			// 		axisText: true,
			// 		radius: 15,
			// 		axisJoin: function(d, i){ return d.className || i; }
			// 	});

	  //   	var radar_1 = d3.select(self.$el.find("#radar1").get(0))
	  //   		.append("svg")
			// 	.attr("width", "400" )
			//     .attr("height", "400" )
			//     .style("width", '100%')
			//     .style("height", '100%')
			//     .attr("viewBox", "0 0 400 400" )
			//     .attr("preserveAspectRatio", "xMinYMin meet" )
			// 	.append('g')
			// 	.datum(radarData_1)
			// 	.call(chart);

			// var radar_2 = d3.select(self.$el.find("#radar2").get(0))
			// 	.append("svg")
			// 	.attr("width", "400" )
			//     .attr("height", "400" )
			//     .style("width", '100%')
			//     .style("height", '100%')
			//     .attr("viewBox", "0 0 400 400" )
			//     .attr("preserveAspectRatio", "xMinYMin meet" )
			// 	.append('g')
			// 	.datum(radarData_2)
			// 	.call(chart);



	  //   	return self;
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
	    // events:{
	    // 	"click .tabs-nav a":function(e){
	    // 		var self = this;
	    // 		var currentEl = $(e.currentTarget);
	    // 			// Toggle tabs
	    // 			currentEl.siblings().removeClass('active');
	    // 			currentEl.addClass('active');
	    // 			// Toggle tab content
	    // 			var tabId = currentEl.attr('data-tab');
	    // 			self.$el.find('.tab-content').removeClass('active');
	    // 			self.$el.find('#'+tabId).addClass('active');
	    // 	}
	    // },
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
