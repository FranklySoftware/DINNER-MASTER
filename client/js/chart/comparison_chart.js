(function(){
	App.Chart.comparisonChart = Backbone.View.extend({
		width:400,
		height:780,
		initialize:function($el){
			var self = this;
				self.$el = $el;
				self.data = App.data.me;

				self.svg = d3.select(this.$el.get(0)).append("svg")
				    .attr("width", this.width )
				    .attr("height", this.height )
				    .style("width", '100%')
				    .style("height", '100%')
				    .attr("viewBox", "0 0 "+this.width+" "+this.height )
				    .attr("preserveAspectRatio", "xMinYMin meet" )
				    .append("g")
				    .attr("transform", "translate(0,60)");

				self.update();
		},
		update:function(){

			var self = this;


			var W = self.width;
			var H = self.height;
			var Margin = {
				left:50,
				right:40,
				top:0,
				bottom:40
			};

			// Users --
			var UserNode = {
				radius : 30,
				gap : 160,
				color : '#000',
				textOffset : 0
			};
		    var userG = self.svg.selectAll(".userG")
	            .data(self.data.usersMatched.slice(0,5))
	            .enter()
	            .append("g")
	            .attr("id", function(d,i){
	            	return "id"+d.ibm_id;
	            })
	            .attr("transform", function(d, i) {
						return "translate(10," + i * UserNode.gap + ")"
				})
	            .attr("class", function(d,i){
	            	return "userG id"+d.ibm_id;
	            });

	            var userImg = userG.append("pattern")
					.attr("id", function(d,i){
						return "profile_image"+d.ibm_id
					})
					.attr("patternUnits", "objectBoundingBox")
					.attr("width", 1 )
					.attr("height", 1 )
					.append("image")
					.attr("xlink:href", function(d,i){ 
						return d.profile_image || "/img/defaultProfile.svg";
					})
					.attr("x", 0)
					.attr("y", 0)
					.attr("width", UserNode.radius*2 )
					.attr("height", UserNode.radius*2 );

			    var userNode = userG.append("circle")
		            .attr("cx", ( UserNode.radius ))
		            // .attr("cy", function(d,i){ return i * UserNode.gap })
		            .attr("cy", 0)
		            .attr("r", UserNode.radius )
		            .attr("fill", function(d,i){
		            	return "url(#profile_image"+d.ibm_id+")";
		            })
		            .style("stroke", "rgb(135,208,236)")  // colour the line
					.attr('stroke-width', 3 )


		        var userName = userG.append("text")
		        	.attr("x", function(d,i) { return 0 })
		            .attr("y", function(d,i) { return ( UserNode.radius*2 ) + UserNode.textOffset })
		            .attr("color", UserNode.color )
		            // .attr("text-anchor", "end") // text-align: right 
		        	.text(function(d) { return d.first_name });

		        var skillSpacing = 30;

		        var userSkills = userG.selectAll(".commonSkills")
		        	.data(function(d) { return d.commonSkills.slice(0,4) })
		        	.enter()
		        	.append('text')
		        	.attr('class', 'commonSkills')
		        	.attr('text-anchor', 'end')
		        	.attr('id', function(d,i){ return "" })
		        	.attr("x", function(d,i) { return W - (Margin.right / 4) })
		            .attr("y", function(d,i) { return (i * skillSpacing) - (UserNode.radius) })
		            .text(function(d) { return d });
		           
		           // wrapped in stupid timeout so we can measure text widths for line alignment
		        setTimeout(function(){
        	        var wLens = {}; // measured lengths of text for line alignment
        	        var skillTexts = self.svg.selectAll(".commonSkills")[0];
        	        // console.log('skillTexts:', skillTexts.length, skillTexts);
        	        for (var i = 0; i < skillTexts.length; i++) {
        	        	wLens[skillTexts[i].innerHTML] = skillTexts[i].getComputedTextLength();
        	        }
        	        
        	        var userSkillLines = userG.selectAll(".commonSkillLines")
        	        	.data(function(d) { return d.commonSkills.slice(0,4) })
        	        	.enter()
        	        	.append('line')
        	        	.attr("x1", function(d,i) { return 0; })
        	            .attr("y1", 0 )
        				.style("stroke", "rgba(135,208,236,0.4)")  // colour the line
        				.attr('stroke-width', 2 )
        				.attr("x2", function(d,i) { 
        					// console.log(d);
        					// console.log(wLens, wLens[d]);
        					return W - (Margin.right / 4) - wLens[d];
        				})
        	            .attr("y2", function(d,i) { return (i * skillSpacing) - (UserNode.radius) - 5 })
        	            // .text(function(d) { return d });
        	         

        	        self.svg.selectAll("line").moveToBack();
		        }, 10)
		        

		        	// .data(self.data.)

		    // Skills --
		 //    var SkillNode = {
			// 	radius : 6,
			// 	gap : 75,
			// 	color : 'rgb(135,208,236)',
			// 	textOffset : 15
			// };
		 //    var skillG = self.svg.selectAll(".skillG")
	  //           .data(self.data.skillsMatched.slice(0,10))
	  //           .enter()
	  //           .append("g")
	  //           .attr("class", function(d,i){
	  //           	return "skillG " + "idz"+i;
	  //           });

			// 	var skillNode = skillG.append("circle")
			//             .attr("cx", Margin.left )
			//             .attr("cy", function(d,i){ return i * SkillNode.gap })
			//             .attr("r", SkillNode.radius )
			//             .style("fill", SkillNode.color )

			//     var skillText = skillG.append("text")
			//         	.attr("x", function(d,i) { return Margin.left - SkillNode.radius })
			//             .attr("y", function(d,i) { return ( i*SkillNode.gap ) + ( SkillNode.radius*2 ) + SkillNode.textOffset })
			//             .attr("color", SkillNode.color )
			//         	.text(function(d) { return d.skill });


			// conncetion lines

		   	// _.each(self.data.skillsMatched,function(skill,i){
		   	// 	var start={};
		   	// 	var selectSkill = self.svg.select('.idz'+ i);
		   	// 	if( selectSkill.size() ){
		   	// 		start.cx = selectSkill.select('circle').attr('cx');
		   	// 		start.cy = selectSkill.select('circle').attr('cy');
		   	// 	}else{
		   	// 		start = null;
		   	// 	}
		   	// 	_.each(skill.matches,function(matchId,i){
		   	// 		var target = {};
		   	// 		var matchedNode = self.svg.select('#id'+matchId);
		   	// 		if( matchedNode.size() ){
		   	// 			target.cx = matchedNode.select('circle').attr('cx');
		   	// 			target.cy = matchedNode.select('circle').attr('cy');
		   	// 		}else{
		   	// 			target = null;
		   	// 		}
		   	// 		if(start !== null && target !== null){
	   		// 			//Draw Line --
		   	// 			self.svg.append("line")          // attach a line
						//     .style("stroke", "rgba(135,208,236,0.6)")  // colour the line
						//     .attr('stroke-width', 2 )
						//     .attr("x1", start.cx)     // x position of the first end of the line
						//     .attr("y1", start.cy)      // y position of the first end of the line
						//     .attr("x2", target.cx)     // x position of the second end of the line
						//     .attr("y2", target.cy);    // y position of the second end of the line
	   		// 		}	
		   	// 	});
		   	// });

		   	// self.svg.selectAll("line").moveToBack();




			// self.svg.append("line")          // attach a line
			//     .style("stroke", "black")  // colour the line
			//     .attr("x1", 100)     // x position of the first end of the line
			//     .attr("y1", 50)      // y position of the first end of the line
			//     .attr("x2", 300)     // x position of the second end of the line
			//     .attr("y2", 150);    // y position of the second end of the line

		// -----


		// var data = [ {name: "p1", children: [{name: "c1"}, {name: "c2"}, {name: "c3"}, {name: "c4"}]}];
	 //    var width = self.width,
	 //    	height = self.height, 
	 //    	radius = 10, 
	 //    	gap = 50;
	 //    var nodes = [];
	 //    var links = [];
	 //    data.forEach(function(d, i) {
	 //        d.x = width/10;
	 //        d.y = height/2;
	 //        nodes.push(d);
	 //        d.children.forEach(function(c, i) {
	 //            c.x = 3*width/4;
	 //            c.y = gap * (i +1) -2*radius;
	 //            nodes.push(c);
	 //            links.push({source: d, target: c});
	 //        })
	 //    });






	 //    var diagonal = d3.svg.diagonal()
	 //        .source(function(d) { return {"x":d.source.y, "y":d.source.x}; })            
	 //        .target(function(d) { return {"x":d.target.y, "y":d.target.x}; })
	 //        .projection(function(d) { return [d.y, d.x]; });
	 //    var link = self.svg.selectAll(".link")
  //           .data(links)
  //           .enter().append("path")
  //           .attr("class", "link")
  //           .attr("d", diagonal)
  //           .attr("stroke","red")
  //           .attr("fill", "transparent");



	    // Nodes
	    // var circle = self.svg.selectAll(".circle")
     //        .data(nodes)
     //        .enter()
     //        .append("g")
     //        .attr("class", "circle");

	    // var el = circle.append("circle")
     //        .attr("cx", function(d) {return d.x})
     //        .attr("cy", function(d) {return d.y})
     //        .attr("r", radius)
     //        .style("fill", function(d) {return "#000";})
     //        .append("title").text(function(d) {
     //        	return d.name
     //        });
     //    var text = circle.append("text")
     //    	.attr("x", function(d) {return d.x})
     //        .attr("y", function(d) {return d.y+25})
     //        .attr("color","red")
     //    	.text(function(d) {return d.name});


		}
	});
})();