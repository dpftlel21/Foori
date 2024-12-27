import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import MenuContainer from '../../common/MenuContainer';

const STYLES = {
  container: 'p-4 sm:p-6 md:p-8 max-w-6xl mx-auto',
  title:
    'text-xl sm:text-2xl font-bold text-gray-800 border-b-2 border-blue-500 pb-3 mb-6',
  analysisContainer: 'flex flex-col lg:flex-row gap-6',
  chartSection:
    'flex-1 h-[300px] sm:h-[350px] bg-white rounded-xl shadow-lg p-4 hover:shadow-xl transition-all duration-300',
  analysisSection: 'flex-1 bg-white rounded-xl shadow-lg p-6',
  analysisHeader: 'text-lg sm:text-xl font-bold text-gray-800 mb-4',
  analysisItem:
    'mb-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200',
  analysisText: 'text-gray-700 text-base sm:text-lg mb-2',
  totalAmount: 'text-xl sm:text-2xl font-bold text-blue-600 text-right mt-4',
};

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  name: string;
}

const Consumption = () => {
  const consumptionData = [
    { name: '양식', value: 350000 },
    { name: '한식', value: 250000 },
    { name: '일식', value: 200000 },
    { name: '중식', value: 150000 },
    { name: '카페', value: 180000 },
  ];

  const COLORS = ['#4C6EF5', '#51CF66', '#FAB005', '#FF6B6B', '#845EF7'];

  const totalSpent = consumptionData.reduce((acc, curr) => acc + curr.value, 0);
  const userName = '김철수';

  const getConsumptionPercentile = () => {
    const averageConsumption = 1000000;
    return totalSpent > averageConsumption ? 30 : 70;
  };

  const getMostPreferredCuisine = () => {
    return consumptionData.reduce((prev, current) =>
      prev.value > current.value ? prev : current,
    ).name;
  };

  // 커스텀 라벨 렌더링 함수
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    name,
  }: CustomizedLabelProps) => {
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
        fontSize="12"
      >
        {`${name} ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <MenuContainer>
      <div className={STYLES.container}>
        <h1 className={STYLES.title}>소비 분석</h1>

        <div className={STYLES.analysisContainer}>
          <div className={STYLES.chartSection}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={consumptionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={100}
                  innerRadius={38} // 도넛 차트 스타일로 변경
                  fill="#8884d8"
                  dataKey="value"
                >
                  {consumptionData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => value.toLocaleString() + '원'}
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={STYLES.analysisSection}>
            <h3 className={STYLES.analysisHeader}>
              {userName}님의 소비 패턴 분석
            </h3>
            <div className={STYLES.analysisItem}>
              <p className={STYLES.analysisText}>
                전체 사용자 중 상위 {getConsumptionPercentile()}%
                소비하셨습니다.
              </p>
            </div>
            <div className={STYLES.analysisItem}>
              <p className={STYLES.analysisText}>
                주로 {getMostPreferredCuisine()}을 선호하시네요!
              </p>
            </div>
            <div className={STYLES.totalAmount}>
              이번 달 총 소비금액: {totalSpent.toLocaleString()}원
            </div>
          </div>
        </div>
      </div>
    </MenuContainer>
  );
};

export default Consumption;
