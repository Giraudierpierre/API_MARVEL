$(document).ready(init);

function init(){
	//console.log('ok');
	$("#suggestion-box").hide();
	$('.result').hide();
}

$("#search").keyup(function(){
	
	console.log(this.value.length);
		if(this.value.length == 0){
			$("#suggestion-box").empty();
			$(".result").empty();
			return;
		}

		$.ajax({
			type: "GET",
		  	url: "https://gateway.marvel.com/v1/public/characters?apikey=dd9ea014985c4b8acf52b282af3605df",
		  	data: 'nameStartsWith='+$(this).val(),

			success: function(result) {
				$("#suggestion-box").show();
				$("#suggestion-box").empty();

				if(result.data.results.length == 0){
					$("#suggestion-box").html('<li>No results</li>');
				}
				else {

					var nbresults = Math.min(4,result.data.results.length);
					for(i=0; i<nbresults; i++){
						$("#suggestion-box").append("<li data-id='"+ result.data.results[i].id +"'>" + result.data.results[i].name + "</li>");
					}

					$("li").click(function(){
						onListClick($(this));
					});

				}
		            
			},
				
		});
});

function onListClick($li) {
	$("#suggestion-box").hide();
	//console.log($li.data('id'));
	var id = $li.data('id');
		$.get( "https://gateway.marvel.com/v1/public/characters/"+ id +"?apikey=dd9ea014985c4b8acf52b282af3605df", function( data ) {
			//console.log((data.data.results[0]));
			$('.result').show();
	  		$('.result').append("<h2>"+data.data.results[0].name+"</h2>","<p>"+data.data.results[0].description+"</p>", "<img src="+ data.data.results[0].thumbnail.path +"."+ data.data.results[0].thumbnail.extension+">");
	  	});

	var name = $li.text();
	//console.log(name);
	document.getElementById('search').value = name;

}

	
