import React from "react";
import ReactDOM from "react-dom";

export class BodyPortal extends React.Component<{ children: React.ReactElement, container?: string }> {
  el: HTMLDivElement;
  
  constructor(props: any) {
    super(props)
    this.el = document.createElement("div")

    if (this.props.container) {
      this.el.id = this.props.container
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
