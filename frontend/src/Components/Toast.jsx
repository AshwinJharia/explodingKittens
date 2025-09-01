import { useState, useEffect } from 'react';

let toastId = 0;
const toasts = [];
const listeners = [];

export const showToast = (message, type = 'info') => {
  const toast = {
    id: ++toastId,
    message,
    type,
    timestamp: Date.now()
  };
  
  toasts.push(toast);
  listeners.forEach(listener => listener([...toasts]));
  
  setTimeout(() => {
    const index = toasts.findIndex(t => t.id === toast.id);
    if (index > -1) {
      toasts.splice(index, 1);
      listeners.forEach(listener => listener([...toasts]));
    }
  }, 4000);
};

function Toast() {
  const [toastList, setToastList] = useState([]);

  useEffect(() => {
    const updateToasts = (newToasts) => setToastList(newToasts);
    listeners.push(updateToasts);
    
    return () => {
      const index = listeners.indexOf(updateToasts);
      if (index > -1) listeners.splice(index, 1);
    };
  }, []);

  const removeToast = (id) => {
    const index = toasts.findIndex(t => t.id === id);
    if (index > -1) {
      toasts.splice(index, 1);
      listeners.forEach(listener => listener([...toasts]));
    }
  };

  return (
    <div className="toast-container">
      {toastList.map((toast) => (
        <div 
          key={toast.id} 
          className={`toast toast-${toast.type}`}
          onClick={() => removeToast(toast.id)}
        >
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close">×</button>
        </div>
      ))}
    </div>
  );
}

export default Toast;