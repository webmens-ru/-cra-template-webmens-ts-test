import React from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';

export default function ResourceTimeLineWrapper() {
    const resources = [
        { id: 'a', title: 'Комната A' },
        { id: 'b', title: 'Комната B' },
        { id: 'c', title: 'Комната C' }
    ];

    const events = [
        {
            id: '1',
            resourceId: 'a',
            title: 'Совещание',
            start: '2025-04-05T10:00:00',
            end: '2025-04-05T12:00:00'
        },
        {
            id: '2',
            resourceId: 'b',
            title: 'Презентация',
            start: '2025-04-06T14:00:00',
            end: '2025-04-06T16:00:00'
        }
    ];

    return (
        <div>
            <FullCalendar
                plugins={[resourceTimelinePlugin]}
                initialView="resourceTimelineDay"
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'resourceTimelineDay,resourceTimelineWeek,resourceTimelineMonth'
                }}
                resources={resources}
                events={events}
                editable={true}
                selectable={true}
            />
        </div>
    );
}