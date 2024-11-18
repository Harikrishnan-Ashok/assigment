import { useContext, useState, useEffect } from "react";
import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import { ViewContext } from "../../context/ViewContext";
import users from "../../data/users.json";

import scheduleData from "../../data/data.json";
import "./style.css";

const BasicTimeline = () => {
  const { move, moveCount, view } = useContext(ViewContext);
  const [timeStart, setTimeStart] = useState(moment("2022-10-01"));

  // View configuration
  const viewOrder = (() => {
    switch (view) {
      case 0:
        return { interval: 1, type: "day" };
      case 1:
        return { interval: 2, type: "day" };
      case 2:
        return { interval: 1, type: "week" };
      case 3:
        return { interval: 2, type: "week" };
      case 4:
        return { interval: 4, type: "week" };
      default:
        return { interval: 1, type: "day" };
    }
  })();

  // Handle timeline navigation
  useEffect(() => {
    if (move === 0) {
      setTimeStart(moment("2022-10-01"));
    } else if (move === -1) {
      setTimeStart((current) =>
        current.clone().subtract(viewOrder.interval, viewOrder.type)
      );
    } else if (move === 1) {
      setTimeStart((current) =>
        current.clone().add(viewOrder.interval, viewOrder.type)
      );
    }
  }, [moveCount, viewOrder.interval, viewOrder.type, move]);

  // Generate timeline end time
  const timeEnd = timeStart.clone().add(viewOrder.interval, viewOrder.type);

  // Create groups (rows) for each layer
  const groups = [
    { id: 1, title: "Layer 1" },
    { id: 2, title: "Layer 2" },
    { id: 3, title: "Override Layer" },
    { id: 4, title: "Final Schedule" },
  ];

  // Function to get user name from ID
  const getUserName = (userId) => {
    const user = users.users.find((u) => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  // Function to convert schedule entries to timeline items
  const createTimelineItems = (scheduleEntries, groupId) => {
    return scheduleEntries.map((entry, index) => ({
      id: `${groupId}-${index}`,
      group: groupId,
      title: getUserName(entry.userId),
      start_time: moment(entry.startDate).valueOf(),
      end_time: moment(entry.endDate).valueOf(),
      className: `item-${entry.userId}`,
      itemProps: {
        style: {
          background: `hsl(${entry.userId * 60}, 70%, 50%)`,
          color: "white",
          borderRadius: "4px",
          padding: "2px 4px",
        },
      },
    }));
  };

  // Generate all timeline items
  const items = [
    ...createTimelineItems(scheduleData.layers[0].layers, 1),
    ...createTimelineItems(scheduleData.layers[1].layers, 2),
    ...createTimelineItems(scheduleData.overrideLayer, 3),
    ...createTimelineItems(scheduleData.finalSchedule, 4),
  ];
  console.log(timeStart);

  return (
    <div className="h-screen w-full p-4">
      <h2 className="heading">
        {timeStart.format("YYYY-MMM-DD")} - {timeEnd.format("YYYY-MMM-DD")}
      </h2>
      <Timeline
        groups={groups}
        items={items}
        visibleTimeStart={timeStart.valueOf()}
        visibleTimeEnd={timeEnd.valueOf()}
        canMove={false}
        canResize={false}
        stackItems
        itemHeightRatio={0.75}
        lineHeight={40}
        sidebarWidth={150}
        groupRenderer={({ group }) => (
          <div className="font-medium text-gray-700">{group.title}</div>
        )}
        timeSteps={{
          day: 1,
          hour: 1,
          minute: 30,
        }}
        headerLabelFormats={{
          dayLong: "D MMM",
          dayShort: "D MMM",
        }}
        subHeaderLabelFormats={{
          hourLong: "HH:mm",
          hourShort: "HH:mm",
        }}
      />
    </div>
  );
};

export default BasicTimeline;
