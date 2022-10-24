export interface GridOptions {
  key: string;
  actions: Array<GridAction>;
}

interface GridActionGeneric {
  id: string;
  title: string;
  handler: string;
}

type GridAction = ActionOpenApplication | ActionOpenPath | ActionOpenApplicationPortal | ActionTrigger

interface ActionOpenApplication extends GridActionGeneric {
  type: "openApplication";
  params: {
    path: string;
    width: number;
    updateOnCloseSlider: boolean;
    params: any;
  }
}

interface ActionOpenPath extends GridActionGeneric {
  type: "openPath";
  params: {
    updateOnCloseSlider: boolean;
  }
}

interface ActionOpenApplicationPortal extends GridActionGeneric {
  type: "openApplicationPortal";
  params: {
    updateOnCloseSlider: boolean;
  }
}

interface ActionTrigger extends GridActionGeneric {
  type: "trigger";
  params: {
    updateOnCloseSlider: boolean;
    popup: any;
    output: any;
    [key: string]: any;
  }
}
