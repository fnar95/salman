import React, { useState } from 'react';
import { ExternalLink, Copy, Check, Heart, Code, Globe, Zap, Rocket, Shield, Eye, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { LinkItem } from '../types';
import { soundManager } from '../utils/audio';

interface NeonCardProps {
  link: LinkItem;
  index: number;
  onPreview: (link: LinkItem) => void;
  onLikeToggle: (id: string) => void;
  isLiked: boolean;
}

export const NeonCard: React.FC<NeonCardProps> = ({
  link,
  index,
  onPreview,
  onLikeToggle,
  isLiked,
}) => {
  const [copied, setCopied] = useState(false);

  // Icon mapping
  const renderIcon = () => {
    const props = { className: "w-7 h-7 sm:w-8 sm:h-8 transition-transform duration-300 group-hover:scale-110" };
    switch (link.iconName) {
      case 'code':
        return <Code {...props} />;
      case 'globe':
        return <Globe {...props} />;
      case 'zap':
        return <Zap {...props} />;
      case 'rocket':
        return <Rocket {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  // Color mappings
  const themeStyles = {
    cyan: {
      border: 'border-cyan-500/50 hover:border-cyan-400',
      shadow: 'glow-cyan hover:shadow-[0_0_35px_rgba(0,243,255,0.4)]',
      bgGradient: 'from-cyan-950/40 via-slate-900/90 to-slate-950/95',
      accentText: 'text-cyan-300',
      neonText: 'neon-text-cyan',
      iconBox: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 shadow-[0_0_15px_rgba(0,243,255,0.3)]',
      button: 'bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(0,243,255,0.5)]',
      badge: 'bg-cyan-950/80 text-cyan-300 border-cyan-500/40',
      pill: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
    },
    pink: {
      border: 'border-pink-500/50 hover:border-pink-400',
      shadow: 'glow-pink hover:shadow-[0_0_35px_rgba(255,0,127,0.4)]',
      bgGradient: 'from-pink-950/40 via-slate-900/90 to-slate-950/95',
      accentText: 'text-pink-300',
      neonText: 'neon-text-pink',
      iconBox: 'bg-pink-500/20 text-pink-300 border-pink-400/50 shadow-[0_0_15px_rgba(255,0,127,0.3)]',
      button: 'bg-pink-500 hover:bg-pink-400 text-black font-bold shadow-[0_0_20px_rgba(255,0,127,0.5)]',
      badge: 'bg-pink-950/80 text-pink-300 border-pink-500/40',
      pill: 'bg-pink-500/10 text-pink-400 border-pink-500/30'
    },
    purple: {
      border: 'border-purple-500/50 hover:border-purple-400',
      shadow: 'glow-purple hover:shadow-[0_0_35px_rgba(168,85,247,0.4)]',
      bgGradient: 'from-purple-950/40 via-slate-900/90 to-slate-950/95',
      accentText: 'text-purple-300',
      neonText: 'neon-text-purple',
      iconBox: 'bg-purple-500/20 text-purple-300 border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]',
      button: 'bg-purple-500 hover:bg-purple-400 text-black font-bold shadow-[0_0_20px_rgba(168,85,247,0.5)]',
      badge: 'bg-purple-950/80 text-purple-300 border-purple-500/40',
      pill: 'bg-purple-500/10 text-purple-400 border-purple-500/30'
    },
    emerald: {
      border: 'border-emerald-500/50 hover:border-emerald-400',
      shadow: 'glow-emerald hover:shadow-[0_0_35px_rgba(16,185,129,0.4)]',
      bgGradient: 'from-emerald-950/40 via-slate-900/90 to-slate-950/95',
      accentText: 'text-emerald-300',
      neonText: 'neon-text-emerald',
      iconBox: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
      button: 'bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-[0_0_20px_rgba(16,185,129,0.5)]',
      badge: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/40',
      pill: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
    }
  }[link.colorTheme];

  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(link.url);
    setCopied(true);
    soundManager.playCopySound();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    onLikeToggle(link.id);
    soundManager.playLikeChime();
  };

  const handleVisit = () => {
    soundManager.playLaserClick();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      whileHover={{ y: -6 }}
      className={`relative group rounded-2xl border backdrop-blur-xl bg-gradient-to-br ${themeStyles.bgGradient} ${themeStyles.border} ${themeStyles.shadow} transition-all duration-300 overflow-hidden flex flex-col justify-between p-5 sm:p-6`}
    >
      {/* Top Accent Neon Line */}
      <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
        link.colorTheme === 'cyan' ? 'from-cyan-500 via-blue-400 to-cyan-500' :
        link.colorTheme === 'pink' ? 'from-pink-500 via-rose-400 to-pink-500' :
        link.colorTheme === 'purple' ? 'from-purple-500 via-indigo-400 to-purple-500' :
        'from-emerald-500 via-teal-400 to-emerald-500'
      }`} />

      {/* Card Header Info */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-xl border ${themeStyles.iconBox} transition-transform duration-300 group-hover:scale-105`}>
              {renderIcon()}
            </div>

            <div>
              <span className={`inline-block text-[11px] font-bold px-2.5 py-0.5 rounded-full border mb-1 ${themeStyles.badge}`}>
                {link.badgeText}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-cairo tracking-wide leading-tight group-hover:text-cyan-200 transition-colors">
                {link.title}
              </h2>
            </div>
          </div>

          {/* Featured tag if present */}
          {link.featuredTag && (
            <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-md border ${themeStyles.pill} uppercase tracking-wider`}>
              {link.featuredTag}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm leading-relaxed mb-4 font-tajawal">
          {link.description}
        </p>

        {/* URL Box */}
        <div className="bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5 mb-5 flex items-center justify-between gap-2 text-xs font-mono text-slate-400 overflow-hidden dir-ltr">
          <span className="truncate text-slate-300 select-all" dir="ltr">{link.url}</span>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-xs font-tajawal transition-all shrink-0 ${
              copied
                ? 'bg-emerald-950 border-emerald-500/60 text-emerald-300'
                : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
            }`}
            title="نسخ الرابط"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>تم النسخ</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>نسخ</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 gap-2">
        {/* Like Button */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-medium transition-all ${
            isLiked
              ? 'bg-pink-950/80 border-pink-500 text-pink-300 shadow-[0_0_12px_rgba(255,0,127,0.4)]'
              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-pink-300 hover:border-pink-500/40'
          }`}
        >
          <Heart className={`w-4 h-4 transition-transform ${isLiked ? 'fill-pink-500 text-pink-500 scale-110' : ''}`} />
          <span className="font-mono">{link.likesCount.toLocaleString('ar-SA')}</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Preview Modal trigger */}
          <button
            onClick={() => onPreview(link)}
            className="flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-900/80 border border-slate-700 text-slate-300 hover:border-cyan-400 hover:text-cyan-300 text-xs font-medium transition-all"
            title="معاينة تفاصيل الرابط"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">معاينة</span>
          </button>

          {/* Main Direct Visit Button */}
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleVisit}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-300 ${themeStyles.button}`}
          >
            <span>زيارة الرابط</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};
