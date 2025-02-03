// src/components/ui/button.jsx
export function Button({ children, variant = "default", onClick }) {
    return (
      <button
        className={`px-4 py-2 rounded ${
          variant === "outline" ? "border border-blue-500 text-blue-500" : "bg-blue-500 text-white"
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  }
  