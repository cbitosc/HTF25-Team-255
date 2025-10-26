'use client';

export default function MeetingsPanel() {
  const meetings = [
    {
      id: 1,
      title: 'Daily Standup',
      time: '9:00 AM - 9:30 AM',
      date: 'Today',
      attendees: [
        { name: 'John Doe', initials: 'JD' },
        { name: 'Jane Smith', initials: 'JS' },
        { name: 'Mike Johnson', initials: 'MJ' },
        { name: 'Sarah Wilson', initials: 'SW' },
      ],
      type: 'recurring',
      color: 'blue',
    },
    {
      id: 2,
      title: 'Sprint Planning',
      time: '2:00 PM - 3:30 PM',
      date: 'Oct 28',
      attendees: [
        { name: 'Team Lead', initials: 'TL' },
        { name: 'Product Manager', initials: 'PM' },
        { name: 'Designer', initials: 'DS' },
        { name: 'Developer 1', initials: 'D1' },
        { name: 'Developer 2', initials: 'D2' },
        { name: 'QA Engineer', initials: 'QA' },
      ],
      type: 'planning',
      color: 'purple',
    },
    {
      id: 3,
      title: 'Client Demo',
      time: '11:00 AM - 12:00 PM',
      date: 'Oct 29',
      attendees: [
        { name: 'Client A', initials: 'CA' },
        { name: 'Client B', initials: 'CB' },
        { name: 'Sales Rep', initials: 'SR' },
        { name: 'Project Manager', initials: 'PM' },
        { name: 'Lead Dev', initials: 'LD' },
      ],
      type: 'demo',
      color: 'green',
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      case 'purple':
        return 'bg-purple-50 border-purple-200 text-purple-700';
      case 'green':
        return 'bg-green-50 border-green-200 text-green-700';
      default:
        return 'bg-gray-50 border-gray-200 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-900">Upcoming Meetings</h2>
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {meetings.map((meeting) => (
          <div
            key={meeting.id}
            className={`border rounded-xl p-4 ${getColorClasses(meeting.color)}`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">{meeting.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <span>📅 {meeting.date}</span>
                  <span>•</span>
                  <span>🕐 {meeting.time}</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <span className="text-lg">⋯</span>
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {meeting.attendees.slice(0, 4).map((attendee, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-purple-400 border-2 border-white flex items-center justify-center"
                    title={attendee.name}
                  >
                    <span className="text-xs font-semibold text-white">
                      {attendee.initials}
                    </span>
                  </div>
                ))}
                {meeting.attendees.length > 4 && (
                  <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-semibold text-gray-600">
                      +{meeting.attendees.length - 4}
                    </span>
                  </div>
                )}
              </div>
              <button className="px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200">
        + Schedule New Meeting
      </button>
    </div>
  );
}
