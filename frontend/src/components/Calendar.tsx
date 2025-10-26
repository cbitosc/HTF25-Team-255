'use client';

export default function Calendar() {
  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentMonth = 'October 2024';
  
  // Generate calendar days (simple implementation)
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - 2; // Start from Sept 30
    if (day < 1 || day > 31) return { day: day < 1 ? 30 + day : day - 31, isCurrentMonth: false };
    return { day, isCurrentMonth: true };
  });

  // Sample events
  const events = [
    { day: 3, color: 'bg-blue-500', title: 'Team Meeting' },
    { day: 5, color: 'bg-green-500', title: 'Project Demo' },
    { day: 10, color: 'bg-purple-500', title: 'Client Call' },
    { day: 15, color: 'bg-red-500', title: 'Deadline' },
    { day: 18, color: 'bg-yellow-500', title: 'Review' },
    { day: 22, color: 'bg-pink-500', title: 'Planning' },
    { day: 26, color: 'bg-indigo-500', title: 'Today' },
  ];

  const getEventForDay = (day: number) => events.find(e => e.day === day);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">{currentMonth}</h2>
        <div className="flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-gray-600">←</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-gray-600">→</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-center text-xs font-semibold text-gray-500 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((item, index) => {
          const event = item.isCurrentMonth ? getEventForDay(item.day) : null;
          const isToday = item.day === 26 && item.isCurrentMonth;
          
          return (
            <div
              key={index}
              className={`aspect-square p-2 rounded-lg text-center text-sm transition-colors ${
                !item.isCurrentMonth
                  ? 'text-gray-300'
                  : isToday
                  ? 'bg-blue-600 text-white font-bold'
                  : event
                  ? `${event.color} text-white font-semibold cursor-pointer hover:opacity-90`
                  : 'text-gray-700 hover:bg-gray-50 cursor-pointer'
              }`}
            >
              {item.day}
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t">
        <p className="text-xs font-semibold text-gray-500 uppercase mb-3">Upcoming Events</p>
        <div className="space-y-2">
          {events.slice(0, 3).map((event, index) => (
            <div key={index} className="flex items-center gap-3 text-sm">
              <div className={`w-3 h-3 ${event.color} rounded-full`}></div>
              <span className="text-gray-700">{event.title}</span>
              <span className="text-gray-400 ml-auto">Oct {event.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
