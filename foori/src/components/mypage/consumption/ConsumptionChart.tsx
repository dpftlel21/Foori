import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface ConsumptionChartProps {
  data: { name: string; value: number }[];
  chartType: 'pie' | 'line' | 'bar';
  chartSize: {
    outerRadius: number;
    innerRadius: number;
  };
}

const COLORS = ['#4C6EF5', '#51CF66', '#FAB005', '#FF6B6B', '#845EF7'];

const ConsumptionChart = ({
  data,
  chartType,
  chartSize,
}: ConsumptionChartProps) => {
  console.log('data', data);

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
        className="text-xs md:text-sm"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // 화면 크기에 따른 차트 크기 설정
  const chartDimensions = {
    width: window.innerWidth < 768 ? 320 : 400, // 모바일이면 300, 데스크탑이면 400
    height: window.innerWidth < 768 ? 200 : 320, // 모바일이면 250, 데스크탑이면 320
  };

  switch (chartType) {
    case 'pie':
      return (
        <PieChart width={chartDimensions.width} height={chartDimensions.height}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={chartSize.outerRadius}
            innerRadius={chartSize.innerRadius}
            fill="#8884d8"
            dataKey="value"
            isAnimationActive={true}
          >
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => value.toLocaleString() + '원'}
          />
        </PieChart>
      );

    case 'line':
      return (
        <LineChart
          width={chartDimensions.width}
          height={chartDimensions.height}
          data={data}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => value.toLocaleString() + '원'}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#e38994fb"
            strokeWidth={2}
          />
        </LineChart>
      );

    case 'bar':
      return (
        <BarChart
          width={chartDimensions.width}
          height={chartDimensions.height}
          data={data}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            formatter={(value: number) => value.toLocaleString() + '원'}
          />
          <Bar dataKey="value">
            {data.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Bar>
        </BarChart>
      );
  }
};

export default ConsumptionChart;
