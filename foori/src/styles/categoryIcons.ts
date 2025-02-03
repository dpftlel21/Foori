// 카테고리 아이콘
export const categoryIcons = {
  한식: { icon: '🍖', color: '#F24A4A' },
  일식: { icon: '🍣', color: '#262CC2' },
  중식: { icon: '🍜', color: '#36A51A' },
  양식: { icon: '🍝', color: '#1A84A5' },
  카페: { icon: '☕', color: '#F874A7' },
  분식: { icon: '🍲', color: '#ce2f2f' },
  패스트푸드: { icon: '🍔', color: '#b47cdf' },
  치킨: { icon: '🍗', color: '#ff800b' },
  술집: { icon: '🍺', color: '#2cad48' },
} as const;

// 카테고리 타입 반환
export const getCategoryType = (
  category_name: string,
): keyof typeof categoryIcons => {
  if (category_name.includes('한식')) return '한식';
  if (category_name.includes('일식')) return '일식';
  if (category_name.includes('중식')) return '중식';
  if (category_name.includes('양식')) return '양식';
  if (category_name.includes('카페')) return '카페';
  if (category_name.includes('분식')) return '분식';
  if (category_name.includes('패스트푸드')) return '패스트푸드';
  if (category_name.includes('치킨')) return '치킨';
  if (category_name.includes('술집')) return '술집';
  return '한식'; // 기본값
};
