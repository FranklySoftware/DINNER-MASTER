(function(){
	App.Chart.donutChart = Backbone.View.extend({
		width:0,
		height:0,
		initialize:function($el){
			var self = this;
			self.$el = $el;



			self.update();
		},
		update:function(){

				var dataset = [
			        { name: 'IE', percent: 39.10, color:"red" },
			        { name: 'Chrome', percent: 32.51, color:"#e1e1e1" }
			    ];

			    var pie=d3.layout.pie()
			            .value(function(d){return d.percent})
			            .sort(null);

			    var w=200,h=200;

			    var outerRadius=w/2;
			    var innerRadius=(w/2)-10;

			    var arc=d3.svg.arc()
			            .outerRadius(outerRadius)
			            .innerRadius(innerRadius);

			    var svg=d3.select(this.$el.get(0))
			            .append("svg")
			            .attr({
			                width:w,
			                height:h,
			                class:'shadow'
			            }).append('g')
			            .attr({
			                transform:'translate('+w/2+','+h/2+')'
			            });

			    var path=svg.selectAll('path')
			            .data(pie(dataset))
			            .enter()
			            .append('path')
			            .attr({
			                d:arc,
			                fill:function(d,i){
			                    return d.data.color;
			                }
			            });
		}
	});
})();