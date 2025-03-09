import { useState, useEffect } from 'react';
import { TransitionList } from './components/TransitionList';

interface ListItem {
  id: number;
  name: string;
  value: number;
}

export default function ListPage4() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [listData, setListData] = useState<ListItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setIsLoading(true);
        
        // 模拟随机错误
        if (Math.random() > 0.7) {
          throw new Error('模拟加载失败');
        }

        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 模拟空数据
        const data = Math.random() > 0.3 ? [
          { id: 1, name: '项目 1', value: 42 },
          { id: 2, name: '项目 2', value: 78 },
        ] : [];
        
        setListData(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('未知错误'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <TransitionList
      data={listData}
      isLoading={isLoading}
      error={error}
      renderItem={(item) => (
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-center">
            <span className="font-medium">{item.name}</span>
            <span className="text-blue-600">{item.value}</span>
          </div>
        </div>
      )}
      renderEmpty={() => (
        <div className="text-center text-gray-500 py-8">
          <p>暂无数据</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700"
          >
            点击刷新
          </button>
        </div>
      )}
      renderError={(error) => (
        <div className="text-center text-red-500 py-8">
          <p>加载失败</p>
          <p className="text-sm mt-2">{error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 text-sm text-red-600 hover:text-red-700"
          >
            重试
          </button>
        </div>
      )}
      renderFooter={(data) => (
        <div className="flex justify-between text-sm text-gray-600">
          <span>总项目数: {data.length}</span>
          <span>最后更新: 刚刚</span>
        </div>
      )}
    />
  );
}
