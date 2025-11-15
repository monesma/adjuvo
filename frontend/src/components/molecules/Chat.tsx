import { useEffect, useRef, useState } from "react";
import Gun from "gun";
import "gun/sea";

const gun = Gun(['https://gun-manhattan.herokuapp.com/gun']);

interface ChatProps {
  missionId: string;
  senderId: string;
  senderName: string;
}

type Message = {
  senderId: string;
  senderName: string;
  content: string;
  timestamp: number;
};

export default function Chat({ missionId, senderId, senderName }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef<HTMLDivElement | null>(null);

  const chatPath = `mission-chat-${missionId}`;

  useEffect(() => {
    const chat = gun.get(chatPath);

    chat.map().on((data: Message) => {
      if (data) {
        setMessages((prev) => {
          const exists = prev.find((m) => m.timestamp === data.timestamp);
          if (exists) return prev;
          return [...prev, data].sort((a, b) => a.timestamp - b.timestamp);
        });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [missionId]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      senderId,
      senderName,
      content: newMessage.trim(),
      timestamp: Date.now(),
    };

    gun.get(chatPath).set(message);
    setNewMessage("");
  };

  return (
    <div className="bg-black/40 border border-indigo-500 rounded-lg p-4 w-full">
      <h3 className="text-indigo-300 font-bold mb-2 text-lg">Live Chat</h3>
      <div
        ref={chatRef}
        className="bg-black/20 h-64 overflow-y-auto p-2 rounded-md border border-indigo-400 mb-2"
      >
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.senderId === senderId ? "text-right" : "text-left"}`}>
            <div className="text-xs text-gray-400">
              {msg.senderName} — {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
            <div className="bg-indigo-700/30 inline-block px-3 py-1 rounded-md text-white max-w-[70%] break-words">
              {msg.content}
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 bg-black/60 border border-indigo-400 rounded-md text-white"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-md text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
