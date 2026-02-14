<motion.button
  type="submit"
  disabled={isCalculating}
  whileHover={{ 
    scale: 1.02,
    boxShadow: "0 0 22px rgba(196, 30, 58, 0.55)" // ❤️ glow hover effect
  }}
  whileTap={{ scale: 0.98 }}
  className="
    w-full py-4
    rounded-xl font-bold text-lg text-white
    transition-all duration-300
    disabled:opacity-70 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
  "
  style={{ 
    background: `linear-gradient(135deg, ${VALENTINE_COLORS.rose} 0%, ${VALENTINE_COLORS.wine} 100%)`,
    boxShadow: "0 10px 30px rgba(196, 30, 58, 0.3)"
  }}
  aria-label={isCalculating ? "Calculating your results" : "Calculate potential soulmates"}
>
  {isCalculating ? (
    <>
      <motion.div
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        aria-hidden="true"
      >
        <Heart className="w-6 h-6 fill-current" />
      </motion.div>
      <span>Calculating Destiny...</span>
    </>
  ) : (
    <>
      <Search className="w-6 h-6" aria-hidden="true" />
      <span>Reveal My Soulmate Count 💝</span>
    </>
  )}
</motion.button>
