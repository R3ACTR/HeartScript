"use client";

import { useState } from "react";
import CardPreview from "./CardPreview";

export default function ValentineCardGenerator() {
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="p-6 max-w-xl mx-auto">

      {/* Input Section */}
      <div className="space-y-4">

        <div>
          <label className="block text-sm font-medium">
            Recipient Name
          </label>
          <input
            type="text"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Enter recipient name"
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Personal Message
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message"
            className="w-full border rounded p-2"
          />
        </div>

      </div>

      <CardPreview
  recipient={recipient}
  message={message}
/>

    </div>
  );
}
