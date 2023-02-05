import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Spin } from "antd";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage } from "../utils/firebase"
import { useAuthContext } from "../contexts/AuthContext";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function Register() {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null)
  console.log(file)
  const schema = yup.object().shape({
    username: yup.string().required("Нэрээ оруулана уу").max(30),
    email: yup
      .string()
      .email("Имэйлэ зөв оруулана уу")
      .required("Имэйлэ оруулана уу"),
    password: yup
      .string()
      .required("Нууц үгээ оруулана уу")
      .min(6)
      .when("oldPassword", (oldPassword, field) =>
        oldPassword ? field.required() : field
      ),
    confirmPassword: yup
      .string()
      .required("Нууц үгээ давтан оруулана уу")
      .oneOf([yup.ref("password"), null], "нууц үг таарахгүй байна"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { setCurrentUser } = useAuthContext()

  const navigate = useNavigate();

  const handleRegister = async ({ email, password, username }: any) => {
    setLoading(true);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password)
      const user: any = res.user;
      console.log(user)

      const storageRef = ref(storage, username);

      // const uploadTask = uploadBytesResumable(storageRef, file);

      // uploadTask.on('state_changed',
      //   (error) => {
      //     toast.error("Зураг алдаа гарлаа")
      //   },
      //   () => {

      //     getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
      //       await updateProfile(user, { displayName: username, photoURL: downloadURL })
      //     });
      //   }
      // );

      localStorage.setItem("user", JSON.stringify({ username: user.displayName, uid: user.uid, photoURL: user.photoURL, email: user.email, accessToken: user.accessToken }))
      setCurrentUser(
        { username: user.displayName, uid: user.uid, photoURL: user.photoURL, email: user.email, accessToken: user.accessToken }
      )

      setLoading(false)
      navigate("/")
      toast.success("Амжилттай бүртгэгдлээ")

    }
    catch (error: any) {
      setLoading(false)
      toast.error("Алдаа гарлаа")
      console.log(error.message)
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center md:items-center">
      <div className="w-full max-w-[600px] p-4">
        <div className="flex justify-center mb-5">
          <div className="flex gap-2 items-center">
            <img src="/maskableIcon.png" className="w-20 h-20 rounded-full" />
            <p className="text-slate-700 text-2xl font-semibold ">
              Chatly
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(handleRegister)}>
          <div className="relative w-full mb-3 h-[100px]">
            <label
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Нэр
            </label>
            <input
              className={`block w-full bg-white shadow-lg outline-none rounded-full py-[13px] px-4 text-textClr/90 placeholder-gray`}
              {...register("username")}
              placeholder="Нэр"
            />
            {errors.username && (
              <p className="text-red-400 left-5 absolute bottom-0 text-sm">
                {errors.username.message as string}
              </p>
            )}
          </div>
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

          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Нууц үг
            </label>
            <div className="">
              <div className="relative h-[80px] w-full mb-3">
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
              <div className="relative h-[80px] w-full mb-3">
                <input
                  type="password"
                  className={`block w-full rounded-full bg-white shadow-lg py-[13px] px-4 text-textClr/90 focus:bg-gray-light placeholder-gray`}
                  {...register("confirmPassword")}
                  placeholder="Нууц үг"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 left-5 absolute bottom-0 text-sm">
                    {errors.confirmPassword.message as string}
                  </p>
                )}
              </div>
            </div>
            <div className="rounded-full border-2 border-mainBg flex items-center justify-center border-dashed h-[50px] mb-5">
              <input required className="hidden" type="file" id="file" onChange={(e: any) => setFile(e.target.files[0])} />
              <label htmlFor="file">
                <img alt="" />
                <span>Нүүр зураг</span>
              </label>
            </div>

            {file && (
              <div className="mb-5">
                <img src={URL.createObjectURL(file as Blob)} />
              </div>
            )}
            <div className="text-center">
              <Spin spinning={loading}>
                <button
                  className="bg-mainBg h-[50px] shadow-lg text-white active:bg-gray-700 text-sm font-bold uppercase px-6 rounded-full hover:shadow-xl outline-none focus:outline-none mr-1 mb-1 w-full"
                  type="submit"
                >
                  {!loading ? "Бүртгүүлэх" : null}
                </button>
              </Spin>
            </div>
          </div>
        </form>
        <div className="flex justify-end">
          <Link to={"/login"} className="text-slate-500 hover:underline">
            Аль хэдийн бүртгүүлсэн
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
