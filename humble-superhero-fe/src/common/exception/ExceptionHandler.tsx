import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

export class ExceptionHandler extends React.Component<Props, State> {
  static getDerivedStateFromError(error: Error): Partial<State> {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error(JSON.stringify({ error, errorInfo }));
    this.setState({ errorInfo });
  }

  render(): React.ReactNode {
    if (!this.state) {
      return this.props.children;
    }

    const { error } = this.state;
    if (!error) {
      return this.props.children;
    }

    return (
      <div>
        <h1>Something went wrong.</h1>
        <p>We encountered an error. Please try again later.</p>
      </div>
    );
  }
}
