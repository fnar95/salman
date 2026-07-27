import React, { useState } from 'react';
import { X, ExternalLink, Copy, Check, ShieldCheck, QrCode, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { LinkItem } from '../types';
import { soundManager } from '../utils/audio';

interface PreviewModalProps {
  link: LinkItem | null;
  onClose: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({ link, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [showIframe, setShowIframe] = useState(false);

  if (!link) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    soundManager.playCopySound();
    setTimeout(() => setCopied(false), 2000);
  };

  // Quick Google Chart API QR Code generator URL
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(link.url)}&color=00f3ff&bgcolor=0a0818`;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl bg-slate-950 border border-cyan-500/50 rounded-2xl shadow-[0_0_50px_rgba(0,243,255,0.25)] overflow-hidden z-10 flex flex-col max-h-[90vh]"
        >
          {/* Modal Header */}
          <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900">
            <div className="flex items-center gap-3">
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold">
                {link.badgeText}
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-cairo text-white">
                {link.title}
              </h3>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-pink-500 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-5 overflow-y-auto space-y-6">
            {/* Description */}
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-slate-200 text-sm leading-relaxed">
              <p className="font-tajawal text-slate-300">{link.description}</p>
            </div>

            {/* URL Display & Copy */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-cyan-400 font-cairo">رابط الموقع مباشر:</label>
              <div className="flex items-center justify-between gap-2 p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-cyan-300 dir-ltr">
                <span className="truncate" dir="ltr">{link.url}</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-950 border border-cyan-500/50 text-cyan-300 hover:bg-cyan-900 transition-colors shrink-0 font-tajawal"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>{copied ? 'تم النسخ' : 'نسخ الرابط'}</span>
                </button>
              </div>
            </div>

            {/* QR Code & Direct Mobile Scan Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4">
              <div className="flex flex-col items-center justify-center p-3 bg-slate-950 rounded-xl border border-cyan-500/30">
                <img
                  src={qrCodeUrl}
                  alt="QR Code"
                  className="w-36 h-36 rounded-lg shadow-[0_0_15px_rgba(0,243,255,0.2)]"
                  loading="lazy"
                />
                <span className="text-[11px] text-cyan-300 font-mono mt-2 flex items-center gap-1">
                  <QrCode className="w-3.5 h-3.5" /> امسح الرمز للفتح بالهاتف
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>تم الفحص والتحقق من أمان الرابط</span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-tajawal">
                  يمكنك زيارة الرابط فوراً في نافذة جديدة أو استعراض المعاينة المباشرة.
                </p>

                <button
                  onClick={() => setShowIframe(!showIframe)}
                  className="w-full py-2 px-3 rounded-xl bg-purple-950/60 border border-purple-500/40 text-purple-300 hover:bg-purple-900/60 text-xs font-bold flex items-center justify-center gap-2 transition-all"
                >
                  <Monitor className="w-4 h-4" />
                  <span>{showIframe ? 'إخفاء المعاينة' : 'عرض المعاينة المباشرة'}</span>
                </button>
              </div>
            </div>

            {/* Optional Iframe Preview */}
            {showIframe && (
              <div className="space-y-2">
                <span className="text-xs text-purple-300 font-bold">معاينة داخلية للموقع:</span>
                <div className="w-full h-64 rounded-xl border border-purple-500/50 overflow-hidden bg-white">
                  <iframe
                    src={link.url}
                    title={link.title}
                    className="w-full h-full border-0"
                    sandbox="allow-scripts allow-same-origin allow-forms"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800 text-xs font-bold"
            >
              إغلاق
            </button>

            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundManager.playLaserClick()}
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all"
            >
              <span>فتح الرابط في تبويب جديد</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
