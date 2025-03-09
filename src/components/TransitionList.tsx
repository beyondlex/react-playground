import { ReactNode } from 'react';
import { Transition } from '@headlessui/react';

interface TransitionListProps<T> {
  // 数据相关
  data: T[];
  isLoading: boolean;
  // 渲染相关
  renderItem: (item: T) => ReactNode;
  renderSkeleton?: () => ReactNode;
  renderFooter?: (data: T[]) => ReactNode;
  // 样式相关
  className?: string;
  containerClassName?: string;
  listClassName?: string;
  // 动画相关
  transitionDuration?: number;
  transitionDelay?: number;
  error?: Error | null;
  renderError?: (error: Error) => ReactNode;
  renderEmpty?: () => ReactNode;
}

// 默认骨架屏组件
const DefaultSkeleton = () => (
    <div className="space-y-4 animate-pulse">
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="h-12 bg-gray-200 rounded-lg"
        />
      ))}
    </div>
);

// 默认空状态组件
const DefaultEmpty = () => (
  <div className="text-center text-gray-500 py-8">
    暂无数据
  </div>
);

// 默认错误状态组件
const DefaultError = ({ error }: { error: Error }) => (
  <div className="text-center text-red-500 py-8">
    <p>加载失败</p>
    <p className="text-sm mt-2">{error.message}</p>
  </div>
);

export function TransitionList<T>({
  data,
  isLoading,
  error,
  renderItem,
  renderSkeleton = DefaultSkeleton,
  renderEmpty = DefaultEmpty,
  renderError = (error: Error) => <DefaultError error={error} />,
  renderFooter,
  className = "max-w-3xl mx-auto py-8",
  containerClassName = "relative min-h-[400px] min-w-[300px] bg-white rounded-lg border p-6",
  listClassName = "space-y-4",
  transitionDuration = 300,
  transitionDelay = 100,
}: TransitionListProps<T>) {
  // 处理错误状态
  if (error) {
    return (
      <div className={className}>
        <div className={containerClassName}>
          {renderError(error)}
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className={containerClassName}>
        {/* 骨架屏 */}
        <Transition
          show={isLoading}
          enter={`transition-opacity duration-${transitionDuration}`}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave={`transition-opacity duration-${transitionDuration}`}
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          as="div"
          className="absolute inset-0 p-6 w-full" // 添加 w-full
        >
          {renderSkeleton()}
        </Transition>

        {/* 实际内容 */}
        <Transition
          show={!isLoading}
          enter={`transition-opacity duration-${transitionDuration} delay-${transitionDelay}`}
          enterFrom="opacity-0"
          enterTo="opacity-100"
          as="div"
          className="absolute inset-0 p-6 w-full" // 添加 w-full
        >
          <div className="w-full"> {/* 添加包裹容器 */}
          {data.length > 0 ? (
              <>
                <ul className={listClassName}>
                  {data.map((item, index) => (
                    <li key={index}>{renderItem(item)}</li>
                  ))}
                </ul>
                
                {renderFooter && (
                  <div className="mt-6">
                    {renderFooter(data)}
                  </div>
                )}
              </>
            ) : (
              renderEmpty()
            )}
          </div>
        </Transition>
      </div>
    </div>
  );
}