import { useEffect, useState } from 'react';
import { ResponsiveContainer } from 'recharts';
import { useConsumption } from '../../../hooks/query/useConsumption';
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
    h-[220px]
    md:h-[350px]
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

  const { data, isLoading } = useConsumption(
    showData ? dateRange.start : '',
    showData ? dateRange.end : '',
  );

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
    }
  };

  const getChartData = () => {
    if (!data) return [];

    const chartData = data.map((item) => ({
      name: item.category,
      value: parseInt(item.sumPrice),
    }));

    return chartData;
  };

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

      {showData && !isLoading && data && (
        <>
          <div className={STYLES.cardSection}>
            <div className={STYLES.cardContainer}>
              <div className={STYLES.card}>
                <h3 className={STYLES.cardTitle}>가장 자주 방문</h3>
                <p className={STYLES.cardValue}>{data[0].MyMaxVisit}</p>
                <p className={STYLES.cardDescription}>
                  이번 달 {data[0].MyMaxVisitCount}회 방문
                </p>
              </div>
              <div className={STYLES.card}>
                <h3 className={STYLES.cardTitle}>1회 평균 소비</h3>
                <p className={STYLES.cardValue}>
                  {parseInt(data[0].myAvgPrice).toLocaleString()}원
                </p>
                <p className={STYLES.cardDescription}>
                  전체 평균{' '}
                  {parseInt(data[0].totalUserAvgPrice).toLocaleString()}원
                </p>
              </div>
              <div className={STYLES.card}>
                <h3 className={STYLES.cardTitle}>총 소비금액</h3>
                <p className={STYLES.cardValue}>
                  {parseInt(data[0].sumPrice).toLocaleString()}원
                </p>
              </div>
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
                  data={getChartData()}
                  chartType={chartType}
                  chartSize={chartSize}
                />
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Consumption;
