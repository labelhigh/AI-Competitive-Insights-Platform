import React, { useState, useMemo } from 'react';
import type { Task } from '../../types';

const SortIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path d="M10 3a.75.75 0 01.75.75v10.5a.75.75 0 01-1.5 0V3.75A.75.75 0 0110 3z" />
        <path d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3z" />
    </svg>
);

const TrashIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.58.22-2.365.468a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193v-.443A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.966-.784-1.75-1.75-1.75h-1.5c-.966 0-1.75.784-1.75 1.75v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
  </svg>
);


const getTodayString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
};

const DashboardActionItems: React.FC = () => {
    const [tasks, setTasks] = useState<Task[]>([
        { id: 1, text: '根據 SEO 分析報告，撰寫 3 篇關於「AI 數據分析」的部落格文章', dueDate: '2024-08-15', completed: false },
        { id: 2, text: '研究 Innovate Inc. 的定價策略並提出我們的應對方案', dueDate: '2024-08-01', completed: true },
        { id: 3, text: '在 LinkedIn 上發佈一篇關於我們獨特功能的貼文', dueDate: '2024-07-30', completed: false },
    ]);
    const [newTaskText, setNewTaskText] = useState('');
    const [newDueDate, setNewDueDate] = useState(getTodayString());
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskText.trim() || !newDueDate) return;
        const newTask: Task = {
            id: Date.now(),
            text: newTaskText,
            dueDate: newDueDate,
            completed: false,
        };
        setTasks(prevTasks => [...prevTasks, newTask]);
        setNewTaskText('');
        setNewDueDate(getTodayString());
    };

    const handleDeleteTask = (id: number) => {
        setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
    };

    const handleToggleComplete = (id: number) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === id ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const toggleSortOrder = () => {
        setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    };

    const sortedTasks = useMemo(() => {
        return [...tasks].sort((a, b) => {
            if (sortOrder === 'asc') {
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
            } else {
                return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
            }
        });
    }, [tasks, sortOrder]);
    
    const today = getTodayString();

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-text-primary">行動清單</h2>
            
            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <h3 className="text-xl font-semibold text-text-primary mb-4">新增待辦事項</h3>
                <form onSubmit={handleAddTask} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-grow w-full">
                        <label htmlFor="task-text" className="block text-sm font-medium text-text-secondary mb-1">任務描述</label>
                        <input
                            id="task-text"
                            type="text"
                            value={newTaskText}
                            onChange={(e) => setNewTaskText(e.target.value)}
                            placeholder="例如：優化我們的 SEO 關鍵字策略..."
                            className="w-full bg-white border border-border-color rounded-md px-3 py-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                            required
                        />
                    </div>
                    <div className="w-full md:w-auto">
                        <label htmlFor="due-date" className="block text-sm font-medium text-text-secondary mb-1">截止日期</label>
                        <input
                            id="due-date"
                            type="date"
                            value={newDueDate}
                            onChange={(e) => setNewDueDate(e.target.value)}
                            className="w-full bg-white border border-border-color rounded-md px-3 py-2 focus:ring-brand-primary focus:border-brand-primary outline-none"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full md:w-auto bg-brand-primary hover:bg-blue-500 text-white font-bold py-2 px-6 rounded-md transition-colors duration-200">
                        新增任務
                    </button>
                </form>
            </div>
            
            <div className="p-6 bg-card rounded-xl border border-border-color shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-text-primary">任務列表</h3>
                    <button onClick={toggleSortOrder} className="flex items-center gap-2 text-sm font-medium text-brand-primary hover:text-blue-600">
                        <SortIcon className={`w-5 h-5 transition-transform ${sortOrder === 'desc' ? 'rotate-180' : ''}`} />
                        依截止日期排序 ({sortOrder === 'asc' ? '最早' : '最晚'})
                    </button>
                </div>
                <ul className="space-y-3">
                    {sortedTasks.map(task => {
                        const isOverdue = !task.completed && task.dueDate < today;
                        return (
                            <li key={task.id} className={`flex items-start gap-4 p-4 rounded-lg transition-colors ${task.completed ? 'bg-gray-100 opacity-60' : 'bg-background'}`}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleToggleComplete(task.id)}
                                    className="mt-1 h-5 w-5 rounded text-brand-primary focus:ring-brand-primary border-gray-300 cursor-pointer"
                                />
                                <div className="flex-grow">
                                    <p className={`text-text-primary ${task.completed ? 'line-through' : ''}`}>{task.text}</p>
                                    <p className={`text-sm mt-1 ${isOverdue ? 'text-red-500 font-semibold' : 'text-text-secondary'}`}>
                                        截止日期：{task.dueDate} {isOverdue && '(已逾期)'}
                                    </p>
                                </div>
                                <button onClick={() => handleDeleteTask(task.id)} aria-label={`刪除任務 "${task.text}"`} className="text-gray-400 hover:text-red-500 transition-colors">
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </li>
                        );
                    })}
                </ul>
                {tasks.length === 0 && (
                    <p className="text-center text-text-secondary py-8">目前沒有待辦事項。從上面的表單開始新增吧！</p>
                )}
            </div>
        </div>
    );
};

export default DashboardActionItems;