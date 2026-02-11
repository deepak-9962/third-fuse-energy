/**
 * WhatsApp Floating Button Component
 * Fixed bottom-right button that opens WhatsApp chat.
 * Shows a tooltip chat bubble after a delay on first visit.
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/** TODO: Replace with your WhatsApp Business number (digits only, with country code) */
const WHATSAPP_NUMBER = 'REPLACE_WITH_NUMBER';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
const TOOLTIP_STORAGE_KEY = 'whatsapp-tooltip-dismissed';
const TOOLTIP_DELAY_MS = 5000;
const MOUNT_DELAY_S = 2;

const GREETING_MESSAGE = 'Hi! Need help with solar? Chat with us 👋';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Hydration-safe mount
  useEffect(() => {
    setMounted(true);
    const dismissed = localStorage.getItem(TOOLTIP_STORAGE_KEY) === 'true';
    setTooltipDismissed(dismissed);
  }, []);

  // Auto-show tooltip after delay (only once per session if not dismissed)
  useEffect(() => {
    if (tooltipDismissed || !mounted) return;
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, TOOLTIP_DELAY_MS + MOUNT_DELAY_S * 1000);
    return () => clearTimeout(timer);
  }, [tooltipDismissed, mounted]);

  const dismissTooltip = useCallback(() => {
    setShowTooltip(false);
    setTooltipDismissed(true);
    localStorage.setItem(TOOLTIP_STORAGE_KEY, 'true');
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 no-print safe-bottom">
      {/* Tooltip Chat Bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.4, 0.0, 0.2, 1] }}
            className="relative max-w-[260px] rounded-xl bg-white p-4 shadow-xl"
          >
            {/* Close button */}
            <button
              onClick={dismissTooltip}
              className="absolute top-1 right-2 text-gray-400 hover:text-gray-600 text-lg leading-none focus:outline-none"
              aria-label="Close WhatsApp tooltip"
            >
              ×
            </button>

            <p className="pr-4 text-sm text-gray-700">{GREETING_MESSAGE}</p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={dismissTooltip}
              className="mt-2 inline-block rounded-lg bg-[#25D366] px-4 py-1.5 text-sm font-medium text-white hover:bg-[#1fba59] transition-colors"
            >
              Start Chat
            </a>

            {/* Speech bubble tail */}
            <div className="absolute -bottom-2 right-6 h-0 w-0 border-l-[8px] border-r-[8px] border-t-[8px] border-l-transparent border-r-transparent border-t-white" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp FAB */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: MOUNT_DELAY_S, type: 'spring', stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => {
          if (!tooltipDismissed) setShowTooltip(true);
        }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-xl transition-shadow md:h-16 md:w-16"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] whatsapp-ping" />

        {/* WhatsApp Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="relative z-10 h-7 w-7 md:h-8 md:w-8"
        >
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16c0 3.5 1.128 6.744 3.046 9.378L1.054 31.29l6.118-1.958A15.908 15.908 0 0016.004 32C24.826 32 32 24.822 32 16S24.826 0 16.004 0zm9.316 22.612c-.39 1.1-1.932 2.014-3.18 2.28-.854.18-1.968.324-5.72-1.23-4.804-1.988-7.894-6.862-8.134-7.182-.23-.32-1.938-2.58-1.938-4.922 0-2.342 1.228-3.494 1.664-3.97.39-.428 1.026-.642 1.636-.642.198 0 .376.01.536.018.47.02.706.048 1.016.786.39.926 1.338 3.268 1.454 3.506.118.238.236.56.078.878-.148.328-.278.528-.516.808-.238.28-.498.496-.736.794-.22.26-.466.538-.2.976.268.438 1.19 1.964 2.554 3.182 1.756 1.566 3.234 2.052 3.694 2.28.46.228.728.19.996-.118.278-.316 1.182-1.378 1.498-1.852.308-.474.624-.394 1.054-.236.434.158 2.774 1.308 3.248 1.546.474.238.79.356.908.554.116.198.116 1.148-.274 2.248v-.006z" />
        </svg>
      </motion.a>
    </div>
  );
}
