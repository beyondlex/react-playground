import { useState, useEffect } from 'react';

function ListPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [listData, setListData] = useState([]);

  // 模拟数据加载
  useEffect(() => {
    setTimeout(() => {
      setListData([{ id: 1, text: 'Item 1' }, { id: 2, text: 'Item 2' }]);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="min-h-[300px] p-4 bg-gray-100 rounded-lg">
      {isLoading ? (
        // Spinner 占位容器（直接居中显示）
        <div className="flex items-center justify-center h-full">
          <div
            className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            role="status"
            aria-label="Loading"
          />
        </div>

      ) : (
        // 实际列表内容
        <ul className="space-y-2">
          {listData.map((item) => (
            <li key={item.id} className="p-2 bg-white rounded shadow">
              {item.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ListPage;
