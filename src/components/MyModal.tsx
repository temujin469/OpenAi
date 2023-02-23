import React from 'react';
import { Modal } from 'antd';
import { downloadImage } from '../utils';
import { download } from '../assets';
import { FacebookShareButton, FacebookIcon } from 'react-share';
import { HiOutlineEye } from "react-icons/hi"


type Props = {
  prompt: string
  user: any
  photo: string
  open: boolean
  setOpen: any
  viewCount: number
  _id: string
}

const MyModal = ({ prompt, user, photo, open, setOpen, _id, viewCount }: Props) => {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      open={open}
      title={<div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full object-cover bg-green-700 flex justify-center items-center text-white text-xs font-bold">{user[0]}</div>
        <p className="text-gray-700 text-sm">{user}</p>
      </div>}
      onCancel={handleCancel}
      footer={[
        <div className='flex justify-between items-center mt-5'>
          <div className='flex items-center gap-2 border p-1 px-2 rounded-lg'>
            <p className='flex items-center gap-2'>
              Үзсэн тоо
              <HiOutlineEye color='balck' />
            </p>
            <p>{viewCount}</p>
          </div>
          <FacebookShareButton url={photo} className="rounded-full overflow-hidden" >
            <FacebookIcon size={40} />
          </FacebookShareButton>
        </div>,
      ]}
    >
      <div className='relative'>
        <img src={photo} className="mb-3" />
        <p></p>
        <button type="button" onClick={() => downloadImage(_id, photo)} className="outline-none absolute top-3 right-3 bg-transparent border-none">
          <img src={download} alt="download" className="w-6 h-6 object-contain invert" />
        </button>
      </div>
      <p>{prompt}</p>
    </Modal>
  );
};

export default MyModal;