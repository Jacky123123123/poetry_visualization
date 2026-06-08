   // 监听普通bar的鼠标悬停事件
   document.querySelectorAll('.bar').forEach(bar => {
    bar.addEventListener('mouseover', function(event) {
      console.log("1");
      const tooltipText = this.getAttribute('data-tooltip');
      const x = event.clientX;
      const y = event.clientY;
      const tooltip = document.querySelector('.population-tooltip');
      tooltip.textContent = tooltipText;
      tooltip.style.left = (x + 10) + 'px'; // 鼠标悬停位置右侧 10px
      tooltip.style.top = (y + 10) + 'px'; // 鼠标悬停位置下方 10px
      tooltip.style.display = 'block';
    });

    bar.addEventListener('mouseout', function() {
      document.querySelector('.population-tooltip').style.display = 'none';
    });
  });

// 监听 war-bar 的鼠标悬停事件
document.querySelectorAll('.wars-bar-group img').forEach(bar => {
  bar.addEventListener('mouseover', function(event) {
    console.log("2");
    const tooltipText = this.getAttribute('data-tooltip');
    const x = event.clientX;
    const y = event.clientY;
    const tooltip = document.querySelector('.war-tooltip');
    tooltip.textContent = tooltipText;
    tooltip.style.left = (x + 10) + 'px'; // 鼠标悬停位置右侧 10px
    tooltip.style.top = (y + 10) + 'px'; // 鼠标悬停位置下方 10px
    tooltip.style.display = 'block';
  });

  bar.addEventListener('mouseout', function() {
    document.querySelector('.war-tooltip').style.display = 'none';
  });
});


var myChart = echarts.init(document.getElementById('chart'));

var option = {

  grid: {
    top: '10%', // 设置图表距离顶部的位置
    bottom: '10%' // 设置图表距离底部的位置
  },
  xAxis: {
    type: 'category',
    data: ['638', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
    boundaryGap: false,
    show: false // 隐藏 x 轴
  },
  yAxis: {
    type: 'value',
    show: false // 隐藏 x 轴
  },
  series: [{
    data: [13, 124, 250, 273, 215, 444, 515, 318, 504, 387, 561],
    type: 'line',
    smooth: false, // 关闭平滑曲线
    symbol: 'circle', // 设置节点样式为圆形
    symbolSize: 10, // 设置节点大小
    itemStyle: {
      color: 'darkred' // 设置节点颜色为暗红色
    },
    emphasis: { // 设置节点高亮样式
      focus: 'series'
    },
    hoverAnimation: false // 禁用折线与鼠标之间的交互关系
  }]
};

myChart.setOption(option);
