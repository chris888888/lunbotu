(function ($) {
    $.fn.lb = function (conf) {
        this.conf = {
            "autoPlay": conf.autoPlay,
            "autoPlaySpeed":conf.autoPlaySpeed,
            "leftBtn": conf.leftBtn,
            "rightBtn": conf.rightBtn,
            "listItems": conf.listItems,
            "img": conf.img
        };
        this.index=0;
        this.imgWidth=0;
        this.listItemsBgC=null;
        this.timer=null;
        var that=this;
        if(this.conf.img != undefined){
            this.imgWidth=this.conf.img.innerWidth();
            this.conf.img.children().eq(0).css("left",0).siblings().css("left",this.imgWidth);
            console.log(this.imgWidth)
        }else(
            console.error("必须传入一个img对象组")
        )
        if ( this.conf.leftBtn !=undefined &&  this.conf.rightBtn !=undefined) {
            this.conf.leftBtn.click(function () {
                console.log(1)
                that.moveLeft();
            })
            this.conf.rightBtn.click(function () {

            })
        }
        if(typeof this.conf.listItems !=undefined ){
            this.conf.listItems.children().eq(0).css("background","red");
            this.listItemsBgC=this.conf.listItems.children().eq(1).css("background-color");
            var color=this.listItemsBgC;
            var oldIndex=this.index;
            this.conf.listItems.on('click',"a",function(){
                $(this).css("background","red").siblings().css("background-color",color);
                if($(this).index>oldIndex){
                    this.moveLeft();
                }
                if($(this).index<oldIndex){
                    this.moveRight();
                }
                that.index=$(this.index)
            })
            }
        this.moveLeft=function (argument) {
            if(this.index===0){
                this.index=this.conf.listItems.children().length-1;
                $($('img')[2]).css('left',-this.imgWidth).stop().animate({left:0},1000);
                $($('img')[0]).css('left',0).stop().animate({left:this.imgWidth},1000);
            }else{
                $($('img')[this.index-1]).css('left',-this.imgWidth).stop().animate({left:0},1000);
                $($('img')[this.index]).css('left',0).stop().animate({left:this.imgWidth},1000);
                this.index--;
            }
        }
        this.moveRight=function(){

        }
        this.autoPlay=function (argument) {
            if(that.conf.autoPlaySpeed==undefined){
                that.timer=setInterval(this.conf.rightBtn.trigger("click"),2000);   
            }else{
                that.timer=setInterval(this.conf.rightBtn.trigger("click"),that.conf.autoPlaySpeed);
            }
        }

        }        
    }
)(jQuery)