// 柱状图组件
import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';

const BarChart = ({ title }) => {
  // 1.获取渲染图表的dom节点
  const chartRef = useRef(null)

  // 保证dom可用(渲染完毕后调用) 才进行图表的渲染
  useEffect(() => {
    const chartDom = chartRef.current

    // 2.图表初始化生成图表实例对象
    const myChart = echarts.init(chartDom);
    // 3.准备图表参数
    const option = {
      title: {
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['Vue', 'React', 'Angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [100, 100, 100],
          type: 'bar'
        }
      ]
    };

    // 4.使用图表参数进行图表渲染
    option && myChart.setOption(option);
  }, [title])

  return <div ref={chartRef} style={{ width: '500px', height: '400px' }}></div>
}

export default BarChart