// фиксы для ie9
if(!window.console) {console={}; console.log = function(){};}

$( document ).ready(function() {

	// оборачивание всех таблиц в блок
	$("table").wrap("<div class='tableWrap'></div>");

	$('#slider').slick();

});