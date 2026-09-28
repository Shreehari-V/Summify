// frontend/src/ErrorBoundary.jsx
import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an unhandled rendering error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            background: "var(--bg-main, #290000)",
            color: "var(--accent-cream, #FDFBF7)",
            fontFamily: "var(--font-main, sans-serif)",
          }}
        >
          <div
            style={{
              maxWidth: 480,
              width: "100%",
              padding: "2rem",
              background: "var(--bg-card, #4A0E17)",
              border: "1px solid var(--border-subtle, rgba(253, 251, 247, 0.15))",
              borderRadius: "var(--radius-lg, 12px)",
              textAlign: "center",
              boxShadow: "0 12px 30px rgba(0, 0, 0, 0.4)",
            }}
          >
            <div style={{ display: "inline-flex", padding: "0.75rem", borderRadius: "50%", background: "rgba(109, 2, 2, 0.6)", marginBottom: "1rem" }}>
              <AlertCircle size={32} color="var(--accent-cream, #FDFBF7)" />
            </div>
            <h2 style={{ margin: "0 0 0.5rem", fontSize: "1.25rem", color: "var(--accent-cream, #FDFBF7)" }}>
              Something went wrong
            </h2>
            <p style={{ margin: "0 0 1.5rem", fontSize: "0.88rem", color: "var(--text-secondary, #E0D6C3)", lineHeight: 1.5 }}>
              A temporary display error occurred while rendering the console. You can refresh the view to restore normal operation.
            </p>
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1.25rem",
                background: "var(--accent-cream, #FDFBF7)",
                color: "#290000",
                fontWeight: 600,
                fontSize: "0.88rem",
                borderRadius: "var(--radius-sm, 6px)",
                border: "none",
                cursor: "pointer",
              }}
            >
              <RefreshCw size={16} />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
