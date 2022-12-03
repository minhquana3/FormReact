import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export default function Form() {
  const schema = yup.object().shape({
    fullName: yup.string().required("Your full name is required"),
    email: yup.string().email().required(),
    age: yup.number().positive().integer().min(18).max(100).required(),
    password: yup.string().min(4).max(20).required(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords Don't Match")
      .required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="formInput">
        <label htmlFor="fullname" className="block text-slate-600 mb-1">
          Full name
        </label>
        <input
          type="text"
          id="fullname"
          className="form-input border-slate-400 rounded-md text-sm"
          placeholder="Full name"
          {...register("fullName")}
        />
        <p className="text-red-500">{errors.fullName?.message}</p>
      </div>
      <div className="formInput">
        <label htmlFor="email" className="block text-slate-600 mb-1">
          Email
        </label>
        <input
          type="text"
          id="email"
          className="form-input border-slate-400 rounded-md text-sm"
          placeholder="abc@email.com"
          {...register("email")}
        />
        <p className="text-red-500">{errors.email?.message}</p>
      </div>
      <div className="formInput">
        <label htmlFor="age" className="block text-slate-600 mb-1">
          Age
        </label>
        <input
          type="number"
          id="age"
          className="form-input border-slate-400 rounded-md text-sm"
          placeholder="Your age"
          {...register("age")}
        />
        <p className="text-red-500">{errors.age?.message}</p>
      </div>
      <div className="formInput">
        <label htmlFor="password" className="block text-slate-600 mb-1">
          Password
        </label>
        <input
          type="password"
          id="password"
          className="form-input border-slate-400 rounded-md text-sm"
          placeholder="Your password"
          {...register("password")}
        />
        <p className="text-red-500">{errors.password?.message}</p>
      </div>
      <div className="formInput">
        <label htmlFor="retypepassword" className="block text-slate-600 mb-1">
          Re-confirm password
        </label>
        <input
          type="password"
          id="retypepassword"
          className="form-input border-slate-400 rounded-md text-sm"
          placeholder="Re-type your password"
          {...register("confirmPassword")}
        />
        <p className="text-red-500">{errors.confirmPassword?.message}</p>
      </div>
      <button
        type="submit"
        className="text-indigo-100 bg-indigo-600 inline-block"
      >
        Submit
      </button>
    </form>
  );
}
