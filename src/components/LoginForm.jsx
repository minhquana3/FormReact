import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

function BtnShowPassword({ showPassword, handleOnClickShowPassword }) {
  return (
    <button
      type="button"
      className="inline-block basis-2/12 rounded-md px-2 py-3 bg-gray-200 text-xs uppercase text-gray-700 hover:bg-gray-300"
      onClick={handleOnClickShowPassword}
    >
      {showPassword ? "Hide" : "Show"}
    </button>
  );
}

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleOnClickShowPassword = function () {
    setShowPassword(!showPassword);
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ criteriaMode: "all" });

  const onSubmit = function (data) {
    console.log(data);
  };

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/g;
  const atLeastOneUpperCase = /[A-Z]/g; // capital letters from A to Z
  const atLeastOneSmallCase = /[a-z]/g; // small letters from a to z
  const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
  const atLeastOneSpecialCharacter = /[#?!@$%^&*-]/g; // any of the special characters within the square brackets

  const passwordChecker = {
    upperCase: password.match(atLeastOneUpperCase),
    lowerCase: password.match(atLeastOneSmallCase),
    number: password.match(atLeastOneNumeric),
    specialCharacter: password.match(atLeastOneSpecialCharacter),
  };

  const handleOnChange = function (e) {
    setPassword(e.target.value);
    console.log(e.target.value);
  };

  const passWordCheckerIcon = function (criteria) {
    return (
      <span className="inline-block">
        {criteria ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-green-700"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 text-gray-200"
          >
            <path
              fillRule="evenodd"
              d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </span>
    );
  };

  return (
    <div className="bg-white px-8 py-7 rounded-md shadow-md mb-3">
      <div className="w-full">
        <form
          action=""
          className="flex flex-col items-start justify-center gap-6 mb-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="w-full">
            <label htmlFor="email" className="text-gray-700 mb-1 block">
              Email address
            </label>
            <input
              type="text"
              id="email"
              className="form-input mb-2 placeholder:text-gray-400 placeholder:font-light text-sm w-full border-gray-300 rounded-md focus:border-indigo-600"
              placeholder="email@abc.com"
              {...register("email", {
                required: "This is required",
                pattern: {
                  value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
                  message: "Email is invalid",
                },
              })}
            />

            <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className="text-xs flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 fill-red-600 inline-block"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="inline-block text-red-600 text-xs italic">
                      {message}
                    </span>
                  </p>
                ))
              }
            />
          </div>
          <div className="w-full">
            <label htmlFor="passwordValue" className="text-gray-700 mb-1 block">
              Password
            </label>

            <ul className="mb-1 inline-flex gap-2 text-xs flex-wrap">
              <li className="flex items-center gap-0.5 grow shrink basis-7">
                <p className="text-xs">Use:</p>
              </li>
              <li className="flex items-center gap-0.5 grow shrink basis-7">
                {passWordCheckerIcon(passwordChecker.upperCase)}
                <p>Uppercase</p>
              </li>
              <li className="flex items-center gap-0.5 grow shrink basis-7">
                {passWordCheckerIcon(passwordChecker.lowerCase)}
                <p>Lowercase</p>
              </li>
              <li className="flex items-center gap-0.5 grow shrink basis-7">
                {passWordCheckerIcon(passwordChecker.number)}
                <p>Numbers</p>
              </li>
              <li className="flex items-center gap-0.5 grow shrink basis-7">
                {passWordCheckerIcon(passwordChecker.specialCharacter)}
                <p>Special character</p>
              </li>
            </ul>
            <div className="flex items-center gap-1 mb-2">
              <input
                type={!showPassword ? "password" : "text"}
                id="password"
                className="form-input text-sm w-full basis-10/12 border-gray-300 rounded-md focus:border-indigo-600"
                {...register("password", {
                  required: "This is required",
                  pattern: {
                    value: passwordRegex,
                    message: "Password does not meet the requirements",
                  },
                })}
                onChange={(e) => handleOnChange(e)}
                value={password}
              />
              <BtnShowPassword
                showPassword={showPassword}
                handleOnClickShowPassword={handleOnClickShowPassword}
              ></BtnShowPassword>
            </div>
            <ErrorMessage
              errors={errors}
              name="password"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className="text-xs flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 fill-red-600 inline-block"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="inline-block text-red-600 text-xs italic">
                      {message}
                    </span>
                  </p>
                ))
              }
            ></ErrorMessage>
          </div>
          <div className="w-full">
            <label
              htmlFor="reTypePassword"
              className="text-gray-700 mb-1 block"
            >
              Re-type password
            </label>
            <div className="flex items-center gap-1 mb-2">
              <input
                type={!showPassword ? "password" : "text"}
                id="reTypePassword"
                className="form-input text-sm w-full basis-10/12 border-gray-300 rounded-md focus:border-indigo-600"
                {...register("reTypePassword", {
                  required: "This is required",
                  validate: (val) => {
                    if (watch("password", "") != val)
                      return "Your password does not match";
                  },
                })}
              />
              <BtnShowPassword
                showPassword={showPassword}
                handleOnClickShowPassword={handleOnClickShowPassword}
              ></BtnShowPassword>
            </div>
            <ErrorMessage
              errors={errors}
              name="reTypePassword"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <p key={type} className="text-xs flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 fill-red-600 inline-block"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                        clipRule="evenodd"
                      />
                    </svg>

                    <span className="inline-block text-red-600 text-xs italic">
                      {message}
                    </span>
                  </p>
                ))
              }
            ></ErrorMessage>
          </div>
          <div className="flex flex-col-reverse items-start gap-3 mb-3 w-full sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                name=""
                id="rememberMe"
                className="form-checkbox rounded  text-indigo-600 text-sm border-gray-300 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
              />
              <label htmlFor="rememberMe" className="text-sm">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="inline-block tracking-normal font-semibold text-sm text-indigo-600 border-b-indigo-500 border-solid border-b transition-all hover:border-b-white"
            >
              Forgot your passwords?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-1.5 tracking-wider bg-indigo-600 shadow-lg shadow-indigo-600/50 text-sm uppercase text-center rounded-md font-semibold text-indigo-50 transition-all hover:bg-indigo-700 active:bg-indigo-500 focus:border-indigo-300 focus:ring focus:ring-offset-0 focus:ring-indigo-200 focus:ring-opacity-50"
          >
            Sign Up
          </button>
        </form>

        {/* Social Login */}
        <div>
          {/* Divider */}
          <div className="relative flex items-center mb-4">
            <div className="grow border-t border-gray-400"></div>
            <span className="mx-3 shrink text-gray-400 text-sm sm:mx-4">
              Or continue with
            </span>
            <div className="grow border-t border-gray-400"></div>
          </div>

          {/* Social icons */}
          <div className="flex items-center flex-wrap gap-2">
            <button className=" bg-white w-full flex items-center justify-center border border-solid border-gray-300 rounded-md py-2 relative grow shrink basis-24">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-gray-500"
              >
                <path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z"></path>
              </svg>
              <span className="inline-block absolute inset-0 opacity-0 rounded-md shadow-xl transition hover:opacity-100"></span>
            </button>

            <button className=" bg-white w-full flex items-center justify-center border border-solid border-gray-300 rounded-md py-2 relative grow shrink basis-24 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-gray-500"
              >
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
              </svg>
              <span className="inline-block absolute inset-0 opacity-0 rounded-md shadow-xl  transition hover:opacity-100"></span>
            </button>
            <button className=" bg-white w-full flex items-center justify-center border border-solid border-gray-300 rounded-md py-2 relative grow shrink basis-24 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-gray-500"
              >
                <path d="M11.55 21H3v-8.55h8.55V21zM21 21h-8.55v-8.55H21V21zm-9.45-9.45H3V3h8.55v8.55zm9.45 0h-8.55V3H21v8.55z"></path>
              </svg>
              <span className="inline-block absolute inset-0 opacity-0 rounded-md shadow-xl transition hover:opacity-100"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
