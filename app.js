window.app = window.app || {};
app.isVisualizationLoaded = false;

document.getElementById('tipo-grafico').onchange = function() {
	drawChart(parseInt(this.value));
};

google.load('visualization', '1.0', {packages: ['corechart', 'table']});
google.setOnLoadCallback(function() {
	app.isVisualizationLoaded = true;
	drawChart(parseInt(document.getElementById('tipo-grafico').value));
});

var drawChart = function(type) {
	if (app.isVisualizationLoaded) {
		var chart, table, dataTable;
		
		$.getJSON('http://127.0.0.1:1234', function(datos) {
			dataTable = new google.visualization.DataTable();
			dataTable.addColumn('string', 'Diagnóstico');
			dataTable.addColumn('number', '2004');
			dataTable.addColumn('number', '2005');
			dataTable.addColumn('number', '2006');
			dataTable.addColumn('number', '2007');
			dataTable.addColumn('number', '2008');
			dataTable.addColumn('number', '2009');
			dataTable.addColumn('number', '2010');
			dataTable.addColumn('number', '2011');
			dataTable.addColumn('number', '2012');
			
			$(datos).each(function() {
				dataTable.addRow([
					this.diagnostico,
					parseInt(this._1) || 0, // operador or logico seusa tambien en expresiones, no solo en instrucciones condicionales.
					parseInt(this._2) || 0,
					parseInt(this._3) || 0,
					parseInt(this._4) || 0,
					parseInt(this._5) || 0,
					parseInt(this._6) || 0,
					parseInt(this._7) || 0,
					parseInt(this._8) || 0,
					parseInt(this._) || 0
				]);
			});
			
			table = new google.visualization.Table(document.getElementById('table'));
				table.draw(dataTable, {
					width: 1200,
					height: 200
				});
				
				switch (type) {
					case 1: 
						chart = new google.visualization.BarChart(document.getElementById('chart'));
						break;
					case 2:
						chart = new google.visualization.ColumnChart(document.getElementById('chart'));
						break;
					default:
						chart = new google.visualization.PieChart(document.getElementById('chart'));
				}
					
				chart.draw(dataTable, {
					width: 1200,
					height: 800
				});
		});
		
		// Carga los datos de un archivo en el filesystem
		/*
		$.ajax({
			url: 'data/estadisticas_epidemias_virales.json',
			dataType: 'json',
			mimeType: 'text/plain',
			success: function(datos) {
				dataTable = new google.visualization.DataTable();
				dataTable.addColumn('string', 'virus');
				dataTable.addColumn('number', '2009');
				dataTable.addColumn('number', '2010');
				dataTable.addColumn('number', '2008');
				dataTable.addColumn('number', '2011');
				dataTable.addColumn('number', '2012');
				
				$(datos.data).each(function() {
					// Es posible implementar la conversion del objeto a array con
					// la función map de jquery: $.map
					dataTable.addRow([
						this['virus'],
						this['2008'],
						this['2009'],
						this['2010'],
						this['2011'],
						this['2012']
					]);
				});
				
				table = new google.visualization.Table(document.getElementById('table'));
				table.draw(dataTable, {
					width: 700,
					height: 150
				});
				
				switch (type) {
					case 1: 
						chart = new google.visualization.BarChart(document.getElementById('chart'));
						break;
					case 2:
						chart = new google.visualization.ColumnChart(document.getElementById('chart'));
						break;
					default:
						chart = new google.visualization.PieChart(document.getElementById('chart'));
				}
					
				chart.draw(dataTable, {
					width: 700,
					height: 300
				});
			} 
		});
		*/
		
	} else {
		console.log('The package corechart of visualization module is not loaded!');
	}
}
