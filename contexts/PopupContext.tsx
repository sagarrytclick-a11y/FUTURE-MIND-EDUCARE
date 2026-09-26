"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FormData {
  name: string;
  email: string;
  mobile: string;
  courseInterest: string;
  neetScore: string;
}

interface PopupContextType {
  isOpen: boolean;
  openPopup: () => void;
  closePopup: () => void;
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  resetForm: () => void;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

interface PopupProviderProps {
  children: ReactNode;
}

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    courseInterest: '',
    neetScore: ''
  });

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      mobile: '',
      courseInterest: '',
      neetScore: ''
    });
  };

  return (
    <PopupContext.Provider
      value={{
        isOpen,
        openPopup,
        closePopup,
        formData,
        updateFormData,
        resetForm
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};
