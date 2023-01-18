import React, { useState } from 'react'
import { BsFillPersonFill } from 'react-icons/bs';
import { FaRobot } from 'react-icons/fa';
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
    <div className='overflow-hidden'>
      <Header title='Зураг үүсгэх' />
      <div className="flex flex-col h-[calc(100vh-50px)] bg-gray-700">
        <div className="flex-1 overflow-x-hidden overflow-y-scroll" >
          {
            chats.length ? (
              chats.map((chat, index) => (
                <div className={`flex  gap-3 min-h-[60px] p-4 ${chat.isAi ? "flex-col bg-gray-700" : "bg-gray-800"} `} key={index}>
                  <div>
                    {chat.isAi ? <FaRobot color='#ccc' size={20} /> : <BsFillPersonFill color='#ccc' size={20} />}
                  </div>
                  <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
                    {
                      chat.isAi ? (
                        chat.data?.map((image: any) => (
                          <img src={image.url} className="w-auto object-contain" />
                        ))
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
              <div className="flex gap-3 min-h-[60px] p-4 bg-gray-700 justify-center">
                <FaRobot className='text-gray-600' size={270} />
              </div>
            )

          }
          {
            loading ? (
              <div className="flex gap-3 min-h-[60px] bg-gray-700 p-4">
                <FaRobot color='#ccc' size={20} />
                <Loader loading={loading} />
              </div>) : error && (<div className="flex gap-3 min-h-[60px] bg-gray-700 p-4">
                <p className='text-red-600'>Уучлаарай алдаа гарлаа</p>
              </div>)
          }
        </div>

        <form onSubmit={handleSubmit} className="bg-gray-900 p-3 flex gap-3">
          <textarea
            className="border text-gray-200 outline-none bg-gray-700 p-2 w-full"
            placeholder="Та ямар зураг төсөөлж байна..."
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button disabled={!input} type="submit" className="bg-green-600 disabled:bg-gray-800 disabled:text-gray-600 text-white p-2" >Зуруулах</button>
        </form>
      </div>
    </div>
  );
}

export default ImageGenerate