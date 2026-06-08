window.addEventListener('load', function() {
    document.querySelector('.warflag-bac-img').style.opacity = 0;
});


// 设置容器的宽度和高度
var containerWidth = 1050; // 容器宽度为1600px
// 获取容器的高度为视口高度
var containerHeight = window.innerHeight;



var containerLeft = 6800; // 将10vh转换为像素值
var containerTop = 100;


// 构建枯叶数据
var leaves = [];
for (var i = 0; i < 50; i++) {
    var leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.style.left = containerLeft +  Math.random() * containerWidth + 'px'; // 随机 x 坐标，限制在容器宽度内
    leaf.style.top = Math.random() * containerHeight + 'px'; // 随机 y 坐标，限制在容器高度内
    document.body.appendChild(leaf);
    var petalIndex = i % 11; // 计算花瓣图片索引
    var size = 70; // 默认叶子大小
    var speed = 0; // 默认叶子速度
    if (petalIndex >= 6) {
        size *= 0.6; // 调整尺寸为原来的20%
        speed *= 0.6; // 调整速度为原来的20%
    }
    var rotationDuration = Math.random() * 6 + 4; // 随机旋转时长，范围在4到10秒之间
    var fadeDuration = Math.random() * 6 + 3; // 随机透明度动画时长，范围在3到9秒之间
    leaf.style.animation = `rotate ${rotationDuration}s linear infinite, fade ${fadeDuration}s alternate infinite`; // 设置旋转和透明度动画
    leaves.push({
        element: leaf,
        angle: Math.random() * 2 * Math.PI, // 随机角度
        speed: Math.random() * 0.4 + speed,  // 加快速度，调整参数
        petalIndex: petalIndex, // 叶子所使用的花瓣图片索引
        size: size, // 叶子大小
        rotationDuration: rotationDuration, // 旋转时长
        fadeDuration: fadeDuration // 透明度动画时长
    });
}

// 设置叶子背景图片和旋转动画
leaves.forEach(function(leaf, index) {
    var petalIndex = leaf.petalIndex + 1; // 花瓣图片索引从1开始
    leaf.element.style.backgroundImage = `url('../../../images/花瓣/petal${petalIndex}.png')`;
    leaf.element.style.backgroundSize = "contain"; // 保持原始比例
    leaf.element.style.backgroundRepeat = "no-repeat"; // 不重复
    leaf.element.style.width = leaf.element.style.height = leaf.size + 'px'; // 设置叶子大小
    
    // 设置透明度关键帧
    var keyframesFade = `@keyframes fade-${index} {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.5;
        }
        100% {
            opacity: 1;
        }
    }`;
    // 将透明度关键帧添加到样式表中
    document.styleSheets[0].insertRule(keyframesFade);
    
    // 设置旋转关键帧
    var rotationDegrees = 360; // 随机旋转角度
    var keyframes = `@keyframes rotate-${index} {
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(${rotationDegrees}deg);
        }
    }`;
    // 将旋转关键帧添加到样式表中
    document.styleSheets[0].insertRule(keyframes);
});



    // 加载古诗 JSON 文件
    d3.json("../../../wushi.json").then(function(data) {
        // 将古诗数据与叶子关联
        for (var i = 0; i < data.length; i++) {
            leaves[i].poem = {
                author: data[i].author,
                title: data[i].title,
                paragraphs: data[i].paragraphs
            };
        }
    });

// 更新叶子位置
function update() {
    leaves.forEach(function(leaf) {
        // 更新位置
        var x = parseFloat(leaf.element.style.left);
        var y = parseFloat(leaf.element.style.top);
        x += Math.cos(leaf.angle) * leaf.speed;
        y += Math.sin(leaf.angle) * leaf.speed;

        // 判断是否出界，如果出界则重新设置位置
        if (x < containerLeft || x > containerLeft + containerWidth  || y < containerTop|| y >  containerHeight-containerTop-100) {
            resetLeaf(leaf); // 重新设置叶子位置
        } else {
            leaf.element.style.left = x + 'px';
            leaf.element.style.top = y + 'px';
        }
    });

    requestAnimationFrame(update);
}

// 重新设置叶子位置
function resetLeaf(leaf) {
    // 随机生成新的位置和角度
    leaf.element.style.left = (containerLeft + Math.random() * containerWidth) + 'px';
    leaf.element.style.top = ( Math.random() * containerHeight) + 'px';
    leaf.angle = Math.random() * 2 * Math.PI;
}

// 开始更新
update();


    
// 鼠标悬停叶子事件监听
document.body.addEventListener("mousemove", function(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;

    var tooltipDisplayed = false; // 记录tooltip显示状态的变量
    var highestPriorityLeaf = null; // 记录序号最高的叶子

    // 将所有叶子序号设置为默认值，并且速度恢复为随机值
    leaves.forEach(function(leaf) {
        leaf.number = 1;
        leaf.speed = Math.random() * 0.4 + 0.5;
    });

    // 查找鼠标悬停的叶子，并且找到序号最高的叶子
    leaves.forEach(function(leaf) {
        var rect = leaf.element.getBoundingClientRect();
        if (mouseX >= rect.left && mouseX <= rect.right && mouseY >= rect.top && mouseY <= rect.bottom) {
            if (!highestPriorityLeaf || leaf.number < highestPriorityLeaf.number) {
                highestPriorityLeaf = leaf;
            }
        }
    });

    // 如果有悬停的叶子，则将其序号设置为最高级，并且速度设置为0，并且设置旋转速度更快
    if (highestPriorityLeaf) {
        highestPriorityLeaf.number = 0;
        highestPriorityLeaf.speed = 0;
        // 设置悬停叶子的不透明度为1，并且使用!important以确保优先级
    highestPriorityLeaf.element.style.opacity = '1!important';
        // 加快旋转速度
        highestPriorityLeaf.element.style.animationDuration = '2s'; // 2秒
    }

    // 判断是否需要显示tooltip
    if (highestPriorityLeaf) {
        // 显示tooltip，显示叶子对应的古诗
        var tooltip = document.getElementById('flower-tooltip');
        tooltip.innerHTML = "<strong>诗人：</strong>" + highestPriorityLeaf.poem.author + "<br><strong>标题：</strong>" + highestPriorityLeaf.poem.title + "<br><strong>内容：</strong>" + highestPriorityLeaf.poem.paragraphs.join("<br>");
        tooltip.style.left = mouseX -150 + 'px';
        tooltip.style.top = mouseY +50 + 'px';
        tooltip.style.display = 'block';
        tooltipDisplayed = true;
    }

    // 如果tooltip未显示，则将所有叶子速度恢复为随机值
    if (!tooltipDisplayed) {
        leaves.forEach(function(leaf) {
            leaf.speed = Math.random() * 0.4 + 0.5;
        });
    }
});


// 鼠标移出叶子事件监听
document.body.addEventListener("mouseout", function(event) {
    var tooltip = document.getElementById('flower-tooltip');
    tooltip.style.display = 'none'; // 隐藏tooltip

    // 将所有叶子速度恢复为随机值，并且将不透明度恢复为动画范围内
    leaves.forEach(function(leaf) {
        leaf.speed = Math.random() * 0.3 + 0.5;
        leaf.element.style.opacity = ''; // 恢复到动画中的默认不透明度
        leaf.element.style.animationDuration = leaf.rotationDuration + 's'; // 恢复旋转速度
        leaf.hovered = false; // 重置叶子悬停状态
    });
});




// 定义全局变量用于存储滚动累加值
var totalScrollValue = 0;
// 定义全局变量用于存储已经移除的叶子
var removedLeaves = [];

// 定义变量来跟踪是否已经加载过 warflag.js 文件
var warflagScriptLoaded = false;

// 定义滚动监听函数
function mainScrollListener(event) {
    // 获取滚动值并累加到总值中
    totalScrollValue += event.deltaY;
    console.log("Total Scroll Value:", totalScrollValue);

    //  // 获取滚动方向
    //  var scrollDirection = event.deltaY > 0 ? 'down' : 'up';
    
    //  // 如果滚动方向为逆时针，则提示用户顺时针滚动鼠标
    //  if (scrollDirection === 'up') {
    //      alert('请顺时针滚动鼠标');
    //  }

    // 在1600-2400范围内，让20%的叶子消失
    if (totalScrollValue > 1600 && totalScrollValue <= 2400) {
        var numLeavesToRemove = Math.round(leaves.length * 0.2); // 计算要移除的叶子数量
        for (var i = 0; i < numLeavesToRemove; i++) {
            var randomIndex = Math.floor(Math.random() * leaves.length); // 随机选择一个叶子
            removedLeaves.push(leaves[randomIndex]); // 将移除的叶子存储到已移除叶子数组中
            leaves[randomIndex].element.style.display = 'none'; // 隐藏该叶子
            leaves.splice(randomIndex, 1); // 从叶子数组中移除该叶子
        }
    }
    // 在2400-3200范围内，让剩余80%的叶子消失
    else if (totalScrollValue > 2400 && totalScrollValue <= 3200) {
        var numLeavesToKeep = Math.round(leaves.length * 0.2); // 计算要保留的叶子数量
        for (var i = numLeavesToKeep; i < leaves.length; i++) {
            leaves[i].element.style.display = 'none'; // 隐藏剩余的叶子
            removedLeaves.push(leaves[i]); // 将移除的叶子存储到已移除叶子数组中
        }
        leaves.splice(numLeavesToKeep, leaves.length - numLeavesToKeep); // 从叶子数组中移除剩余的叶子
    }
    // 当滚动值超过3200时，移除所有叶子的 HTML 元素
    else if (totalScrollValue > 3200) {
        leaves.forEach(function(leaf) {
            leaf.element.remove(); // 从 DOM 中移除叶子元素
        });
        // 清空叶子数组
        leaves = [];
    }
    // 当滚动值回到1600以下时，重新生成消失的叶子
    else if (totalScrollValue <= 1600) {
        removedLeaves.forEach(function(removedLeaf) {
            removedLeaf.element.style.display = 'block'; // 显示移除的叶子
            leaves.push(removedLeaf); // 将叶子重新添加到叶子数组中
        });
        removedLeaves = []; // 清空已移除叶子数组
    }

    // 监听滚动值达到2800时，图片的不透明度开始降低
    if (totalScrollValue >= 2800 && totalScrollValue < 3600) {
        var opacity = 1 - (totalScrollValue - 2800) / (3600 - 2800); // 计算不透明度
        document.querySelector('.leaf-bac-img').style.opacity = opacity;
    }
    // 当滚动值达到3600时，图片完全消失
    else if (totalScrollValue >= 3600) {
        document.querySelector('.leaf-bac-img').style.opacity = 0;
    }

    // 在0-2800范围内，让图片不可见
    if (totalScrollValue >= 0 && totalScrollValue < 2900) {
        document.querySelector('.warflag-bac-img').style.opacity = 0;
    }
    // 在2800-3600范围内，图片的不透明度从0到100
    else if (totalScrollValue >= 2900 && totalScrollValue < 3600) {
        var opacity = (totalScrollValue - 2900) / (3600 - 2900); // 计算不透明度
        document.querySelector('.warflag-bac-img').style.opacity = opacity;
    }
    // 当滚动值超过3600时，图片完全显示
    else if (totalScrollValue >= 3600) {
        document.querySelector('.warflag-bac-img').style.opacity = 1;
    }

    // 判断滚动值是否达到 3600
    if (totalScrollValue >= 3600) {
        // 获取 .flag-container 元素
        var flagContainer = document.querySelector('.flag-container');
        // 添加类使其可见
        flagContainer.classList.add('visible');
    }

    if (totalScrollValue >= 3600) {
        var leafContainer = document.getElementById("leafContainer");
        if (leafContainer) {
            leafContainer.style.display = "none";
        }
    }

    // 判断滚动值是否达到 3600 并且 warflag.js 还没有加载过
    if (totalScrollValue >= 3600 && !warflagScriptLoaded) {
        // 引入 warflag.js 文件
        var script = document.createElement('script');
        script.src = '../../../warflag.js';
        script.onload = function() {
            console.log('warflag.js loaded.'); // 可以在控制台输出信息以确认脚本已加载
            warflagScriptLoaded = true; // 将变量设置为 true，表示 warflag.js 已加载
            // 移除 warflag.js 相关滚动监听，但保留其他滚动监听
            window.removeEventListener('wheel', mainScrollListener);
        };
        document.head.appendChild(script);

         // 设置 .piechart-container 元素可见
         document.querySelector('.piechart-container').style.display = 'block';
    }
}

// 添加滚动监听
window.addEventListener('wheel', mainScrollListener);
 
// 定义其他滚动监听函数，用于保留其他滚动行为
function otherScrollListener(event) {
    // 此处定义其他滚动行为
}

// 添加其他滚动监听
window.addEventListener('wheel', otherScrollListener);
