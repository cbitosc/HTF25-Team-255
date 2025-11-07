'use client';

export default function TaskBoard() {
  const tasks = [
    {
      id: 1,
      title: 'Design homepage mockup',
      status: 'In Progress',
      priority: 'High',
      assignee: { name: 'John Doe', initials: 'JD' },
      dueDate: '2025-10-28',
      tags: ['Design', 'UI/UX'],
    },
    {
      id: 2,
      title: 'Setup backend API endpoints',
      status: 'Completed',
      priority: 'High',
      assignee: { name: 'Jane Smith', initials: 'JS' },
      dueDate: '2025-10-25',
      tags: ['Backend', 'API'],
    },
    {
      id: 3,
      title: 'Write technical documentation',
      status: 'To Do',
      priority: 'Medium',
      assignee: { name: 'Mike Johnson', initials: 'MJ' },
      dueDate: '2025-10-30',
      tags: ['Documentation'],
    },
    {
      id: 4,
      title: 'Code review and testing',
      status: 'In Progress',
      priority: 'High',
      assignee: { name: 'Sarah Wilson', initials: 'SW' },
      dueDate: '2025-10-27',
      tags: ['Testing', 'QA'],
    },
    {
      id: 5,
      title: 'Database optimization',
      status: 'To Do',
      priority: 'Low',
      assignee: { name: 'Tom Kim', initials: 'TK' },
      dueDate: '2025-11-02',
      tags: ['Database', 'Performance'],
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-700';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700';
      case 'Low':
        return 'bg-green-100 text-green-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'To Do':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Task Board</h2>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            Filter
          </button>
          <button className="px-4 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
            + New Task
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                Task
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                Status
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                Priority
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                Assignee
              </th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">
                Due Date
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr
                key={task.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-gray-900 text-sm mb-1">{task.title}</p>
                    <div className="flex gap-1">
                      {task.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      task.status
                    )}`}
                  >
                    {task.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                      task.priority
                    )}`}
                  >
                    {task.priority}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                      <span className="text-xs font-semibold text-white">
                        {task.assignee.initials}
                      </span>
                    </div>
                    <span className="text-sm text-gray-700">{task.assignee.name}</span>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">{task.dueDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
