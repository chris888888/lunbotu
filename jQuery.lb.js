(function ($) {
    $.fn.lb = function (conf) {
        this.index=0;
        this.imgWidth=0;
        this.listItemsBgC=null;
        this.conf = {
            "autoPlay": conf.autoPlay,
            "leftBtn": conf.leftBtn,
            "rightBtn": conf.rightBtn,
            "listItems": conf.listItems,
            "img": conf.img
        };
        if(this.conf.img != undefined){
            imgWidth=this.conf.img.innerWidth();
            this.conf.img.eq(0).css("left",0).siblings().css("left",imgWidth);
        }else(
            console.error("必须传入一个img对象组")
        )
        if (typeof this.conf.leftBtn == Object && typeof this.conf.rightBtn == Object
            && this.conf.leftBtn.length != 0 && this.conf.rightBtn.length != 0) {
            this.conf.leftBtn.click(function () {

            })
            this.conf.rightBtn.click(function () {

            })
        }
        if(typeof this.conf.listItems !=undefined ){
            this.conf.listItems.children().eq(0).css("background","red");
            this.listItemsBgC=this.conf.listItems.children().eq(1).css("background-color");
            var color=this.listItemsBgC;
            this.conf.listItems.on('click',"a",function(){
                $(this).css("background","red").siblings().css("background-color",color);
            })
            }
        }

    }





)(jQuery)