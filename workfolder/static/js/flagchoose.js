 // 获取选择项
 const choice1 = document.querySelector('.choice1');
 const choice2 = document.querySelector('.choice2');
 const choice3 = document.querySelector('.choice3');

 // 获取指南区域
 const guideArea1 = document.querySelector('.guide-area1');
 const guideArea2 = document.querySelector('.guide-area2');
 const guideArea3 = document.querySelector('.guide-area3');

// 当点击选择项时切换对应的指南区域的可见性
choice1.addEventListener('click', () => {
 toggleVisibility(guideArea1);
 guideArea2.style.display = 'none'; // 确保其他指南区域隐藏
     guideArea3.style.display = 'none';
});

choice2.addEventListener('click', () => {
 guideArea1.style.display = 'none'; // 确保其他指南区域隐藏
 toggleVisibility(guideArea2);
 guideArea3.style.display = 'none';
});

choice3.addEventListener('click', () => {
 guideArea1.style.display = 'none'; // 确保其他指南区域隐藏
     guideArea2.style.display = 'none';
 toggleVisibility(guideArea3);
});

// 切换指南区域的可见性
function toggleVisibility(element) {
 if (element.style.opacity === '1') {
     hideElement(element);
 } else {
     showElement(element);
 }
}

// 显示指定的元素
function showElement(element) {
 element.style.opacity = '0'; // 设置初始不透明度为0
 element.style.display = 'block'; // 显示元素
 fadeIn(element); // 渐变显示元素
}

// 隐藏指定的元素
function hideElement(element) {
 element.style.opacity = '1'; // 设置初始不透明度为1
 fadeOut(element); // 渐变隐藏元素
}

// 渐变显示元素
function fadeIn(element) {
 let opacity = 0; // 初始透明度
 const duration = 500; // 渐变时间，单位毫秒
 const interval = 10; // 更新间隔，单位毫秒
 const increment = 1 / (duration / interval); // 每次增加的透明度

 const fadeInInterval = setInterval(() => {
     opacity += increment;
     element.style.opacity = String(opacity);
     if (opacity >= 1) {
         clearInterval(fadeInInterval);
     }
 }, interval);
}

// 渐变隐藏元素
function fadeOut(element) {
 let opacity = 1; // 初始透明度
 const duration = 500; // 渐变时间，单位毫秒
 const interval = 10; // 更新间隔，单位毫秒
 const decrement = 1 / (duration / interval); // 每次减少的透明度

 const fadeOutInterval = setInterval(() => {
     opacity -= decrement;
     element.style.opacity = String(opacity);
     if (opacity <= 0) {
         clearInterval(fadeOutInterval);
         element.style.display = 'none'; // 隐藏元素
     }
 }, interval);
}



 let combinedString;
 let selectedStyle = 0; // 默认选择第一个风格
 let selectedEmotion; // 默认选择第一个风格
 let selectedContent; // 默认选择第一个风格
 console.log(selectedContent);

// 获取样式选择项
const styleChoice1 = document.querySelector('.style-choice1');
const styleChoice2 = document.querySelector('.style-choice2');
const styleChoice3 = document.querySelector('.style-choice3');

// 获取旗帜区域
const flag1 = document.querySelector('.flag1');
const flag2 = document.querySelector('.flag2');
const flag3 = document.querySelector('.flag3');

// 当点击样式选择项时更新所选的样式，并显示对应的旗帜
styleChoice1.addEventListener('click', () => {
 selectedStyle = 0;
 flag1.style.display = 'block';
 flag2.style.display = 'none';
 flag3.style.display = 'none';
 updateContentAndShowFlag();
 updateEmotionAndShowFlag();
});

styleChoice2.addEventListener('click', () => {
 selectedStyle = 1;
 flag1.style.display = 'none';
 flag2.style.display = 'block';
 flag3.style.display = 'none';
 updateContentAndShowFlag();
 updateEmotionAndShowFlag();
});

styleChoice3.addEventListener('click', () => {
 selectedStyle = 2;
 flag1.style.display = 'none';
 flag2.style.display = 'none';
 flag3.style.display = 'block';
 updateContentAndShowFlag();
 updateEmotionAndShowFlag();
});

// 辅助函数：更新所选的内容并显示对应的图片
function updateContentAndShowFlag() {
 if (selectedContent !== undefined) {
     const imagePath = `./images/旗/${selectedStyle}/${selectedContent}.png`;
     showFlagImage(imagePath);

 }
}

function updateEmotionAndShowFlag() {
 if (selectedEmotion !== undefined) {
     const imagePath = `./images/旗/${selectedStyle}${selectedStyle}/${selectedEmotion}.png`;
     addFlagImage(imagePath);
 }
}






// 获取情感选择项
const emotionChoice1 = document.querySelector('.emotion-choice1');
const emotionChoice2 = document.querySelector('.emotion-choice2');
const emotionChoice3 = document.querySelector('.emotion-choice3');
const emotionChoice4 = document.querySelector('.emotion-choice4');
const emotionChoice5 = document.querySelector('.emotion-choice5');
const emotionChoice6 = document.querySelector('.emotion-choice6');
const emotionChoice7 = document.querySelector('.emotion-choice7');

// 获取旗帜显示区域
const contentflagshownarea = document.querySelector('.content-flag-shown-area');

// 当点击情感选择项时生成对应的旗帜图片
emotionChoice1.addEventListener('click', () => {
 selectedEmotion = 0;
 addFlagImage(`./images/旗/${selectedStyle}${selectedStyle}/0.png`);
});

emotionChoice2.addEventListener('click', () => {
 selectedEmotion = 1;
 addFlagImage(`./images/旗/${selectedStyle}${selectedStyle}/1.png`);
});

emotionChoice3.addEventListener('click', () => {
 selectedEmotion = 2;
 addFlagImage(`./images/旗/${selectedStyle}${selectedStyle}/2.png`);
});

emotionChoice4.addEventListener('click', () => {
 selectedEmotion = 3;
 addFlagImage(`./images/旗/${selectedStyle}${selectedStyle}/3.png`);
});

emotionChoice5.addEventListener('click', () => {
 selectedEmotion = 4;
 addFlagImage(`./images/旗/${selectedStyle}${selectedStyle}/4.png`);
});

emotionChoice6.addEventListener('click', () => {
 selectedEmotion = 5;
 addFlagImage(`./images/旗/${selectedStyle}${selectedStyle}/5.png`);
});

emotionChoice7.addEventListener('click', () => {
 selectedEmotion = 6;
 addFlagImage(`./images/旗/${selectedStyle}${selectedStyle}/6.png`);
});

// 辅助函数：添加旗帜图片到旗帜显示区域
function addFlagImage(imageSrc) {
 console.log("selectedEmotion"+selectedEmotion);
 // 隐藏旗帜显示区域内的所有图片
 contentflagshownarea.innerHTML = '';

 // 创建新的图片元素
 const newFlag = document.createElement('img');
 // 设置新图片的属性
 newFlag.src = imageSrc;
 newFlag.alt = '';
 // 设置新图片的样式
 // 将新图片添加到旗帜显示区域
 contentflagshownarea.appendChild(newFlag);
 checkAndOutput();
}





let CorrectStyle;

// 获取颜色旗帜显示区域
const colorFlagShownArea = document.querySelector('.color-flag-shown-area');

// 获取内容选择项
const contentChoice1 = document.querySelector('.content-choice1');
const contentChoice2 = document.querySelector('.content-choice2');
const contentChoice3 = document.querySelector('.content-choice3');
const contentChoice4 = document.querySelector('.content-choice4');
const contentChoice5 = document.querySelector('.content-choice5');
const contentChoice6 = document.querySelector('.content-choice6');
const contentChoice7 = document.querySelector('.content-choice7');

// 当点击内容选择项时更新所选的内容并显示对应的图片
contentChoice1.addEventListener('click', () => {
 updateSelectedContentAndShowFlag("0");
});

contentChoice2.addEventListener('click', () => {
 updateSelectedContentAndShowFlag("1");
});

contentChoice3.addEventListener('click', () => {
 updateSelectedContentAndShowFlag("2");
});

contentChoice4.addEventListener('click', () => {
 updateSelectedContentAndShowFlag("3");
});

contentChoice5.addEventListener('click', () => {
 updateSelectedContentAndShowFlag("4");
});

contentChoice6.addEventListener('click', () => {
 updateSelectedContentAndShowFlag("5");
});

contentChoice7.addEventListener('click', () => {
 updateSelectedContentAndShowFlag("6");
});

// 辅助函数：更新所选的内容并显示对应的图片
function updateSelectedContentAndShowFlag(contentNumber) {
 selectedContent = contentNumber;
 console.log("selectedContent:"+selectedContent);
 CorrectStyle = selectedStyle;
 const imagePath = `./images/旗/${selectedStyle}/${selectedContent}.png`;
 showFlagImage(imagePath);
 checkAndOutput();
}

// 辅助函数：在颜色旗帜显示区域显示图片
function showFlagImage(imagePath) {
 // 清空旗帜显示区域
 colorFlagShownArea.innerHTML = '';
 
 // 创建新的图片元素
 const newFlag = document.createElement('img');
 // 设置新图片的属性
 newFlag.src = imagePath;
 newFlag.alt = '';
 // 将新图片添加到颜色旗帜显示区域
 colorFlagShownArea.appendChild(newFlag);
}





// 辅助函数：检查 selectedEmotion 和 selectedContent 是否都被赋值，并输出组合字符串
function checkAndOutput() {
 if (selectedStyle !== undefined && selectedEmotion !== undefined && selectedContent !== undefined) {
     const combinedString = `${selectedStyle}${selectedEmotion}${selectedContent}`;
     console.log(combinedString); // 输出组合后的字符串

     // 获取显示诗歌的元素
     const poemsShow = document.querySelector('.poems-show');

     d3.json('./618-637labels.json')
.then(data => {
 // 清除上一次显示的诗歌内容
 poemsShow.innerHTML = '';

 // 创建 poem-tooltip 元素
 const poemTooltip = document.createElement('div');
 poemTooltip.classList.add('poem-tooltip');
 poemsShow.appendChild(poemTooltip);

 // 检查 combinedString 是否已经被赋值
 if (combinedString !== undefined) {
   // 初始化匹配的诗歌数量
   let matchedCount = 0;
   // 初始化相对位置列表
   const positions = [
     { top: '10%', left: '0%' },
     { top: '50%', left: '12%' },
     { top: '30%', left: '53%' },
     { top: '20%', left: '70%' },
     { top: '80%', left: '42%' }
   ];
   // 随机打乱相对位置列表
   positions.sort(() => Math.random() - 0.5);

   // 设置不透明度变化的时长
   const opacityDuration = 1300;
   // 设置显示间隔的时长
   const displayInterval = 700;

   // 循环遍历 JSON 中的每个诗歌对象
   for (const poem of data) {
     // 检查诗歌对象的 labels 是否与 combinedString 匹配
     if (poem.labels === combinedString) {
       // 创建显示诗歌信息的元素
       const poetShowArea = document.createElement('div');
       poetShowArea.classList.add('poet-show-area');
       poetShowArea.style.opacity = '0'; // 设置初始不透明度为0

       // 获取当前位置
       const position = positions[matchedCount];

       // 设置诗歌区域的相对位置
       poetShowArea.style.top = position.top;
       poetShowArea.style.left = position.left;

       // 创建诗歌标题元素
       const titleElement = document.createElement('h3');
       titleElement.textContent = `诗歌标题：${poem.title}`;
       titleElement.style.fontSize = '14px'; // 设置标题字体大小
       poetShowArea.appendChild(titleElement);

       // 创建诗歌作者元素
       const authorElement = document.createElement('p');
       authorElement.textContent = `作者：${poem.author}`;
       authorElement.style.fontSize = '12px'; // 设置作者字体大小
       poetShowArea.appendChild(authorElement);

       // 创建诗歌第一句内容元素
       const firstLineElement = document.createElement('p');
       firstLineElement.textContent = poem.paragraphs[0];


       // 鼠标悬停事件监听
firstLineElement.addEventListener('mouseenter', (event) => {
 // 显示 poem-tooltip
 const poemTooltip = document.querySelector('.poem-tooltip');
 poemTooltip.textContent = poem.paragraphs.join('\n');
 poemTooltip.style.display = 'block';

 // 设置 poem-tooltip 的位置
 const mouseX = event.pageX;
 const mouseY = event.pageY;
 const tooltipWidth = poemTooltip.offsetWidth;
 const tooltipHeight = poemTooltip.offsetHeight;
 const windowWidth = window.innerWidth;
 const windowHeight = window.innerHeight;

 let tooltipLeft = mouseX - 700; // 水平偏移量
 let tooltipTop = mouseY-100; // 垂直偏移量

 // 如果 tooltip 超出了窗口边界，则调整位置
 if (tooltipLeft + tooltipWidth > windowWidth) {
     tooltipLeft = windowWidth - tooltipWidth - 10;
 }
 if (tooltipTop + tooltipHeight > windowHeight) {
     tooltipTop = windowHeight - tooltipHeight - 10;
 }

 // 设置 tooltip 的位置
 poemTooltip.style.left = tooltipLeft + 'px';
 poemTooltip.style.top = tooltipTop + 'px';
});

// 鼠标移出事件监听
firstLineElement.addEventListener('mouseleave', () => {
 // 隐藏 poem-tooltip
 const poemTooltip = document.querySelector('.poem-tooltip');
 poemTooltip.style.display = 'none';
});

       poetShowArea.appendChild(firstLineElement);

       // 将显示诗歌信息的元素添加到页面中
       poemsShow.appendChild(poetShowArea);

       // 使用动画效果逐渐显示诗歌
       fadeIn(poetShowArea, opacityDuration * (matchedCount + 1));

       // 增加匹配的诗歌数量
       matchedCount++;
       // 如果匹配的诗歌数量达到了三首，则不再继续循环
       if (matchedCount >= 3) {
         break;
       }
     }
   }
   // 如果没有找到匹配的诗歌，创建并显示一条消息
   if (matchedCount === 0) {
     const noMatchMessage = document.createElement('p');
     noMatchMessage.textContent = '未找到匹配的诗歌。';
     poemsShow.appendChild(noMatchMessage);
   }
 }
})
.catch(error => console.error('读取 JSON 文件时出错：', error));

// 辅助函数：渐变显示元素
function fadeIn(element, duration) {
let start = null;
const step = (timestamp) => {
 if (!start) start = timestamp;
 const progress = timestamp - start;
 element.style.opacity = Math.min(progress / duration, 1);
 if (progress < duration) {
   window.requestAnimationFrame(step);
 }
};
window.requestAnimationFrame(step);
}





         }
}



// 获取需要进行动画的元素
const styleChoices = document.querySelectorAll('.style-choice');

// 定义透明度状态
let opacityState = 0;

// 定义透明度变化方向
let opacityDirection = 1;

// 定义动画函数
function animateOpacity() {
// 更新透明度状态
opacityState += 0.05 * opacityDirection;

// 判断透明度是否达到边界，如果是则更改透明度变化方向
if (opacityState <= 0 || opacityState >= 1) {
 opacityDirection *= -1;
}

// 设置所有元素的透明度
styleChoices.forEach(choice => {
 choice.style.opacity = opacityState;
});

// 继续执行动画
requestAnimationFrame(animateOpacity);
}

// 在页面加载后开始动画
document.addEventListener('DOMContentLoaded', () => {
animateOpacity();
});
