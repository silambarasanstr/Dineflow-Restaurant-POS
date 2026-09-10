import { AlertTriangle, CheckCircle, Info, Loader2 } from "lucide-react";
import Modal from "./Modal";

const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  message = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
  variant = "danger",
}) => {
  const variants = {
    danger: {
      icon: AlertTriangle,
      iconWrapper: "bg-red-50",
      iconColor: "text-red-600",
      button: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
    },
    success: {
      icon: CheckCircle,
      iconWrapper: "bg-emerald-50",
      iconColor: "text-emerald-600",
      button: "bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500",
    },
    info: {
      icon: Info,
      iconWrapper: "bg-blue-50",
      iconColor: "text-blue-600",
      button: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
    },
  };

  const currentVariant = variants[variant] || variants.danger;
  const Icon = currentVariant.icon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? undefined : onClose}
      title={title}
      size="sm"
      showCloseButton={!loading}
      closeOnOverlayClick={!loading}
    >
      <div className="space-y-4">
        {/* Icon + Message */}
        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${currentVariant.iconWrapper}`}
          >
            <Icon
              size={20}
              strokeWidth={2}
              className={currentVariant.iconColor}
            />
          </div>

          <p className="pt-1 text-sm leading-5 text-slate-600">{message}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 border-t border-slate-100 pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="
              h-9 rounded-lg
              border border-slate-200
              bg-white px-3.5
              text-sm font-medium text-slate-700
              transition
              hover:bg-slate-50
              focus:outline-none
              focus:ring-2
              focus:ring-slate-200
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {cancelText}
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`
              flex h-9 items-center justify-center gap-2
              rounded-lg px-3.5
              text-sm font-medium text-white
              transition
              focus:outline-none
              focus:ring-2
              focus:ring-offset-1
              disabled:cursor-not-allowed
              disabled:opacity-60
              ${currentVariant.button}
            `}
          >
            {loading && <Loader2 size={15} className="animate-spin" />}

            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
