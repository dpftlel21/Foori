import { useState } from 'react';
import {
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ChartType = 'pie' | 'line' | 'bar';
type TimeRange = 'weekly' | 'monthly' | 'yearly';

const STYLES = {
  container: `
    w-full
    max-w-[1200px]
    mx-auto
    overflow-y-auto
    p-6
  `,
  header: `
    mb-8
  `,
  title: `
    text-2xl
    font-bold
    text-gray-800
    mb-4
  `,
  filterSection: `
    flex
    flex-col
    gap-4
    md:flex-row
    md:justify-start
    mb-8
    bg-white
    p-4
    rounded-lg
    shadow-sm
  `,
  filterGroup: `
    flex
    flex-col
    gap-2
  `,
  filterLabel: `
    text-sm
    font-medium
    text-gray-600
  `,
  buttonGroup: `
    flex
    gap-2
    flex-wrap
  `,
  button: (isActive: boolean) => `
    px-4
    py-2
    rounded-lg
    text-sm
    transition-colors
    ${
      isActive
        ? 'bg-blue-500 text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }
  `,
  chartSection: `
    h-[300px]
    bg-white
    rounded-lg
    shadow-sm
    p-6
    mb-6
  `,
  chartContainer: `
    w-full
    h-full
    overflow-hidden
  `,
} as const;

const CONSUMPTION_DATA = {
  weekly: [
    { name: '월', value: 50000 },
    { name: '화', value: 35000 },
    { name: '수', value: 42000 },
    { name: '목', value: 31000 },
    { name: '금', value: 85000 },
    { name: '토', value: 120000 },
    { name: '일', value: 95000 },
  ],
  monthly: [
    { name: '양식', value: 350000 },
    { name: '한식', value: 250000 },
    { name: '일식', value: 200000 },
    { name: '중식', value: 150000 },
    { name: '카페', value: 180000 },
  ],
  yearly: [
    { name: '1월', value: 950000 },
    { name: '2월', value: 880000 },
    { name: '3월', value: 1130000 },
    { name: '4월', value: 980000 },
  ],
};

const COLORS = ['#4C6EF5', '#51CF66', '#FAB005', '#FF6B6B', '#845EF7'];

const ADDITIONAL_ANALYSIS = {
  comparison: {
    title: '지난달 대비',
    value: '+12%',
    description: '지난달보다 소비가 증가했어요',
  },
  frequent: {
    title: '가장 자주 방문',
    value: '스시 오마카세',
    description: '이번 달 3회 방문',
  },
  average: {
    title: '1회 평균 소비',
    value: '32,000원',
    description: '전체 평균 25,000원',
  },
};

const Consumption = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('monthly');
  const [chartType, setChartType] = useState<ChartType>('pie');

  const data = CONSUMPTION_DATA[timeRange] || []; // 기본값 빈 배열 추가
  const totalSpent = data.reduce((acc, curr) => acc + curr.value, 0);

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
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const renderChart = () => {
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
              outerRadius={125}
              innerRadius={50}
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
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => value.toLocaleString() + '원'}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        );

      case 'bar':
        return (
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              formatter={(value: number) => value.toLocaleString() + '원'}
            />
            <Bar dataKey="value" fill="#8884d8">
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

  return (
    <div className={STYLES.container}>
      <div className={STYLES.header}>
        <h1 className={STYLES.title}>소비 분석</h1>
      </div>

      <div className={STYLES.filterSection}>
        <div className={STYLES.filterGroup}>
          <span className={STYLES.filterLabel}>기간 선택</span>
          <div className={STYLES.buttonGroup}>
            {[
              { value: 'weekly', label: '주간' },
              { value: 'monthly', label: '월간' },
              { value: 'yearly', label: '연간' },
            ].map((range) => (
              <button
                key={range.value}
                onClick={() => setTimeRange(range.value as TimeRange)}
                className={STYLES.button(timeRange === range.value)}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        <div className={STYLES.filterGroup}>
          <span className={STYLES.filterLabel}>차트 유형</span>
          <div className={STYLES.buttonGroup}>
            {[
              { value: 'pie', label: '원형' },
              { value: 'line', label: '선형' },
              { value: 'bar', label: '막대' },
            ].map((type) => (
              <button
                key={type.value}
                onClick={() => setChartType(type.value as ChartType)}
                className={STYLES.button(chartType === type.value)}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 분석 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {Object.entries(ADDITIONAL_ANALYSIS).map(([key, data]) => (
          <div key={key} className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="text-sm text-gray-500">{data.title}</h3>
            <p className="text-xl font-bold mt-1">{data.value}</p>
            <p className="text-sm text-gray-600 mt-1">{data.description}</p>
          </div>
        ))}
      </div>

      {/* 차트 섹션 */}
      <div className={STYLES.chartSection}>
        <div className={STYLES.chartContainer}>
          <ResponsiveContainer>{renderChart()}</ResponsiveContainer>
        </div>
        <div className="text-right mt-4 text-xl font-bold text-blue-600">
          총 소비금액: {totalSpent.toLocaleString()}원
        </div>
      </div>
    </div>
  );
};

export default Consumption;
