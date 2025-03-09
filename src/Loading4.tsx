import { useState, useEffect } from 'react';
import { TransitionList } from './components/TransitionList';

interface ListItem {
  id: number;
  name: string;
  value: number;
}

export default function ListPage4() {
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState<ListItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setListData([
        { id: 1, name: '项目 1', value: 42 },
        { id: 2, name: '项目 2', value: 78 },
      ]);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <TransitionList
      data={listData}
      isLoading={isLoading}
      renderItem={(item) => (
        <div className="p-4 bg-gray-50 rounded-lg shadow-sm transition-all hover:shadow-md">
          <div className="flex justify-between items-center">
            <span className="font-medium">{item.name}</span>
            <span className="text-blue-600">{item.value}</span>
          </div>
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
