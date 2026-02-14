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
    <div className="mt-6 border rounded p-4">

      <h3 className="font-semibold">
        Preview
      </h3>

      <p>
        To: {recipient || "Someone Special"}
      </p>

      <p>
        {message || "Your message will appear here..."}
      </p>

    </div>
  );
}
