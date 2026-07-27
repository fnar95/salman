import React, { useState } from 'react';
import { Heart, Sparkles, Volume2, VolumeX, Flame, Share2, Palette } from 'lucide-react';
import { motion } from 'motion/react';
import { soundManager } from '../utils/audio';

interface HeaderProps {
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
  totalLikes: number;
  onShare: () => void;
}

type TitleColorOption = 'gold' | 'pink' | 'cyan' | 'emerald' | 'purple';

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  setSoundEnabled,
  totalLikes,
  onShare,
}) => {
  const [titleTheme, setTitleTheme] = useState<TitleColorOption>('gold');

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.enabled = nextState;
    if (nextState) {
      soundManager.playLaserClick();
    }
  };

  const themeClasses = {
    gold: {
      gradient: 'from-amber-200 via-yellow-400 to-amber-300',
      shadowClass: 'neon-text-gold',
      lineGlow: 'via-amber-400 shadow-[0_0_20px_#facc15]',
      badgeBg: 'border-amber-400/50 text-amber-300'
    },
    pink: {
      gradient: 'from-pink-300 via-rose-400 to-fuchsia-400',
      shadowClass: 'neon-text-pink',
      lineGlow: 'via-pink-500 shadow-[0_0_20px_#ff007f]',
      badgeBg: 'border-pink-400/50 text-pink-300'
    },
    cyan: {
      gradient: 'from-cyan-200 via-teal-300 to-blue-400',
      shadowClass: 'neon-text-cyan',
      lineGlow: 'via-cyan-400 shadow-[0_0_20px_#00f3ff]',
      badgeBg: 'border-cyan-400/50 text-cyan-300'
    },
    emerald: {
      gradient: 'from-emerald-300 via-green-400 to-teal-300',
      shadowClass: 'neon-text-emerald',
      lineGlow: 'via-emerald-400 shadow-[0_0_20px_#10b981]',
      badgeBg: 'border-emerald-400/50 text-emerald-300'
    },
    purple: {
      gradient: 'from-purple-300 via-fuchsia-400 to-indigo-300',
      shadowClass: 'neon-text-purple',
      lineGlow: 'via-purple-500 shadow-[0_0_20px_#a855f7]',
      badgeBg: 'border-purple-400/50 text-purple-300'
    }
  }[titleTheme];

  const handleThemeChange = (theme: TitleColorOption) => {
    setTitleTheme(theme);
    soundManager.playLaserClick();
  };

  return (
    <header className="relative w-full pt-8 pb-6 px-4 flex flex-col items-center justify-center text-center z-10">
      {/* Decorative top ambient neon bloom */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-32 bg-gradient-to-b from-amber-500/15 via-pink-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

      {/* Control Buttons Bar (Sound & Share) */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-6 px-2">
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-flex items-center gap-2 bg-slate-900/80 border border-cyan-500/30 rounded-full px-4 py-1.5 backdrop-blur-md text-xs sm:text-sm text-cyan-300 shadow-[0_0_15px_rgba(0,243,255,0.15)]"
        >
          <Flame className="w-4 h-4 text-pink-500 animate-pulse" />
          <span>إجمالي التفاعلات:</span>
          <span className="font-bold text-pink-400 font-mono text-sm">{totalLikes.toLocaleString('ar-SA')}</span>
        </motion.div>

        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleSound}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300 backdrop-blur-md ${
              soundEnabled
                ? 'bg-cyan-950/60 border-cyan-400/50 text-cyan-300 shadow-[0_0_12px_rgba(0,243,255,0.25)]'
                : 'bg-slate-900/60 border-slate-700 text-slate-400'
            }`}
            title={soundEnabled ? 'إيقاف الصوت' : 'تفعيل صوت النيون'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
            <span className="hidden sm:inline">{soundEnabled ? 'مؤثرات الصوت' : 'صامت'}</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-pink-950/60 border border-pink-500/40 text-pink-300 hover:text-white shadow-[0_0_12px_rgba(255,0,127,0.25)] transition-all"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>مشاركة</span>
          </motion.button>
        </div>
      </div>

      {/* Profile Avatar & Top Neon Badge */}
      <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-pink-500 to-amber-400 rounded-full blur-md opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse" />
          <img
            src="https://react-9b5gpg.onspace.build/assets/profile-avatar-BxAjpRuO.png"
            alt="فاضل المبارك"
            referrerPolicy="no-referrer"
            className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.4)]"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-950/70 via-purple-950/70 to-cyan-950/70 border border-cyan-400/40 text-cyan-300 text-xs sm:text-sm font-bold tracking-wide shadow-[0_0_20px_rgba(0,243,255,0.2)]"
        >
          <Sparkles className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
          <span>بوابة الروابط والتطبيقات - فاضل المبارك</span>
          <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '6s' }} />
        </motion.div>
      </div>

      {/* Main Title Required by User: "الاكثر أعجابا" in Glowing Neon Typography */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="relative group cursor-default my-2"
      >
        <h1 className={`text-4xl sm:text-6xl md:text-7xl font-black font-kufi tracking-normal text-transparent bg-clip-text bg-gradient-to-r ${themeClasses.gradient} ${themeClasses.shadowClass} animate-flicker py-2 px-4 transition-all duration-500`}>
          الاكثر أعجابا
        </h1>
        {/* Glow under line */}
        <div className={`mx-auto w-3/4 sm:w-1/2 h-1 bg-gradient-to-r from-transparent ${themeClasses.lineGlow} to-transparent rounded-full mt-1 transition-all duration-500`} />
      </motion.div>

      {/* Title Neon Color Swatches Selector */}
      <div className="mt-3 flex items-center justify-center gap-2 bg-slate-900/70 border border-slate-800 rounded-full px-3 py-1.5 backdrop-blur-md">
        <Palette className="w-3.5 h-3.5 text-slate-400 ml-1" />
        <span className="text-[11px] text-slate-400 font-tajawal ml-1">تغيير لون العنوان:</span>
        <button
          onClick={() => handleThemeChange('gold')}
          className={`w-5 h-5 rounded-full bg-gradient-to-br from-amber-300 to-yellow-500 transition-transform ${titleTheme === 'gold' ? 'scale-125 ring-2 ring-yellow-300 shadow-[0_0_10px_#facc15]' : 'hover:scale-110 opacity-70'}`}
          title="ذهبي متوهج"
        />
        <button
          onClick={() => handleThemeChange('pink')}
          className={`w-5 h-5 rounded-full bg-gradient-to-br from-pink-400 to-rose-600 transition-transform ${titleTheme === 'pink' ? 'scale-125 ring-2 ring-pink-400 shadow-[0_0_10px_#ff007f]' : 'hover:scale-110 opacity-70'}`}
          title="وردي نيون"
        />
        <button
          onClick={() => handleThemeChange('cyan')}
          className={`w-5 h-5 rounded-full bg-gradient-to-br from-cyan-300 to-blue-500 transition-transform ${titleTheme === 'cyan' ? 'scale-125 ring-2 ring-cyan-300 shadow-[0_0_10px_#00f3ff]' : 'hover:scale-110 opacity-70'}`}
          title="سماوي نيون"
        />
        <button
          onClick={() => handleThemeChange('emerald')}
          className={`w-5 h-5 rounded-full bg-gradient-to-br from-emerald-300 to-teal-500 transition-transform ${titleTheme === 'emerald' ? 'scale-125 ring-2 ring-emerald-300 shadow-[0_0_10px_#10b981]' : 'hover:scale-110 opacity-70'}`}
          title="أخضر زمردي"
        />
        <button
          onClick={() => handleThemeChange('purple')}
          className={`w-5 h-5 rounded-full bg-gradient-to-br from-purple-300 to-fuchsia-600 transition-transform ${titleTheme === 'purple' ? 'scale-125 ring-2 ring-purple-300 shadow-[0_0_10px_#a855f7]' : 'hover:scale-110 opacity-70'}`}
          title="أرجواني ملكي"
        />
      </div>

      {/* Subtitle description */}
      <p className="mt-4 text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed font-tajawal">
        مجموعة مختارة من أبرز المواقع والروابط الإلكترونية المصممة بعناية فائقة لتسهيل وصولكم الفوري مع تجربة النيون المستقبلية.
      </p>
    </header>
  );
};
