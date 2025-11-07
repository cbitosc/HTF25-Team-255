'use client';

export default function ProjectsList() {
  const projects = [
    {
      id: 1,
      name: 'Website Redesign',
      description: 'Complete overhaul of company website',
      progress: 65,
      tasks: { total: 12, completed: 8 },
      members: ['JD', 'SM', 'MW'],
      status: 'On Track',
      color: 'blue',
      dueDate: 'Nov 15',
    },
    {
      id: 2,
      name: 'Mobile App Development',
      description: 'iOS and Android app for customer portal',
      progress: 40,
      tasks: { total: 15, completed: 6 },
      members: ['JS', 'TK', 'RB', 'AL'],
      status: 'In Progress',
      color: 'green',
      dueDate: 'Dec 1',
    },
    {
      id: 3,
      name: 'API Integration',
      description: 'Third-party service integration',
      progress: 80,
      tasks: { total: 8, completed: 7 },
      members: ['MJ', 'KL'],
      status: 'Almost Done',
      color: 'purple',
      dueDate: 'Oct 30',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Active Projects</h2>
        <button className="px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
          + New Project
        </button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
                <p className="text-sm text-gray-500">{project.description}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.color === 'blue'
                    ? 'bg-blue-100 text-blue-700'
                    : project.color === 'green'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-purple-100 text-purple-700'
                }`}
              >
                {project.status}
              </span>
            </div>

            <div className="mb-3">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                <span>Progress: {project.progress}%</span>
                <span>{project.tasks.completed}/{project.tasks.total} tasks</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-2 rounded-full transition-all ${
                    project.color === 'blue'
                      ? 'bg-blue-500'
                      : project.color === 'green'
                      ? 'bg-green-500'
                      : 'bg-purple-500'
                  }`}
                  style={{ width: `${project.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {project.members.map((member, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-xs font-semibold text-white">{member}</span>
                  </div>
                ))}
              </div>
              <div className="text-xs text-gray-500">
                📅 Due: {project.dueDate}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
