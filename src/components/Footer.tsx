import React from 'react';
import { Heart, Sparkles, ExternalLink, Globe, Send, Youtube, Mail, MessageSquare, BookOpen, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import { soundManager } from '../utils/audio';

export const Footer: React.FC = () => {
  const handleClick = () => {
    soundManager.playLaserClick();
  };

  const socialChannels = [
    {
      id: 'x-twitter',
      name: 'تابعوني على تويتر',
      handle: '@Fnar9595',
      url: 'https://x.com/Fnar9595',
      icon: '𝕏',
      isCustomIcon: true,
      color: 'from-cyan-950/80 to-blue-950/80',
      border: 'border-cyan-400/60 hover:border-cyan-300',
      textGlow: 'neon-text-cyan text-cyan-300',
      badge: 'bg-cyan-950 border-cyan-500/40 text-cyan-300',
      shadow: 'shadow-[0_0_20px_rgba(0,243,255,0.25)] hover:shadow-[0_0_30px_rgba(0,243,255,0.45)]',
    },
    {
      id: 'blogspot',
      name: 'المدونة الرسمية',
      handle: 'fnar9595.blogspot.com',
      url: 'https://fnar9595.blogspot.com/',
      icon: BookOpen,
      isCustomIcon: false,
      color: 'from-amber-950/80 to-yellow-950/80',
      border: 'border-amber-400/60 hover:border-amber-300',
      textGlow: 'neon-text-gold text-amber-300',
      badge: 'bg-amber-950 border-amber-500/40 text-amber-300',
      shadow: 'shadow-[0_0_20px_rgba(250,204,21,0.25)] hover:shadow-[0_0_30px_rgba(250,204,21,0.45)]',
    },
    {
      id: 'telegram',
      name: 'قناة التليجرام',
      handle: '@fnar9595',
      url: 'https://t.me/fnar9595',
      icon: Send,
      isCustomIcon: false,
      color: 'from-sky-950/80 to-blue-950/80',
      border: 'border-sky-400/60 hover:border-sky-300',
      textGlow: 'neon-text-cyan text-sky-300',
      badge: 'bg-sky-950 border-sky-500/40 text-sky-300',
      shadow: 'shadow-[0_0_20px_rgba(56,189,248,0.25)] hover:shadow-[0_0_30px_rgba(56,189,248,0.45)]',
    },
    {
      id: 'youtube',
      name: 'قناة اليوتيوب',
      handle: 'فاضل المبارك - الفنار 95',
      url: 'https://www.youtube.com/channel/UC1pKwkasQIOysB0ibC6iZCg',
      icon: Youtube,
      isCustomIcon: false,
      color: 'from-rose-950/80 to-pink-950/80',
      border: 'border-rose-400/60 hover:border-rose-300',
      textGlow: 'neon-text-pink text-rose-300',
      badge: 'bg-rose-950 border-rose-500/40 text-rose-300',
      shadow: 'shadow-[0_0_20px_rgba(244,63,94,0.25)] hover:shadow-[0_0_30px_rgba(244,63,94,0.45)]',
    },
    {
      id: 'whatsapp',
      name: 'تواصل عبر الواتساب',
      handle: 'واتساب الفنار 95',
      url: 'https://wa.me/?text=مرحباً%20أستاذ%20فاضل%20المبارك',
      icon: MessageSquare,
      isCustomIcon: false,
      color: 'from-emerald-950/80 to-teal-950/80',
      border: 'border-emerald-400/60 hover:border-emerald-300',
      textGlow: 'neon-text-emerald text-emerald-300',
      badge: 'bg-emerald-950 border-emerald-500/40 text-emerald-300',
      shadow: 'shadow-[0_0_20px_rgba(16,185,129,0.25)] hover:shadow-[0_0_30px_rgba(16,185,129,0.45)]',
    },
    {
      id: 'email',
      name: 'البريد الإلكتروني',
      handle: 'fnar95@gmail.com',
      url: 'mailto:fnar95@gmail.com',
      icon: Mail,
      isCustomIcon: false,
      color: 'from-purple-950/80 to-indigo-950/80',
      border: 'border-purple-400/60 hover:border-purple-300',
      textGlow: 'neon-text-purple text-purple-300',
      badge: 'bg-purple-950 border-purple-500/40 text-purple-300',
      shadow: 'shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_30px_rgba(168,85,247,0.45)]',
    },
  ];

  return (
    <footer className="relative w-full mt-20 pt-16 pb-12 px-4 border-t border-cyan-500/20 bg-gradient-to-b from-slate-950 via-[#0a0818] to-[#05040b] text-center overflow-hidden z-10">
      {/* Background neon ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-gradient-to-t from-pink-600/10 via-cyan-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto flex flex-col items-center justify-center gap-8 relative z-10">
        {/* Profile Avatar in Footer with glowing neon aura */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="relative group cursor-pointer"
        >
          <div className="absolute -inset-2.5 bg-gradient-to-r from-amber-400 via-pink-500 to-cyan-400 rounded-full blur-xl opacity-80 group-hover:opacity-100 transition duration-500 animate-pulse" />
          <img
            src="https://react-9b5gpg.onspace.build/assets/profile-avatar-BxAjpRuO.png"
            alt="فاضل المبارك"
            referrerPolicy="no-referrer"
            className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-2 border-amber-300 shadow-[0_0_30px_rgba(250,204,21,0.5)]"
          />
        </motion.div>

        {/* First Required Sentence: "تلميذكم فاضل المبارك" */}
        <div className="space-y-2">
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl font-extrabold font-cairo text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-300 neon-text-gold tracking-wide"
          >
            تلميذكم فاضل المبارك
          </motion.h3>
          <p className="text-sm sm:text-base text-slate-300 font-tajawal max-w-lg mx-auto">
            يسعدني تواصلكم واقتراحاتكم عبر كافة قنوات التواصل الرسمية لمتابعة كل جديد ومفيد.
          </p>
        </div>

        {/* Section Header for Social Media */}
        <div className="flex items-center gap-3 my-2">
          <div className="h-px w-12 sm:w-24 bg-gradient-to-r from-transparent via-cyan-400 to-cyan-400" />
          <span className="text-xs sm:text-sm font-bold font-cairo text-cyan-300 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
            وسائل التواصل الاجتماعي والمدونة
          </span>
          <div className="h-px w-12 sm:w-24 bg-gradient-to-l from-transparent via-cyan-400 to-cyan-400" />
        </div>

        {/* Grid of Social Channels from fnar9595.blogspot.com */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
          {socialChannels.map((item) => {
            const IconComp = item.icon as React.ElementType;
            return (
              <motion.a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClick}
                whileHover={{ scale: 1.03, y: -4 }}
                whileTap={{ scale: 0.97 }}
                className={`group relative flex items-center justify-between p-4 rounded-2xl bg-gradient-to-br ${item.color} border ${item.border} ${item.shadow} transition-all duration-300`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-xl bg-slate-900/90 border border-slate-700/80 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    {item.isCustomIcon ? (
                      <span className="font-black text-lg text-cyan-300">{item.icon as string}</span>
                    ) : (
                      <IconComp className="w-5 h-5 text-slate-200 group-hover:text-cyan-300 transition-colors" />
                    )}
                  </div>

                  <div className="text-right truncate">
                    <h4 className={`text-sm font-bold font-cairo ${item.textGlow} truncate`}>
                      {item.name}
                    </h4>
                    <span className="text-xs text-slate-400 font-mono block truncate dir-ltr">
                      {item.handle}
                    </span>
                  </div>
                </div>

                <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-white group-hover:translate-x-[-2px] transition-all shrink-0 mr-2" />
              </motion.a>
            );
          })}
        </div>

        {/* Copyright notice */}
        <div className="text-xs text-slate-500 font-mono mt-6 pt-6 border-t border-slate-900/80 w-full flex flex-col sm:flex-row items-center justify-center gap-2">
          <span>جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-cyan-400 font-bold">فاضل المبارك - الفنار 95</span>
        </div>
      </div>
    </footer>
  );
};

