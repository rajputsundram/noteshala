// app/loading.tsx
'use client'

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center backdrop-blur-lg bg-white/90 dark:bg-gray-900/90">
      <div className="flex items-center space-x-3">
        <span className="relative font-mono text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {/* Shimmer effect */}
          <span className="absolute inset-0 overflow-hidden">
            <span className="block h-full w-full bg-gradient-to-r from-transparent via-blue-500/30 to-transparent dark:via-cyan-400/30 animate-shimmer" />
          </span>
          <span className="relative">Loading</span>
        </span>

        {/* Bouncing dots */}
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-blue-500 dark:bg-cyan-400 animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-shimmer {
          animation: shimmer 2s linear infinite;
        }
        .animate-bounce {
          animation: bounce 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
