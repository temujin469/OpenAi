import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { preview } from '../assets';
import { baseUrl, getRandomPrompt } from '../utils';
import { FormField, Loader } from '../components';
import Loading from '../components/Loading';

const CreatePost = (): any => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: '',
  });

  const [generatingImg, setGeneratingImg] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt);
    setForm({ ...form, prompt: randomPrompt });
  };

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true);

        const { data: response } = await baseUrl.post("/dalle", { prompt: form.prompt });

        setForm({ ...form, photo: `data:image/jpeg;base64,${response.photo}` });
      } catch (err) {
        console.log(err);
        // alert(err);
      } finally {
        setGeneratingImg(false);
      }
    } else {
      alert('Please provide proper prompt');
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (form.prompt && form.photo) {
      setLoading(true);
      try {
        const { data: response } = await baseUrl.post("/posts", { ...form })

        alert('Success');
        navigate('/');
      } catch (err) {
        alert(err);
      } finally {
        setLoading(false);
      }
    } else {
      alert('Please generate an image with proper details');
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div>
        <h1 className="font-bold text-[#222328] text-2xl md:text-[32px]">Зураг үүсгэх</h1>
        <p className="mt-2 text-[#666e75] text-[14px] max-w-[500px]">
          DALL-E AI-аар дамжуулан уран сэтгэмжтэй дүрсийг бүтээж, олон нийтэд хуваалцаарай
        </p>
      </div>

      <form className="mt-16 max-w-3xl" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">
          <FormField
            labelName="Таны нэр"
            type="text"
            name="name"
            placeholder="нэр"
            value={form.name}
            handleChange={handleChange}
          />

          <FormField
            labelName="Prompt"
            type="text"
            name="prompt"
            placeholder="Нил ягаан өнгийн вааранд хийсэн наранцэцгийн импрессионист тосон зураг…"
            value={form.prompt}
            handleChange={handleChange}
            isSurpriseMe
            handleSurpriseMe={handleSurpriseMe}
          />

          <div className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-[270px] p-3 h-64 flex justify-center items-center">
            {form.photo ? (
              <img
                src={form.photo}
                alt={form.prompt}
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src={preview}
                alt="preview"
                className="w-9/12 h-9/12 object-contain opacity-40"
              />
            )}

            {generatingImg && (
              <div className="absolute inset-0 z-0 flex justify-center items-center bg-[rgba(0,0,0,0.5)] rounded-lg">
                <Loading />
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-5">
          <button
            type="button"
            onClick={generateImage}
            className=" text-white bg-secondary font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {generatingImg ? 'Үүсгэж байна...' : 'Үүсгэх'}
          </button>
        </div>

        <div className="mt-10">
          <p className="mt-2 text-[#666e75] text-[14px]">
            ** Хүссэн зургаа бүтээсний дараа түүнийгээ бусадтай хуваалцаж болно **
          </p>
          <button
            type="submit"
            className="mt-3 text-white bg-primary font-medium rounded-md text-sm w-full sm:w-auto px-5 py-2.5 text-center"
          >
            {loading ? 'Нийтэлж байна...' : 'Нийгэмлэгтэй хуваалцах'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreatePost;