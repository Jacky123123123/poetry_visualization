// 读取JSON文件并生成旗子
d3.json('715-795.json').then(function(poemsData) {
    // 计算每根线应该放置的诗歌数量
    const poemCount = poemsData.length;
    const poemsPerLine = Math.ceil(poemCount / 5);

    // 计算每个旗子的尺寸和间隔
    const flagSize = 140;
    const flagSpacing = 10;

    // 定义每根线上的旗子数量的数组
    let flagCounts = [0, 0, 0, 0, 0];

    // 生成每根线上的旗子
    for (let i = 1; i <= 5; i++) {
        const lineId = `Line${i}`;
        const lineElement = d3.select(`#${lineId}`);

        console.log("1");
        // 计算该线上的起始位置和方向角度
        let startPositionX, startPositionY, rotationAngle;
        let flagSizeFactor = 1; // 初始化旗子尺寸放大因子

        
        switch (i) {
            case 1:
                startPositionX = 30;
                startPositionY = 35;
                rotationAngle = -65;
                break;
            case 2:
                startPositionX = 40;
                startPositionY = 35;
                rotationAngle = -45;
                break;
            case 3:
                startPositionX = 50;
                startPositionY = 16;
                rotationAngle = 0;
                // 针对 Line3 额外增加放大因子
                flagSizeFactor = 2; // 假设放大 2 倍
                break;
            case 4:
                startPositionX = 60;
                startPositionY = 35;
                rotationAngle = -45;
                break;
            case 5:
                startPositionX = 70;
                startPositionY = 35;
                rotationAngle = -65; // 将旋转角度设置为-55度，朝向屏幕下方
                break;
        }

        // 计算每个旗子的位置和尺寸
        for (let j = 0; j < poemsPerLine; j++) {
            const poemIndex = (i - 1) * poemsPerLine + j;
            if (poemIndex >= poemCount || j >= 5) break;

            // 检查该线是否需要生成新的旗子
            if (flagCounts[i - 1] < 5) {
                // 确定新旗子的位置
                const imagePath = `./images/旗子/${poemsData[poemIndex].labels.charAt(0)}/${poemsData[poemIndex].labels}.png`;
                let extraSpacing = 0; // 额外的间距
                if (i === 3) {
                    extraSpacing = 20; // 对于 Line3，增加额外的间距
                }
                const positionX = startPositionX + (flagCounts[i - 1] * flagSpacing + extraSpacing) * Math.cos(rotationAngle * Math.PI / 180);
                const positionY = startPositionY + (flagCounts[i - 1] * flagSpacing + extraSpacing) * Math.sin(rotationAngle * Math.PI / 180);
                // 计算每个旗子的尺寸
                const distanceToTop = startPositionY - positionY;
                let flagSizeFactor = 2.1 - (distanceToTop / 35) * 1.5; // 越靠近屏幕上方的旗子越小
                let flagSizeAdjusted = flagSize * flagSizeFactor;
                // 确保旗子尺寸至少大于100像素
                if (flagSizeAdjusted < 100) {
                    flagSizeAdjusted = 100;
                }
                // 计算透明度
                let opacity = 1;
                if (i === 3) {
                    opacity = 0.5; // 中间旗子透明度降低
                } else if (distanceToTop > 0) {
                    opacity = 0.7; // 上方旗子透明度降低
                } else {
                    opacity = 0.7; // 下方旗子透明度降低
                }
                // 创建旗子并设置位置，同时绑定诗歌数据
                const flagElement = lineElement.append('img')
                    .attr('src', imagePath)
                    .style('width', `${flagSizeAdjusted}px`)
                    .style('height', `${flagSizeAdjusted}px`)
                    .style('top', `${positionY}vh`)
                    .style('opacity', opacity)
                    .datum(poemsData[poemIndex]);
                // 增加旗子数量计数器
                flagCounts[i - 1]++;
            }
        }
    }

    
    let currentPoemIndex = 0;

    // 生成新的旗子
    function generateFlag(lineNumber) {
        const lineId = `Line${lineNumber}`;
        const lineElement = d3.select(`#${lineId}`);
    
        // 从 JSON 文件中获取数据
        d3.json('715-795.json').then(function(poemsData) {

            
           // 检查是否还有诗歌可以读取
if (currentPoemIndex >= poemsData.length) {
    console.log("No more poems to read.");
    isScrollEnabled = true;
    isScrollReallyEnabled = false;
    $(document).on('wheel', handleScroll); // 重新绑定滚动事件监听器
    var scriptElement = document.querySelector('script[src="./workfolder/static/js/pre-data-full-screen.js"]');
    if (scriptElement) {
        scriptElement.remove();
        console.log("Script removed.");
    }
}
    
            // 从诗歌数据中获取当前诗歌
            const poemData = poemsData[currentPoemIndex++];

        // 在此处添加生成新旗子的代码，使用给定的诗歌数据 poemData
        let startPositionX, startPositionY, rotationAngle;
        switch (lineNumber) {
            case 1:
                startPositionX = 0;
                startPositionY = 2;
                rotationAngle = -65;
                break;
            case 2:
                startPositionX = 0;
                startPositionY = 7;
                rotationAngle = -45;
                break;
            case 3:
                startPositionX = 0;
                startPositionY = 9;
                rotationAngle = -8;
                break;
            case 4:
                startPositionX = 0;
                startPositionY = 7;
                rotationAngle = -45;
                break;
            case 5:
                startPositionX = 0;
                startPositionY = 2;
                rotationAngle = -65;
                break;
        }

        // 计算旗子的位置
        const positionX = startPositionX;
        const positionY = startPositionY;

        // 创建旗子并设置位置
        const flagElement = lineElement.append('img')
            .attr('src', `./images/旗子/${poemData.labels.charAt(0)}/${poemData.labels}.png`)
            .style('width', `${flagSize}px`)
            .style('height', `${flagSize}px`)
            .style('top', `${positionY}vh`)
            .style('left', `${positionX}vh`)
            .style('opacity', 0)  
            .datum(poemData);

        // 增加旗子数量计数器
        flagCounts[lineNumber - 1]++;
        console.log(lineId);
        moveFlag(flagElement.node(), 1, lineId); // 传递 lineNumber 参数给 moveFlag 函数


 // 添加悬停事件监听器
flagElement.on('mouseover', function() {
    // 获取与当前旗子相关联的数据
    const data = d3.select(this).datum();
    
    // 更新提示框的内容
    const flagTooltip = d3.select('#flagTooltip');
    flagTooltip.html(`
        <strong>诗歌标题:</strong> ${data.title} <br>
        <strong>作者:</strong> ${data.author} <br>
        <strong>段落:</strong> ${data.paragraphs.join('<br>')}
    `);

    // 显示提示框
    flagTooltip.style('display', 'block');

    // 设置提示框的位置
    const flagBounds = this.getBoundingClientRect();
    const tooltipWidth = flagTooltip.node().offsetWidth;
    const tooltipHeight = flagTooltip.node().offsetHeight;
    const tooltipLeft = flagBounds.left - (tooltipWidth - flagBounds.width) / 2 -200;
    const tooltipTop = flagBounds.top - tooltipHeight + 10; // 这里假设提示框在旗子的上方显示，并略微偏移
    flagTooltip.style('left', `${tooltipLeft}px`)
               .style('top', `${tooltipTop}px`);
});

// 添加鼠标移出事件监听器，隐藏提示框
flagElement.on('mouseout', function() {
    d3.select('#flagTooltip').style('display', 'none');
});
    }).catch(function(error) {
        // 处理读取 JSON 文件失败的情况
        console.log('Error loading JSON file:', error);
    });
}





// 定义滚动累计值
let accumulatedScroll = 1;

// 定义滚动阈值
const scrollThreshold = 300;

// 定义旗子消失的 Y 值阈值
const hideFlagYThreshold = 30;

// 计数器：用于统计每根线已滚动次数
let scrollCounter = [0, 0, 0, 0, 0];

// 初始时设置 .flag-div-line 的样式
const flagDivElement = d3.select('.flag-div-line')
    .style('height', '20vh')
    .style('width', 'auto')
    .style('position', 'absolute')
    .style('bottom', '60vh')
    .style('left', '0')
    .style('display', 'none'); // 初始隐藏

// 监听鼠标滚轮事件
window.addEventListener("wheel", function(event) {
        //  // 获取滚动方向
        //  var scrollDirection = event.deltaY > 0 ? 'down' : 'up';
    
        //  // 如果滚动方向为逆时针，则提示用户顺时针滚动鼠标
        //  if (scrollDirection === 'up') {
        //      alert('请顺时针滚动鼠标');
        //  }

    // 获取所有旗子元素
    const flagElements = document.querySelectorAll('.line img');

    // 根据滚动方向确定移动速度的符号
    const direction = event.deltaY > 0 ? 1 : -1;

    // 移动每个旗子
    flagElements.forEach(function(flagElement) {
        // 在获取当前旗子所在线号之前，先检查是否消失
        if (flagElement.getAttribute('data-disappeared') !== 'true') {
            // 移动旗子
            moveFlag(flagElement, direction);
        }
    });

    // 累加滚动次数
    accumulatedScroll++;

// 当累计滚动次数达到五次时，生成五个旗子
if (accumulatedScroll % 3 === 0 && (accumulatedScroll < 40 || accumulatedScroll > 46)) {
    for (let lineNumber = 1; lineNumber <= 5; lineNumber++) {
        generateFlag(lineNumber);
    }
}


    // 当累计滚动次数达到15词时，显示 .flag-div-line
console.log(accumulatedScroll);
if (accumulatedScroll % 46 === 0) {
    flagDivElement.style('display', 'block');


}
if (accumulatedScroll % 49 === 0) {

        // 隐藏前40年图片
        document.querySelector('.former-40years').style.display = 'none';

}

if (accumulatedScroll % 55 === 0) {

    // 显示后40年图片
    document.querySelector('.later-40years').style.display = 'block';
}
    
    // 在显示 .flag-div-line 前30次滚动前监听滚动事件
if (accumulatedScroll > 46) {
    window.addEventListener("wheel", function(event) {
        // 如果 .flag-div-line 可见，则更新其位置
        if (flagDivElement.style('display') !== 'none') {
            // 更新 .flag-div-line 元素的位置
            const currentPositionBottom = parseFloat(flagDivElement.style('bottom') || flagDivElement.node().offsetTop);
            const newPositionBottom = currentPositionBottom - event.deltaY * 0.061; // 控制垂直移动的速度
            flagDivElement.style('bottom', `${newPositionBottom}px`);

            // 如果达到一定的位置，隐藏 .flag-div-line
            if (newPositionBottom >= window.innerHeight) {
                flagDivElement.style('display', 'none');
            }
        }

        // 阻止默认滚动行为
        event.preventDefault();
    }, { passive: false });
}
    // 阻止默认滚动行为
    event.preventDefault();
}, { passive: false });










// 定义函数来移动旗子并调整尺寸以及不透明度
function moveFlag(flagElement, direction, lineNumber) {
    // 获取当前旗子的位置
    const currentPositionY = parseFloat(flagElement.style.top || flagElement.offsetTop);

    // 定义移动速度，可以根据需要调整
    const moveSpeed = 2;

    // 根据线的编号设置不同的隐藏阈值
    let currentHideFlagYThreshold = hideFlagYThreshold;
    let currentIncreaseOpacityThreshold = hideFlagYThreshold - 10; // 假设预定值比隐藏阈值小10个单位

    // 计算旗子的新位置
    const newPositionY = currentPositionY + moveSpeed * direction;

    if (newPositionY >= currentHideFlagYThreshold) {
        hideFlag(flagElement);
    } else if (newPositionY <= currentIncreaseOpacityThreshold) {
        // 如果旗子的 Y 值在预定不透明度增加阈值范围内，则逐渐增加其不透明度到1
        increaseOpacity(flagElement);
    }

    // 更新旗子的位置
    flagElement.style.top = `${newPositionY}vh`;

    // 根据位置调整旗子的尺寸
    const scaleFactor = 1.1 * (1 + Math.abs(newPositionY - currentPositionY) / 100);
    const currentWidth = parseFloat(flagElement.style.width);
    const currentHeight = parseFloat(flagElement.style.height);
    flagElement.style.width = `${currentWidth * scaleFactor}px`;
    flagElement.style.height = `${currentHeight * scaleFactor}px`;
}

// 逐渐增加旗子的不透明度
function increaseOpacity(flagElement) {
    const opacityIncrement = 0.05; // 每次透明度增加值
    let currentOpacity = parseFloat(flagElement.style.opacity) || 0; // 当前不透明度

    // 定义增加不透明度的定时器
    const increaseOpacityInterval = setInterval(function() {
        // 增加不透明度
        currentOpacity += opacityIncrement;

        // 将不透明度限制在 0 到 1 之间
        currentOpacity = Math.min(currentOpacity, 1);

        // 设置旗子的不透明度
        flagElement.style.opacity = currentOpacity;

        // 如果不透明度达到最大值，则停止增加不透明度
        if (currentOpacity >= 1) {
            clearInterval(increaseOpacityInterval);
        }
    }, 50); // 每 50 毫秒增加一次不透明度
}

// 隐藏旗子
function hideFlag(flagElement) {
     // 逐渐降低不透明度和增大高斯模糊值
     var opacityStep = 0.05; // 每次降低的不透明度值
     var blurStep = 1; // 每次增加的高斯模糊值
     var currentOpacity = 1; // 当前不透明度
     var currentBlur = 0; // 当前高斯模糊值
 
     var hideInterval = setInterval(function() {
         // 减少不透明度
         currentOpacity -= opacityStep;
         // 增加高斯模糊值
         currentBlur += blurStep;
         
         // 设置旗子的不透明度和高斯模糊值
         flagElement.style.opacity = currentOpacity;
         flagElement.style.filter = `blur(${currentBlur}px)`;
         
         // 如果不透明度降低到0，则隐藏旗子并清除定时器
         if (currentOpacity <= 0) {
             flagElement.style.display = 'none';
             flagElement.setAttribute('data-disappeared', 'true'); // 添加消失标记
             clearInterval(hideInterval); // 清除定时器
         }
     }, 14); // 50毫秒更新一次不透明度和高斯模糊值
}



// 当鼠标悬停在旗子上时显示提示框
d3.selectAll('.line img')
        .on('mouseover', function(event, d) {
            const poemData = d; // 获取对应诗歌的数据
            const flagTooltip = document.getElementById('flagTooltip');
            // 获取鼠标相对于文档的位置
            const mouseX = event.pageX;
            const mouseY = event.pageY;
            // 设置提示框的位置为鼠标悬停位置的右侧，并显示
            flagTooltip.style.left = `${mouseX - 300}px`; // 20px 是 tooltip 与旗子的水平间距

            flagTooltip.style.top = `${mouseY}px`;
            flagTooltip.style.display = 'block';
            // 在提示框中显示诗歌数据
            flagTooltip.innerHTML = `
                <strong>诗歌标题:</strong> ${poemData.title} <br>
                <strong>作者:</strong> ${poemData.author} <br>
                <strong>段落:</strong> ${poemData.paragraphs.join('<br>')}
            `;
        })
        .on('mouseout', function() {
            // 鼠标移出时隐藏提示框
            document.getElementById('flagTooltip').style.display = 'none';
        });


});