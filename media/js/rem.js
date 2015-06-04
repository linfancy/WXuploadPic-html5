! function(x) {
    function w() {
         var v, u, t, tes, 
                s = x.document,
                r = s.documentElement,
                a = r.getBoundingClientRect().width;
			
		if (!v && !u) {
				var n = !!x.navigator.appVersion.match(/AppleWebKit.*Mobile.*/);
				v = x.devicePixelRatio;
				tes = x.devicePixelRatio;
				v = n ? v : 1, u = 1 / v;
		}
		
		if(a>=960){
			r.style.fontSize = "40px";
		}
		else if (a<=320)  {
			r.style.fontSize = "20px";
		}
		else{
			r.style.fontSize = a / 16 + "px";
		}
    }

    x.addEventListener("resize", function() {
       w();
    });
    w();
}(window);