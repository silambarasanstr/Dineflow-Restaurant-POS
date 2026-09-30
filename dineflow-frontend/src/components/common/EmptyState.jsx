import { Inbox } from "lucide-react";

const EmptyState = ({
  title = "No data found",
  message = "There is nothing to display here.",
  action,
  actionText = "Add New",
  className = "",
}) => {
  return (
    <div
      className={`flex min-h-50 w-full items-center justify-center ${className}`}
    >
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center w-12 h-12 mb-3 bg-gray-100 rounded-full">
          <Inbox size={24} className="text-gray-400" />
        </div>

        <h3 className="text-sm font-semibold text-gray-800">
          {title}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          {message}
        </p>

        {action && (
          <button
            type="button"
            onClick={action}
            className="px-4 py-2 mt-4 text-sm font-medium text-white transition bg-blue-600 rounded-lg  hover:bg-blue-700"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;