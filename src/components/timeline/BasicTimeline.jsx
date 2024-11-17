import Timeline from "react-calendar-timeline";
import "react-calendar-timeline/lib/Timeline.css";
import moment from "moment";
import "./style.css";
import { useContext, useState, useEffect } from "react";
import { ViewContext } from "../../context/ViewContext";

const BasicTimeline = () => {
  const { move, moveCount, view } = useContext(ViewContext);
  const [timeStart, setTimeStart] = useState(moment());

  let viewOrder = {};
  switch (view) {
    case 0:
      viewOrder = { interval: 1, type: "day" };
      break;
    case 1:
      viewOrder = { interval: 2, type: "day" };
      break;
    case 2:
      viewOrder = { interval: 1, type: "week" };
      break;
    case 3:
      viewOrder = { interval: 2, type: "week" };
      break;
    case 4:
      viewOrder = { interval: 4, type: "week" };
      break;
    default:
      viewOrder = { interval: 1, type: "day" };
  }

  useEffect(() => {
    if (move === 0) {
      setTimeStart(moment());
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

  const timeEnd = timeStart.clone().add(viewOrder.interval, viewOrder.type);
  const groups = [];
  const items = [];

  return (
    <div className="h-screen w-full p-4">
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
        groupRenderer={({ group }) => <div>{group.title}</div>}
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
