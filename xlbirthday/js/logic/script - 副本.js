(function($){
  var touch = {},
    touchTimeout, tapTimeout, swipeTimeout, longTapTimeout,
    longTapDelay = 750,
    gesture

  function swipeDirection(x1, x2, y1, y2) {
    return Math.abs(x1 - x2) >=
      Math.abs(y1 - y2) ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  function longTap() {
    longTapTimeout = null
    if (touch.last && touch.el) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap() {
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  function cancelAll() {
    if (touchTimeout) clearTimeout(touchTimeout)
    if (tapTimeout) clearTimeout(tapTimeout)
    if (swipeTimeout) clearTimeout(swipeTimeout)
    if (longTapTimeout) clearTimeout(longTapTimeout)
    touchTimeout = tapTimeout = swipeTimeout = longTapTimeout = null
    touch = {}
  }

  function isPrimaryTouch(event){
    return (event.pointerType == 'touch' ||
      event.pointerType == event.MSPOINTER_TYPE_TOUCH)
      && event.isPrimary
  }

  function isPointerEventType(e, type){
    return (e.type == 'pointer'+type ||
      e.type.toLowerCase() == 'mspointer'+type)
  }

  $(document).ready(function(){
    var now, delta, deltaX = 0, deltaY = 0, firstTouch, _isPointerType

    if ('MSGesture' in window) {
      gesture = new MSGesture()
      gesture.target = document.body
    }

    $(document)
      .bind('MSGestureEnd', function(e){
        var swipeDirectionFromVelocity =
          e.velocityX > 1 ? 'Right' : e.velocityX < -1 ? 'Left' : e.velocityY > 1 ? 'Down' : e.velocityY < -1 ? 'Up' : null;
        if (swipeDirectionFromVelocity && touch.el) {
          touch.el.trigger('swipe')
          touch.el.trigger('swipe'+ swipeDirectionFromVelocity)
        }
      })
      .on('touchstart MSPointerDown pointerdown', function(e){
        if((_isPointerType = isPointerEventType(e, 'down')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        if (e.touches && e.touches.length === 1 && touch.x2) {
          // Clear out touch movement data if we have it sticking around
          // This can occur if touchcancel doesn't fire due to preventDefault, etc.
          touch.x2 = undefined
          touch.y2 = undefined
        }
        now = Date.now()
        delta = now - (touch.last || now)
        touch.el = $('tagName' in firstTouch.target ?
          firstTouch.target : firstTouch.target.parentNode)
        touchTimeout && clearTimeout(touchTimeout)
        touch.x1 = firstTouch.pageX
        touch.y1 = firstTouch.pageY
        if (delta > 0 && delta <= 250) touch.isDoubleTap = true
        touch.last = now
        longTapTimeout = setTimeout(longTap, longTapDelay)
        // adds the current touch contact for IE gesture recognition
        if (gesture && _isPointerType) gesture.addPointer(e.pointerId);
      })
      .on('touchmove MSPointerMove pointermove', function(e){
        if((_isPointerType = isPointerEventType(e, 'move')) &&
          !isPrimaryTouch(e)) return
        firstTouch = _isPointerType ? e : e.touches[0]
        cancelLongTap()
        touch.x2 = firstTouch.pageX
        touch.y2 = firstTouch.pageY

        deltaX += Math.abs(touch.x1 - touch.x2)
        deltaY += Math.abs(touch.y1 - touch.y2)
      })
      .on('touchend MSPointerUp pointerup', function(e){
        if((_isPointerType = isPointerEventType(e, 'up')) &&
          !isPrimaryTouch(e)) return
        cancelLongTap()

        // swipe
        if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
            (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30))

          swipeTimeout = setTimeout(function() {
            if(touch.el){
              touch.el.trigger('swipe')
              touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
              touch = {}
            }                
          }, 0)

        // normal tap
        else if ('last' in touch)
          // don't fire tap when delta position changed by more than 30 pixels,
          // for instance when moving to a point and back to origin
          if (deltaX < 30 && deltaY < 30) {
            // delay by one tick so we can cancel the 'tap' event if 'scroll' fires
            // ('tap' fires before 'scroll')
            tapTimeout = setTimeout(function() {

              // trigger universal 'tap' with the option to cancelTouch()
              // (cancelTouch cancels processing of single vs double taps for faster 'tap' response)
              var event = $.Event('tap')
              event.cancelTouch = cancelAll
              if(touch.el){
                touch.el.trigger(event)
              }
                                
              // trigger double tap immediately
              if (touch.isDoubleTap) {
                if (touch.el) touch.el.trigger('doubleTap')
                touch = {}
              }

              // trigger single tap after 250ms of inactivity
              else {
                touchTimeout = setTimeout(function(){
                  touchTimeout = null
                  if (touch.el) touch.el.trigger('singleTap')
                  touch = {}
                }, 250)
              }
            }, 0)
          } else {
            touch = {}
          }
          deltaX = deltaY = 0

      })
      // when the browser window loses focus,
      // for example when a modal dialog is shown,
      // cancel all ongoing events
      .on('touchcancel MSPointerCancel pointercancel', cancelAll)

    // scrolling the window indicates intention of the user
    // to scroll, not tap or swipe, so cancel all ongoing events
    $(window).on('scroll', cancelAll)
  })

  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown',
    'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(eventName){
    $.fn[eventName] = function(callback){ return this.on(eventName, callback) }
  })
})(Zepto);

var Main = {
  winHeight : 0,
  winWidth : 0,
  page : null,
  timer : null,
  myScroll : null,
  bindEvent : function(){
    var _this = this;
    _this.myScroll = new IScroll('#main', {
      snap:true,
      hScroll:false,
      momentum:false,
      hideScrollbar : true,
    });
    _this.myScroll.on('scrollEnd',function(){
      Main.updateView(_this.myScroll.currentPage.pageY);
    });
    $(".page-mark").tap(function(){
      $(this).addClass("hide");
      Main.updateView(_this.myScroll.currentPage.pageY);
    })
  },
updateView : function(index){
    var _this = this;
    _this.page.removeClass("animation-on");
    _this.page.eq(index).addClass("animation-on");
    if(index ==  3){
      clearInterval(_this.timer);
      var item = _this.page.children(".page-3-wrap-0");
      var pic = $(".page-3-wrap-1  img");

      if(item.length > 0){
        var sitem = $(item[0]);
        item.removeClass("page-3-wrap-fadeIn");
        pic.removeClass("page-3-wrap-fadeIn");
        sitem.addClass("page-3-wrap-fadeIn");
        _this.timer = setInterval(function(){
          item.removeClass("page-3-wrap-fadeIn");
          pic.removeClass("page-3-wrap-fadeIn");
          if(sitem.next(".page-3-wrap-0").length > 0 && (sitem.next().next().length > 0)){
            sitem = sitem.next();
            sitem.addClass("page-3-wrap-fadeIn");
          }else{
            item.removeClass("page-3-wrap-fadeIn");
            clearInterval(_this.timer);
            if(pic.length > 0){
              var itemPic = $(pic[0]);
              itemPic.addClass("page-3-wrap-fadeIn");
              _this.timer = setInterval(function(){
                pic.removeClass("page-3-wrap-fadeIn");
                if(itemPic.next("img").length > 0){
                  console.log("haha");
                  itemPic = itemPic.next();
                  itemPic.addClass("page-3-wrap-fadeIn");
                }else{
                  clearInterval(_this.timer);
                  itemPic.addClass("page-3-wrap-fadeIn");
                }
              },1500);
            }      
          }
        },2000);
      }
    }
  },
  sendMessage : function(){
    function filter(str){
      str = str.replace(/<\/?[^>]*>/g,''); //去除HTML tag
      str = str.replace(/[ | ]*\n/g,'\n'); //去除行尾空白
      str=str.replace(/&nbsp;/ig,'');//去掉&nbsp;
      return str;
    }
    function send(name,text){
      var name = filter(name);
      var str = filter(text);
      $.ajax({
        url : "http://fancylin.sinaapp.com/message.php",
        async : false,
        type : "post",
        dataType : "text",
        data : {"message":str,"name":name}
      })
    }
    // 起飞
    $('#send-btn').tap(function(){
        // 步骤一：隐藏面板、显示飞机、完成折叠效果
      
      setTimeout(function() {
          // 隐藏信息面板
          $('.plane-front').removeClass('front');
          // 翻转至正面
          $('.plane-back').removeClass('back');
          // 折叠效果（左翼、右翼）
          $('.curvable').addClass('curved');

          // 步骤二：平放飞机
          setTimeout(function() {
              $('.plane-back').addClass('hover');

              // 步骤三：飞机后退助跑
              setTimeout(function() {
                  $('.plane-back').addClass('fly_away_first');

                  // 步骤四：飞机向前飞翔至消失
                  setTimeout(function() {
                      $('.plane-back').addClass('fly_away');

                      // 步骤五：飞机复位
                      setTimeout(function(){
                          var str = $(".plane-message").val();
                          var name = $(".plane-name").val();
                          $(".plane-message").val("");
                          $(".plane-name").val("");
                          send(name,str);
                          $('.plane-front').addClass('front');
                          $('.plane-back').removeClass('fly_away fly_away_first hover').addClass('back');
                          $('.curvable').removeClass('curved');
                      },3000);
                  }, 600);
              }, 2000);
          }, 2800);
      }, 200);
    }); 
  },
  makeBg : function(){
    $('.main').easyBackground({
        wrapNeighbours: false,
        overlay : false,
        baseColor : "#eee",
        colors: ["#f9f6a4","#cbe1ec","#f5dfe2"],
    });
  },
  play : function(){
    getSong();
    function getSong() { 
        var audio = document.getElementById("audio");
        audio.src = "audio/kanong.mp3";
        audio.loop = true; //歌曲循环
        playCotrol(); //播放控制函数
     
    }
    //点击播放/暂停
    function clicks() {
        var audio = document.getElementById("audio");
        $("#control").click(function() {
            if ($("#control").hasClass("play")) {
                $("#control").addClass("pause").removeClass("play");
                audio.play();
            } else {
                $("#control").addClass("play").removeClass("pause");
                audio.pause();
            }
        });
    }
    //播放事件监听
    function playCotrol() {
        audio.addEventListener("loadeddata", //歌曲一经完整的加载完毕( 也可以写成上面提到的那些事件类型)
            function() {
                $("#control").addClass("play").removeClass("color_gray");
                clicks();

            }, false);
        audio.addEventListener("pause",
            function() { //监听暂停
                $("#control").addClass("play").removeClass("player-item-play");
                // var mark = $(".page-mark");
                // if(!mark.hasClass("hide")){
                //   mark.addClass("hide");
                // }
            }, false);
        audio.addEventListener("playing",
            function() { //监听暂停
                $("#control").addClass("player-item-play").removeClass("play");
                var mark = $(".page-mark");
                if(!mark.hasClass("hide")){
                  mark.addClass("hide");
                  Main.updateView(Main.myScroll.currentPage.pageY);
                }
            }, false);
    }
  },
  init : function(){
    $(".main").height($("body").height());
    this.page = $(".main .flex-1");
    this.page.height($("body").height());
    this.bindEvent();
    this.play();
    this.makeBg();
    this.sendMessage();
  }
}
window.addEventListener('load', function(){
  $("body").removeClass("loading");
  Main.init();
},false);

