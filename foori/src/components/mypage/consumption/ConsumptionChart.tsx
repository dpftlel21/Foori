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
  data: any[];
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
  const commonChartConfig = {
    margin: { top: 5, right: 5, left: 0, bottom: 5 },
    tick: { fontSize: 10 },
  };

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

  switch (chartType) {
    case 'pie':
      return (
        <PieChart>
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
            isAnimationActive={false}
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
        <LineChart data={data} {...commonChartConfig}>
          <XAxis dataKey="name" {...commonChartConfig.tick} />
          <YAxis {...commonChartConfig.tick} />
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
        <BarChart data={data} {...commonChartConfig}>
          <XAxis dataKey="name" {...commonChartConfig.tick} />
          <YAxis {...commonChartConfig.tick} />
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
