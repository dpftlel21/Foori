export const categoryIcons = {
  한식: {
    icon: '🍖',
    color: '#F24A4A',
    description: '한식 음식점',
  },
  일식: {
    icon: '🍣',
    color: '#262CC2',
    description: '일식 음식점',
  },
  중식: {
    icon: '🍜',
    color: '#36A51A',
    description: '중식 음식점',
  },
  양식: {
    icon: '🍝',
    color: '#1A84A5',
    description: '양식 음식점',
  },
  카페: {
    icon: '☕',
    color: '#F874A7',
    description: '카페',
  },
  분식: {
    icon: '🍲',
    color: '#ce2f2f',
    description: '분식점',
  },
  패스트푸드: {
    icon: '🍔',
    color: '#b47cdf',
    description: '패스트푸드점',
  },
  치킨: {
    icon: '🍗',
    color: '#ff800b',
    description: '치킨집',
  },
  술집: {
    icon: '🍺',
    color: '#2cad48',
    description: '술집',
  },
} as const;

export const getCategoryType = (
  category_name: string,
): keyof typeof categoryIcons => {
  const categoryMap = new Map([
    [/한식/, '한식'],
    [/일식/, '일식'],
    [/중식/, '중식'],
    [/양식/, '양식'],
    [/카페/, '카페'],
    [/분식/, '분식'],
    [/패스트푸드/, '패스트푸드'],
    [/치킨/, '치킨'],
    [/술집|주점/, '술집'],
  ]);

  for (const [pattern, category] of categoryMap) {
    if (pattern.test(category_name)) {
      return category as keyof typeof categoryIcons;
    }
  }

  return '한식'; // 기본값
};
