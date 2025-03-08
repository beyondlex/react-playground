import { Transition } from '@headlessui/react';

function Loading({ isVisible}:{isVisible:boolean}) {
  return (
    <Transition
      show={isVisible}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center full-h">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent" />
        <p className="mt-4 text-white">加载中...</p>
      </div>
    </Transition>
  );
}

const Spinner = () => {
  return <>
    <div>
      Text is here
      Text is here
      Text is here
      Text is here
      Text is here
    </div>
    <div className='border-1 bd-gray-200 relative'>
      some text
      <Loading isVisible={true}/>
    </div>
  </>
}
export default Spinner;
