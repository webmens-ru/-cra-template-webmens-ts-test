import useSlider from "../../components/slider/hooks/useSlider";

interface NavigateProps {
  type: "openApplication" | "openApplicationPortal" | "openPath" | "openLink" | string;
  url?: string;
  params?: any;
  width?: string;
  onCloseSlider?: VoidFunction;
}

export default function useNavigation() {
  const sliderService = useSlider()

  const navigate = ({ type, url, params, width, onCloseSlider = () => { } }: NavigateProps) => {
    const isSite = window._APP_TYPE_ === 'site';
    const onCloseComponentSlider = () => {
      sliderService.hide()
      onCloseSlider()
    }

    switch (type) {
      case "openApplication":
        if (!isSite && !("BX24" in window)) {
          let localUrl = '';
          for (const [key, value] of Object.entries(params)) {
            localUrl += `${key}=${value}&`;
          }

          window.open(localUrl, '_blank')?.focus();
        } else if (isSite) {
          sliderService.show({
            type: "iframe",
            typeParams: { iframeUrl: url },
            placementOptions: params,
            width: width,
            onClose: onCloseComponentSlider
          })
        } else if (BX24) {
          BX24.openApplication(params, onCloseSlider);
        }
        break;
      case "openApplicationPortal":
        // TODO: Add handler
        break;
      case "openPath":
        if (!isSite && !("BX24" in window)) {
          window.open(url, '_blank')?.focus();
        } else if (isSite) {
          sliderService.show({
            type: "iframe",
            typeParams: { iframeUrl: url },
            onClose: onCloseComponentSlider
          })
        } else if (BX24 && url) {
          BX24.openPath(url, onCloseSlider);
        }
        break;
      case "openLink":
      default:
        window.open(url);
        break;
    }
  }

  return navigate
}
