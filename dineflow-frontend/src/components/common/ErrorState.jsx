import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorState = ({
  message = "Something went wrong.",
  onRetry,
  retryText = "Try Again",
  className = "",
}) => {
  return (
    <div
      className={`flex min-h-50 w-full items-center justify-center ${className}`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-12 h-12 mb-3 rounded-full bg-red-50">
          <AlertCircle size={24} className="text-red-500" />
        </div>

        <h3 className="text-sm font-semibold text-gray-800">
          Unable to load data
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {message}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium text-white transition bg-blue-600 rounded-lg  hover:bg-blue-700"
          >
            <RefreshCw size={16} />
            {retryText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;