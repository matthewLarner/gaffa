//	Properties:
//		text: quote
//		cite: citation
//		citeHref: cittation link
(function(undefined) {
    var viewType = "quote";
    
	window.gaffa.views = window.gaffa.views || {};
	window.gaffa.views[viewType] = window.gaffa.views[viewType] || newView();
    
	function createElement(viewModel) {
		var classes = "quote";
    	if (gaffa.utils.propExists(viewModel, "properties.classes.value")) {
            classes += " " + viewModel.properties.classes.value;
		}
		if (gaffa.utils.propExists(viewModel, "properties.alignment.value")) {
			switch (viewModel.properties.alignment.value)
			{
				case "right":
					classes += " pull-right";
					break;
				case "left":
					classes += " pull-left";
					break;
				default:
                    break;
            }
		}

        var paragraph = $(document.createElement('p')),
            small = $(document.createElement('small')),
            cite = $(document.createElement('cite')),
			renderedElement = $(document.createElement('blockquote')).addClass(classes).append(paragraph).append(small.append(cite));
                
		return renderedElement;
	}

	function newView() {
		
		function view() {
		}	
		
		view.prototype = {
			update: {
                text: function(viewModel, value, firstRun) {
                    if(viewModel.properties.text.value !== value || firstRun){
                        viewModel.properties.text.value = value;
                        var element = viewModel.renderedElement;
                        if(element){
                            element.find('p').text(value);
                        }
                    }                    
                },
                cite: function(viewModel, value, firstRun) {
                    if (!viewModel.properties.citeHref.value)
                    {
	                    if(viewModel.properties.cite.value !== value || firstRun){
	                        viewModel.properties.cite.value = value;
	                        var element = viewModel.renderedElement;
	                        if (element) {
	                            element.find('cite').text(value);
	                        }
	                    }
                    }                    
                },
                citeHref: function(viewModel, value, firstRun) {
                    if(viewModel.properties.citeHref.value !== value || firstRun){
                        viewModel.properties.citeHref.value = value;
                        var element = viewModel.renderedElement;
                        if (element) {
                            element.find('cite').append($(document.createElement('a')).text(viewModel.properties.cite.value).attr('href', value).attr('target', '_blank'));

                        }
                    }                    
                }
			},
            defaults: {
                properties: {
                    visible: {},
                    text: {},
                    cite: {},
                    citeHref: {},
                    alignment: {}
                }
            }
		};
        
        $.extend(true, view.prototype, window.gaffa.views.base(viewType, createElement), view.prototype);
                
		return new view();
	}
})();