
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { useState } from 'react'

function MyDialog() {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} 
        transition
        className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-[closed]:opacity-0"

      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/30 duration-300 ease-out data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 flex items-end justify-center">
          <DialogPanel
              transition
              className="max-w-lg w-full space-y-4 bg-white  pb-12 pt-4 duration-300 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
            >
            <div className="flex justify-between border-b-1 border-gray-100 pb-3 px-8">
              <span onClick={() => setIsOpen(false)} className='font-bold text-gray-400'>取消</span>
              <span className="font-bold text-rose-700">确定</span>
            </div>

            <div className="flex justify-center items-center py-6 px-8">
              xx
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )}

export default MyDialog
