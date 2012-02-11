//	Properties:
//		styles: container | container-fluid | row | row-fluid | span* | offset*
(function(undefined) {
    var viewType = "text";
    
	window.gaffa.views = window.gaffa.views || {};
	window.gaffa.views[viewType] = window.gaffa.views[viewType] || newView();
    
	function createElement(viewModel) {
		var classes = viewType;
        
        var renderedElement = $(document.createElement('span')).addClass(classes);
                
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
                            element.html(value);
                        }
                    }                    
                },
                subType: function(viewModel, value, firstRun) {
                   if (viewModel.properties.subType.value !== value || firstRun) {
                       viewModel.properties.subType.value = value;
                       var element = viewModel.renderedElement;
                       if (element) {
                           element.attr('type', value);
                       }
                   }
                },
                placeholder: function(viewModel, value, firstRun) {
                   if (viewModel.properties.placeholder.value !== value || firstRun) {
                       viewModel.properties.placeholder.value = value;
                       var element = viewModel.renderedElement;
                       if (element) {
                           element.attr('placeholder', value);
                       }
                   }              
                }
			},
            defaults: {
                properties: {
                    visible: {},
                    text: {}
                }
            }
		};
        
        $.extend(true, view.prototype, window.gaffa.views.base(viewType, createElement), view.prototype);
                
		return new view();
	}
})();