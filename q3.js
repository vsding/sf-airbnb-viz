d3.csv('q3_bot.csv', function(data) {
	setup_q3("baddies", "baddies_q3tooltip", "bad", data);
});

d3.csv('q3_top.csv', function(data) {
	setup_q3("goodies", "goodies_q3tooltip", "good", data);
})

function setup_q3(q3_div_id, tooltip_id, class_type, data)
{
	var q3_div = document.getElementById(q3_div_id);

	var hoverElement = document.getElementById(tooltip_id);
	hoverElement.style.display = 'none';
	hoverElement.style.fontFamily = 'IBM Plex Sans';
	hoverElement.style.fontWeight = 100;
	hoverElement.style.fontSize = 15;
	hoverElement.style.lineHeight = 1.833;
	hoverElement.style.color = 0;

	for (var e in data) {
		var newElement = document.createElement('div');
		newElement.textContent = data[e].trigram;
		newElement.className += class_type;
		newElement.style.fontFamily = 'IBM Plex Sans';
		newElement.style.fontWeight = 100;
		newElement.style.fontSize = 18;
		newElement.style.fontStyle = 'italic';
		newElement.style.lineHeight = 1.833;

		newElement.id = "container_" + e;
		console.log(newElement.className);
		console.log(data[e].text);
		q3_div.appendChild(newElement);

		newElement.addEventListener("mouseover", function (event) 
			{
				var newColor;
				if (event.target.classList.contains('bad'))
					newColor = "#FF5733";
				else if (event.target.classList.contains('good'))
					newColor = "#77E36C";
				event.target.style.color = newColor;
				hoverElement = document.getElementById(tooltip_id)
				var fullText = data[event.target.id.charAt(event.target.id.length - 1)].text;
				var triGram = data[event.target.id.charAt(event.target.id.length - 1)].trigram;
				var startPosition = fullText.search(triGram);
				var endPosition = startPosition + triGram.length;

				spans = []
				var span = "<span>" + fullText.slice(0, startPosition) + "</span>";
				spans.push(span);
				span = "<span style='background-color: " + newColor + ";'>" + fullText.slice(startPosition, endPosition) + "</span>";
				spans.push(span);
				span = "<span>" + fullText.slice(endPosition, fullText.length) + "</span>";
				spans.push(span);
				hoverElement.innerHTML = spans.join(" ");
				hoverElement.style.display = 'block';
			});

		newElement.addEventListener("mouseout", function (event) 
			{
				event.target.style.color = 'black';
				hoverElement = document.getElementById(tooltip_id);
				hoverElement.innerHTML = '';
				hoverElement.style.display = 'none';
			});
	}
}


var good_trigrams = [];
var bad_trigrams = [];

d3.csv('q3_bot_total_list.csv', function(data) {
	for (var e in data) {
		if (data[e].trigram) {
			console.log(data[e].trigram)
			bad_trigrams.push(data[e].trigram);
		}
	}
});

d3.csv('q3_top_total_list.csv', function(data) {
	for (var e in data) {
		if (data[e].trigram) {
			console.log(data[e].trigram)
			good_trigrams.push(data[e].trigram);
		}
	}
});

console.log(good_trigrams)
console.log(bad_trigrams)


var input_form = document.getElementById("paragraphEdit");
input_form.addEventListener("input", function (event) {
	var start_loc = event.target.selectionStart;
	var text = event.target.innerText;
	event.target.innerHTML = spanColors(text, good_trigrams, bad_trigrams);

	try {
		var range = document.createRange();
		var sel = window.getSelection();
		console.log(event.target.children);
		range.setStart(event.target.children[event.target.children.length - 1], 1);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
		event.target.focus();
	} catch (err) {
		console.log (err);
		var range = document.createRange();
		var sel = window.getSelection();
		console.log(event.target.children);
		range.setStart(event.target.children[event.target.children.length - 1], 0);
		range.collapse(true);
		sel.removeAllRanges();
		sel.addRange(range);
		event.target.focus();
	}
});

function wrap_span(array, style)
{
	return '<span' + style + '>' + array.join(' ') + '</span>';
}

function in_dict(array, dict)
{
	var full = array.join(' ');
	for (var e in dict)
	{
		if (full.trimLeft().trimRight().replace(/[.,\/#!?$%\^&\*;:{}=\-_`~()]/g,"").toLowerCase() === dict[e].toString().toLowerCase())
			return true;
	}
	return false;
}

function spanColors(text, good, bad)
{
	var split_text = text.split(" ");
	var combined_split = [];

	var current = [];
	for (i = 0; i < split_text.length - 2; i++) { 
		if (in_dict([split_text[i], split_text[i + 1], split_text[i + 2]], good)) {
			combined_split.push(wrap_span(current, ''));
			combined_split.push(
				wrap_span([split_text[i], split_text[i + 1], split_text[i + 2]], 
					' style="background-color: #77E36C;"'));
			i += 2;
			current = [];
		} else if (in_dict([split_text[i], split_text[i + 1], split_text[i + 2]], bad)) {
			combined_split.push(wrap_span(current, ''));
			combined_split.push(
				wrap_span([split_text[i], split_text[i + 1], split_text[i + 2]], 
					' style="background-color: #FF5733;"'));
			i += 2;
			current = [];
		} else {
			current.push(split_text[i]);
		}
	}

	for (; i < split_text.length; i++)
		current.push(split_text[i]);
	combined_split.push(wrap_span(current, ''));
	return combined_split.join(' ');
}