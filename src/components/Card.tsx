import React, { useState } from 'react';

import { download } from '../assets';
import { baseUrl, downloadImage } from '../utils';
import MyModal from './MyModal';

const Card = ({ _id, name, prompt, photo }: any) => {
  const [open, setOpen] = useState(false);
  const [viewCount, setViewCount] = useState<number>(0)

  const handleOpen = async () => {
    setOpen(true);
    const { data } = await baseUrl.put(`/posts/view/${_id}`);
    setViewCount(data.data);
  }


  return (
    <div className="rounded-xl group relative shadow-card hover:shadow-cardhover card">
      <MyModal open={open} setOpen={setOpen} prompt={prompt} photo={photo} user={name} _id={_id} viewCount={viewCount} />

      <img src={photo} alt={prompt} className="w-full h-full object-cover rounded-xl" onClick={handleOpen} />
      <div className="group-hover:flex flex-col hidden absolute bottom-0 left-0 right-0 backdrop-blur-lg bg-black/10 rounded-md" >
        <div className=" p-2 flex justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{name[0]}</div>
            <p className="text-white text-sm">{name}</p>
          </div>
          <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none bg-transparent border-none">
            <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
          </button>
        </div>
      </div>
    </div>
  )
};

export default Card;