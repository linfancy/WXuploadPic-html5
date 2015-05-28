var Weixin = {
	init : function(){
		$("#js-image").attr('src', 'media/img/1.jpg');
		this.wxconfig();
		this.pinchImg();
		this.bindEvent();
	},
	bindEvent : function(){
		this.bindCropImg();
	},
	wxconfig : function(){
		var wxdata = null;
		$.ajax({
			type : 'GET',
			url : 'php/getWeixin.php',
			dataType : 'json',
			success : function(data){
				wx.config({
				    debug: true,
				    appId: data.appId,
				    timestamp: data.timestamp,
				    nonceStr: data.nonceStr,
				    signature: data.signature,
				    jsApiList: [
				    	'chooseImage',
				    	'previewImage',
				    	'uploadImage'
				    ]
				});
				wx.ready(function () {
					$('#js-choose-image').click(function(){
						wx.chooseImage({
						    success: function (res) {
						        var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						        $("#js-image").attr('src',localIds[0]);
						    }
						});
					})
				    
				});
			},
			error : function(error){
				console.log(error);
			}
		});

	},
	pinchImg : function(){
		$('div.image-wrapper').each(function () {
            new RTP.PinchZoom($(this), {});
        });
	},
	bindCropImg : function(){
		var _this = this;
		$("#js-cropImg").click(function(){
			_this.cropImg();
		});
	},
	cropImg : function(){
		var crop_canvas,
            width = $('.pinch-zoom-container').width(),
            height = $('.pinch-zoom-container').height(),
            image_target = $("#js-image").get(0),
            image_src = $("#js-image").attr("src"),
            targetWidth = $("#js-image").width(),
            targetHeight = $("#js-image").height(),
            img = new Image(),
            left = ($('.pinch-zoom-container').offset().left - $("#js-image").offset().left)>0?($('.pinch-zoom-container').offset().left - $("#js-image").offset().left):0,
            top = ($('.pinch-zoom-container').offset().top - $("#js-image").offset().top)?($('.pinch-zoom-container').offset().top - $("#js-image").offset().top):0;
            img.src = image_src,
            imgWidth = img.width,
            imgHeight = img.height;

        crop_canvas = $("#canvas")[0];
        crop_canvas.width = width;
        crop_canvas.height = height;
        var x = left/targetWidth*imgWidth,
        	y = top/targetHeight*imgHeight,
        	w = width/targetWidth*imgWidth,
        	h = height/targetHeight*imgHeight;
        console.log(img.width);
        console.log(image_target);
        console.log(x+" "+y+" "+w+" "+h+" "+targetWidth+" "+targetHeight+" "+left+" "+top+" "+width+" "+height);
        crop_canvas.getContext('2d').drawImage(image_target,x,y,w,h,0,0,width,height);
	}
}
Weixin.init();