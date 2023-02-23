import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { Spin } from "antd";

function Login() {
  const [loading, setLoading] = useState(false)
  const { currentUser } = useAuthContext()

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Имэйлэ зөв оруулана уу")
      .required("Имэйлэ оруулана уу"),
    password: yup.string().required("Нууц үгээ оруулана уу").min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const handleLogin = async ({ email, password }: any) => {
    // await login({ email, password });
  };

  // const navigate = useNavigate();
  // useEffect(() => {
  //   const checkUser = () => {
  //     currentUser && navigate("/");
  //   };
  //   checkUser();
  // }, [currentUser]);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center md:items-center">
      <div className="w-full max-w-[600px] p-4">
        <div className="flex justify-center mb-10">
          <div className="flex gap-2 items-center">
            <img src="/maskableIcon.png" className="w-20 h-20 rounded-full" />
            <p className="text-slate-700 text-2xl font-semibold ">
              Chatly
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="relative w-full mb-3 h-[100px]">
            <label
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Имэйл
            </label>
            <input
              type="email"
              className={`block w-full bg-white shadow-lg outline-none rounded-full py-[13px] px-4 text-textClr/90 placeholder-gray`}
              {...register("email")}
              placeholder="Имэйл"
            />
            {errors.email && (
              <p className="text-red-400 left-5 absolute bottom-0 text-sm">
                {errors.email.message as string}
              </p>
            )}
          </div>

          <div className="relative h-[100px] w-full mb-3">
            <label
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Нууц үг
            </label>
            <input
              type="password"
              className={`block w-full bg-white shadow-lg outline-none rounded-full py-[13px] px-4 text-textClr/90 placeholder-gray`}

              {...register("password")}
              placeholder="Нууц үг"
            />
            {errors.password && (
              <p className="text-red-400 left-5 absolute bottom-0 text-sm">
                {errors.password.message as string}
              </p>
            )}
          </div>
          <div className="text-center">
            <Spin spinning={loading}>
              <button
                className="bg-mainBg h-[50px] shadow-lg text-white active:bg-gray-700 text-sm font-bold uppercase px-6 rounded-full hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 w-full"
                type="submit"
              >
                {!loading ? "Нэвтрэх" : null}
              </button>
            </Spin>
          </div>
        </form>
        <div className="flex justify-end">
          <Link
            to={"/register"}
            className="text-slate-500 py-3 hover:underline"
          >
            Бүртгүүлэх
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
