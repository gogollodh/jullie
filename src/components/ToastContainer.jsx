import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle, Info, X } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts, removeToast } = useShop();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-md w-full px-4 pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-forest-950/95 text-beige-100 border border-moss-700/80 rounded-xl p-4 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 animate-slideUp"
        >
          <div className="flex items-center gap-3">
            {toast.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-moss-400 shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </div>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-forest-400 hover:text-beige-100 p-1 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
