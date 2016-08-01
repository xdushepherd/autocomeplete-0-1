(function() {

	function addEvent(element,type,handler) {
		if (element.addEventListener) {
			element.addEventListener(type,handler,false)
		}else{
			element.attachEvent("on"+type,handler)
		}
	}


	// function hasClass(element,className) {
	// 	return element.classList ? element.classList.contains(className) : new RegExp('\\b*'+className+"\\b*").test(element.className)
	// }
	var autoComplete = function(options) {
		var input = document.getElementById(options.id);
		input.style.position = "positive";
		var value = input.value;
		var source = options.source || ['java','javascript','ruby','css','html','python'];
		var suggestions_contaioner = document.createElement('div');
		console.log('done')
		suggestions_contaioner.className = 'sc';
		input.parentNode.appendChild(suggestions_contaioner);
		input.sc = suggestions_contaioner;
		var keyupHandler = function() {
			var value = input.value;
			var suggestions = [];
			var sc = this.sc;
			sc.innerHTML = "";
			for (var i = 0; i < source.length; i++) {
				s_item = source[i].toLowerCase();
				if (value != "" && ~s_item.indexOf(value.toLowerCase())) {
					suggestions.push(s_item);
				}
			}
			input.value = suggestions[0] || "";
			for (var i = 0; i < suggestions.length; i++) {
				    s_item = suggestions[i]
					var si = document.createElement('p');
					si.style.className = "si";
					sc.style.display = "block";
					si.innerHTML = s_item;
					sc.appendChild(si);
			}
		}
		addEvent(input,'keyup',keyupHandler);
	}

	window.autoComplete = autoComplete;
})()