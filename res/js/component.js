sap.ui.commons.Button
		.extend(
				"com.leandro.gp.excel.Excel",
				{
					// SAP UI5 Metadata convenience at work - Setter and getter
					// are created
					// behind the scenes, including data binding and type
					// validation
					metadata : { // Not to be confused with the Data Source
						// metadata property
						properties : {
							"name" : "string",
							"btnText" : null,
							"idcomp" : null
						}
					},
					setIdcomp : function(value) {
						this.idcomp = value;
						this.setText(this.getBtnText());
						this.setLite(true);
						this.setIcon("./excel.png");
						this
								.attachPress(function() {
									var tableToExcel = (function() {
										var uri = 'data:application/vnd.ms-excel;base64,', template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>', base64 = function(
												s) {
											return window
													.btoa(unescape(encodeURIComponent(s)));
										}, format = function(s, c) {
											return s.replace(/{(\w+)}/g,
													function(m, p) {
														return c[p];
													});
										};
										return function(table, name) {
											if (!table.nodeType)
												table = document
														.getElementById(table);
											var ctx = {
												worksheet : name || 'Worksheet',
												table : table.innerHTML
											};
											window.location.href = uri
													+ base64(format(template,
															ctx));
										};
									})();
									if (document.getElementById(value
											+ "_control"))
										tableToExcel(value + "_control",
												"table");
									else if (document.getElementById(value
											+ "_table"))
										tableToExcel(value + "_table", "table");
									else
										alert("Table not found, please configure the component ID property");
								});

					},
					getBtnText : function() {
						return this.btnText;
					},
					setBtnText : function(value) {
						this.btnText = value;
					},
					getIdcomp : function() {
						return this.idcomp;
					},
					// SAPUI5 Renderer, we can leave it aloneS
					renderer : {

					// render : function(rm, oControl) {
					// }
					},
					// Called by sap.designstudio.sdkui5.Handler
					// (sdkui5_handler.js)
					initDesignStudio : function() {
						try {
							/*
							 * var that = this; this.attachChange(function() {
							 * that.setSelectedKey(that.getSelectedItemId());
							 * that.setSelectedValue(that.getValue());
							 * that.fireDesignStudioPropertiesChanged( [
							 * "selectedValue", "selectedKey" ]);
							 * that.fireDesignStudioEvent("onchange"); });
							 */
						} catch (e) {
							alert(e); // Aw snap
						}

					}

				});