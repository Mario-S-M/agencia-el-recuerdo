'use client';

import { create } from 'zustand';
import type { Hotel } from '../../domain/entities/hotel.types';

export type HotelModalType = 'create' | Hotel | null;

export interface HotelesUIState {
  modal: HotelModalType;
  detail: Hotel | null;
  deleteTarget: Hotel | null;
  submitting: boolean;
  formError: string | null;
  setModal: (modal: HotelModalType) => void;
  setDetail: (detail: Hotel | null) => void;
  setDeleteTarget: (target: Hotel | null) => void;
  setSubmitting: (submitting: boolean) => void;
  setFormError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  modal: null as HotelModalType,
  detail: null as Hotel | null,
  deleteTarget: null as Hotel | null,
  submitting: false,
  formError: null as string | null,
};

export const useHotelesStore = create<HotelesUIState>((set) => ({
  ...initialState,
  setModal: (modal) => set({ modal }),
  setDetail: (detail) => set({ detail }),
  setDeleteTarget: (deleteTarget) => set({ deleteTarget }),
  setSubmitting: (submitting) => set({ submitting }),
  setFormError: (formError) => set({ formError }),
  reset: () => set(initialState),
}));
