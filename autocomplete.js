(function() {
	// function hasClass(element,className) {
	// 	return element.classList ? element.classList.contains(className) : new RegExp('\\b*'+className+"\\b*").test(element.className)
	// }
	var autoComplete = function(options) {


		function addEvent(element,type,handler) {
			if (element.addEventListener) {
				element.addEventListener(type,handler,false)
			}else{
				element.attachEvent("on"+type,handler)
			}
		}

		function createSuggestionContaioner(search_box) {
			var suggestions_contaioner = document.createElement('div');
			suggestions_contaioner.className = 'sc';

			//TODO: 
			search_box.parentNode.appendChild(suggestions_contaioner);
			search_box.sc = suggestions_contaioner;
		}

		function createSuggestionContaionerChild(search_box) {
			var suggestions_contaioner = document.createElement('div');
			suggestions_contaioner.className = 'sc';

			//TODO: 
			search_box.appendChild(suggestions_contaioner);
			search_box.style.position = "positive"
			search_box.sc = suggestions_contaioner;
		}

		var input = document.getElementById(options.id);
		var value = input.value;

		//TODO: 从options中获取source
		var source = options.source || ['java','javascript','ruby','css','html','python'];
		input.cache = {a:1};
		console.log(input.cache)
		//建立自动补全项目容器
		createSuggestionContaioner(input);

		input.keyupHandler = function(e) {
			var value = this.value;
			var suggestions = [];
			var items = [];
			var sc = this.sc;

			function getSuggestions() {
				if ( value in input.cache) { return; }
				for (var i = 0; i < source.length; i++) {
					s_item = source[i].toLowerCase();
					if (value != "" && ~s_item.indexOf(value.toLowerCase())) {
						suggestions.push(s_item);
					}
				}
				if (suggestions) {
					input.cache[value] = [];
					input.cache[value] = suggestions;
				}
			}
			var render_suggestion =  function() {
				sc.innerHTML = "";
				for (var i = 0; i < input.cache[value].length; i++) {
				     items[i] =( '<p data-val="' + input.cache[value][i] + '">' + input.cache[value][i] + '</p>');
				}
				sc.innerHTML = items.join("");
				sc.style.display = "block";
			}

			if (e.keyCode != 38 && e.keyCode != 40 && e.keyCode != 9 && e.keyCode != 13 ) {
				getSuggestions();
				render_suggestion();
			}
		}


		addEvent(input,'keyup',input.keyupHandler);

		input.keydownHandler = function(e) {

			//TODO: 完善浏览器兼容
			var key = e.keyCode
			if ((key == 38 || key == 40) && this.sc.innerHTML ) {
				var selected = this.sc.querySelector('.selected');
				var next;
				if (!selected) {
					next = (key == 40) ? this.sc.childNodes[0] : this.sc.childNodes[this.sc.childNodes.length-1];
					next.className += " selected";
					this.value = next.getAttribute('data-val')
				}else{
					next = (key == 40) ? selected.nextSibling : selected.previousSibling;
					if (next) {
						selected.className = selected.className.replace(' selected','');
						next.className += " selected";
						this.value = next.getAttribute('data-val')
					}

				}
			}
			if (key == 13 || key == 9) {
				this.sc.style.display = "none";
			}
		}
		addEvent(input,'keydown',input.keydownHandler)
	}

	window.autoComplete = autoComplete;
})()