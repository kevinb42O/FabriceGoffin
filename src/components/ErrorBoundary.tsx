import { Component, ErrorInfo, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Error Boundary catches JavaScript errors anywhere in the child component tree,
 * logs them, and renders a fallback UI instead of crashing the entire app.
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary] Uncaught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-white">
          <div className="text-center max-w-lg">
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="w-12 h-[2px] bg-red-600"></div>
              <span className="text-red-600 font-bold uppercase tracking-[0.2em] text-xs">
                Er ging iets mis
              </span>
              <div className="w-12 h-[2px] bg-red-600"></div>
            </div>

            <h1 className="text-4xl md:text-6xl font-medium uppercase tracking-tighter text-zinc-900 mb-6 font-heading">
              Onverwachte Fout
            </h1>

            <p className="text-lg text-zinc-600 font-medium leading-relaxed mb-12">
              Er is een onverwachte fout opgetreden. Probeer de pagina te herladen of navigeer terug naar de homepagina.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-black uppercase tracking-widest text-sm rounded-full transition-colors duration-300 shadow-lg"
              >
                Herlaad Pagina
              </button>
              <Link
                to="/"
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-8 py-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-black uppercase tracking-widest text-sm rounded-full transition-colors duration-300"
              >
                Naar Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
