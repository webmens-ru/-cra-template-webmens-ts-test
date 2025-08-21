import type { DayCellContentArg } from "@fullcalendar/core";

export default function CellContent(props: DayCellContentArg) {
  console.log(props)
  return (
    <div>
      test
    </div>
  )
}