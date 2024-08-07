import { useEffect, useState } from "react";
import { Toast } from "./Toast";
import { tostObservable } from "../utils";
import { ToastProps } from "./components/Toast";

type Toast = Pick<ToastProps | "id" | "message" | "variant">;

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    return tostObservable.subscribe((toast) => {
      if (toast === null) {
        setToasts([]); // Clear all toasts
      } else {
        setToasts((prevToasts) => [...prevToasts, toast]);
      }
    });
  }, []);

  return (
    <div className="absolute bottom-0 end-0 p-4 space-y-2 w-full h-full justify-end pointer-events-none flex flex-col max-w-xs ">
      {toasts.map((toas) => (
        <Toast
          key={toas.id}
          id={toas.id}
          variant={toas.variant}
          message={toas.message}
          onClose={() => {
            setToasts((prevToasts) =>
              prevToasts.filter((t) => t.id != toas.id)
            );
          }}
        />
      ))}
    </div>
  );
}
