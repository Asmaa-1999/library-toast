import { ToastProps } from "./components/Toast";

type Observer<TData> = (data: TData) => void;

class Observable<TData> {
    private observers: Observer<TData>[] = [];

    subscribe(observerFn: Observer<TData>) {
        this.observers.push(observerFn);
        return () => {
            this.observers = this.observers.filter(obs => obs !== observerFn);
        };
    }

    notify(data: TData) {
        this.observers.forEach(observer => observer(data));
    }
    remove() {
        // this.observers = [];
        this.notify(null as unknown as TData);
    }
}

type Toast = Pick<ToastProps | "id" | "message" | "variant">

export const tostObservable = new Observable<Toast>();

export function toast(message: string) {
    tostObservable.notify({
        id: Date.now(),
        message,
        variant: 'default'
    })
}
toast.success = function (message: string) {
    tostObservable.notify({
        id: Date.now(),
        message,
        variant: 'success'
    })
}
toast.error = function (message: string) {
    tostObservable.notify({
        id: Date.now(),
        message,
        variant: 'error'
    })
}
toast.dismissAll = function () {
    tostObservable.remove()
}