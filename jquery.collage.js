(function($){
    $.fn.extend({          
        collagize: function(options) {
            var defaults = {

            }
                 
            var options =  $.extend(defaults, options);
 
            return this.each(function() {
				var obj = $(this);
				var containers = $("div", obj);
				// initially images are not being dragged 
				var dragging = false;
				// maintain maximum z-index
				var maxZindex = 1;
				
				// Place images at random positions
				containers.each(function(){
					$(this).css("position", "absolute");
					var directionRotate = Math.round(Math.random());
					if(directionRotate == 1) {
						var degrees = Math.floor((30)*Math.random()) + 330;
					} else {
						var degrees = Math.floor((30)*Math.random());
					}

					var width = $(this).parent().width();
					var height = $(this).parent().height();
					var position = $(this).parent().offset();
					
					// Find corners of div
					var corners = [[position.left, position.top], [position.left + width - $(this).width(), position.top], [position.left + width - $(this).width(), position.top + height - $(this).height()], [position.left, position.top + height - $(this).height()]];

					var left = Math.random()*(width - $(this).width()) + position.left;
					var top = Math.random()*(height - $(this).height()) + position.top;

					var styles = { 'left' : left,
						'top' : top,
						'-webkit-transform' : 'rotate('+ degrees +'deg)', 
						'-moz-transform' : 'rotate('+ degrees +'deg)',  
						'transform' : 'rotate('+ degrees +'deg)'
					};
					$(this).css(styles);
				});
				
				// Display clicked image on top
				$(containers).mouseup(function(e){
					if(!dragging) {
						maxZindex++;
						var image = { 'z-index' : maxZindex,
						'transform' : 'rotate(0deg)',
						'-moz-transform' : 'rotate(0deg)',
						'-webkit-transform' : 'rotate(0deg)' };
						$(this).css(image);
					}
				});
				
				// Dragging functions
				$(containers).draggable({
					containment: 'parent',
					cursor: 'crosshair',
					start: function(event, ui) {
						dragging = true;
						maxZindex++;
						var image = { 'box-shadow' : '#888 3px 4px 4px',
							'-webkit-box-shadow' : '#888 3px 4px 4px',
							'-moz-box-shadow' : '#888 3px 4px 4px',
							'padding-left' : '-4px',
							'padding-top' : '-4px',
							'z-index' : maxZindex };
						$(this).css(image);
					},
					stop: function(event, ui) {
						var tempVal = Math.round(Math.random());
						if(tempVal == 1) {
							var rotDegrees = Math.floor((30)*Math.random()) + 330;
						} else {
							var rotDegrees = Math.floor((30)*Math.random());
						}
						var image = { 'box-shadow' : '',
							'-webkit-box-shadow' : '',
							'-moz-box-shadow' : '',
							'transform' : 'rotate('+ rotDegrees +'deg)',
							'-webkit-transform' : 'rotate('+ rotDegrees +'deg)',
							'-moz-transform' : 'rotate('+ rotDegrees +'deg)',
							'margin-left' : '0px',
							'margin-top' : '0px' };
						$(this).css(image);
						dragging = false;
					}
				});
            });
        }
    });
     
})(jQuery);