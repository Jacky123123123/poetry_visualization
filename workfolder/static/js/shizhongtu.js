document.addEventListener('DOMContentLoaded', function() {
    var pointer = document.getElementById('pointer');
    var container = document.querySelector('.clock-ciyun-container');
    var isDragging = false;
    var startAngle = 0;
    var startRotation = 20; // 设置初始旋转角度为 20 度
    var currentRotation = startRotation; // 存储当前旋转角度
    var timeValue = 0; // 初始化 timeValue 为 0
    document.querySelector('.chutang-area').style.display = 'block';
    // 设置指针的初始旋转角度
    pointer.style.transform = 'rotate(' + startRotation + 'deg)';

    // 鼠标按下事件
    pointer.addEventListener('mousedown', function(e) {
        isDragging = true;
        startAngle = Math.atan2(e.clientY - container.offsetTop - pointer.offsetTop, e.clientX - container.offsetLeft - pointer.offsetLeft);
        startRotation = currentRotation; // 记录拖拽前的旋转角度
        console.log('鼠标按下，旋转角度：', currentRotation);
        e.preventDefault(); // 阻止默认的鼠标拖拽事件
    });

    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            var angle = Math.atan2(e.clientY - container.offsetTop - pointer.offsetTop, e.clientX - container.offsetLeft - pointer.offsetLeft);
            var rotation = (angle - startAngle) * (180 / Math.PI) + startRotation;
            
            // 增加旋转角度的变化量系数
            var sensitivityFactor = 1.4; // 调整这个系数来提升或降低灵敏度
            
            // 计算旋转角度变化量
            var rotationChange = (rotation - currentRotation) * sensitivityFactor;
            
            // 更新当前旋转角度
            currentRotation += rotationChange;
            
            // 限制旋转角度在10到345度之间
            if (currentRotation < 10) {
                currentRotation = 10;
            } else if (currentRotation > 345) {
                currentRotation = 345;
            }
            
            pointer.style.transform = 'rotate(' + currentRotation + 'deg)';
        }
    });
    

    // 鼠标松开事件
    document.addEventListener('mouseup', function() {
        isDragging = false;
        console.log('鼠标松开，旋转角度：', currentRotation);

        // 根据旋转角度设置 timeValue
        if (currentRotation >= 10 && currentRotation < 96) {
            timeValue = 0;
        } else if (currentRotation >= 96 && currentRotation < 150) {
            timeValue = 0;
        } else if (currentRotation >= 150 && currentRotation < 256) {
            timeValue = 1;
        } else if (currentRotation >= 256 && currentRotation <= 345) {
            timeValue = 2;
        }

        // 根据 timeValue 显示对应的图片
        if (timeValue === 0) {
            document.querySelector('.chutang-area').style.display = 'block';
        } else {
            document.querySelector('.chutang-area').style.display = 'none';
        }

        if (timeValue === 1) {
            document.querySelector('.zhongtang-area').style.display = 'block';
        } else {
            document.querySelector('.zhongtang-area').style.display = 'none';
        }

        if (timeValue === 2) {
            document.querySelector('.wantang-area').style.display = 'block';
        } else {
            document.querySelector('.wantang-area').style.display = 'none';
        }
    });

    // 获取 CSS transform 中的旋转角度
    function getRotationDegrees(transform) {
        var match = transform.match(/rotate\(([-\d]+)deg\)/);
        return match ? parseFloat(match[1]) : 0;
    }
});


document.querySelector('.ciyun-baiyun').addEventListener('click', function() {
    toggleVisibility2('.chutang-yixiang1', '.yixiang-intro1');

    // 同时隐藏其他图片和介绍
    var elementsToHide = document.querySelectorAll('.chutang-yixiang2, .yixiang-intro2, .chutang-yixiang3, .yixiang-intro3');
    elementsToHide.forEach(function(element) {
        element.style.opacity = '0'; // 添加透明度变为0的动画
        element.addEventListener('transitionend', function() {
            element.style.display = 'none'; // 动画结束后隐藏元素
        });
    });
});

document.querySelector('.ciyun-jingqi').addEventListener('click', function() {
    toggleVisibility2('.chutang-yixiang2', '.yixiang-intro2');

    // 同时隐藏其他图片和介绍
    var elementsToHide = document.querySelectorAll('.chutang-yixiang1, .yixiang-intro1, .chutang-yixiang3, .yixiang-intro3');
    elementsToHide.forEach(function(element) {
        element.style.opacity = '0'; // 添加透明度变为0的动画
        element.addEventListener('transitionend', function() {
            element.style.display = 'none'; // 动画结束后隐藏元素
        });
    });
});

document.querySelector('.ciyun-changan').addEventListener('click', function() {
    toggleVisibility2('.chutang-yixiang3', '.yixiang-intro3');

    // 同时隐藏其他图片和介绍
    var elementsToHide = document.querySelectorAll('.chutang-yixiang1, .yixiang-intro1, .chutang-yixiang2, .yixiang-intro2');
    elementsToHide.forEach(function(element) {
        element.style.opacity = '0'; // 添加透明度变为0的动画
        element.addEventListener('transitionend', function() {
            element.style.display = 'none'; // 动画结束后隐藏元素
        });
    });
});

// 切换可见性函数
function toggleVisibility2(imageSelector, introSelector) {
    var imageElement = document.querySelector(imageSelector);
    var introElement = document.querySelector(introSelector);
    var isVisible = window.getComputedStyle(imageElement).opacity !== '0'; // 使用透明度判断可见性
    
    // 切换图片和介绍的可见性
    imageElement.style.opacity = isVisible ? '0' : '1'; // 切换透明度，产生淡入淡出效果
    introElement.style.opacity = isVisible ? '0' : '1'; // 切换透明度，产生淡入淡出效果
    if (!isVisible) {
        imageElement.style.display = 'block'; // 如果原本不可见，先显示出来
        introElement.style.display = 'block'; // 如果原本不可见，先显示出来
    }
}



document.querySelector('.ciyun-zhengren').addEventListener('click', function() {
    toggleVisibility2('.zhongtang-yixiang1', '.yixiang-intro4');

    // 同时隐藏其他图片和介绍
    var elementsToHide = document.querySelectorAll('.zhongtang-yixiang2, .yixiang-intro5, .zhongtang-yixiang3, .yixiang-intro6');
    elementsToHide.forEach(function(element) {
        element.style.opacity = '0'; // 添加透明度变为0的动画
        element.addEventListener('transitionend', function() {
            element.style.display = 'none'; // 动画结束后隐藏元素
        });
    });
});

document.querySelector('.ciyun-baishou').addEventListener('click', function() {
    toggleVisibility2('.zhongtang-yixiang2', '.yixiang-intro5');

    // 同时隐藏其他图片和介绍
    var elementsToHide = document.querySelectorAll('.zhongtang-yixiang1, .yixiang-intro4, .zhongtang-yixiang3, .yixiang-intro6');
    elementsToHide.forEach(function(element) {
        element.style.opacity = '0'; // 添加透明度变为0的动画
        element.addEventListener('transitionend', function() {
            element.style.display = 'none'; // 动画结束后隐藏元素
        });
    });
});

document.querySelector('.ciyun-qiufeng').addEventListener('click', function() {
    toggleVisibility2('.zhongtang-yixiang3', '.yixiang-intro6');

    // 同时隐藏其他图片和介绍
    var elementsToHide = document.querySelectorAll('.zhongtang-yixiang1, .yixiang-intro4, .zhongtang-yixiang2, .yixiang-intro5');
    elementsToHide.forEach(function(element) {
        element.style.opacity = '0'; // 添加透明度变为0的动画
        element.addEventListener('transitionend', function() {
            element.style.display = 'none'; // 动画结束后隐藏元素
        });
    });
});








document.querySelector('.ciyun-guanshan').addEventListener('click', function() {
    toggleVisibility2('.wantang-yixiang1', '.yixiang-intro7');

    // 同时隐藏其他图片和介绍
    var elementsToHide = document.querySelectorAll('.wantang-yixiang2, .yixiang-intro8');
    elementsToHide.forEach(function(element) {
        element.style.opacity = '0'; // 添加透明度变为0的动画
        element.addEventListener('transitionend', function() {
            element.style.display = 'none'; // 动画结束后隐藏元素
        });
    });
});

document.querySelector('.ciyun-loutai').addEventListener('click', function() {
    toggleVisibility2('.wantang-yixiang2', '.yixiang-intro8');

    // 同时隐藏其他图片和介绍
    var elementsToHide = document.querySelectorAll('.wantang-yixiang1, .yixiang-intro7');
    elementsToHide.forEach(function(element) {
        element.style.opacity = '0'; // 添加透明度变为0的动画
        element.addEventListener('transitionend', function() {
            element.style.display = 'none'; // 动画结束后隐藏元素
        });
    });
});


$(document).ready(function() {
    $('.ciyun-baiyun, .ciyun-jingqi, .ciyun-changan, .ciyun-zhengren, .ciyun-baishou, .ciyun-qiufeng, .ciyun-guanshan, .ciyun-loutai').hover(function() {
        var title = $(this).attr('datas');
        var tooltip = $('.ciyun-tooltip');
        var imgPosition = $(this).offset();
        var imgWidth = $(this).width();
        var imgHeight = $(this).height();
        
        // 计算页面的水平滚动偏移量
        var scrollLeft = $(window).scrollLeft();
        
        // 调整左侧位置，减去滚动偏移量
        var leftPosition = imgPosition.left - scrollLeft;
        
        tooltip.text(title);
        tooltip.css({
            top: imgPosition.top + imgHeight + 5,
            left: leftPosition + imgWidth / 2 - 350,
            display: 'block'
        });
    }, function() {
        $('.ciyun-tooltip').hide();
    });
});


$(document).ready(function() {
    $('.ciyun-baiyun, .ciyun-jingqi, .ciyun-changan, .ciyun-zhengren, .ciyun-baishou, .ciyun-qiufeng, .ciyun-guanshan, .ciyun-loutai').hover(function() {
        var title = $(this).attr('datas');
        var tooltip = $('.ciyun-tooltip');
        var imgPosition = $(this).offset();
        var imgWidth = $(this).width();
        var imgHeight = $(this).height();
        
        // 计算页面的水平滚动偏移量
        var scrollLeft = $(window).scrollLeft();
        
        // 调整左侧位置，减去滚动偏移量
        var leftPosition = imgPosition.left - scrollLeft;
        
        tooltip.text(title);
        tooltip.css({
            top: imgPosition.top + imgHeight + 5,
            left: leftPosition + imgWidth / 2 - 350,
            display: 'block'
        });
    }, function() {
        $('.ciyun-tooltip').hide();
    });
});

$(document).ready(function() {
    $('.chutang-piechart1, .chutang-piechart2, .chutang-piechart3, .chutang-piechart4, .chutang-piechart5, .chutang-piechart6, .chutang-piechart7, .chutang-piechart8, .chutang-piechart9').click(function() {
        $(this).toggleClass('active');
    });
});

$(document).ready(function() {
    // 点击事件处理函数1
    $('.chutang-piechart2').click(function() {
        // 获取tooltip元素
        var tooltip = $('.piechart-tooltip');
        
        // 如果tooltip当前是隐藏状态，则显示它；否则隐藏
        if (tooltip.is(':hidden')) {
            // 更新tooltip内容
            tooltip.html(`
                <p>抒情怀古 22.7%</p>
                <p>爱国抗争 18.1%</p>
                <p>英勇壮歌 16.7%</p>
                <p>忧国忧民 15.7%</p>
                <p>边塞风光 11.6%</p>
                <p>悲壮挽歌 10.2%</p>
                <p>闺怨 5.1%</p>
            `);
            tooltip.css({
                'top': '16vh',
                'left': '770px'
            });
            // 显示tooltip
            tooltip.show();
        } else {
            // 隐藏tooltip
            tooltip.hide();
        }
    });
    
    // 点击事件处理函数2
    $('.chutang-piechart1').click(function() {
        // 获取tooltip元素
        var tooltip = $('.piechart-tooltip');
        
        // 如果tooltip当前是隐藏状态，则显示它；否则隐藏
        if (tooltip.is(':hidden')) {
            // 更新tooltip内容
            tooltip.html(`
                <p>激越高亢 22.2%</p>
                <p>抒情哀怨 38.4%</p>
                <p>雄魂史诗 39.4%</p>
            `);
            tooltip.css({
                'top': '31vh',
                'left': '650px'
            });
            // 显示tooltip
            tooltip.show();
        } else {
            // 隐藏tooltip
            tooltip.hide();
        }
    });
     // 点击事件处理函数3
        $('.chutang-piechart3').click(function() {
            // 获取tooltip元素
            var tooltip = $('.piechart-tooltip');
            
            // 如果tooltip当前是隐藏状态，则显示它；否则隐藏
            if (tooltip.is(':hidden')) {
                // 更新tooltip内容
                tooltip.html(`
                    <p>忧 20.4%</p>
                    <p>惧 20.4%</p>
                    <p>悲 19.9%</p>
                    <p>喜 16.2%</p>
                    <p>乐 12.0%</p>
                    <p>怒 7.9%</p>
                    <p>思 3.2%</p>
                `);
                
                // 设置tooltip的位置
                tooltip.css({
                    'top': '1vh',
                    'left': '1120px'
                });
                
                // 显示tooltip
                tooltip.show();
            } else {
                // 隐藏tooltip
                tooltip.hide();
            }
        });
    
    $(document).ready(function() {
       
         // 点击事件处理函数4
    $('.chutang-piechart4').click(function() {
        // 获取tooltip元素
        var tooltip = $('.piechart-tooltip2');

        if (tooltip.is(':hidden')) {
        
        // 更新tooltip内容
        tooltip.html(`
            <p>激越高亢 23.8%</p>
            <p>抒情哀怨 50.0%</p>
            <p>雄魂史诗 26.2%</p>
        `);
        
        tooltip.css({
            'top': '31vh',
            'left': '650px'
        });
        
        // 显示tooltip
        tooltip.show();
    } else {
        // 隐藏tooltip
        tooltip.hide();
    }


    });


           // 点击事件处理函数4
           $('.chutang-piechart8').click(function() {
            // 获取tooltip元素
            var tooltip = $('.piechart-tooltip3');
    
            if (tooltip.is(':hidden')) {
            
                tooltip.html(`
                <p>抒情怀古 37.7%</p>
                <p>爱国抗争 20.8%</p>
                <p>英勇壮歌 14.6%</p>
                <p>边塞风光 14.6%</p>
                <p>悲壮挽歌 7.7%</p>
                <p>忧国忧民 3.8%</p>
                <p>闺怨 0.8%</p>
            `);
            tooltip.css({
                'top': '16vh',
                'left': '770px'
            });
            
            // 显示tooltip
            tooltip.show();
        } else {
            // 隐藏tooltip
            tooltip.hide();
        }
    
    
        });

        
        $('.chutang-piechart9').click(function() {
            // 获取tooltip元素
            var tooltip = $('.piechart-tooltip3');
            
            // 如果tooltip当前是隐藏状态，则显示它；否则隐藏
            if (tooltip.is(':hidden')) {
                // 更新tooltip内容
                tooltip.html(`
                <p>惧 34.6%</p>
                <p>怒 20.0%</p>
                    <p>忧 15.4%</p>
                    <p>乐 8.5%</p>
                    <p>思 8.5%</p>
                    <p>悲 7.7%</p>
                    <p>喜 5.4%</p>
                `);
                
                // 设置tooltip的位置
                tooltip.css({
                    'top': '1vh',
                    'left': '1120px'
                });
                
                // 显示tooltip
                tooltip.show();
            } else {
                // 隐藏tooltip
                tooltip.hide();
            }
        });








        $('.chutang-piechart7').click(function() {
            // 获取tooltip元素
            var tooltip = $('.piechart-tooltip3');
    
            if (tooltip.is(':hidden')) {
            
            // 更新tooltip内容
            tooltip.html(`
                <p>激越高亢 15.7%</p>
                <p>抒情哀怨 47.9%</p>
                <p>雄魂史诗 36.4%</p>
            `);
            
            tooltip.css({
                'top': '31vh',
                'left': '650px'
            });
            
            // 显示tooltip
            tooltip.show();
        } else {
            // 隐藏tooltip
            tooltip.hide();
        }
    
    
        });
    
    
               // 点击事件处理函数4
               $('.chutang-piechart5').click(function() {
                // 获取tooltip元素
                var tooltip = $('.piechart-tooltip2');
        
                if (tooltip.is(':hidden')) {
                
                    tooltip.html(`
                    <p>抒情怀古 24.0%</p>
                    <p>爱国抗争 17.4%</p>
                    <p>英勇壮歌 14.0%</p>
                    <p>边塞风光 10.7%</p>
                    <p>悲壮挽歌 9.1%</p>
                    <p>忧国忧民 19.0%</p>
                    <p>闺怨 5.8%</p>
                `);
                tooltip.css({
                    'top': '16vh',
                    'left': '770px'
                });
                
                // 显示tooltip
                tooltip.show();
            } else {
                // 隐藏tooltip
                tooltip.hide();
            }
        
        
            });
    
            
            $('.chutang-piechart6').click(function() {
                // 获取tooltip元素
                var tooltip = $('.piechart-tooltip2');
                
                // 如果tooltip当前是隐藏状态，则显示它；否则隐藏
                if (tooltip.is(':hidden')) {
                    // 更新tooltip内容
                    tooltip.html(`
                    <p>惧 17.4%</p>
                    <p>怒 6.6%</p>
                        <p>忧 18.2%</p>
                        <p>乐 10.7%</p>
                        <p>思 12.4%</p>
                        <p>悲 24.0%</p>
                        <p>喜 5.4%</p>
                    `);
                    
                    // 设置tooltip的位置
                    tooltip.css({
                        'top': '1vh',
                        'left': '1120px'
                    });
                    
                    // 显示tooltip
                    tooltip.show();
                } else {
                    // 隐藏tooltip
                    tooltip.hide();
                }
            });
        


    });
    
});
