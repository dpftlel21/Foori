// 로그인, 회원가입, 아이디-비밀번호 찾기 공통 스타일 (폼)
export const COMMON_INPUT_STYLES = {
  container: `w-full flex flex-col space-y-2`,
  formContainer: `w-full min-h-screen flex flex-col items-center justify-center p-4
                bg-gradient-to-b from-[#ffecd2] to-[#fcb69f]`,
  form: `w-full max-w-[500px] bg-white rounded-2xl shadow-md p-8 space-y-6`,
  fieldContainer: `w-full space-y-2`,
  labelContainer: `flex items-center gap-2 mb-2`,
  labelIcon: `w-5 h-5 text-[#6B7280]`,
  label: `text-[#6B7280] text-sm`,
  inputContainer: `w-full flex gap-2`,
  input: (error?: boolean | string) => `
    w-full px-4 py-3 rounded-lg border text-sm
    ${error ? 'border-red-500' : 'border-gray-200'}
    focus:outline-none focus:ring-1 focus:ring-[#FF800B]
    placeholder:text-gray-400
  `,
  button: `
    px-4 py-3 bg-[#FF800B] text-white text-sm rounded-lg
    hover:bg-[#fcb69f] transition duration-300
    disabled:opacity-50 disabled:cursor-not-allowed
    whitespace-nowrap
  `,
  submitButton: (disabled: boolean) => `
    w-full py-3 bg-[#FF800B] text-white text-base rounded-lg font-medium
    hover:bg-[#fcb69f] transition duration-300
    ${disabled ? 'opacity-50 cursor-not-allowed bg-[#FFB27D]' : ''}
  `,
  errorText: `text-red-500 text-xs mt-1`,
  verificationContainer: `w-full flex gap-2 mt-2`,
  title: `text-2xl font-bold text-center mb-8`,
  resultBox: `p-6 bg-gray-50 rounded-lg text-center space-y-4`,
  resultText: `text-gray-600 text-sm`,
  resultHighlight: `text-[#FF800B] font-medium text-lg`,
  linkButton: `text-sm text-[#FF800B] hover:underline mt-4 block text-center`,
} as const;
