import { useLoginForm } from '../../hooks/form/useLoginForm';
import Logo from '../common/Logo';
import LoginForm from './LoginForm';
import OauthLogin from './oauthLogin/OauthLogin';

const STYLES = {
  container:
    'w-full h-screen bg-gradient-to-b from-[#ffecd2] to-[#fcb69f] flex flex-col justify-center items-center text-2xl font-bold',
  contentContainer:
    'w-full max-w-[400px] bg-white rounded-lg shadow-md p-8 mx-auto',
  divider: {
    container: 'flex items-center my-6',
    line: 'flex-1 h-px bg-gray-300',
    text: 'px-4 text-sm text-gray-500',
  },
} as const;

const LoginBox = () => {
  const {
    formData,
    showPassword,
    isLoading,
    handleChange,
    handleSubmit,
    togglePassword,
  } = useLoginForm();

  return (
    <div className={STYLES.container}>
      <Logo />
      <div className={STYLES.contentContainer}>
        <LoginForm
          formData={formData}
          isLoading={isLoading}
          showPassword={showPassword}
          onSubmit={handleSubmit}
          onChange={handleChange}
          onTogglePassword={togglePassword}
        />
        <div className={STYLES.divider.container}>
          <div className={STYLES.divider.line} />
          <span className={STYLES.divider.text}>또는</span>
          <div className={STYLES.divider.line} />
        </div>
        <OauthLogin actionType="login" />
      </div>
    </div>
  );
};

export default LoginBox;
