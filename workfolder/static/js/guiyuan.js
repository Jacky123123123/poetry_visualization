// Calculate and set data-index attribute for each image
d3.selectAll('.women').each(function() {
    var imageSrc = this.src;
    var imageName = imageSrc.substring(imageSrc.lastIndexOf('/') + 1);
    var imageNumber = imageName.match(/\d+/)[0];
    d3.select(this).attr('data-index', imageNumber);
  });
  
  // Load JSON data from file
  d3.json("./闺怨.json").then(function(jsonData) {
  
  // 计数器，用于跟踪当前绑定到图片的数据的索引
  var dataIndexCounter = {};
  
  // Binding data to images
  d3.selectAll('.women').each(function() {
    var imageNumber = +this.getAttribute('data-index');
  
    // 如果该图片的data-index属性值在计数器中不存在，则初始化为0
    if (!dataIndexCounter[imageNumber]) {
      dataIndexCounter[imageNumber] = 0;
    }
  
    // 获取当前图片应该绑定的数据的索引
    var dataIndex = dataIndexCounter[imageNumber];
  
    // 获取与当前data-index匹配的所有数据
    var matchingData = jsonData.filter(function(d) {
      return parseInt(d.labels) === imageNumber;
    });
  
    // 确保索引不超出数据范围
    if (dataIndex >= matchingData.length) {
      // 如果超出范围，则重置为0
      dataIndex = 0;
    }
  
    // 获取当前图片应该绑定的数据
    var boundData = matchingData[dataIndex];
  
    // 将数据绑定到图片
    d3.select(this)
      .data([boundData])
      .attr('data-labels', function(d) { return d.labels; })
      .on("mouseover", function(event, boundData) {
        // 更新提示框的内容
        const tooltip = d3.select("#guiyuan-tooltip");
        tooltip.html(`<strong>记录于：</strong> ${boundData.title} <br><strong>经历：</strong> ${boundData['Tragic experience']} <br>`);
    
        // 先显示 tooltip，再计算位置
        tooltip.style("display", "block");
    
        // 获取图片位置
        const imgBounds = this.getBoundingClientRect();
    
        // 设置提示框的位置
        const tooltipWidth = tooltip.node().offsetWidth;
        const tooltipHeight = tooltip.node().offsetHeight;
        const tooltipLeft = imgBounds.left + (imgBounds.width - tooltipWidth) / 2;
        const tooltipTop = imgBounds.top - tooltipHeight;
        tooltip.style("left", `${tooltipLeft}px`)
                .style("top", `${tooltipTop}px`);
    })
    
    
    
      .on("mouseout", function() {
        // 鼠标移出时隐藏 tooltip
        d3.select("#guiyuan-tooltip")
          .style("display", "none");
      });
  
    // 增加索引计数器
    dataIndexCounter[imageNumber]++;
  });
  
  });
  
  
  
  
  
  
  $(document).ready(function() {
    // 初始化图表
    var chartElement = document.getElementById('guiyuan-chart');
    var myChart = echarts.init(chartElement);
    
    var option = {
      backgroundColor: 'rgba(44, 52, 60, 0.6)', // 背景色不透明度60%
      borderRadius: [10, 10, 10, 10], // 四个角的圆角半径，顺序为左上、右上、右下、左下
        title: {
            text: '闺怨妇女类型饼图',
            left: 'center',
            top: 40,
            textStyle: {
                color: '#ccc',
                fontSize: 15 // 设置字体大小为16px
            }
        },

        tooltip: {
            trigger: 'item',
            textStyle: {
              fontSize: 15 // 设置字体大小为16px
          }
        },
        visualMap: {
            show: false,
            min: 80,
            max: 600,
            inRange: {
                colorLightness: [0, 1]
            }
        },
        series: [
            {
                name: '数量：',
                type: 'pie',
                radius: ['30%', '70%'], // 调整饼图的内外半径，使大小区别不那么明显
                center: ['50%', '50%'],
                data: [
                  { value: 24, name: '夫妻分隔两地', itemStyle: { color: '#968dac' } }, // 大值，颜色#968dac
                  { value: 12, name: '妻子四处流亡', itemStyle: { color: '#6a6085' } }, // 中大值，颜色#6a6085
                  { value: 8, name: '老母与子别', itemStyle: { color: '#635a7c' } }, // 中值，颜色#635a7c
                  { value: 6, name: '丈夫战死/失踪', itemStyle: { color: '#4f4863' } }, // 中小值，颜色#4f4863
                  { value: 4, name: '丈夫归来', itemStyle: { color: '#363143' } } // 小值，颜色#363143
              ]
.sort(function(a, b) {
                    return a.value - b.value;
                }),
                roseType: 'radius',
                label: {
                    color: 'rgba(255, 255, 255, 0.6)',
                    fontSize: 24 // 设置字体大小为16px
                },
                labelLine: {
                    lineStyle: {
                        color: 'rgba(255, 255, 255, 0.8)'
                    },
                    smooth: 0.2,
                    length: 10,
                    length2: 20
                },
                itemStyle: {
                    color: '#766b93',
                    shadowBlur: 200,
                    shadowColor: 'rgba(0, 0, 0, 0.8)'
                },
                animationType: 'scale',
                animationEasing: 'elasticOut',
                animationDelay: function(idx) {
                    return Math.random() * 200;
                }
            }
        ]
    };

   // 点击事件处理函数
var isChartVisible = false; // 初始状态为隐藏
$('.pie-chart-click').click(function() {
    // 切换图表的显示和隐藏
    if (!isChartVisible) {
        // 显示图表
        chartElement.style.display = 'block';
        // 使用指定的配置项和数据显示图表，并启用初始动画
        myChart.setOption(option, true);
        isChartVisible = true;
    } else {
        // 隐藏图表
        chartElement.style.display = 'none';
        isChartVisible = false;
    }
});

});
