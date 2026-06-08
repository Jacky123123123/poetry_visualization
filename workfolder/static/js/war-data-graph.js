function adjustWidthAndSize() {
    var largeContainer = document.querySelector('.div-page-class2');
    var imageContainer = document.querySelector('.image-container');
    var img = document.querySelector('.image-container img');
    var imgWidth = img.offsetWidth; // 获取图片的宽度
    var imgHeight = img.offsetHeight; // 获取图片的高度

    // 设置.large-container和图片容器的宽度
    largeContainer.style.width = imgWidth + 'px';
    imageContainer.style.width = imgWidth + 'px';

    // 获取SVG容器
    var svg = document.getElementById('svg-container');
    // 设置SVG的宽度和高度
    svg.setAttribute('width', imgWidth);
    svg.setAttribute('height', imgHeight);
}

// 页面加载完成后执行一次，并且在窗口大小变化时调整宽度和大小
window.onload = adjustWidthAndSize;
window.onresize = adjustWidthAndSize;



  $(function() {
    var svg = d3.select("#svg-container"); // 获取SVG元素
    var poetData; // 定义变量来存储诗人数据
    var warData; // 定义变量来存储战争数据

    // 从JSON文件中读取数据
    $.getJSON("早期边塞诗.json", function(data) {
      poetData = data.poets; // 获取诗人数据
      warData = data.wars; // 获取战争数据
    });

    // 初始化范围滑块
    $("#slider-vertical").slider({
      orientation: "vertical", // 设置为竖直方向
      range: true, // 启用范围选择
      min: 618, // 最小值
      max: 755, // 最大值
      values: [655, 755], // 初始范围值
      create: function(event, ui) {
        // 自定义滑块的样式
        var handle = $(this).find('.ui-slider-handle');
        handle.addClass('custom-handle');
      },
      stop: function(event, ui) {
  var startVal = parseInt(ui.values[0]);
  var endVal = parseInt(ui.values[1]);

  // 清除之前绘制的诗人图像
  svg.selectAll("image.poet").remove();

  // 过滤诗人数据，只保留年份在滑块范围内的数据
  var filteredPoetData = poetData.filter(function(d) {
    return d.year >= startVal && d.year <= endVal;
  });

  // 根据过滤后的诗人数据绘制诗人图像
  svg.selectAll("image.poet")
    .data(filteredPoetData)
    .enter()
    .append("image")
    .attr("class", "poet")
    .attr("x", function(d) { return d.location.x * 0.3 + "vh"; }) // 将 x 距离乘以 10，然后以视口高度的百分比为单位
.attr("y", function(d) { return d.location.y * 0.3 + "vh"; }) // 将 y 距离乘以 10，然后以视口高度的百分比为单位

    .attr("width", "4.5vh")
    .attr("height", "4.5vh")
    .attr("xlink:href", function(d) { return `../../../images/旗子/0/030.png`; })
    .on("mouseover", function (event, d) {
      // 使用正则表达式去除无用逗号
      const poemContent = d.poem.map(line => line.replace(/,[\s]*$/, '')).join('\n');
      showTooltip(event.pageX, event.pageY, `诗人: ${d.name}\n年份: ${d.year}\n标题：${d.title}\n内容: ${poemContent}\n风格: ${d.style}`);
    })
    .on("mouseout", function () {
      hideTooltip();
    })
    .on("click", function(event, d) {
  // 添加点击事件处理逻辑
  const poetName = d.name;

  const poetTitleElement = document.querySelector(".poet-title");
  poetTitleElement.textContent = poetName;

  // 显示对应诗人的风格占比饼图
  displayPoetStylePieChart(poetName);

   // 显示饼图
   document.getElementById('poet-name-container').style.display = 'block';
});


$('.quit').on('click', function() {
    // 隐藏 poet-name-container
    $('#poet-name-container').hide();
});







    

            // 清除之前绘制的战争图像
        svg.selectAll("image.war").remove();

        // 根据过滤后的战争数据绘制战争图像
        svg.selectAll("image.war")
            .data(warData)
            .enter()
            .append("image")
            .attr("class", "war")
            .attr("x", d => (d.location.x - 5) * 0.5 + "vh") // 根据图标尺寸调整位置并乘以 12，然后以视口高度的百分比为单位
.attr("y", d => (d.location.y-13) * 0.5 + "vh") // 根据图标尺寸调整位置并乘以 12，然后以视口高度的百分比为单位


            .attr("width", "3vh") // 图标尺寸
            .attr("height", "4.69vh") // 图标尺寸
            .attr("xlink:href", "../../../images/战争点.png") // 替换成相对路径下的图标地址
            .style("display", function(d) {
                // 检查年份范围是否与滑块范围重叠
                if (Array.isArray(d.year_range)) {
                    // 循环检查范围内的每一年是否与战争年份范围重叠
                    for (let i = startVal; i <= endVal; i++) {
                        if (i >= d.year_range[0] && i <= d.year_range[1]) {
                            return "block"; // 如果有重叠，则显示该战争图标
                        }
                    }
                    return "none"; // 如果没有重叠，则隐藏该战争图标
                } else {
                    // 单个年份的情况
                    return (d.year >= startVal && d.year <= endVal) ? "block" : "none"; // 根据年份范围决定显示方式
                }
            })
            .on("mouseover", function(event, d) {
                console.log("chosen");
                showTooltip(event.pageX, event.pageY, `战争年份: ${d.year_range ? d.year_range.join('-') : d.year}\n详情: ${d.info}\n结果: ${d.result}`);
            })
            .on("mouseout", function() {
                hideTooltip();
            });

                        // 设置闪烁效果
setInterval(function() {
    d3.selectAll("image.war")
        .transition()
        .duration(500)
        .style("opacity", 0.3)
        .transition()
        .duration(500)
        .style("opacity", 1);
}, 2000); // 这里的间隔时间可以根据需要调整


        // 计算在范围内显示的战争图标数量
        var visibleWarCount = svg.selectAll("image.war")
            .filter(function() {
                return this.style.display !== "none";
            })
            .size();

        // 在页面上显示战争图标数量
        document.querySelector('.war-winrate-data').textContent = `${visibleWarCount}`;

        // 计算在范围内显示的战争图标中“result”为“胜”的数量
        var winWarCount = svg.selectAll("image.war")
            .filter(function() {
                return this.style.display !== "none" && d3.select(this).datum().result === "胜";
            })
            .size();

        // 在页面上显示在范围内显示的战争图标中“result”为“胜”的数量
        document.querySelector('.war-wintime-data').textContent = ` ${winWarCount}`;

        // 计算胜率
        var winRate = (winWarCount / visibleWarCount) * 100;

        // 在页面上显示胜率
        document.querySelector('.war-data').textContent = `${winRate.toFixed(0)}%`;


                    }
                });


            });

        function showTooltip(x, y, text) {
            const tooltip = document.getElementById("tooltip");
            const container = document.querySelector(".container");
            const containerRect = container.getBoundingClientRect();

            // 计算 tooltip 的位置
            // const tooltipX =containerRect.left + container.scrollLeft;
            const tooltipX =x - containerRect.left + container.scrollLeft - 4200;
            // console.log(x);
            const tooltipY = y - containerRect.top + container.scrollTop + 40;

            tooltip.style.display = "block";
            tooltip.style.left = tooltipX + "px";
            tooltip.style.top = tooltipY + "px";
            tooltip.textContent = text;
        }


        // 隐藏tooltip
        function hideTooltip() {
            const tooltip = document.getElementById("tooltip");
            tooltip.style.display = "none";
        }



// 显示对应诗人的风格占比饼图
function displayPoetStylePieChart(poetName) {
    // 创建 ECharts 实例
    var myChart = echarts.init(document.getElementById('poet-style-pie-chart'));
    myChart.clear();

    // 获取诗人数据
    d3.json("早期边塞诗.json").then(function(data) {
        var poetData = data.poets; // 获取诗人数据
        
        // 过滤出选定诗人的数据
        var selectedPoetArray = poetData.filter(poet => poet.name === poetName);

        // 如果未找到选定的诗人数据，则给出相应提示
        if (selectedPoetArray.length === 0) {
            console.error("未找到选定诗人的数据。");
            return;
        }

        // 统计该诗人的所有诗歌风格
        var styleData = {};
        selectedPoetArray.forEach(poet => {
            var style = poet.style;
            if (styleData[style]) {
                styleData[style].count += 1;
                styleData[style].titles.push(poet.title);
            } else {
                styleData[style] = {
                    count: 1,
                    titles: [poet.title]
                };
            }
        });

        // 生成饼图数据
        var pieData = Object.entries(styleData).map(([style, data]) => ({
            name: style,
            value: data.count,
            extra: data.titles.join(',\n') // 将诗歌标题用逗号分隔并换行
        }));

        // 饼图配置项
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: function(params, ticket, callback) {
                    var content = params.name + '<br/>' +
                        '诗歌数量: ' + params.value
                    return content;
                }
            },
            series: [
                {
                    name: '风格占比',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    data: pieData
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表
        myChart.setOption(option);
    }).catch(function(error) {
        console.error("数据加载错误:", error);
    });
}
