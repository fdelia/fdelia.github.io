jQuery.ajax({
	url: '../../wp-content/uploads/dir_up/px-x-1106010100_106_auto_mutmasslicheMangel_1.csv',
	dataType: 'text',
	contentType: "text/csv; charset:UTF-8",
	success: function(tsv){
		var columns;
		columns = loadData(tsv, false);
		drawChart('#chart', columns);

		columns = loadData(tsv, 3);
		drawChart('#chart_getoet', columns);
	}
});

jQuery.ajax({
	url: '../../wp-content/uploads/dir_up/px-x-1106010100_106_fussgaenger.csv',
	dataType: 'text',
	contentType: "text/csv; charset:UTF-8",
	success: function(tsv){
		var columns = loadDataFussgaenger(tsv);
		drawChart('#chart_fussgaenger', columns);	
	}
});

jQuery.ajax({
	url: '../../wp-content/uploads/dir_up/px-x-1106010100_105_jahre_fuehrerausweis.csv',
	dataType: 'text',
	contentType: "text/csv; charset:UTF-8",
	success: function(tsv){
		var obj = loadDataFuehrerschein(tsv);
		drawBarChart('#chart_fuehrerausweis', obj);	
	}
});

function drawBarChart(bindto, obj){
	var chart = c3.generate({
		bindto: bindto,
	    data: {
	        columns: [
	        	obj.columns
	        ],
	        type: 'bar'
	    },
	    axis: {
	    	x: {
	    		type: 'category',
	    		categories: obj.categories
	    	}
	    },
	    bar: {
	        width: {
	            ratio: 0.5 // this makes bar width 50% of length between ticks
	        }
	    },
	    legend: {
	    	show: false
	    },
	    tooltip: {
		    show: false
		}
	});
}

function loadDataFuehrerschein(TSV){
	var lines = TSV.split("\n");
	lines.shift(); lines.shift();
	var headers = lines.shift().replace(/\"/g, '').split("\t");

	var categories = [];
	var columns = ['Unfälle nach Jahre seit Führerausweiserteilung'];

	lines.forEach(function(d){
		var values = d.replace(/\"/g, '').split("\t");
		if (values.length < 3) return;

		// we leave this out
		if (values[1] === "16 Jahre und mehr") return;
		// make it per year
		if (values[1] === "6-10 Jahre") values[2] = parseInt(values[2]) / 5;
		if (values[1] === "11-15 Jahre") values[2] = parseInt(values[2]) / 5;
		categories.push(values[1]);

		columns.push(parseInt(values[2]));
	});

	return {
		categories: categories, 
		columns: columns
	};
}

function loadDataFussgaenger(TSV){
	var lines = TSV.split("\n");
	lines.shift(); lines.shift();
	var headers = lines.shift().replace(/\"/g, '').split("\t");

	var categories = [];
	var column = [];
	var total = 0;

	lines.forEach(function(d){
		var values = d.replace(/\"/g, '').split("\t");
		if (values.length < 3) return;

		var catName = values[0].replace("A: ", "").replace("B: ", "").replace("C: ", "").replace("D: ", "");
		categories.push(catName);

		var anzUnfalle = parseInt(values[2]);
		var index = categories.length - 1;		
		column[index] = anzUnfalle;
		total += anzUnfalle;
	});

	var columns = []; var rest = 0;
	for (var i=0; i<categories.length; i++){
		if (column[i] / total < 0.03) rest += column[i];
		else
			columns.push([categories[i], column[i]]);
	}
	columns.push(['Rest (summiert)', rest]);

	return columns;
}

function loadData(TSV, heaviness){
	var lines = TSV.split("\n");
	lines.shift(); lines.shift();
	var headers = lines.shift().replace(/\"/g, '').split("\t");
	// console.log(headers);

	var categories = [];
	var column = [];
	var total = 0;

	lines.forEach(function(d){
		var values = d.replace(/\"/g, '').split("\t");
		if (values.length < 6) return;
		// console.log(values);

		var catName = values[0].replace("A: ", "").replace("B: ", "").replace("C: ", "").replace("D: ", "");
		if (categories.indexOf(catName) === -1) categories.push(catName);

		// only take 2015
		var anzUnfalle = parseInt(values[5]);

		var index = categories.length - 1;
		// all
		if (! heaviness){
			if (column[index]) column[index] += anzUnfalle;
			else 				column[index] = anzUnfalle;
			total += anzUnfalle;
		}
		// schwer Verletzte
		if (heaviness === 2 && values[2] === "Unfall mit schwer Verletzten"){
			column[index] = anzUnfalle;
			total += anzUnfalle;
		}
		// Getötete
		if (heaviness === 3 && values[2] === "Unfall mit Getöteten"){
			column[index] = anzUnfalle;
			total += anzUnfalle;
		}
	});

	var columns = []; var rest = 0;
	var maxProz = 0.05;
	if (! heaviness) maxProz = 0.03;
	for (var i=0; i<categories.length; i++){
		if (column[i] / total < maxProz) rest += column[i];
		else
			columns.push([categories[i], column[i]]);
	}
	columns.push(['Rest (summiert)', rest]);

	return columns;
}

function drawChart(bindto, columns){
	var chart = c3.generate({
	    bindto: bindto,
	    data: {
	      columns: columns,
	      type: 'donut'
	    },
	    axis: {
	    	x: {
	    		label: 'Mutmassliche Mängel & Einflüsse',
	      		type: 'category'
	      		// categories: categories
	    	},
	    	y: {
	    		label: 'Unfälle Total'
	    	}
	    }
	});
}