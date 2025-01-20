import { useEffect, useState } from 'react';
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
    p-3
    md:p-6
  `,
  header: `
    mb-4
    md:mb-8
  `,
  headerTitle: `
    text-lg
    md:text-2xl
    font-bold
    text-gray-800
  `,
  cardSection: `
    overflow-x-auto
    mb-4
    md:mb-6
    -mx-3
    px-3
    md:mx-0
    md:px-0
  `,
  cardContainer: `
    flex
    md:grid
    md:grid-cols-3
    gap-3
    md:gap-4
    w-max
    md:w-auto
  `,
  card: `
    bg-white
    p-4
    rounded-lg
    shadow-sm
    min-w-[180px]
    md:min-w-0
  `,
  cardTitle: `
    text-sm
    text-gray-500
  `,
  cardValue: `
    text-lg
    md:text-xl
    font-bold
    mt-1
  `,
  cardDescription: `
    text-xs
    md:text-sm
    text-gray-600
    mt-1
  `,
  filterSection: `
    flex
    flex-col
    md:flex-row
    gap-3
    mb-4
    bg-white
    p-3
    md:p-4
    rounded-lg
    shadow-sm
  `,
  filterGroup: `
    flex
    flex-col
    gap-2
  `,
  filterLabel: `
    text-xs
    md:text-sm
    font-medium
    text-gray-600
  `,
  buttonGroup: `
    grid
    grid-cols-3
    gap-1
    w-full
    md:flex
    md:gap-2
  `,
  button: (isActive: boolean) => `
    px-3
    py-2
    rounded-lg
    text-sm
    transition-colors
    w-full
    md:w-auto
    ${
      isActive
        ? 'bg-[#e38994fb] text-white'
        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
    }
  `,
  chartSection: `
    h-[160px]
    md:h-[300px]
    bg-white
    rounded-lg
    shadow-sm
    p-3
    md:p-6
  `,
  chartContainer: `
    w-full
    h-full
  `,
  totalAmount: `
    text-right
    mt-3
    text-sm
    md:text-lg
    font-bold
    text-[#e38994fb]
  `,
} as const;

const COLORS = ['#4C6EF5', '#51CF66', '#FAB005', '#FF6B6B', '#845EF7'];

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
  const [chartSize, setChartSize] = useState({
    outerRadius: window.innerWidth < 768 ? 70 : 100,
    innerRadius: window.innerWidth < 768 ? 15 : 40,
  });

  const data = CONSUMPTION_DATA[timeRange] || [];
  const totalSpent = data.reduce((acc, curr) => acc + curr.value, 0);

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setChartSize({
        outerRadius: window.innerWidth < 768 ? 60 : 100,
        innerRadius: window.innerWidth < 768 ? 20 : 40,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 원형 차트 렌더링
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

  // 차트 렌더링
  const renderChart = () => {
    const commonChartConfig = {
      margin: { top: 5, right: 5, left: 0, bottom: 5 },
      tick: { fontSize: 10 },
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

  return (
    <div className={STYLES.container}>
      <div className={STYLES.header}>
        <h1 className={STYLES.headerTitle}>소비 분석</h1>
      </div>

      <div className={STYLES.cardSection}>
        <div className={STYLES.cardContainer}>
          {Object.entries(ADDITIONAL_ANALYSIS).map(([key, data]) => (
            <div key={key} className={STYLES.card}>
              <h3 className={STYLES.cardTitle}>{data.title}</h3>
              <p className={STYLES.cardValue}>{data.value}</p>
              <p className={STYLES.cardDescription}>{data.description}</p>
            </div>
          ))}
        </div>
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

      <div className={STYLES.chartSection}>
        <div className={STYLES.chartContainer}>
          <ResponsiveContainer>{renderChart()}</ResponsiveContainer>
        </div>
        <div className={STYLES.totalAmount}>
          총 소비금액: {totalSpent.toLocaleString()}원
        </div>
      </div>
    </div>
  );
};

export default Consumption;
