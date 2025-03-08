import { useState, useEffect, forwardRef, ReactNode } from 'react';
import { Transition } from '@headlessui/react';

// 定义接口
interface ListItem {
  id: number;
  name: string;
  value: number;
}

interface ListContainerProps {
  isLoading: boolean;
  children: ReactNode;
}

// 骨架屏组件
const SkeletonLoader = forwardRef<HTMLDivElement>((props, ref) => (
  <div 
    ref={ref} // 关键：将 ref 传递给实际 DOM 节点
    className="space-y-4 animate-pulse" 
    role="status" 
    aria-label="加载中"
  >
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="h-12 bg-gray-200 rounded-lg transition-opacity duration-200"
      />
    ))}
    <div className="mt-6 flex justify-between">
      <div className="h-4 bg-gray-200 rounded w-1/4" />
      <div className="h-4 bg-gray-200 rounded w-1/3" />
    </div>
  </div>
));


// 列表容器（集成过渡动画）
function ListContainer({ isLoading, children }: ListContainerProps) {
  return (
    <div className="relative min-h-[400px] bg-white rounded-lg border p-6">
      {/* 骨架屏淡出动画 */}
      <Transition
        show={isLoading}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
        as="div"  // 添加 as 属性指定元素类型
        className="absolute inset-0 p-6"
      >
        <SkeletonLoader />
      </Transition>

      {/* 实际内容淡入动画 */}
      <Transition
        show={!isLoading}
        enter="transition-opacity duration-300 delay-100" // 延迟100ms确保平滑衔接
        enterFrom="opacity-0"
        enterTo="opacity-100"
        as="div"  // 添加 as 属性指定元素类型
        className="absolute inset-0 p-6"
      >
        {/* 关键：用 div 包裹 children 以接收 ref */}
        {children}
      </Transition>
    </div>
  );
}

// 修复关键：使用 forwardRef 包裹 ListContainer
const ListContainerWithRef = forwardRef<HTMLDivElement, ListContainerProps>(({ isLoading, children }, ref) => (
  <ListContainer isLoading={isLoading}>
    <div ref={ref}>{children}</div>
  </ListContainer>
));

// 页面组件
export default function ListPage3() {
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState<ListItem[]>([]);

  // 模拟数据加载
  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setListData([
        { id: 1, name: '项目 1', value: 42 },
        { id: 2, name: '项目 2', value: 78 },
        // ...更多数据
      ]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">数据列表</h1>
      
      <ListContainerWithRef isLoading={isLoading}>
        <ul className="space-y-4">
          {listData.map(item => (
            <li
              key={item.id}
              className="p-4 bg-gray-50 rounded-lg shadow-sm transition-all hover:shadow-md"
            >
              <div className="flex justify-between items-center">
                <span className="font-medium">{item.name}</span>
                <span className="text-blue-600">{item.value}</span>
              </div>
            </li>
          ))}
        </ul>
        
        {/* 底部统计 */}
        <div className="mt-6 flex justify-between text-sm text-gray-600">
          <span>总项目数: {listData.length}</span>
          <span>最后更新: 刚刚</span>
        </div>
      </ListContainerWithRef>
    </div>
  );
}
