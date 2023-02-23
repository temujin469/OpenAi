import React, { useState, useRef, useEffect, useContext } from 'react';
import TypeText from '../components/TypeText';
import Loader from '../components/Loader';
import BotHeader from '../components/BotHeader';
import { BsFillPersonFill } from 'react-icons/bs'
import { FaRobot } from "react-icons/fa"
import baseUrl from '../utils/axios';
import useAutosizeTextArea from '../hooks/autoSizeTextArea';
import { BiSend } from 'react-icons/bi';
import { Affix } from 'antd';
import { AppContext } from '../context/AppContext';


// import
type BotChat = {
  data: string,
  isAi: boolean
  error?: boolean
}

function BotChat() {
  const [input, setInput] = useState<string>('');
  const [chats, setChats] = useState<BotChat[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)
  const chatRef = useRef<HTMLDivElement>(null)
  const { model } = useContext(AppContext);
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
      const { data: response } = await baseUrl.post('/bot', { prompt: `${prompt}`, model });
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
      setChats([...newChats, { data: `${aiResponse}`, isAi: true }])
      setLoading(false)

    }
    catch (err) {
      setLoading(false)
      setError(true)
      // setChats(prev => [...prev, { data: "Уучлаарай алдаа гарлаа", isAi: true, error: true }])
    }

  }

  // h - [calc(100vh - 50px)]
  return (
    <div className='overflow-hidden h-screen'>
      <div className="flex flex-col bg-white dark:bg-secondDarkBg h-full">
        <Affix offsetTop={0}>
          <BotHeader />
        </Affix>
        <div className="overflow-x-hidden overflow-y-scroll flex-[1]" >
          {

            chats.length ? chats.map((chat, index) => (
              <div className={`flex gap-3 min-h-[60px] p-4 ${chat.isAi && " bg-thirdBg dark:bg-thirdDarkBg"} `} key={index}>
                <div>
                  {chat.isAi ? <FaRobot size={20} className="text-primary" /> : <BsFillPersonFill size={20} className="text-primary" />}
                </div>
                <div key={index} ref={chatRef} >
                  <TypeText text={chat.data} isAi={chat.isAi} error={chat.error} />
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center gap-3 min-h-[60px] p-4 justify-center">
                <FaRobot className='dark:text-gray-900/20 text-gray-900/10' size={270} />
                <p className='dark:text-gray-900/20 text-gray-900/10  font-bold'>ChatGPT Монгол хувилбар</p>
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

        <form onSubmit={handleSubmit} className="bg-mainBg relative dark:bg-mainDarkBg p-3 flex w-full" style={
          { boxShadow: "0px 0px 10px 5px #00000013" }
        }>

          <textarea
            className="rounded-l-[20px] resize-none outline-none text-mainText dark:text-mainDarkText bg-white dark:bg-secondDarkBg pl-3 py-2 w-full"
            placeholder="Та юу бодож байна..."
            ref={textAreaRef}
            rows={1}
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button
            disabled={!input}
            type="submit"
            className="flex items-end pr-3 rounded-r-[20px] disabled:text-gray-800/40 dark:disabled:text-mainDarkBg text-primary bg-white dark:bg-secondDarkBg p-2" >
            <BiSend size={24} />
          </button>
        </form>
      </div>
    </div>
  );
}

export default BotChat;
