import { useState } from 'react';

interface UseModalResult<T> {
  isOpen: boolean;
  selectedItem: T | null;
  openModal: (item: T) => void;
  closeModal: () => void;
}

export function useModal<T>(): UseModalResult<T> {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const openModal = (item: T) => {
    setSelectedItem(item);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsOpen(false);
  };

  return { isOpen, selectedItem, openModal, closeModal };
}

