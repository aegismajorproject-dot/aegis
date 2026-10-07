import { X } from 'lucide-react';
export default function Modal({ title, onClose, children }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose} role="dialog" aria-modal="true">
      <div className="glass w-full max-w-md p-4 slidein" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-3"><h3 className="font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close" className="text-slate-400 hover:text-white"><X size={16} /></button></div>
        {children}
      </div>
    </div>
  );
}
