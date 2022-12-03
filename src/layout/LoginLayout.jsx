import LoginForm from "../components/LoginForm";

export default function LoginLayout() {
  return (
    <div className="max-w-md mx-auto">
      <div className="w-32 mx-auto mb-3">
        <img src="../../public/logo.png" alt="logo" className="object-cover" />
      </div>

      <h1 className="text-3xl text-gray-900 text-center font-bold mb-1 tracking-tight">
        Sign up an account at QN
      </h1>
      <p className="text-gray-400 text-sm text-center mb-8">
        Or
        <a href="#" className="text-indigo-600 font-semibold">
          &nbsp;start your 14-day free trial
        </a>
      </p>
      <LoginForm></LoginForm>
    </div>
  );
}
