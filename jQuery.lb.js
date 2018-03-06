(function ($) {
    $.fn.lb = function (conf) {
        this.conf = {
            "autoPlay": conf.autoPlay,
            "autoPlaySpeed": conf.autoPlaySpeed,
            "leftBtn": conf.leftBtn,
            "rightBtn": conf.rightBtn,
            "listItems": conf.listItems,
            "img": conf.img
        };
        this.index = 0;
        this.imgWidth = 0;
        this.listItemsBgC = null;
        this.timer = null;
        var that = this;
        if (this.conf.img != undefined) {
            this.imgWidth = this.conf.img.innerWidth();
            this.conf.img.children().eq(0).css("left", 0).siblings().css("left", this.imgWidth);
            console.log(this.imgWidth)
        } else (
            console.error("必须传入一个img对象组")
        )
        //左右按键部分
        if (this.conf.leftBtn != undefined && this.conf.rightBtn != undefined) {
            this.conf.leftBtn.click(function () {
                that.moveRight();
            })
            this.conf.rightBtn.click(function () {
                that.moveLeft();
            })
        }
        this.moveLeft = function () {
            if (this.index === this.conf.img.children().length - 1) {
                this.index = 0;
                this.conf.img.children().eq(this.conf.img.children().length - 1).css('left', 0).css('z-index', 3).stop().animate({ left: -this.imgWidth }, 1000);
                this.conf.img.children().eq(0).css('left', this.imgWidth).css('z-index', 2).stop().animate({ left: 0 }, 1000);
            } else {
                this.conf.img.children().eq(this.index).css('left', 0).css('z-index', 3).stop().animate({ left: -this.imgWidth }, 1000);
                this.conf.img.children().eq(this.index + 1).css('left', this.imgWidth).css('z-index', 2).stop().animate({ left: 0 }, 1000);
                this.index++;
            }
            this.conf.listItems.children().eq(this.index).css("background", "red").siblings().css("background-color", this.listItemsBgC);
        }
        this.moveRight = function () {
            if (this.index === 0) {
                this.index = this.conf.img.children().length - 1;
                this.conf.img.children().eq(this.index).css('left', -this.imgWidth).stop().animate({ left: 0 }, 1000);
                this.conf.img.children().eq(0).css('left', 0).stop().animate({ left: this.imgWidth }, 1000);
            } else {
                this.conf.img.children().eq(this.index - 1).css('left', -this.imgWidth).stop().animate({ left: 0 }, 1000);
                this.conf.img.children().eq(this.index).css('left', 0).stop().animate({ left: this.imgWidth }, 1000);
                this.index--;
            }
            this.conf.listItems.children().eq(this.index).css("background", "red").siblings().css("background-color", this.listItemsBgC);
        }
        //小按钮部分
        if ( this.conf.listItems != undefined) {
            this.conf.listItems.children().eq(0).css("background", "red");
            this.listItemsBgC = this.conf.listItems.children().eq(1).css("background-color");
            this.conf.listItems.on('click', "a", function () {
                var oldIndex = that.index;
                $(this).css("background", "red").siblings().css("background-color", that.listItemsBgC);
                that.index = $(this).index();
                if ($(this).index() > oldIndex) {
                    that.conf.img.children().eq(oldIndex).css('left', 0).css('z-index', 3).stop().animate({ left: -that.imgWidth }, 1000);
                    that.conf.img.children().eq($(this).index()).css('left', that.imgWidth).css('z-index', 2).stop().animate({ left: 0 }, 1000);
                }
                if ($(this).index() < oldIndex) {
                    that.conf.img.children().eq(oldIndex).css('left', 0).css('z-index', 3).stop().animate({ left: that.imgWidth }, 1000);
                    that.conf.img.children().eq($(this).index()).css('left', -that.imgWidth).css('z-index', 2).stop().animate({ left: 0 }, 1000);
                }
            })
        }

        
        //自动播放   

        setTimeout(function () {
            if (that.conf.autoPlaySpeed == undefined) {
                that.timer = setInterval(function () { that.conf.rightBtn.trigger("click") }, 4000);
            } else {
                that.timer = setInterval(that.conf.rightBtn.trigger("click"), that.conf.autoPlaySpeed);
            }
        }, 4000)
        this.conf.img.on("mouseenter",function(){
            clearInterval(that.timer);
        })
        this.conf.img.on("mouseleave",function(){
            if (that.conf.autoPlaySpeed == undefined) {
                that.timer = setInterval(function () { that.conf.rightBtn.trigger("click") }, 4000);
            } else {
                that.timer = setInterval(that.conf.rightBtn.trigger("click"), that.conf.autoPlaySpeed);
            }
        })
    }
}
)(jQuery)