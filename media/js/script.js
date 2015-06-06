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
			_this.picWrapper.removeClass("show-pic").removeClass("zoom-pic").addClass('add-pic');
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
				    debug: false,
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
						        var localIds = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
						        $("#js-image").attr('src',localIds);
						        _this.picWrapper.removeClass('show-pic').removeClass('add-pic').addClass('zoom-pic');
						  //       wx.uploadImage({
								// 	localId: localIds, // 需要上传的图片的本地ID，由chooseImage接口获得
								// 	isShowProgressTips: 0, // 默认为1，显示进度提示
								// 	success: function (res) {
								// 	    var serverId = res.serverId; // 返回图片的服务器端ID
								// 	    // 这里还需要将传到微信上的图片下载到自己的服务器上，返回本域下面的图片链接
								// 	    // 由于新浪上无法存取文件写文件，这一步略过
								// 	    $("#js-image").attr('src',localIds);
								// 	}
								// });
						    }
						});

					});
				    
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
		$("#js-cropImg").click(function(){
			_this.cropImg();
		});
	},
	cropImg : function(){
		var _this = this,
            width = $('.pinch-zoom-container').width(),
            height = $('.pinch-zoom-container').height(),
            image_src = $("#js-image").attr('src'),
            targetWidth = $("#js-image").width(),
            targetHeight = $("#js-image").height(),
            left = ($('.pinch-zoom-container').offset().left - $("#js-image").offset().left)>0?($('.pinch-zoom-container').offset().left - $("#js-image").offset().left):0;
        var top = ($('.pinch-zoom-container').offset().top - $("#js-image").offset().top)>0?($('.pinch-zoom-container').offset().top - $("#js-image").offset().top):0;
        
        var preImage=function(url,callback){  
		    var img = new Image();
		    img.src = url;
		     
		    if (img.complete) {
		        callback.call(img);  
		        return;
		    }  
		  
		    img.onload = function () {  
		        callback.call(img);
		    };
		};

		var fs={
			start : function(){
				var imgWidth = this.width,
            		imgHeight = this.height;
					x = left/targetWidth*imgWidth,
		        	y = top/targetHeight*imgHeight,
		        	w = width/targetWidth*imgWidth,
		        	h = height/targetHeight*imgHeight;

				var canvas = document.getElementById('canvas');
				canvas.width = width;
        		canvas.height = height;
				var context= canvas.getContext('2d').drawImage(this,x,y,w,h,0,0,width,height);
				_this.picWrapper.addClass("show-pic");
				// try{
		  //       	canvas.toDataURL("image/png");
		  //       }catch(e){
		  //       	alert(e);
		  //       }

			},
		}

		preImage(image_src,function(){
			fs.start.call(this);
		}); 
	}
}
Weixin.init();