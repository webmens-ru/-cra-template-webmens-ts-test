/// <reference types="react-scripts" />

declare global {

  type TPlacementOptions = {
    handler?: string;
    type: string; //TODO: Конкретные значения
    title: string;
    params?: any;
    // action: string;
    entity: string;
    path?: string;
    menuId?: number;
    [index: string]: any
  };

  interface Window {
    _ACCESS_TOKEN_: string;
    _PARAMS_: {
      placement: string;
      placementOptions: TPlacementOptions;
    };
    _APP_URL_: string;
    _HOSTNAME_: string;
  }

  // declare const BX24: any;
}

export default global;