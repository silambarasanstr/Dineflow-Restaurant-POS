import { useEffect } from "react";
import { X } from "lucide-react";

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
  closeOnOverlayClick = true,
}) => {
  
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    "2xl": "max-w-5xl",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(e) => {
        if (
          closeOnOverlayClick &&
          e.target === e.currentTarget
        ) {
          onClose?.();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        className={`
          w-full
          ${sizeClasses[size] || sizeClasses.md}
          max-h-[90vh]
          overflow-hidden
          rounded-xl
          border
          border-slate-200
          bg-white
          shadow-2xl
        `}
      >
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            {title ? (
              <h2
                id="modal-title"
                className="text-sm font-semibold text-slate-900"
              >
                {title}
              </h2>
            ) : (
              <div />
            )}

            {showCloseButton && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="
                  flex h-8 w-8 items-center justify-center
                  rounded-lg
                  text-slate-400
                  transition
                  hover:bg-slate-100
                  hover:text-slate-600
                  focus:outline-none
                  focus:ring-2
                  focus:ring-slate-300
                "
              >
                <X size={17} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="max-h-[calc(90vh-65px)] overflow-y-auto p-5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;