var Weixin = {
	picWrapper : null,
	init : function(){
		$("#js-image").attr('src', 'media/img/1.jpg');
		this.picWrapper = $('#js-upload-pic');
		this.wxconfig();
		this.pinchImg();
		this.bindEvent();
	},
	bindEvent : function(){
		this.bindCropImg();
		this.bindBack();
	},
	bindBack : function(){
		var _this = this,
			btnBack = $("#js-btn-back");
		btnBack.click(function(){
			_this.picWrapper.removeClass("show-pic").removeClass("zoom-pic");
		});
	},
	wxconfig : function(){
		var wxdata = null,
			_this = this;
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
						        _this.picWrapper.addClass('zoom-pic');
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
			console.log($(this).parent().height());
            new RTP.PinchZoom($(this), {'parentWrapperHeight':$(this).parent().height()});
        });
	},
	bindCropImg : function(){
		var _this = this;
		_this.picWrapper.addClass("show-pic");
		$("#js-cropImg").click(function(){
			_this.cropImg();
		});
	},
	cropImg : function(){
		var crop_canvas,
			_this = this,
            width = $('.pinch-zoom-container').width(),
            height = $('.pinch-zoom-container').height(),
            image_target = $("#js-image").get(0),
            targetWidth = $("#js-image").width(),
            targetHeight = $("#js-image").height(),
            left = ($('.pinch-zoom-container').offset().left - $("#js-image").offset().left)>0?($('.pinch-zoom-container').offset().left - $("#js-image").offset().left):0,
            top = ($('.pinch-zoom-container').offset().top - $("#js-image").offset().top)?($('.pinch-zoom-container').offset().top - $("#js-image").offset().top):0;
            imgWidth = image_target.naturalWidth,
            imgHeight = image_target.naturalHeight;

        crop_canvas = $("#canvas")[0];
        crop_canvas.width = width;
        crop_canvas.height = height;
        var x = left/targetWidth*imgWidth,
        	y = top/targetHeight*imgHeight,
        	w = width/targetWidth*imgWidth,
        	h = height/targetHeight*imgHeight;
        crop_canvas.getContext('2d').drawImage(image_target,x,y,w,h,0,0,width,height);
        var imgdata = crop_canvas.toDataURL();
        imgdata = imgdata.split(',')[1];
		$.ajax({
			url : "php/upload.php",
			type : "POST",
			data : {
				'imgdata' : imgdata,
			},
			dataType : 'json',
			success : function(data){
				if(data.status){
					console.log(data.info);
				}else{
					console.log(data.info);
				}
			}
		})
	}
}
Weixin.init();