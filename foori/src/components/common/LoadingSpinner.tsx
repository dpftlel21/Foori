const STYLES = {
  container: `
    fixed
    inset-0
    flex
    items-center
    justify-center
    bg-black/20
    backdrop-blur-sm
    z-50
  `,
  spinner: `
    w-12
    h-12
    border-4
    border-[#EE6677]
    border-t-transparent
    rounded-full
    animate-spin
  `,
  text: `
    mt-4
    text-gray-700
    font-medium
  `,
} as const;

const LoadingSpinner = () => {
  return (
    <div className={STYLES.container}>
      <div className="flex flex-col items-center">
        <div className={STYLES.spinner} />
        <p className={STYLES.text}>로딩중...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
