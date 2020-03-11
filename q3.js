d3.csv('q3_bot.csv', function(data) {
	console.log(data);
	var q3_div = document.getElementById("baddies");

	var hoverElement = document.getElementById('q3tooltip');
	// hoverElement.id = "container_" + e + "hover";
	// hoverElement.innerHTML = data[e].text;
	hoverElement.style.display = 'none';
	// hoverElement.class = "tooltip";
	// newElement.appendChild(hoverElement);

	for (var e in data) {
		var newElement = document.createElement('div');
		newElement.id = "container_" + e;
		console.log(data[e]);
		newElement.innerHTML = data[e].trigram;
		console.log(data[e].text);
		q3_div.appendChild(newElement);

		newElement.addEventListener("mouseover", function (event) 
			{
				hoverElement = document.getElementById("q3tooltip")
				hoverElement.innerHTML = data[event.target.id.charAt(event.target.id.length - 1)].text;
				hoverElement.style.display = 'block';
			});

		newElement.addEventListener("mouseout", function (event) 
			{
				hoverElement = document.getElementById("q3tooltip")
				hoverElement.innerHTML = '';
				hoverElement.style.display = 'none';
			});
	}
});