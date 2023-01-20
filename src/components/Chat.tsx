import React, { useState, useRef, useEffect } from 'react';
import TypeText from './TypeText';
import Loader from './Loader';
import Header from './Header';
import { BsFillPersonFill } from 'react-icons/bs'
import { FaRobot } from "react-icons/fa"
import baseUrl from '../utils/axios';
import { useAppContext } from '../contexts/appContext';
import useAutosizeTextArea from '../hooks/autoSizeTextArea';


// import
type Chat = {
  data: string,
  isAi: boolean
  error?: boolean
}

function Chat() {
  const [input, setInput] = useState<string>('');
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const { model } = useAppContext()
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, input);

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chats])

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const newChats = [...chats, { data: input, isAi: false }];
    setChats(newChats)
    setInput('')
    setLoading(true);
    setError(false)
    try {
      const prompt = newChats.map(chat => chat.data).join("\n")
      console.log(prompt)
      const { data: response } = await baseUrl.post('/', { prompt: `${prompt}`, model });
      const aiResponse = response.data.trim()

      // const { data: translateResponse } = await axios.post("https://microsoft-translator-text.p.rapidapi.com/translate", [{ text: aiResponse }], {
      //   params: {
      //     'to[0]': 'mn-Cyrl',
      //     'api-version': '3.0',
      //     from: 'en',
      //     profanityAction: 'NoAction',
      //     textType: 'plain'
      //   },
      //   headers: {
      //     'content-type': 'application/json',
      //     'X-RapidAPI-Key': '3a5af5ade6msh21d1287f5361383p1a5c8ejsncdab9f8b5df8',
      //     'X-RapidAPI-Host': 'microsoft-translator-text.p.rapidapi.com'
      //   }
      // })

      // setChats(prev => [...prev, { data: translateResponse[0].translations[0].text, isAi: true }])
      setChats([...newChats, { data: aiResponse, isAi: true }])
      setLoading(false)

    }
    catch (err) {
      setLoading(false)
      setError(true)
      // setChats(prev => [...prev, { data: "Уучлаарай алдаа гарлаа", isAi: true, error: true }])
    }

  }


  return (
    <div className='overflow-hidden'>
      <Header title='Бот' />
      <div className="flex flex-col h-[calc(100vh-50px)] bg-gray-700">
        <div className="flex-1 overflow-x-hidden overflow-y-scroll" >
          {

            chats.length ? chats.map((chat, index) => (
              <div className={`flex gap-3 min-h-[60px] p-4 ${chat.isAi ? " bg-gray-700" : "bg-gray-800"} `} key={index}>
                <div>
                  {chat.isAi ? <FaRobot color='#ccc' size={20} /> : <BsFillPersonFill color='#ccc' size={20} />}
                </div>
                <div key={index} ref={chatRef} >
                  <TypeText text={chat.data} isAi={chat.isAi} error={chat.error} />
                </div>
              </div>
            )) : (
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

        <form onSubmit={handleSubmit} className="bg-gray-900 p-3 flex w-full">
          <textarea
            ref={textAreaRef}
            className="rounded-l-md text-gray-200 outline-none bg-gray-700 p-2 w-full"
            placeholder="Та юу бодож байна..."
            value={input}
            rows={1}
            onChange={e => setInput(e.target.value)}
          />
          <button disabled={!input} type="submit" className="bg-green-600 h-fit rounded-r-md disabled:bg-gray-800 disabled:text-gray-600 text-white p-2" >Илгээх</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
