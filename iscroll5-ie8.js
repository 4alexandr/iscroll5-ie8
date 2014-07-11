(function(){
/*IE8, tested on IScroll v5.0.6
add
	IScroll.utils = utils;
in your iscroll5.js
*/

	//define stopPropagation and preventDefault
	Event = Event || window.Event;
	Event.prototype.stopPropagation = Event.prototype.stopPropagation || function() {
		this.cancelBubble = true;
	};

	Event.prototype.preventDefault = Event.prototype.preventDefault || function () {
		this.returnValue = false;
	};

	//override utils.addEvent
	IScroll.utils.addEvent = function (el, type, fn, capture) {
		//el.addEventListener(type, fn, !!capture);
		if( fn instanceof Function ){
			jQuery(el).bind(type, fn);
		}else{
			if(!fn.toEvent) fn.toEvent = function(event){
				return fn.handleEvent(event.originalEvent);
			};
			jQuery(el).bind(type, fn.toEvent);
		}
	};

	//override utils.removeEvent
	IScroll.utils.removeEvent = function (el, type, fn, capture) {
		//el.removeEventListener(type, fn, !!capture);
		if( fn instanceof Function ){
			jQuery(el).unbind(type, fn);
		}else{
			if(!fn.toEvent) fn.toEvent = function(event){
				return fn.handleEvent(event.originalEvent);
			};
			jQuery(el).unbind(type, fn.toEvent);
		}
	};

}());