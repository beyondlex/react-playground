import { Transition } from '@headlessui/react';
import { useState, useEffect } from 'react';

// 列表容器组件
function ListContainer({ isLoading, children }) {
  return (
    <div className="relative min-h-[300px] p-4 bg-gray-100 rounded-lg">
      <Transition
        show={isLoading}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {/* Spinner 覆盖层 */}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-90">
          <div
            className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            role="status"
            aria-live="polite"
            aria-label="内容加载中"
          />
        </div>
      </Transition>

      {/* 实际列表内容（始终渲染，通过透明度控制显示） */}
      <Transition
        show={!isLoading}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        {children}
      </Transition>
    </div>
  );
}

// 使用示例
function ListPage2() {
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      setListData([{ id: 1, text: 'Item 1' }, { id: 2, text: 'Item 2' }]);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <ListContainer isLoading={isLoading}>
      <ul className="space-y-2">
        {listData.map((item) => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    </ListContainer>
  );
}

export default ListPage2;
