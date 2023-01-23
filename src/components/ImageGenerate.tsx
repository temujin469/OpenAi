import { Affix, Image, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';
import { BiSend } from "react-icons/bi"
import useAutosizeTextArea from '../hooks/autoSizeTextArea';
import baseUrl from '../utils/axios';
import Header from './Header';
import Loader from './Loader';
import TypeText from './TypeText';

type Chat = {
  data: any
  isAi: boolean
  error?: boolean
}

function ImageGenerate() {
  const [chats, setChats] = useState<Chat[]>([])
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false)

  const [error, setError] = useState<boolean>(false)

  const chatRef = useRef<HTMLDivElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, input);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chats])


  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const prompt = input;
    setChats([...chats, { data: input, isAi: false }])
    setInput('')
    setLoading(true);
    setError(false)
    try {
      const { data: response } = await baseUrl.post('/genImage', { prompt: `${prompt}` });
      const aiGeneratedImages = response.data.data;


      setChats([...chats, { data: aiGeneratedImages, isAi: true }])
      setLoading(false)

    }
    catch (err) {
      setLoading(false)
      setError(true)
    }
  }


  return (
    <div className='overflow-hidden h-screen'>
      <div className="flex flex-col bg-secondBg dark:bg-secondDarkBg h-full">
        <Affix offsetTop={0}>
          <Header title='Бот' />
        </Affix>

        <div className="pt-[50px] overflow-x-hidden overflow-y-scroll flex-[1]" >
          {
            chats.length ? (
              chats.map((chat, index) => (
                <div ref={chatRef} className={`flex  gap-3 min-h-[60px] p-4 ${chat.isAi && "flex-col"} `} key={index}>
                  <div>
                    {chat.isAi ? <FaRobot className='text-primary' size={20} /> : <BsFillPersonFill className='text-primary' size={20} />}
                  </div>
                  <div>
                    {
                      chat.isAi ? (
                        <Image.PreviewGroup>
                          <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                            {
                              chat.data?.map((image: any) => (
                                <Image src={image.url} className="w-full h-full"
                                  placeholder={
                                    <div className='w-full h-full grid place-items-center'>
                                      <Spin size="large" tip="Хайж байна" />
                                    </div>
                                  }
                                />
                              ))
                            }
                          </div>
                        </Image.PreviewGroup>
                      ) : (
                        <div >
                          <TypeText text={chat.data} isAi={false} />
                        </div>
                      )
                    }
                  </div>
                </div>
              ))
            ) : (

              <div className="flex flex-col items-center gap-3 min-h-[60px] p-4 justify-center">
                <FaRobot className='dark:text-gray-900/20 text-gray-900/10' size={270} />
                <p className='dark:text-gray-900/20 text-gray-900/10 font-bold'>Зураг үүсгэх</p>
              </div>
            )

          }
          {
            loading ? (
              <div className="flex gap-3 min-h-[60px] bg-thirdBg dark:bg-thirdDarkBg p-4">
                <FaRobot className='text-primary' size={20} />
                <Loader loading={loading} />
              </div>) : error && (<div className="flex gap-3 min-h-[60px] bg-thirdBg dark:bg-thirdDarkBg p-4">
                <p className='text-red-400'>Уучлаарай алдаа гарлаа</p>
              </div>)
          }
        </div>

        <form onSubmit={handleSubmit} className="bg-secondBg dark:bg-secondDarkBg p-3 flex w-full">
          <textarea
            className="rounded-l-[20px] resize-none outline-none text-mainText dark:text-mainDarkText bg-white dark:bg-mainDarkBg pl-3 py-2 w-full"
            placeholder="Та ямар зураг төсөөлж байна..."
            ref={textAreaRef}
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            disabled={!input}
            type="submit"
            className="flex items-end pr-3 rounded-r-[20px] disabled:text-gray-800/40 dark:disabled:text-secondDarkBg text-primary bg-white dark:bg-mainDarkBg p-2" >
            <BiSend size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ImageGenerate