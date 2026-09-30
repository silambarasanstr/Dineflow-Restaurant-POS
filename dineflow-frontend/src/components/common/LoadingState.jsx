import { Loader2 } from "lucide-react";

const LoadingState = ({ message = "Loading...", className = "" }) => {
  return (
    <div
      className={`flex min-h-50 w-full items-center justify-center ${className}`}
    >
      <div className="flex flex-col items-center gap-3">
        <Loader2 size={28} className="text-blue-600 animate-spin" />

        <p className="text-sm text-gray-500">{message}</p>
      </div>
    </div>
  );
};

export default LoadingState;
