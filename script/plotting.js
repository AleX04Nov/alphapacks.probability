class MyChart{
	constructor(chartDivId){
		this.chartDivId = chartDivId;
		this.dataLineColor = "orange";
		this.dataLineType = "splineArea";
		this.stripLineColor = "blue";
		this.stripLineType = "dot";
		this.data = [];
		this.axisX = [];
		this.chart = 0;
	}
	
	get_new_chart(){
		if (this.chart!=0){
			this.chart.destroy();
			this.chart = null;
		}
		this.data =[];
		this.axisX=[];
		this.chart = new CanvasJS.Chart(this.chartDivId, {
			animationEnabled: true,
			animationDuration: 2000,
			exportEnabled: true,
			zoomEnabled: true,
			title: {text: "dqwd"},
			backgroundColor: "transparent",
			axisX : this.axisX,
			axisY :{
				includeZero:true,
				minimum: 0,
				suffix: "\u2800%"
			},
			data: this.data  // random generator below
		});
	}
	
	plotDistribution(add_win, add_loss, win){
		this.get_new_chart();
		//this.data=[]
		var limit = 250;
		var y = 0;
		var dataSeries = { 
			type: this.dataLineType,
			color: this.dataLineColor,
			markerSize: 3,
			yValueFormatString: "0.00' %'"
		};
		var dataPoints = [];
		var last_distr = 0;
		var view_max_set = false;
		var view_max = 0;
		var temp = 0;
		var MathExp = 0;
		for (var i = 0; i < limit; i += 1) {
			temp = alpha_pack2(i, add_win, add_loss, win);
			y += temp * 100;
			if ( (Math.round10(y, -2) == Math.round10(last_distr, -2)) && (view_max_set == false) ){
				view_max_set = true;
				view_max = i;
				console.log(view_max);
			}
			MathExp += i * temp;
			dataPoints.push({
				x: i,
				y: y                
			});
			last_distr = y;
		}
		dataSeries.dataPoints = dataPoints;
		console.log(MathExp);
		this.data.push(dataSeries);
		this.axisX.push({
			stripLines: [{
				value: MathExp,
				label: "Average Matches",
				showOnTop: true,
				lineDashType: this.stripLineType,
				color: this.stripLineColor,
				labelFontColor: this.stripLineColor,
			}],
			viewportMinimum: 0,
			viewportMaximum: view_max
		});

		this.chart.options.title.text = this.chartTitle;
		
		
		
		this.chart.render();
		
		setTimeout(() => {
			var childElement = document.getElementsByTagName("button");
			if (childElement[0].getAttribute("state") === "pan"){
				childElement[0].click();
			}
		}, 3000);
		
		
		
	}
	
	plotProbability(add_win, add_loss, win){
		this.get_new_chart();
		var limit = 250;
		var y = 0;
		var dataSeries = { 
			type: this.dataLineType,
			color: this.dataLineColor,
			markerSize: 3,
			yValueFormatString: "0.00' %'"
		};
		var dataPoints = [];
		var last_probab = 0;
		var view_max_set = false;
		var view_max = 0;
		var temp = 0;
		var MathExp = 0;
		for (var i = 0; i < limit; i += 1) {
			temp = alpha_pack2(i, add_win, add_loss, win);
			y = temp * 100;
			if ( (Math.round10(y, -2) == Math.round10(last_probab, -2)) && (view_max_set == false) ){
				view_max_set = true;
				view_max = i;
				console.log(view_max);
			}
			MathExp += i * temp;
			dataPoints.push({
				x: i,
				y: y                
			});
			last_probab = y;
		}
		dataSeries.dataPoints = dataPoints;
		console.log(MathExp);
		this.data.push(dataSeries);
		this.axisX.push({
			stripLines: [{
				value: MathExp,
				label: "Average Matches",
				showOnTop: true,
				lineDashType: this.stripLineType,
				color: this.stripLineColor,
				labelFontColor: this.stripLineColor,
				labelAlign: "near"
			}],
			viewportMinimum: 0,
			viewportMaximum: view_max
		});

		this.chart.options.title.text = this.chartTitle;
		
		
		
		this.chart.render();
		
		setTimeout(() => {
			var childElement = document.getElementsByTagName("button");
			if (childElement[4].getAttribute("state") === "pan"){
				childElement[4].click();
			}
		}, 3000);
	}
	
}





