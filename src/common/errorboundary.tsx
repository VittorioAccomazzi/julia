import React, {Component} from "react";

type errorBoundaryProps = {
    message : string
};
interface errorBoundaryState  {
    hasError : Boolean 
}

export default class ErrorBoundary extends Component<errorBoundaryProps,errorBoundaryState> {
    constructor(props : errorBoundaryProps) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError() {
      // Update state so the next render will show the fallback UI.
      return { hasError: true };
    }
  
    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>{this.props.message}</h1>;
      }
      return this.props.children; 
    }
  }