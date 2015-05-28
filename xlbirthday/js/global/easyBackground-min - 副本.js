(function(e) {
    e.hexToRgb = function(e) {
        if (e.length == "4") {
            e = "#" + e.charAt(1) + e.charAt(1) + e.charAt(2) + e.charAt(2) + e.charAt(3) + e.charAt(3)
        }
        var t = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);
        return t ? {
            r: parseInt(t[1], 16),
            g: parseInt(t[2], 16),
            b: parseInt(t[3], 16)
        } : null
    };
    e.componentToHex = function(e) {
        var t = e.toString(16);
        return t.length == 1 ? "0" + t : t
    };
    e.rgbToHex = function(t, n, r) {
        return "#" + e.componentToHex(t) + e.componentToHex(n) + e.componentToHex(r)
    };
    e.fn.easyBackgroundParticles = function(t) {
        var n = t;
        var r = this[0].getContext("2d");
        var i = this.parent();
        var s = this[0];
        var o = [];
        if (n.shape.substr(0, 5) == "image") {
            var u = n.shape.split(":")[1];
            n.shape = "image";
            n.image = new Image;
            n.image.src = u
        }
        var a = function(e, t) {
            return Math.random() * (t - e) + e
        };
        var f = function() {
            s.width = i.width();
            s.height = i.height()
        };
        var l = function() {
            for (var e = 0; e < n.numParticles; e++) {
                var t = n.colors[~~a(0, n.colors.length)];
                var r = n.borderColors[~~a(0, n.borderColors.length)];
                var i = a(n.minBorderOpacity, n.maxBorderOpacity);
                var u = a(n.minOpacity, n.maxOpacity);
                o[e] = {
                    scale: a(n.minScale, n.maxScale),
                    x: a(0, s.width),
                    y: a(0, s.height),
                    rotation: 0,
                    xpeed: a(n.minSpeedX, n.maxSpeedX),
                    yspeed: a(n.minSpeedY, n.maxSpeedY),
                    rotationSpeed: a(n.minRotateSpeed, n.maxRotateSpeed),
                    color: "rgba(" + t + "," + u + ")",
                    opacity: u,
                    borderColor: "rgb(" + r + ")"
                }
            }
            h()
        };
        var c = function(e) {

            var t = n.baseSize * e.scale / 2;
        	r.fillStyle = e.color;
            if (n.border) {
                r.strokeStyle = e.borderColor;
                r.stroke()
            }
            r.beginPath();
            e.rotation += e.rotationSpeed;
            r.save();
            r.translate(e.x, e.y);
            r.rotate(e.rotation * Math.PI / 180);
            switch (n.shape) {
                case "circle":
                    r.arc(-t, -t, n.baseSize * e.scale, 0, 2 * Math.PI, false);
                    break;
                case "square":
                    r.fillRect(-t, -t, n.baseSize * e.scale, n.baseSize * e.scale);
                    break;
                case "image":
                    r.globalAlpha = e.opacity;
                    r.drawImage(n.image, -(n.image.width / 2), -(n.image.height / 2), n.image.width * e.scale, n.image.height * e.scale);
                    r.globalAlpha = 1;
                    break
            }
   //          var myStyle = r.createRadialGradient(-t,-t,n.baseSize * e.scale-20, -t,-t,n.baseSize * e.scale)
   //          myStyle.addColorStop(0, "#eee");    //定义红色渐变色
			// myStyle.addColorStop(1, e.color); 
            
            r.restore();
            r.fill()
        };
        var h = function() {
            setInterval(function() {
                r.clearRect(0, 0, s.width, s.height);
                for (var e = 0; e < n.numParticles; e++) {
                    var t = o[e];
                    t.x += t.xpeed;
                    t.y += t.yspeed;
                    var i = n.baseSize * t.scale;
                    var u = i;
                    if (n.shape == "image") {
                        i = n.image.width * t.scale;
                        u = n.image.height * t.scale
                    }
                    if (t.x > s.width + i || t.y > s.height + u || t.x < -(i * 1.5) || t.y < -(u * 1.5)) {
                        p(t)
                    } else {
                        c(t)
                    }
                }
            }, 17)
        };
        var p = function(e) {
            var t = a(0, 1);
            var r = n.baseSize * e.scale;
            var i = r;
            if (n.shape == "image") {
                r = n.image.width * e.scale;
                i = n.image.height * e.scale
            }
            if (t > .5) {
                e.x = e.xpeed > 0 ? -r : s.width + r;
                e.y = a(0, s.height)
            } else {
                e.x = a(0, s.width);
                e.y = e.yspeed > 0 ? -i : s.height + i
            }
            c(e)
        };
        f();
        e(window).on("resize.canvas", f);
        l()
    };
    e.fn.easyBackground = function(t) {
        function u() {
            var t = e('<canvas class="easy-background-canvas" />');
            t.css("display", "block");
            i.append(t);
            return t
        }

        function a(t) {
            var r = e('<div id="easy-background-player" />');
            i.append(r);
            if (t.substr(0, 7) == "youtube") {
                var s = t.split(":")[1];
                if (s) {
                    var o = document.createElement("script");
                    o.type = "text/javascript";
                    o.src = "//www.youtube.com/iframe_api";
                    e("body").append(o);
                    window.onYouTubeIframeAPIReady = function() {
                        var e = new YT.Player("easy-background-player", {
                            width: 1,
                            height: 1,
                            videoId: s,
                            playerVars: {
                                controls: 0,
                                showinfo: 0,
                                modestbranding: 1,
                                iv_load_policy: 3,
                                wmode: "transparent"
                            },
                            events: {
                                onReady: function(e) {
                                    u();
                                    if (n.mute) {
                                        e.target.mute()
                                    }
                                    e.target.seekTo(0);
                                    e.target.playVideo()
                                },
                                onStateChange: function(t) {
                                    if (t.data === 0) {
                                        e.seekTo(0)
                                    }
                                }
                            }
                        })
                    };
                    var u = function() {
                        var t = i.width();
                        var r = i.height();
                        if (t / n.ratio < r) {
                            var s = Math.ceil(r * n.ratio);
                            e("#easy-background-player").width(s);
                            e("#easy-background-player").height(r);
                            e("#easy-background-player").css({
                                left: (t - s) / 2,
                                top: 0
                            })
                        } else {
                            var o = Math.ceil(t / n.ratio);
                            e("#easy-background-player").width(t);
                            e("#easy-background-player").height(o);
                            e("#easy-background-player").css({
                                left: 0,
                                top: (r - o) / 2
                            })
                        }
                    };
                    e(window).on("resize.youtube", u)
                }
            }
        }

        function f(e, t) {
            switch (n.gradientType) {
                case "horizontal":
                    i.css("background", "-moz-linear-gradient(left, " + e + ", " + t + " 100%)");
                    i.css("background", "-webkit-gradient(linear, left top, right top, color-stop(0%," + e + "), color-stop(100%," + t + "))");
                    i.css("background", "-webkit-linear-gradient(left, " + e + " 0%," + t + " 100%)");
                    i.css("background", "-o-linear-gradient(left, " + e + " 0%," + t + " 100%)");
                    i.css("background", "-ms-linear-gradient(left, " + e + " 0%," + t + " 100%)");
                    i.css("background", "linear-gradient(to right, " + e + " 0%," + t + " 100%)");
                    i.css("filter", "progid:DXImageTransform.Microsoft.gradient( startColorstr='" + e + "', endColorstr='" + t + "',GradientType=1 )");
                    break;
                case "vertical":
                    i.css("background", "-moz-linear-gradient(top, " + e + ", " + t + " 100%)");
                    i.css("background", "-webkit-gradient(linear, left top, left bottom, color-stop(0%," + e + "), color-stop(100%," + t + "))");
                    i.css("background", "-webkit-linear-gradient(top, " + e + " 0%," + t + " 100%)");
                    i.css("background", "-o-linear-gradient(top, " + e + " 0%," + t + " 100%)");
                    i.css("background", "-ms-linear-gradient(top, " + e + " 0%," + t + " 100%)");
                    i.css("background", "linear-gradient(to bottom, " + e + " 0%," + t + " 100%)");
                    i.css("filter", "progid:DXImageTransform.Microsoft.gradient( startColorstr='" + e + "', endColorstr='" + t + "',GradientType=0 )");
                    break;
                case "diagonal":
                    i.css("background", "-moz-linear-gradient(-45deg, " + e + ", " + t + " 100%)");
                    i.css("background", "-webkit-gradient(linear, left top, right bottom, color-stop(0%," + e + "), color-stop(100%," + t + "))");
                    i.css("background", "-webkit-linear-gradient(-45deg, " + e + " 0%," + t + " 100%)");
                    i.css("background", "-o-linear-gradient(-45deg, " + e + " 0%," + t + " 100%)");
                    i.css("background", "-ms-linear-gradient(-45deg, " + e + " 0%," + t + " 100%)");
                    i.css("background", "linear-gradient(135deg, " + e + " 0%," + t + " 100%)");
                    i.css("filter", "progid:DXImageTransform.Microsoft.gradient( startColorstr='" + e + "', endColorstr='" + t + "',GradientType=1 )");
                    break;
                case "radial":
                    i.css("background", "-moz-radial-gradient(center, ellipse cover, " + e + " 0%, " + t + " 100%)");
                    i.css("background", "-webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%," + e + "), color-stop(100%," + t + "))");
                    i.css("background", "-webkit-radial-gradient(center, ellipse cover, " + e + " 0%," + t + " 100%)");
                    i.css("background", "-o-radial-gradient(center, ellipse cover, " + e + " 0%," + t + " 100%)");
                    i.css("background", "-ms-radial-gradient(center, ellipse cover, " + e + " 0%," + t + " 100%)");
                    i.css("background", "radial-gradient(ellipse at center, " + e + " 0%," + t + " 100%)");
                    i.css("filter", "progid:DXImageTransform.Microsoft.gradient( startColorstr='" + e + "', endColorstr='" + t + "',GradientType=1 )");
                    break
            }
        }

        function l(t, r) {
            var i = {
                colorAR: t[0][0],
                colorAG: t[0][1],
                colorAB: t[0][2],
                colorBR: t[1][0],
                colorBG: t[1][1],
                colorBB: t[1][2]
            };
            var s = {
                colorAR: r[0][0],
                colorAG: r[0][1],
                colorAB: r[0][2],
                colorBR: r[1][0],
                colorBG: r[1][1],
                colorBB: r[1][2]
            };
            e(i).animate(s, {
                duration: n.duration,
                easing: n.gradientEase,
                step: function() {
                    var t = e.rgbToHex(Math.round(this.colorAR), Math.round(this.colorAG), Math.round(this.colorAB));
                    var n = e.rgbToHex(Math.round(this.colorBR), Math.round(this.colorBG), Math.round(this.colorBB));
                    f(t, n)
                },
                complete: function() {
                    if (n.gradientLoop) {
                        l(r, t)
                    }
                }
            })
        }

        function c(t) {
            if (!t) {
                if (console && console.log) {
                    console.log("No pattern found.")
                }
                return false
            }
            i.css("background-image", "url(" + t + ")");
            var n = new Image;
            n.src = t;
            e(n).on("load", function() {
                h(this.width, this.height)
            })
        }

        function h(t, r) {
            i.css("background-position", "0 0");
            var s = {
                x: 0,
                y: 0
            };
            var o = {
                x: 0,
                y: 0
            };
            var u = "";
            if (n.patternAnimationX == "left") {
                o.x = -t
            } else if (n.patternAnimationX == "right") {
                o.x = t
            }
            if (n.patternAnimationY == "top") {
                o.y = -r
            } else if (n.patternAnimationY == "bottom") {
                o.y = r
            }
            e(s).animate(o, {
                duration: n.duration,
                easing: "linear",
                step: function() {
                    var e = Math.round(this.x);
                    var t = Math.round(this.y);
                    i.css("background-position", e + "px " + t + "px")
                },
                complete: function() {
                    h(t, r)
                }
            })
        }

        function p(t) {
            if (!t || t.length == 0) {
                if (console && console.log) {
                    console.log("No slides found.")
                }
                return false
            }
            for (var r = 0; r < t.length; r++) {
                var s = new Image;
                s.src = t[r]
            }
            var o = e("<div />");
            o.css("width", "100%");
            o.css("height", "100%");
            o.css("position", "absolute");
            o.css("top", "0");
            o.css("left", "0");
            o.css("z-index", "2");
            o.css("-webkit-background-size", "cover");
            o.css("-moz-background-size", "cover");
            o.css("-o-background-size", "cover");
            o.css("background-size", "cover");
            o.css("background-repeat", "no-repeat");
            var u = e("<div/>");
            u.css("width", "100%");
            u.css("height", "100%");
            u.css("position", "absolute");
            u.css("top", "0");
            u.css("left", "0");
            u.css("z-index", "1");
            u.css("-webkit-background-size", "cover");
            u.css("-moz-background-size", "cover");
            u.css("-o-background-size", "cover");
            u.css("background-size", "cover");
            u.css("background-repeat", "no-repeat");
            i.append(o);
            i.append(u);
            d(o, t[0]);
            if (t.length > 1) {
                setTimeout(function() {
                    v(o, u, 0, t)
                }, n.duration)
            }
        }

        function d(e, t) {
            e.css("background-image", "url(" + t + ")");
            e.css("filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + t + "', sizingMethod='scale')");
            e.css("-ms-filter", "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + t + "', sizingMethod='scale')")
        }

        function v(e, t, r, i) {
            var s = r + 1;
            if (s == i.length) {
                s = 0
            }
            d(t, i[s]);
            var o = n.slideshowEffect == "slide" ? "slideUp" : "fadeOut";
            e[o](n.slideshowSpeed, function() {
                d(e, i[s]);
                e.show();
                setTimeout(function() {
                    v(e, t, s, i)
                }, n.duration)
            })
        }
        var n = {
            effect: "particles",
            duration: 5e3,
            slides: [],
            slideshowEffect: "fade",
            slideshowSpeed: 2e3,
            patternImage: null,
            patternAnimationX: "left",
            patternAnimationY: "none",
            gradientType: "radial",
            gradientColors: ["#9CC4E2", "#004799"],
            gradientAnimateColors: ["#666666", "#333333"],
            gradientLoop: true,
            gradientEase: "linear",
            video: "youtube:3agk-1DohfA",
            mute: true,
            ratio: 16 / 9,
            shape: "circle",
            colors: ["#CC99CC", "#C4E0ED"],
            border: false,
            borderColors: ["#FF0000", "#00FF00", "#0000FF"],
            minScale: .5,
            maxScale: 1,
            baseSize: 150,
            minOpacity: .1,
            maxOpacity: 1,
            minBorderOpacity: .1,
            maxBorderOpacity: 1,
            minSpeedX: -1,
            maxSpeedX: 1,
            minSpeedY: -1,
            maxSpeedY: 1,
            minRotateSpeed: .005,
            maxRotateSpeed: .01,
            numParticles: 10,
            overlay: "dots",
            baseColor: "#333333",
            disableMobile: false,
            wrapNeighbours: false,
            relativeNeighbours: false
        };
        e.extend(true, n, t);
        if (n && n.colors) {
            e(n.colors).each(function(t, r) {
                if (r.substr(0, 1) == "#") {
                    var i = e.hexToRgb(r);
                    n.colors[t] = i.r + ", " + i.g + ", " + i.b
                }
            })
        }
        if (n && n.borderColors) {
            e(n.borderColors).each(function(t, r) {
                if (r.substr(0, 1) == "#") {
                    var i = e.hexToRgb(r);
                    n.borderColors[t] = i.r + ", " + i.g + ", " + i.b
                }
            })
        }
        if (n && n.gradientColors) {
            e(n.gradientColors).each(function(t, r) {
                if (r.substr(0, 1) == "#") {
                    var i = e.hexToRgb(r);
                    n.gradientColors[t] = [i.r, i.g, i.b]
                }
            })
        }
        if (n && n.gradientAnimateColors) {
            e(n.gradientAnimateColors).each(function(t, r) {
                if (r.substr(0, 1) == "#") {
                    var i = e.hexToRgb(r);
                    n.gradientAnimateColors[t] = [i.r, i.g, i.b]
                }
            })
        }
        var r = false;
        if (n.disableMobile) {
            if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                r = true
            }
        }
        var i = e('<div class="easy-background" /> ');
        i.css("width", "100%");
        i.css("height", "100%");
        if (this.is("body")) {
            i.css("position", "fixed")
        } else {
            i.css("position", "absolute");
            this.css("overflow", "hidden")
        }
        i.css("top", "0");
        i.css("left", "0");
        if (n.baseColor) {
            i.css("background-color", n.baseColor)
        }
        i.css("z-index", "1");
        this.append(i);
        if (n.overlay) {
            var s = e("<div /> ");
            s.css("width", "100%");
            s.css("height", "100%");
            s.css("position", "absolute");
            s.css("top", "0");
            s.css("left", "0");
            s.css("z-index", "10");
            switch (n.overlay) {
                case "waves":
                    s.css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAICAYAAADA+m62AAAAPklEQVQYV2NkwAT/gUKM6MLoAjBFGIqRFaJLovBhCrFaB7QeLg5SiEsRzJlgeQxHY/EcSOg/sQoxgwGHiQwA+f4KCL3Y/AQAAAAASUVORK5CYII=)");
                    break;
                case "horizontal-lines":
                    s.css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAFCAYAAACJmvbYAAAAF0lEQVQIW2NcvHjxfwYcgBGXBEicRpIAn+0C7kufXBgAAAAASUVORK5CYII=)");
                    break;
                case "vertical-lines":
                    s.css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAHCAYAAADAp4fuAAAAF0lEQVQIW2NcvHjx/9jYWEYGJMA4oIIAzrccCBIzFHAAAAAASUVORK5CYII=)");
                    break;
                case "simple-grid":
                    s.css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAcAAAAHCAYAAADEUlfTAAAAHElEQVQIW2NcvHjxfwYcgBEkGRsby4hNftBJAgB4hhrww0B+QQAAAABJRU5ErkJggg==)");
                    break;
                case "grid":
                    s.css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAaklEQVQYV2NkYGAwBuKzQAwC9UA8C4ifQ/n/GaEMkCIfIG6E8iWB9DMgZoQpAOncgmTSfyBbCmQSSAFIEqYTZNIZkE6YSSAGyDi4nUC2CbKb4CphdqK7CaYAbieSb8BuAikASSKblIbsJgCKXBfTNjWx1AAAAABJRU5ErkJggg==)");
                    break;
                case "dots":
                    s.css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAGklEQVQIW2NkYGD4D8SMQAwGcAY2AbBKDBUAVuYCBQPd34sAAAAASUVORK5CYII=)");
                    break;
                case "diagonal-lines":
                    s.css("background-image", "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAI0lEQVQIW2NkwAT/GdHE/gP5jMiCYAGQIpggXAAmiCIAEgQAAE4FBbECyZcAAAAASUVORK5CYII=)");
                    break
            }
            if (n.overlay.substr(0, 5) == "image") {
                var o = n.overlay.split(":")[1];
                s.css("background-image", "url(" + o + ")")
            }
            i.append(s)
        }
        if (n.wrapNeighbours) {
            i.siblings(":not(script)").wrap('<div class="easy-background-wrap" style="position:relative; z-index: 2;"></div>')
        } else if (n.relativeNeighbours) {
            i.siblings(":not(script)").each(function(t, n) {
                n = e(n);
                if (n.css("position") == "static") {
                    n.css({
                        position: "relative",
                        "z-index": "2"
                    })
                }
            })
        }
        if (!r) {
            switch (n.effect) {
                case "particles":
                    u().easyBackgroundParticles(n);
                    break;
                case "video":
                    a(n.video);
                    break;
                case "gradient":
                    if (n.gradientAnimateColors) {
                        l(n.gradientColors, n.gradientAnimateColors);
                        console.log("haha");
                    } else {
                        var m = e.rgbToHex(n.gradientColors[0][0], n.gradientColors[0][1], n.gradientColors[0][2]);
                        var g = e.rgbToHex(n.gradientColors[1][0], n.gradientColors[1][1], n.gradientColors[1][2]);
                        f(m, g)
                    }
                    break;
                case "pattern":
                    c(n.patternImage);
                    break;
                case "slideshow":
                    p(n.slides);
                    break
            }
        }
    }
})(Zepto)
/*download by www.sucaijiayuan.com*/