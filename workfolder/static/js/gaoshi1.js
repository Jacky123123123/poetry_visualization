        // 鼠标按下时触发的事件处理程序
        draggableElement1.addEventListener('mousedown', function (event) {
            event.preventDefault(); // 阻止默认行为
            // 计算鼠标相对于元素左上角的偏移量
            offsetX1 = event.clientX - draggableElement1.offsetLeft;
            offsetY1 = event.clientY - draggableElement1.offsetTop;
        
            // 启用鼠标移动事件
            document.addEventListener('mousemove', onMouseMove1);
            // 鼠标抬起时移除事件监听
            document.addEventListener('mouseup', onMouseUp1);
        });
        
        draggableElement2.addEventListener('mousedown', function (event) {
            event.preventDefault(); // 阻止默认行为
            // 计算鼠标相对于元素左上角的偏移量
            offsetX2 = event.clientX - draggableElement2.offsetLeft;
            offsetY2 = event.clientY - draggableElement2.offsetTop;
        
            // 启用鼠标移动事件
            document.addEventListener('mousemove', onMouseMove2);
            // 鼠标抬起时移除事件监听
            document.addEventListener('mouseup', onMouseUp2);
        });
        
        // 鼠标移动时触发的事件处理程序
        function onMouseMove1(event) {
            // 计算元素的新位置
            var newX = event.clientX - offsetX1;
            var newY = event.clientY - offsetY1;
        
            // 更新元素的位置
            draggableElement1.style.left = newX + 'px';
            draggableElement1.style.top = newY + 'px';
        }
        
        function onMouseMove2(event) {
            // 计算元素的新位置
            var newX = event.clientX - offsetX2;
            var newY = event.clientY - offsetY2;
        
            // 更新元素的位置
            draggableElement2.style.left = newX + 'px';
            draggableElement2.style.top = newY + 'px';
        }
        
        // 鼠标抬起时触发的事件处理程序
        function onMouseUp1() {
            // 移除鼠标移动事件的监听
            document.removeEventListener('mousemove', onMouseMove1);
            document.removeEventListener('mouseup', onMouseUp1);
        
            // 获取目标区域的边界信息
            var targetRect = document.getElementById('targetArea').getBoundingClientRect();
            
            // 获取拖拽元素的边界信息
            var elementRect = draggableElement1.getBoundingClientRect();

            var targetElement = document.getElementById('targetArea');

        
            // 如果元素不在指定目标区域内，将其回到初始位置
if (!isInside(targetRect, elementRect)) {
    draggableElement1.style.left = initialX1 + 'px';
    draggableElement1.style.top = initialY1 + 'px';

    // 将拖拽元素的不透明度设置为1
    draggableElement1.style.opacity = 1;


    // 如果.gaoshi-state2和.gaoshi-state3都是none，则执行以下操作
    if (document.querySelector('.gaoshi-state2').style.display === 'none' && document.querySelector('.gaoshi-state3').style.display === 'none') {
        targetElement.style.left = 390 + 'px';
        targetElement.style.bottom = 52 + 'vh';

        
        // 显示.gaoshi-state1，隐藏.gaoshi-state2
        document.querySelector('.gaoshi-state1').style.display = 'block';
        document.querySelector('.gaoshi-state3').style.display = 'none';
        document.querySelector('.gaoshi-zaoqi-bigcontainer').style.display = 'none';

        // 启动透明度动画
        startOpacityAnimation();
    }
} else {
        
                 // 将拖拽元素的不透明度设置为0
                 draggableElement1.style.opacity = 0;
        
                 // 如果拖拽元素在目标区域内，隐藏.gaoshi-state1，显示.gaoshi-state3
                 document.querySelector('.gaoshi-state1').style.display = 'none';
                document.querySelector('.gaoshi-state3').style.display = 'block';
                document.querySelector('.gaoshi-zaoqi-bigcontainer').style.display = 'block';
        
                
                targetElement.style.left = 350 + 'px';
                targetElement.style.bottom = 55 + 'vh';


                
                // 检查 draggableElement1 是否在目标区域内，如果是，则将其回到初始位置
                var element1Rect = draggableElement2.getBoundingClientRect();
                         // 将拖拽元素的不透明度设置为0
                         draggableElement2.style.opacity = 1;
                if (isInside(targetRect, element1Rect)) {
                    draggableElement2.style.left = initialX2 + 'px';
                    draggableElement2.style.top = initialY2 + 'px';
                    // 如果拖拽元素在目标区域内，隐藏.gaoshi-state1，显示.gaoshi-state2
                document.querySelector('.gaoshi-state1').style.display = 'none';
                document.querySelector('.gaoshi-state2').style.display = 'none';
                document.querySelector('.gaoshi-wanqi-bigcontainer').style.display = 'none';
                }
                // 停止透明度动画
                stopOpacityAnimation();
            }
        }
        
        function onMouseUp2() {
            // 移除鼠标移动事件的监听
            document.removeEventListener('mousemove', onMouseMove2);
            document.removeEventListener('mouseup', onMouseUp2);
        
            // 获取目标区域的边界信息
            var targetRect = document.getElementById('targetArea').getBoundingClientRect();
            
            // 获取拖拽元素的边界信息
            var elementRect = draggableElement2.getBoundingClientRect();

            var targetElement = document.getElementById('targetArea');
        
           // 如果元素不在指定目标区域内，将其回到初始位置
if (!isInside(targetRect, elementRect)) {
    draggableElement2.style.left = initialX2 + 'px';
    draggableElement2.style.top = initialY2 + 'px';

     // 将拖拽元素的不透明度设置为1
     draggableElement2.style.opacity = 1;

    // 如果.gaoshi-state2是none，则执行以下操作
    if (document.querySelector('.gaoshi-state2').style.display === 'none' && document.querySelector('.gaoshi-state3').style.display === 'none') {
       

        // 显示.gaoshi-state1，隐藏.gaoshi-state2
        document.querySelector('.gaoshi-state1').style.display = 'block';
        document.querySelector('.gaoshi-state2').style.display = 'none';
        document.querySelector('.gaoshi-wanqi-bigcontainer').style.display = 'none';

        // 启动透明度动画
        startOpacityAnimation();
    }
}
 else {
                // 如果拖拽元素在目标区域内，隐藏.gaoshi-state1，显示.gaoshi-state2
                document.querySelector('.gaoshi-state1').style.display = 'none';
                document.querySelector('.gaoshi-state2').style.display = 'block';
                document.querySelector('.gaoshi-wanqi-bigcontainer').style.display = 'block';
        
                         // 将拖拽元素的不透明度设置为0
                         draggableElement2.style.opacity = 0;

                         
                        //  targetElement.style.left = 620 + 'px';
                        //  targetElement.style.bottom = 58 + 'vh';
        
                 // 检查 draggableElement1 是否在目标区域内，如果是，则将其回到初始位置
                 var element1Rect = draggableElement1.getBoundingClientRect();
                 // 将拖拽元素的不透明度设置为0
                 draggableElement1.style.opacity = 1;
                if (isInside(targetRect, element1Rect)) {
                    draggableElement1.style.left = initialX1 + 'px';
                    draggableElement1.style.top = initialY1 + 'px';
                    // 如果拖拽元素在目标区域内，隐藏.gaoshi-state1，显示.gaoshi-state2
                document.querySelector('.gaoshi-state1').style.display = 'none';
                document.querySelector('.gaoshi-state3').style.display = 'none';
                document.querySelector('.gaoshi-zaoqi-bigcontainer').style.display = 'none';
        
                
                }
        
                // 停止透明度动画
                stopOpacityAnimation();
            }
        }
        
        
        
        // 检查元素是否部分在指定区域内
        function isInside(targetRect, elementRect) {
            return (
                elementRect.right > targetRect.left &&
                elementRect.left < targetRect.right &&
                elementRect.bottom > targetRect.top &&
                elementRect.top < targetRect.bottom
            );
        }
        
        
        // 启动透明度动画
        function startOpacityAnimation() {
            var dragInit1 = document.querySelector('.drag-init1');
            var dragInit2 = document.querySelector('.drag-init2');
            var dragInit3 = document.querySelector('.target');
            dragInit1.style.animationPlayState = 'running';
            dragInit2.style.animationPlayState = 'running';
            dragInit3.style.animationPlayState = 'running';
        }
        
        function stopOpacityAnimation() {
            var dragInit1 = document.querySelector('.drag-init1');
            var dragInit2 = document.querySelector('.drag-init2');
            var dragInit3 = document.querySelector('.target');
        
            dragInit1.style.opacity = 1;
            dragInit2.style.opacity = 1;
            dragInit3.style.opacity = 1;
            dragInit1.style.animationPlayState = 'paused';
            dragInit2.style.animationPlayState = 'paused';
            dragInit3.style.animationPlayState = 'paused';
        
        }
        