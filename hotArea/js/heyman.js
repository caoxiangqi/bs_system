
var uniqueID = (function () {
	var id=0;
	return function(){return id++;};
})();

var imgLoad = function (url, callback) {
	var img = new Image();

	img.src = url;
	if (img.complete) {
		callback(img.width, img.height);
	} else {
		img.onload = function () {
			callback(img.width, img.height);
			img.onload = null;
		};
	};

};

var tls = {
	copy : function( obj, contruct, tpcont ){
		var exd = {};
		for(var name in obj){
			if(name == 'id'){continue;}
			if(obj[name] instanceof Function){}else{
				if(jQuery.isPlainObject(obj[name]) || jQuery.isArray(obj[name])){
					exd[name] = jQuery.extend(true,jQuery.isArray(obj[name])?[]:{},obj[name]);
				}else{
					exd[name] = obj[name];
				}
			}
			if(name == 'left'||name == 'top'){exd[name] = obj[name]+10;}

		}
		Canvas[tpcont].push(new contruct(exd));
	}
};


var Canvas = {
	hotsArray : []
}
var ET_editing = null;

function HotsArray(config){
	this.id = uniqueID();
	this.url = "";
	this.title = "";
	this.target = "_blank";
	this.width = 120;
	this.height = 180;
	this.left = 0;
	this.top = 0;
	$.extend(this,config||{});
	this.init();
}
HotsArray.prototype = {
	init    :function(){
		this.elet = $('<div class="zg_moved" id="hotArea_'+this.id+'" style="width:'+this.width+'px;height:'+this.height+'px;left:'+this.left+'px;top:'+this.top+'px;"><div class="zg_drag"></div><div class="zg_close">×</div></div>');
		this.elet.appendTo($("#canvas"));
		this.itmove();
		this.itremove();
		this.itmouseup();
		this.bindInput();
		this.changeFocus();
	},
	itclick :function(){
	},
	itmousedown :function(){
		var _this = this;
		this.elet.mouseup(function() {
			_this.changeFocus();
		});
	},
	itmouseup :function(){
		var _this = this;
		this.elet.mouseup(function() {
			_this.width = parseInt($(this).width());
			_this.height = parseInt($(this).height());
			_this.left = parseInt($(this).position().left);
			_this.top = parseInt($(this).position().top);
			_this.bindInput();
			_this.changeFocus();
			//console.log(_this.getAreaHtml());
		});

	},
	itmove  :function(){
		this.elet.draggable({ opacity: 0.65 }).resizable({ handles: "n, e, s, w, se"});
	},
	itremove:function(){
		var _this = this;
		this.elet.find(".zg_close").click(function(event){

			if (!confirm("确认要删除？")) {
				return false;
			}

			_this.elet.draggable( "destroy" );
			_this.elet.remove();

			for( var i=0; i<Canvas.hotsArray.length; i++ ){
				var t=Canvas.hotsArray[i];
				if(t.id == _this.id) {
					Canvas.hotsArray.splice(i,1);
				}
			}

		});
	},
	changeFocus:function(){
		ET_editing = this;
		this.elet.siblings().removeClass("selected");
		this.elet.addClass("selected");
		$('#J_hotArea_attrib').css({'display':'block'}).siblings().css({'display':'none'});
	},
	getAreaHtml:function(){
		var x1,y1,x2,y2,str='',
			x1 = this.left;
		y1 = this.top;
		x2 = x1 + this.width;
		y2 = y1 + this.height;
		var str = '<area shape="rect" coords="'+x1+','+y1+','+x2+','+y2+'" href="'+this.url+'" target="'+this.target+'" title="'+this.title+'" />';
		return str;
	},
	bindInput:function(){
		var _this = this;
		$('#J_hotArea_attrib input[name="hotid"]').val('hotArea_'+this.id);

		$('#J_hotArea_attrib input[name="title"]').val(this.title).unbind().blur(function(){_this.title = this.value;}).click(function(){$(this).select();});

		if(_this.target == "_blank"){$('#J_hotArea_attrib input[name="openstyle"]').val('_blank').get(0).checked=true;}else{$('#J_hotArea_attrib input[name="openstyle"]').val('_self').get(0).checked=false;}
		$('#J_hotArea_attrib input[name="openstyle"]').unbind().bind('click',function(){
			if($(this).val() == "_blank"){_this.target = "_self";}else{_this.target = "_blank";}
		});

		$('#J_hotArea_attrib input[name="url"]').val(this.url).unbind().blur(function(){_this.url = this.value;}).click(function(){$(this).select();});

		$('#J_hotArea_attrib input[name="width"]').val(this.width).unbind().bind({
			'blur':function(){_this.width = parseInt(this.value);_this.elet.width(this.value);},
			'keyup':function(event){if(event.keyCode == 13){_this.width = parseInt(this.value);_this.elet.width(this.value);}}
		});
		$('#J_hotArea_attrib input[name="height"]').val(this.height).unbind().bind({
			'blur':function(){_this.height = parseInt(this.value);_this.elet.height(this.value);},
			'keyup':function(event){if(event.keyCode == 13){_this.height = parseInt(this.value);_this.elet.height(this.value);}}
		});
		$('#J_hotArea_attrib input[name="left"]').val(this.left).unbind().bind({
			'blur':function(){_this.left = parseInt(this.value);_this.elet.css('left',this.value+'px');},
			'keyup':function(event){if(event.keyCode == 13){_this.left = parseInt(this.value);_this.elet.css('left',this.value+'px');}}
		});
		$('#J_hotArea_attrib input[name="top"]').val(this.top).unbind().bind({
			'blur':function(){_this.top = parseInt(this.value);_this.elet.css('top',this.value+'px');},
			'keyup':function(event){if(event.keyCode == 13){_this.top = parseInt(this.value);_this.elet.css('top',this.value+'px');}}
		});

		$('#J_hotArea_attrib input[name="btncopy"]').unbind().bind('click',function(){
			tls.copy(_this, HotsArray, 'hotsArray');
		});

	}
}

$(document).keydown(function(event){
	if(!ET_editing){return;}
	switch(event.which){
		case 37:
			ET_editing.elet.css('left',ET_editing.left-1+'px');
			ET_editing.left--;
			ET_editing.bindInput();
			event.preventDefault();
			break;
		case 38:
			ET_editing.elet.css('top',ET_editing.top-1+'px');
			ET_editing.top--;
			ET_editing.bindInput();
			event.preventDefault();
			break;
		case 39:
			ET_editing.elet.css('left',ET_editing.left+1+'px');
			ET_editing.left++;
			ET_editing.bindInput();
			event.preventDefault();
			break;
		case 40:
			ET_editing.elet.css('top',ET_editing.top+1+'px');
			ET_editing.top++;
			ET_editing.bindInput();
			event.preventDefault();
			break;
		case 46:
			ET_editing.elet.find(".zg_close").trigger("click");
			//event.preventDefault(); 
			break;
	}
});
