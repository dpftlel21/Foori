import { useEffect, useState } from 'react';
import { ResponsiveContainer } from 'recharts';
import { getConsumptionData } from '../../../api/endpoints/consumption';
import ConsumptionChart from './ConsumptionChart';
import DateRangePicker from './DateRangePicker';

type ChartType = 'pie' | 'line' | 'bar';

const STYLES = {
  container: `
    w-full
    h-full
    min-h-[620px]
    flex
    flex-col
    gap-4
    p-4
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
    gap-3
    md:gap-12
    w-max
    md:w-auto
  `,
  card: `
    bg-white
    p-2
    rounded-lg
    shadow-sm
    min-w-[100px]
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
    md:flex-row
    gap-3
    p-3
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
    h-[250px]
    shadow-md
    p-3
    md:p-6
  `,
  chartContainer: `
    w-full
    h-full
  `,
  totalAmount: `
    text-right
    mt-12
    text-sm
    md:text-lg
    font-bold
    text-[#e38994fb]
  `,
  searchButton: (isEnabled: boolean) => `
    px-4
    py-2
    rounded-lg
    text-sm
    transition-colors
    ${
      isEnabled
        ? 'bg-[#e38994fb] text-white hover:bg-[#d27883fb]'
        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
    }
  `,
} as const;

const CONSUMPTION_DATA = {
  weekly: [
    { name: '월', value: 50000, date: '2024-01-01' },
    { name: '화', value: 35000, date: '2024-01-02' },
    { name: '수', value: 42000, date: '2024-01-03' },
    { name: '목', value: 31000, date: '2024-01-04' },
    { name: '금', value: 85000, date: '2024-01-05' },
    { name: '토', value: 120000, date: '2024-01-06' },
    { name: '일', value: 95000, date: '2024-01-07' },
  ],
  monthly: [
    { name: '양식', value: 350000, date: '2024-01-01' },
    { name: '한식', value: 250000, date: '2024-01-05' },
    { name: '일식', value: 200000, date: '2024-01-10' },
    { name: '중식', value: 150000, date: '2024-01-15' },
    { name: '카페', value: 180000, date: '2024-01-20' },
  ],
  yearly: [
    { name: '1월', value: 950000, date: '2024-01-01' },
    { name: '2월', value: 880000, date: '2024-02-01' },
    { name: '3월', value: 1130000, date: '2024-03-01' },
    { name: '4월', value: 980000, date: '2024-04-01' },
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
  const [chartType, setChartType] = useState<ChartType>('pie');
  const [chartSize, setChartSize] = useState({
    outerRadius: window.innerWidth < 768 ? 70 : 100,
    innerRadius: window.innerWidth < 768 ? 15 : 40,
  });
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '',
    end: '',
  });
  const [showData, setShowData] = useState(false);

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

  const handleDateRangeChange = (startDate: string, endDate: string) => {
    setDateRange({ start: startDate, end: endDate });
    setShowData(false); // 날짜 변경 시 데이터 숨기기
  };

  // 소비 데이터 조회
  const handleSearch = () => {
    if (dateRange.start && dateRange.end) {
      setShowData(true);
      getConsumptionData(dateRange.start, dateRange.end);
    }
  };

  const getFilteredData = () => {
    if (!dateRange.start || !dateRange.end) return [];

    return CONSUMPTION_DATA.monthly.filter((item) => {
      const itemDate = new Date(item.date);
      return (
        itemDate >= new Date(dateRange.start) &&
        itemDate <= new Date(dateRange.end)
      );
    });
  };

  const filteredData = getFilteredData();
  const totalSpent = filteredData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className={STYLES.container}>
      <div className={STYLES.filterSection}>
        <div className={STYLES.filterGroup}>
          <div className="flex flex-col md:flex-row items-start gap-3">
            <DateRangePicker onRangeChange={handleDateRangeChange} />
            <button
              onClick={handleSearch}
              disabled={!dateRange.start || !dateRange.end}
              className={STYLES.searchButton(
                !!dateRange.start && !!dateRange.end,
              )}
            >
              조회하기
            </button>
          </div>
        </div>
      </div>

      {showData && (
        <>
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
              <ResponsiveContainer>
                <ConsumptionChart
                  data={filteredData}
                  chartType={chartType}
                  chartSize={chartSize}
                />
              </ResponsiveContainer>
            </div>
            <div className={STYLES.totalAmount}>
              총 소비금액: {totalSpent.toLocaleString()}원
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Consumption;
