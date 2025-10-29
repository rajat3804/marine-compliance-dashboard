// src/contexts/AuditsContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import auditsData from '../data/audits.json';  

interface Audit {
  id: number;
  survey: string;
  status: 'Compliant' | 'Pending' | 'Non-Compliant';
  date: string;
  description?: string;
}

interface AuditsContextType {
  audits: Audit[];
  addAudit: (formData: Partial<Audit> & { status: Audit['status']; survey: string; date: string; description: string }) => void;
  deleteAudit: (id: number) => void;
  toggleStatus: (id: number) => void;
  updateStatus: (id: number, newStatus: Audit['status']) => void;
  loading: boolean;
}

const AuditsContext = createContext<AuditsContextType | undefined>(undefined);

export function AuditsProvider({ children }: { children: ReactNode }) {
  const [audits, setAudits] = useState<Audit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('audits');
    if (saved) {
      setAudits(JSON.parse(saved));
    } else {
      localStorage.setItem('audits', JSON.stringify(auditsData));
      setAudits(auditsData as Audit[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    localStorage.setItem('audits', JSON.stringify(audits));  
  }, [audits]);

  const addAudit = (formData: Partial<Audit> & { status: Audit['status']; survey: string; date: string; description: string }) => {
    const newId = formData.id || Math.max(...audits.map(a => a.id), 0) + 1;  // Use provided or auto
    const newAudit: Audit = { 
      id: newId, 
      survey: formData.survey, 
      status: formData.status, 
      date: formData.date, 
      description: formData.description 
    };
    setAudits([...audits, newAudit]);
  };

  const deleteAudit = (id: number) => {
    if (!window.confirm(`Delete audit #${id}?`)) return;
    setAudits(audits.filter(a => a.id !== id));
  };

  const toggleStatus = (id: number) => {
    setAudits(audits.map(a => 
      a.id === id 
        ? { ...a, status: a.status === 'Compliant' ? 'Pending' : 'Compliant' } 
        : a
    ));
  };

  const updateStatus = (id: number, newStatus: Audit['status']) => {
    setAudits(audits.map(a => 
      a.id === id ? { ...a, status: newStatus } : a
    ));
  };

  return (
    <AuditsContext.Provider value={{ audits, addAudit, deleteAudit, toggleStatus, updateStatus, loading }}>
      {children}
    </AuditsContext.Provider>
  );
}

export function useAudits() {
  const context = useContext(AuditsContext);
  if (!context) throw new Error('useAudits must be inside AuditsProvider');
  return context;
}