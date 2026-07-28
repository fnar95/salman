import React, { useState, useEffect } from 'react';
import { Search, Sparkles, SlidersHorizontal, Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { INITIAL_LINKS } from './data/links';
import { LinkItem } from './types';
import { Header } from './components/Header';
import { NeonCard } from './components/NeonCard';
import { Footer } from './components/Footer';
import { PreviewModal } from './components/PreviewModal';
import { soundManager } from './utils/audio';

export default function App() {
  const [links, setLinks] = useState<LinkItem[]>(() => {
    const saved = localStorage.getItem('fnar_neon_links');
    if (saved) {
      try {
        const parsed: LinkItem[] = JSON.parse(saved);
        // Map INITIAL_LINKS so new links are included, and existing saved link properties (like likesCount) are preserved
        return INITIAL_LINKS.map((init) => {
          const savedItem = parsed.find((p) => p.id === init.id);
          return savedItem ? { ...init, likesCount: savedItem.likesCount } : init;
        });
      } catch {
        return INITIAL_LINKS;
      }
    }
    return INITIAL_LINKS;
  });

  const [likedIds, setLikedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('fnar_neon_likes');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [soundEnabled, setSoundEnabled] = useState(true);
  const [previewLink, setPreviewLink] = useState<LinkItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('fnar_neon_links', JSON.stringify(links));
  }, [links]);

  useEffect(() => {
    localStorage.setItem('fnar_neon_likes', JSON.stringify(likedIds));
  }, [likedIds]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleLikeToggle = (id: string) => {
    const isCurrentlyLiked = likedIds.includes(id);
    let newLikedIds: string[];

    if (isCurrentlyLiked) {
      newLikedIds = likedIds.filter((item) => item !== id);
    } else {
      newLikedIds = [...likedIds, id];
    }

    setLikedIds(newLikedIds);

    // Update counts
    setLinks((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            likesCount: isCurrentlyLiked ? item.likesCount - 1 : item.likesCount + 1,
          };
        }
        return item;
      })
    );

    showToast(isCurrentlyLiked ? 'تم إزالة الإعجاب' : 'شكراً لتقييمك الرابط! ❤️');
  };

  const handleSharePage = () => {
    soundManager.playCopySound();
    if (navigator.share) {
      navigator.share({
        title: 'الأكثر إعجاباً - فاضل المبارك',
        text: 'استعرض الروابط والتطبيقات الأكثر إعجاباً',
        url: window.location.href,
      }).catch(() => {
        navigator.clipboard.writeText(window.location.href);
        showToast('تم نسخ رابط الصفحة للحافظة!');
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('تم نسخ رابط الصفحة للحافظة!');
    }
  };

  const totalLikes = links.reduce((acc, curr) => acc + curr.likesCount, 0);

  const filteredLinks = links.filter(
    (link) =>
      link.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      link.badgeText.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#06050e] text-slate-100 flex flex-col justify-between relative overflow-x-hidden dir-rtl">
      {/* Background Cyberpunk Grid & Ambient Lights */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="fixed top-1/4 -right-32 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 -left-32 w-96 h-96 bg-pink-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {/* Header Component */}
        <Header
          soundEnabled={soundEnabled}
          setSoundEnabled={setSoundEnabled}
          totalLikes={totalLikes}
          onShare={handleSharePage}
        />

        {/* Search Bar & Stats Filter */}
        <section className="mb-10 max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <Search className="absolute right-4 w-5 h-5 text-cyan-400 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="ابحث عن رابط أو تطبيق..."
              className="w-full pl-4 pr-12 py-3.5 bg-slate-900/80 border border-cyan-500/30 rounded-2xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 shadow-[0_0_20px_rgba(0,243,255,0.1)] backdrop-blur-md transition-all font-tajawal"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute left-4 text-xs bg-slate-800 text-slate-400 px-2 py-1 rounded-lg hover:text-white"
              >
                مسح
              </button>
            )}
          </div>
        </section>

        {/* Grid of the 4 Main Links */}
        <main className="mb-12">
          {filteredLinks.length === 0 ? (
            <div className="text-center py-12 bg-slate-900/40 border border-slate-800 rounded-3xl p-8">
              <Sparkles className="w-10 h-10 text-cyan-400 mx-auto mb-3 animate-bounce" />
              <p className="text-slate-300 font-bold font-cairo text-lg">لم نجد نتائج مطابقة للبحث</p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 px-4 py-2 rounded-xl bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-xs font-bold"
              >
                إعادة عرض جميع الروابط
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {filteredLinks.map((link, idx) => (
                <NeonCard
                  key={link.id}
                  link={link}
                  index={idx}
                  onPreview={(l) => setPreviewLink(l)}
                  onLikeToggle={handleLikeToggle}
                  isLiked={likedIds.includes(link.id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Footer Component */}
      <Footer />

      {/* Preview Modal */}
      <PreviewModal
        link={previewLink}
        onClose={() => setPreviewLink(null)}
      />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-slate-900 border border-cyan-400 text-cyan-200 px-5 py-3 rounded-2xl shadow-[0_0_25px_rgba(0,243,255,0.4)] text-xs sm:text-sm font-bold font-cairo flex items-center gap-2 backdrop-blur-xl"
          >
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
