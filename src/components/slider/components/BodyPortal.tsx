import React from "react";
import ReactDOM from "react-dom";
import { randomizeString } from "../../../app/utils/randomizer";

interface BodyPortalProps {
  children: React.ReactElement,
  className?: string,
  container?: string
}

export class BodyPortal extends React.Component<BodyPortalProps> {
  el: HTMLDivElement;
  
  constructor(props: BodyPortalProps) {
    super(props)
    this.el = document.createElement("div")

    if (this.props.container) {
      this.el.id = randomizeString(this.props.container)
    }

    if (this.props.className) {
      this.el.className = this.props.className
    }
  }

  componentDidMount(): void {
    document.body.appendChild(this.el)
  }

  componentWillUnmount(): void {
    document.body.removeChild(this.el)
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el)
  }
}
