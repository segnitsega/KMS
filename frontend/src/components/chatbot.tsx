import { FiMessageCircle } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { LuBot } from "react-icons/lu";
import { TbLetterX } from "react-icons/tb";
import { IoIosSend } from "react-icons/io";
import { Input } from "./ui/input";
import api from "@/utility/api";
import { useAuthStore } from "@/stores/auth-store";

type MsgRole = "user" | "assistant";

type Message = {
  id: string;
  role: MsgRole;
  text: string;
  createdAt: string;
};

const ChatBubble = ({
  role,
  children,
}: {
  role: MsgRole;
  children: React.ReactNode;
}) => (
  <div
    className={`mb-2 flex items-start ${
      role === "user" ? "justify-end" : "justify-start"
    }`}
  >
    {/* Show bot icon only for assistant */}
    {role === "assistant" && (
      <LuBot className="text-xl text-gray-600 mr-2 mt-1" />
    )}

    <div
      className={`px-3 py-2 rounded-lg max-w-[70%] text-sm ${
        role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
      }`}
    >
      {children}
    </div>
  </div>
);

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const user = useAuthStore((s) => s.userData);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || sending) return;
    if (!user?.id) {
      alert("You need to be logged in to use the assistant.");
      return;
    }

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: "user",
      text: input,
      createdAt: new Date().toISOString(),
    };

    // Optimistic append
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setSending(true);

    try {
      const { data } = await api.post("/chat", {
        message: userMsg.text,
        userId: user.id,
      });

      const replyText: string =
        (data && typeof data.reply === "string" && data.reply) ||
        "Sorry, I can only help with this platform.";

      const botMsg: Message = {
        id: `a-${Date.now()}`,
        role: "assistant",
        text: replyText,
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.log("Errorrr", err)
      const errorMsg: Message = {
        id: `e-${Date.now()}`,
        role: "assistant",
        text: "⚠️ Failed to contact the assistant. Please try again.",
        createdAt: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, errorMsg]);
      console.error("Chat send error:", err);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-8 z-50 rounded-t-lg">
      {isOpen ? (
        <div className="border rounded-t-lg shadow h-[420px] w-[320px] flex flex-col bg-white">
          {/* header */}
          <div className="p-4 bg-blue-500 flex items-center justify-between text-white rounded-t-md">
            <div className="flex items-center gap-2">
              <LuBot />
              <span>AI Assistant</span>
            </div>
            <TbLetterX
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
            />
          </div>

          {/* messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.length === 0 ? (
              <div className="text-gray-400 text-sm">
                Hi {user?.firstName ?? ""}! I can help you with documents,
                articles, discussions, your tasks, and library. Try:{" "}
                <em>“Show my recent tasks”</em> or{" "}
                <em>“Where can I upload a document?”</em>
              </div>
            ) : (
              <>
                {messages.map((m) => (
                  <ChatBubble key={m.id} role={m.role}>
                    {m.text}
                  </ChatBubble>
                ))}

                {/* Thinking bubble */}
                {sending && (
                  <ChatBubble role="assistant">
                    <span className="italic text-gray-500">Thinking…</span>
                  </ChatBubble>
                )}
              </>
            )}
            <div ref={bottomRef} />
          </div>

          {/* footer */}
          <div className="p-2 border-t flex items-center gap-2">
            <Input
              placeholder={sending ? "Sending..." : "Ask me anything here…"}
              className="p-2 text-sm"
              value={input}
              disabled={sending}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <IoIosSend
              onClick={sendMessage}
              className={`p-1 rounded-md text-white cursor-pointer ${
                sending ? "bg-gray-400" : "bg-blue-500"
              }`}
              size={30}
              title="Send"
            />
          </div>
        </div>
      ) : (
        <FiMessageCircle
          onClick={() => setIsOpen(true)}
          className="text-white bg-blue-500 p-3 rounded-full cursor-pointer"
          size={55}
        />
      )}
    </div>
  );
};

export default Chatbot;
