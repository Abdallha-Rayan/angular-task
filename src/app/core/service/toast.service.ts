import { computed, Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastState {
  message: string;
  type: ToastType;
  show: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastState = signal<ToastState>({ message: '', type: 'info', show: false });

  public message = computed(() => this.toastState().message);
  public type = computed(() => this.toastState().type);
  public show = computed(() => this.toastState().show);

  private timer: any;

  showToast(type: ToastType, message: string) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.toastState.set({ message, type, show: true });

    this.timer = setTimeout(() => {
      this.hideToast();
    }, 5000);
  }

  hideToast() {
    this.toastState.update(s => ({ ...s, show: false }));
  }
}
