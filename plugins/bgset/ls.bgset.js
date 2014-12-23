document.addEventListener('lazybeforeunveil', (function(){
	'use strict';
	var parent = document.createElement('div');

	return function(e){
		var set, image, load, sizes;

		if(e.defaultPrevented || !(set = e.target.getAttribute('data-bgset'))){return;}
		image = document.createElement('img');
		sizes = e.target.getAttribute('data-sizes');
		image.setAttribute('sizes', sizes && sizes != 'auto' ? sizes : (e.target.offsetWidth +'px'));

		load = function(){
			var bg = image.currentSrc || image.src;
			if(bg){
				e.target.style.backgroundImage = 'url('+ bg +')';
			}
			if(lazySizes.cfg.clearAttr){
				e.target.removeAttribute('data-bgset');
			}
			image.removeEventListener('load', load);
			parent.removeChild(image);
			image = null;
		};

		image.addEventListener('load', load);

		image.setAttribute('srcset', set);
		parent.appendChild(image);

		if(!window.HTMLPictureElement){
			if(window.respimage){
				respimage({elements: [image]});
			} else if(window.picturefill) {
				picturefill({elements: [image]});
			}
		}

		if(image.complete && (image.src || image.currentSrc)){
			load();
		}
	};
})());
