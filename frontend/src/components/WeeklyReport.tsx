'use client';

export default function WeeklyReport() {
  const weekData = [
    { day: 'Mon', tasks: 8, hours: 6.5 },
    { day: 'Tue', tasks: 12, hours: 8 },
    { day: 'Wed', tasks: 10, hours: 7 },
    { day: 'Thu', tasks: 9, hours: 7.5 },
    { day: 'Fri', tasks: 11, hours: 8 },
    { day: 'Sat', tasks: 3, hours: 2 },
    { day: 'Sun', tasks: 2, hours: 1.5 },
  ];

  const maxTasks = Math.max(...weekData.map(d => d.tasks));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Weekly Activity</h2>
          <p className="text-sm text-gray-500">Tasks completed this week</p>
        </div>
        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700">
          <option>This Week</option>
          <option>Last Week</option>
          <option>This Month</option>
        </select>
      </div>

      <div className="flex items-end justify-between gap-3 h-40 mb-4">
        {weekData.map((day, idx) => {
          const height = (day.tasks / maxTasks) * 100;
          const isToday = idx === 4; // Friday

          return (
            <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
              <div className="relative w-full group">
                <div
                  className={`w-full rounded-t-lg transition-all cursor-pointer ${
                    isToday
                      ? 'bg-gradient-to-t from-blue-600 to-blue-400'
                      : 'bg-gradient-to-t from-gray-300 to-gray-200 hover:from-blue-400 hover:to-blue-300'
                  }`}
                  style={{ height: `${height}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
                      {day.tasks} tasks • {day.hours}h
                    </div>
                  </div>
                </div>
              </div>
              <span className={`text-xs font-medium ${isToday ? 'text-blue-600' : 'text-gray-600'}`}>
                {day.day}
              </span>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-3 gap-4 pt-4 border-t">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">55</p>
          <p className="text-xs text-gray-500">Total Tasks</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">40.5h</p>
          <p className="text-xs text-gray-500">Time Logged</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">91%</p>
          <p className="text-xs text-gray-500">Completion</p>
        </div>
      </div>
    </div>
  );
}
