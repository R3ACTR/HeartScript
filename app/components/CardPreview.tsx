"use client";

interface CardPreviewProps {
  recipient: string;
  message: string;
}

export default function CardPreview({
  recipient,
  message,
}: CardPreviewProps) {
  return (
    <div className="mt-8 flex justify-center">

      {/* Card Container */}
      <div className="
        w-full max-w-md
        bg-gradient-to-br from-pink-500 via-rose-500 to-red-500
        text-white
        rounded-2xl
        shadow-2xl
        p-8
        relative
        overflow-hidden
        transform transition duration-300 hover:scale-105
      ">

        {/* Decorative hearts */}
        <div className="absolute top-2 right-3 text-2xl opacity-70">❤️</div>
        <div className="absolute bottom-2 left-3 text-xl opacity-70">💖</div>

        {/* Header */}
        <h3 className="text-center text-lg font-semibold opacity-90 mb-4">
          Valentine Card Preview
        </h3>

        {/* Recipient */}
        <p className="text-lg mb-3">
          Dear{" "}
          <span className="font-bold">
            {recipient || "Someone Special"}
          </span>,
        </p>

        {/* Message */}
        <p className="text-base leading-relaxed min-h-[80px]">
          {message || "Your beautiful message will appear here..."}
        </p>

        {/* Footer */}
        <p className="mt-6 text-right italic opacity-90">
          With ❤️
        </p>

      </div>

    </div>
  );
}
