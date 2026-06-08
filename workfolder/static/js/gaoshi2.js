

function findRelatedPoems(nodeName, label) {
// 构建相对路径
var fileName = '../../../高适诗歌/早期战争诗.json';
console.log(label);
// 异步加载 JSON 文件并处理数据
d3.json(fileName).then(function(data) {
// 从数据中提取符合条件的诗歌
var selectedPoems = data.filter(function(poem) {
return poem.labels === label.toString();
});

// 选取至多三首符合条件的诗歌
var selectedSongs = selectedPoems.slice(0, 3);
console.log(selectedSongs);

// 将诗歌标题放在 frame-char 中
var frameChars = document.querySelectorAll('.frame-char');
frameChars.forEach(function(frameChar, index) {
if (index < selectedSongs.length) {
    var title = selectedSongs[index].title;
    var titleHTML = '';
    for (var i = 0; i < title.length; i++) {
        titleHTML += '<div>' + title[i] + '</div>'; // 将每个字符放在一个 div 中
    }
    // 添加标题的渐变显示动画
    frameChar.style.opacity = '0'; // 初始不透明度为0
    frameChar.style.transition = 'none'; // 移除之前可能存在的过渡动画
    setTimeout(function() {
        frameChar.innerHTML = '<div class="vertical-title">' + titleHTML + '</div>'; // 外层 div 控制竖直排列
        frameChar.style.transition = 'opacity 1s'; // 添加渐变动画效果
        frameChar.style.opacity = '1'; // 设置不透明度为1，触发渐变显示效果
    }, 50); // 设置一个短暂的延迟，确保渐变效果能够生效

    frameChar.style.cursor = 'pointer';
    frameChar.addEventListener('click', function() {
        showPoemContent(selectedSongs[index].title); // 传递诗歌的标题而不是整个诗歌对象
    });
} else {
    frameChar.textContent = '---';
    frameChar.style.cursor = 'default'; // 禁用点击事件
    frameChar.removeEventListener('click', function() {}); // 移除点击事件监听器
}
});

// 将图片也添加渐变动画
var images = document.querySelectorAll('.gaoshi-frame1, .gaoshi-frame2, .gaoshi-frame3');
images.forEach(function(image) {
image.style.opacity = '0'; // 初始不透明度为0
image.style.transition = 'opacity 1s'; // 添加渐变动画效果

// 等待一个短暂的延迟后设置不透明度为1，触发渐变显示效果
setTimeout(function() {
image.style.opacity = '1';
}, 50);
});


}).catch(function(error) {
console.error('Error loading JSON file:', error);
});

}










// 显示指定诗歌的具体内容
function showPoemContent(poemTitle) {
// 构建相对路径
var fileName = '../../../高适/高适.json';
// console.log(poemTitle);
// 异步加载 JSON 文件并处理数据
d3.json(fileName).then(function(data) {
// 查找指定标题的诗歌
var selectedPoem = data.find(function(poem) {
    return poem.title === poemTitle;
});
// console.log("Selected Poem:", selectedPoem);
// console.log("Poem Title:", poemTitle);
// 如果找到对应的诗歌，则显示其内容
if (selectedPoem) {
    var poemHTML = '';
    poemHTML += '<div class="poem-container">'; // 每首诗的包裹容器
    poemHTML += '<div class="poem">';
    // poemHTML += '<h1>' + selectedPoem.title + '</h1>';
    var linesHTML = ''; // 用于存储所有诗句的 HTML
    selectedPoem.paragraphs.slice(0, 2).forEach(function(line, index) { // 取前两句诗
        if (index === 0) {
            linesHTML += '<div class="poem-line">"' + line + '</div>'; // 将每句诗添加到同一个字符串中
        } else {
            linesHTML += '<div class="poem-line">' + line + '"</div>'; // 将每句诗添加到同一个字符串中
        }
    });
    poemHTML += linesHTML; // 将所有诗句添加到一个 div 中
    poemHTML += '</div>';
    poemHTML += '</div>'; // 结束每首诗的包裹容器

    // 将诗歌内容显示在指定的 div 中
    var poemContainer = document.getElementById('poemContainer');
    
    // 重置动画样式
    poemContainer.style.opacity = '0'; // 初始不透明度为0
    poemContainer.style.transition = 'none'; // 移除之前可能存在的过渡动画
    setTimeout(function() {
        poemContainer.innerHTML = poemHTML; // 设置新的诗歌内容

        // 添加渐变显示动画
        poemContainer.style.transition = 'opacity 1s'; // 添加渐变动画效果
        poemContainer.style.opacity = '1'; // 设置不透明度为1，触发渐变显示效果
    }, 50); // 设置一个短暂的延迟，确保渐变效果能够生效
} else {
    console.error('Poem not found:', poemTitle);
}
}).catch(function(error) {
console.error('Error loading JSON file:', error);
});
}











// 初始化ECharts实例
var myChart = echarts.init(document.getElementById('gaoshi-sangji1'));

// 指定图表的配置项和数据
var option = {

    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        textStyle: {
            fontSize: 18, // 设置字体大小为16px
            fontFamily:'Kaiti'
        },
        formatter: function (params) {
            if (params.dataType === 'node') {
                // 如果是节点，则显示节点名称、数据以及单位“首诗”
                var nodeName = params.name;
                var nodeValue = params.value;
                return '高适在' + nodeName + '时期有' + nodeValue + ' 首诗';
            } else if (params.dataType === 'edge') {
            var sourceName = params.data.source;
            var targetName = params.data.target;
            var value = params.value;
            var tooltipContent = '高适在' + sourceName + '-' + targetName + '时期有' + value + '首诗';
            return tooltipContent;
        }}
    },
series: {
type: 'sankey',
layout: 'none',

emphasis: {
focus: 'adjacency'
},
levels: [

],

data: [
    { name: '北上游历', depth: 0, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '长安应试', depth: 0, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '漫游四方', depth: 0, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '任封丘尉', depth: 0, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '战争诗', depth: 1, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '政治抒怀诗', depth: 1, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '咏史诗', depth: 1, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '田园诗', depth: 1, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '酬赠应答诗', depth: 1, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '英勇壮歌', depth: 2, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '忧国忧民', depth: 2, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '抒情怀古', depth: 2, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '爱国抗争', depth: 2, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '悲壮挽歌', depth: 2, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '边塞风光', depth: 2, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
    { name: '闺怨', depth: 2, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } }
],
links: [
    {source: '北上游历', target: '战争诗', value: 5},
    {source: '北上游历', target: '酬赠应答诗', value: 5},
    {source: '北上游历', target: '咏史诗', value: 3,},
    {source: '北上游历', target: '田园诗', value: 1,},

    {source: '漫游四方', target: '酬赠应答诗', value: 12},
    {source: '漫游四方', target: '田园诗', value: 10,},
    {source: '漫游四方', target: '咏史诗', value: 4,},
    {source: '漫游四方', target: '战争诗', value: 17,},
    {source: '漫游四方', target: '政治抒怀诗', value: 12,},

    {source: '长安应试', target: '战争诗', value: 6},
    {source: '长安应试', target: '酬赠应答诗', value: 2},

    {source: '任封丘尉', target: '酬赠应答诗', value: 11},
    {source: '任封丘尉', target: '田园诗', value: 5,},
    {source: '任封丘尉', target: '咏史诗', value: 2,},
    {source: '任封丘尉', target: '战争诗', value: 2,},
    {source: '任封丘尉', target: '政治抒怀诗', value: 2,},

    {source: '战争诗', target: '英勇壮歌', value: 3},
    {source: '战争诗', target: '忧国忧民', value: 1},
    {source: '战争诗', target: '抒情怀古', value: 5},
    {source: '战争诗', target: '爱国抗争', value: 4},
    {source: '战争诗', target: '悲壮挽歌', value: 2},
    {source: '战争诗', target: '边塞风光', value: 12},
    {source: '战争诗', target: '闺怨', value: 3},
],
// itemStyle: {
//             borderColor: '#FAFAFA',
//             borderWidth: 2
//         },
//         rectHover: {
//             borderRadius: 5
//         }
}
};

// 使用刚指定的配置项和数据显示图表
myChart.setOption(option);

// 监听桑基图的点击事件
myChart.on('click', function (params) {
// console.log('Clicked Params:', params); 
// 清除上一次点击后 .poem 元素的内容
var poemContainer = document.getElementById('poemContainer');
poemContainer.innerHTML = '';
// 如果点击的是边
if (params.dataType === 'edge') {

// console.log('Clicked Edge:', params.data); 

function handleEdgeClick(targetName, label) {
// 显示边的详情
// var edgeDetails = document.getElementById('edgeDetails');
// edgeDetails.innerHTML = params.data.source + '<br>' +
//     targetName + '<br>' +
//     '相关诗歌数量: ' + params.data.value;

// 显示侧边栏
console.log(targetName, label);
console.log(params.data.source);
document.getElementById('gaoshi-poem-container').style.display = 'block';

// 查找相关诗歌并显示
findRelatedPoems(params.data.source, label); // 根据节点名称和标签查找相关诗歌


}


// 如果源节点或目标节点包含指定的名称，则处理点击事件
if (params.data.target == "英勇壮歌") {
handleEdgeClick("英勇壮歌", 0);
} else if (params.data.target == "忧国忧民") {
handleEdgeClick("忧国忧民", 1);
} else if (params.data.target == "抒情怀古") {
handleEdgeClick("抒情怀古", 2);
} else if (params.data.target == "爱国抗争") {
handleEdgeClick("爱国抗争", 3);
} else if (params.data.target == "悲壮挽歌") {
handleEdgeClick("悲壮挽歌", 4);
} else if (params.data.target == '边塞风光') {
handleEdgeClick('边塞风光', 5);
} else if (params.data.target == '闺怨') {
handleEdgeClick('闺怨', 6);
}



// 显示边的详情
// var edgeDetails = document.getElementById('edgeDetails');
// edgeDetails.innerHTML = params.data.source + '<br>' +
//     params.data.target + '<br>' +
//     '相关诗歌数量: ' + params.data.value;

showPeriodImage1(params.data.source)
// 显示侧边栏
document.getElementById('gaoshi-poem-container').style.display = 'block';

// 构建相对路径
var folderName = '../../../高适诗歌/早期/' + params.data.source;
var fileName = folderName + '/' + params.data.target + '.json';

// 异步加载 JSON 文件并处理数据
d3.json(fileName).then(function(data) {
// 从数据中提取三首诗歌或全部诗歌（取较小值）
var poems = data.slice(0, Math.min(3, data.length));

// 将诗歌标题放在 frame-char 中
var frameChars = document.querySelectorAll('.frame-char');
frameChars.forEach(function(frameChar, index) {
if (index < poems.length) {
    var title = poems[index].title;
    var titleHTML = '';
    for (var i = 0; i < title.length; i++) {
        titleHTML += '<div>' + title[i] + '</div>';
    }
    // 添加渐变显示动画
    frameChar.style.opacity = '0'; // 初始不透明度为0
    frameChar.style.transition = 'none'; // 移除之前可能存在的过渡动画
    setTimeout(function() {
        frameChar.innerHTML = titleHTML;
        frameChar.style.transition = 'opacity 1s'; // 添加渐变动画效果
        frameChar.style.opacity = '1'; // 设置不透明度为1，触发渐变显示效果
    }, 50); // 设置一个短暂的延迟，确保渐变效果能够生效

    frameChar.style.cursor = 'pointer';
    frameChar.addEventListener('click', function() {
        showPoemContent(poems[index].title); // 传递诗歌的标题而不是整个诗歌对象
    });

} else {
    frameChar.textContent = '---';
}
});

// 添加渐变显示动画到图像上
var frameImages = document.querySelectorAll('.gaoshi-frame1, .gaoshi-frame2, .gaoshi-frame3');
frameImages.forEach(function(frameImage) {
// 添加渐变显示动画
frameImage.style.opacity = '0'; // 初始不透明度为0
frameImage.style.transition = 'none'; // 移除之前可能存在的过渡动画
setTimeout(function() {
    frameImage.style.transition = 'opacity 1s'; // 添加渐变动画效果
    frameImage.style.opacity = '1'; // 设置不透明度为1，触发渐变显示效果
}, 50); // 设置一个短暂的延迟，确保渐变效果能够生效
});
}).catch(function(error) {
console.error('Error loading JSON file:', error);
});







}

// 如果点击的是节点
if (params.dataType === 'node') {
console.log('Clicked Node Data:', params.data); // 输出点击的节点的数据结构，以便调试

// 获取节点的名称
var nodeName = params.data.name;

// 显示对应的图片
showPeriodImage1(nodeName);
}
});

// 根据节点或边的名称显示对应的图片
function showPeriodImage1(nodeOrEdgeName) {
var imageNameMappings = {
'北上游历': '北上游历.png',
'漫游四方': '漫游四方.png',
'任封丘尉': '任封丘尉.png',
'长安应试': '长安应试.png'
// 添加其他节点或边的名称和对应的图片文件名
};

// 确保节点或边的名称存在
if (nodeOrEdgeName) {
console.log('Node/Edge Name:', nodeOrEdgeName); // 输出节点或边的名称，以便调试

// 遍历图片名称映射对象
for (var name in imageNameMappings) {
    // 如果节点或边的名称中包含当前映射的名称
    if (nodeOrEdgeName.includes(name)) {
        // 构建图片路径
        var imagePath = '../../../images/periods-pictures/' + imageNameMappings[name];

        // 在指定的 div 中显示图片
        var imageContainer = document.getElementById('gaoshi-period-area');

        // 重置动画样式
        imageContainer.style.opacity = '0'; // 初始不透明度为0
        imageContainer.style.transition = 'none'; // 移除之前可能存在的过渡动画
        setTimeout(function() {
            imageContainer.innerHTML = '<img src="' + imagePath + '" alt="' + name + '">'; // 设置新的图片内容

            // 添加渐变显示动画
            imageContainer.style.transition = 'opacity 1s'; // 添加渐变动画效果
            imageContainer.style.opacity = '1'; // 设置不透明度为1，触发渐变显示效果
        }, 50); // 设置一个短暂的延迟，确保渐变效果能够生效

        // 找到匹配的名称后即可退出循环
        break;
    }
}
}
}











// 初始化ECharts实例
var myChart = echarts.init(document.getElementById('gaoshi-sangji2'));

// 指定图表的配置项和数据
var option = {
    tooltip: {
        trigger: 'item',
        triggerOn: 'mousemove',
        textStyle: {
            fontSize: 18,
            fontFamily:'Kaiti'
        },
        formatter: function (params) {
            if (params.dataType === 'node') {
                // 如果是节点，则显示节点名称、数据以及单位“首诗”
                var nodeName = params.name;
                var nodeValue = params.value;
                return '高适在' + nodeName + '时期有' + nodeValue + ' 首诗';
            } else if (params.dataType === 'edge') {
            var sourceName = params.data.source;
            var targetName = params.data.target;
            var value = params.value;
            var tooltipContent = '高适在' + sourceName + '-' + targetName + '时期有' + value + '首诗';
            return tooltipContent;
        }}
    },
series: {
type: 'sankey',
layout: 'none',
emphasis: {
    focus: 'adjacency'
},
data: [
{name: '入河西幕', depth: 0, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
{name: '出镇淮南', depth: 0, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
{name: '蜀中为官', depth: 0, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
{name: '还京封侯', depth: 0, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },

{name: '战争诗', depth: 1, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
{name: '政治抒怀诗', depth: 1, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
{name: '田园诗', depth: 1, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
{name: '酬赠应答诗', depth: 1, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
{name: '送别', depth: 1, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },

{name: '英勇壮歌', depth: 2, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
{name: '忧国忧民', depth: 2, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
{name: '抒情怀古', depth: 2, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
{name: '爱国抗争', depth: 2, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
{name: '悲壮挽歌', depth: 2, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
{name: '边塞风光', depth: 2, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } },
{name: '闺怨', depth: 2, itemStyle: { color: '#3c3c3c', borderRadius: 10 }, label: { fontSize: 20 } }
],

    links: [

        {source: '入河西幕', target: '战争诗', value: 11},
        {source: '入河西幕', target: '政治抒怀诗', value: 3},
        {source: '入河西幕', target: '酬赠应答诗', value: 12},
        {source: '入河西幕', target: '田园诗', value: 6,},

        {source: '蜀中为官', target: '政治抒怀诗', value: 1},
        {source: '蜀中为官', target: '酬赠应答诗', value: 1},

        {source: '出镇淮南', target: '政治抒怀诗', value: 1},
        {source: '出镇淮南', target: '酬赠应答诗', value: 4},
        {source: '出镇淮南', target: '田园诗', value: 2,},


        {source: '战争诗', target: '忧国忧民', value: 1},
        // {source: '战争诗', target: '爱国抗争', value: 1},
        {source: '战争诗', target: '英勇壮歌', value: 7},
        // {source: '战争诗', target: '悲壮挽歌', value: 1},
        {source: '战争诗', target: '边塞风光', value: 2},
        {source: '战争诗', target: '闺怨', value: 1},
        // 其他链接
    ]
}
};

// 使用刚指定的配置项和数据显示图表
myChart.setOption(option);

// 监听桑基图的点击事件
myChart.on('click', function (params) {
// console.log('Clicked Params:', params); 
// 清除上一次点击后 .poem 元素的内容
var poemContainer = document.getElementById('poemContainer2');
poemContainer.innerHTML = '';
// 如果点击的是边
if (params.dataType === 'edge') {

// console.log('Clicked Edge:', params.data); 

function handleEdgeClick2(targetName, label) {
// 显示边的详情
// var edgeDetails = document.getElementById('edgeDetails');
// edgeDetails.innerHTML = params.data.source + '<br>' +
//     targetName + '<br>' +
//     '相关诗歌数量: ' + params.data.value;

// 显示侧边栏
console.log(targetName, label);
console.log(params.data.source);
document.getElementById('gaoshi-poem-container2').style.display = 'block';

// 查找相关诗歌并显示
findRelatedPoems2(params.data.source, label); // 根据节点名称和标签查找相关诗歌


}


// 如果源节点或目标节点包含指定的名称，则处理点击事件
if (params.data.target == "英勇壮歌") {
handleEdgeClick2("英勇壮歌", 0);
} else if (params.data.target == "忧国忧民") {
handleEdgeClick2("忧国忧民", 1);
} else if (params.data.target == "抒情怀古") {
handleEdgeClick2("抒情怀古", 2);
} else if (params.data.target == "爱国抗争") {
handleEdgeClick2("爱国抗争", 3);
} else if (params.data.target == "悲壮挽歌") {
handleEdgeClick2("悲壮挽歌", 4);
} else if (params.data.target == '边塞风光') {
handleEdgeClick2('边塞风光', 5);
} else if (params.data.target == '闺怨') {
handleEdgeClick2('闺怨', 6);
}

// 显示边的详情
// var edgeDetails = document.getElementById('edgeDetails2');
// edgeDetails.innerHTML = params.data.source + '<br>' +
//     params.data.target + '<br>' +
//     '相关诗歌数量： ' + params.data.value;

console.log(params.data.source);
showPeriodImage(params.data.source)
// 显示侧边栏
document.getElementById('gaoshi-poem-container2').style.display = 'block';

// 构建相对路径
var folderName = '../../../高适诗歌/晚期/' + params.data.source;
var fileName = folderName + '/' + params.data.target + '.json';
console.log(fileName);
// 异步加载 JSON 文件并处理数据
d3.json(fileName).then(function(data) {
// 从数据中提取三首诗歌或全部诗歌（取较小值）
var poems = data.slice(0, Math.min(3, data.length));
console.log(poems);
// 将诗歌标题放在 frame-char 中
var frameChars = document.querySelectorAll('.frame-charb');
frameChars.forEach(function(frameChar, index) {
if (index < poems.length) {
    var title = poems[index].title;
    var titleHTML = '';
    for (var i = 0; i < title.length; i++) {
        titleHTML += '<div>' + title[i] + '</div>';
    }
    // 添加渐变显示动画
    frameChar.style.opacity = '0'; // 初始不透明度为0
    frameChar.style.transition = 'none'; // 移除之前可能存在的过渡动画
    setTimeout(function() {
        frameChar.innerHTML = titleHTML;
        frameChar.style.transition = 'opacity 1s'; // 添加渐变动画效果
        frameChar.style.opacity = '1'; // 设置不透明度为1，触发渐变显示效果
    }, 50); // 设置一个短暂的延迟，确保渐变效果能够生效

    frameChar.style.cursor = 'pointer';
    frameChar.addEventListener('click', function() {
        showPoemContent2(poems[index].title); // 传递诗歌的标题而不是整个诗歌对象
    });

} else {
    frameChar.textContent = '---';
}
});

// 添加渐变显示动画到图像上
var frameImages = document.querySelectorAll('.gaoshi-frame1, .gaoshi-frame2, .gaoshi-frame3');
frameImages.forEach(function(frameImage) {
// 添加渐变显示动画
frameImage.style.opacity = '0'; // 初始不透明度为0
frameImage.style.transition = 'none'; // 移除之前可能存在的过渡动画
setTimeout(function() {
    frameImage.style.transition = 'opacity 1s'; // 添加渐变动画效果
    frameImage.style.opacity = '1'; // 设置不透明度为1，触发渐变显示效果
}, 50); // 设置一个短暂的延迟，确保渐变效果能够生效
});
}).catch(function(error) {
console.error('Error loading JSON file:', error);
});
}

// 如果点击的是节点
if (params.dataType === 'node') {
console.log('Clicked Node Data:', params.data); // 输出点击的节点的数据结构，以便调试

// 获取节点的名称
var nodeName = params.data.name;

// 显示对应的图片
showPeriodImage(nodeName);
}
});

// 根据节点或边的名称显示对应的图片
function showPeriodImage(nodeOrEdgeName) {
    var imageNameMappings = {
        '出镇淮南': '出镇淮南.png',
        '还京封侯': '还京封侯.png',
        '入河西幕': '入河西幕.png',
        '蜀中为官': '蜀中为官.png'
        // 添加其他节点或边的名称和对应的图片文件名
    };

    // 确保节点或边的名称存在
    if (nodeOrEdgeName) {
        console.log('Node/Edge Name:', nodeOrEdgeName); // 输出节点或边的名称，以便调试

        // 遍历图片名称映射对象
        for (var name in imageNameMappings) {
            // 如果节点或边的名称中包含当前映射的名称
            if (nodeOrEdgeName.includes(name)) {
                // 构建图片路径
                var imagePath = '../../../images/periods-pictures/' + imageNameMappings[name];

                // 在指定的 div 中显示图片
                var imageContainer = document.getElementById('gaoshi-period-area2');

                // 重置动画样式
                imageContainer.style.opacity = '0'; // 初始不透明度为0
                imageContainer.style.transition = 'none'; // 移除之前可能存在的过渡动画
                setTimeout(function() {
                    imageContainer.innerHTML = '<img src="' + imagePath + '" alt="' + name + '">'; // 设置新的图片内容

                    // 添加渐变显示动画
                    imageContainer.style.transition = 'opacity 1s'; // 添加渐变动画效果
                    imageContainer.style.opacity = '1'; // 设置不透明度为1，触发渐变显示效果
                }, 50); // 设置一个短暂的延迟，确保渐变效果能够生效

                // 找到匹配的名称后即可退出循环
                break;
            }
        }
    }
}





// 定义函数以根据指定的节点和标签查找相关诗歌
function findRelatedPoems2(nodeName, label) {
// 构建相对路径
var fileName = '../../../高适诗歌/早期战争诗.json';

// 异步加载 JSON 文件并处理数据
d3.json(fileName).then(function(data) {
// 从数据中提取符合条件的诗歌
var selectedPoems = data.filter(function(poem) {
return poem.labels === label.toString();
});

// 选取至多三首符合条件的诗歌
var selectedSongs = selectedPoems.slice(0, 3);
console.log(selectedSongs);

// 将诗歌标题放在 frame-char 中
var frameChars = document.querySelectorAll('.frame-charb');
frameChars.forEach(function(frameChar, index) {
if (index < selectedSongs.length) {
    var title = selectedSongs[index].title;
    var titleHTML = '';
    for (var i = 0; i < title.length; i++) {
        titleHTML += '<div>' + title[i] + '</div>'; // 将每个字符放在一个 div 中
    }
    // 添加标题的渐变显示动画
    frameChar.style.opacity = '0'; // 初始不透明度为0
    frameChar.style.transition = 'none'; // 移除之前可能存在的过渡动画
    setTimeout(function() {
        frameChar.innerHTML = '<div class="vertical-title">' + titleHTML + '</div>'; // 外层 div 控制竖直排列
        frameChar.style.transition = 'opacity 1s'; // 添加渐变动画效果
        frameChar.style.opacity = '1'; // 设置不透明度为1，触发渐变显示效果
    }, 50); // 设置一个短暂的延迟，确保渐变效果能够生效

    frameChar.style.cursor = 'pointer';
    frameChar.addEventListener('click', function() {
        showPoemContent2(selectedSongs[index].title); // 传递诗歌的标题而不是整个诗歌对象
    });
} else {
    frameChar.textContent = '---';
    frameChar.style.cursor = 'default'; // 禁用点击事件
    frameChar.removeEventListener('click', function() {}); // 移除点击事件监听器
}
});

// 将图片也添加渐变动画
var images = document.querySelectorAll('.gaoshi-frame1, .gaoshi-frame2, .gaoshi-frame3');
images.forEach(function(image) {
image.style.opacity = '0'; // 初始不透明度为0
image.style.transition = 'opacity 1s'; // 添加渐变动画效果

// 等待一个短暂的延迟后设置不透明度为1，触发渐变显示效果
setTimeout(function() {
image.style.opacity = '1';
}, 50);
});


}).catch(function(error) {
console.error('Error loading JSON file:', error);
});

}



// 显示指定诗歌的具体内容
function showPoemContent2(poemTitle) {
// 构建相对路径
var fileName = './高适/高适.json';
// console.log(poemTitle);
// 异步加载 JSON 文件并处理数据
d3.json(fileName).then(function(data) {
// 查找指定标题的诗歌
var selectedPoem = data.find(function(poem) {
    return poem.title === poemTitle;
});
// console.log("Selected Poem:", selectedPoem);
// console.log("Poem Title:", poemTitle);
// 如果找到对应的诗歌，则显示其内容
if (selectedPoem) {
    var poemHTML = '';
    poemHTML += '<div class="poem-container">'; // 每首诗的包裹容器
    poemHTML += '<div class="poem">';
    // poemHTML += '<h1>' + selectedPoem.title + '</h1>';
    var linesHTML = ''; // 用于存储所有诗句的 HTML
    selectedPoem.paragraphs.slice(0, 2).forEach(function(line, index) { // 取前两句诗
        if (index === 0) {
            linesHTML += '<div class="poem-line">"' + line + '</div>'; // 将每句诗添加到同一个字符串中
        } else {
            linesHTML += '<div class="poem-line">' + line + '"</div>'; // 将每句诗添加到同一个字符串中
        }
    });
    poemHTML += linesHTML; // 将所有诗句添加到一个 div 中
    poemHTML += '</div>';
    poemHTML += '</div>'; // 结束每首诗的包裹容器

    // 将诗歌内容显示在指定的 div 中
    var poemContainer = document.getElementById('poemContainer2');
    
    // 重置动画样式
    poemContainer.style.opacity = '0'; // 初始不透明度为0
    poemContainer.style.transition = 'none'; // 移除之前可能存在的过渡动画
    setTimeout(function() {
        poemContainer.innerHTML = poemHTML; // 设置新的诗歌内容

        // 添加渐变显示动画
        poemContainer.style.transition = 'opacity 1s'; // 添加渐变动画效果
        poemContainer.style.opacity = '1'; // 设置不透明度为1，触发渐变显示效果
    }, 50); // 设置一个短暂的延迟，确保渐变效果能够生效
} else {
    console.error('Poem not found:', poemTitle);
}
}).catch(function(error) {
console.error('Error loading JSON file:', error);
});
}