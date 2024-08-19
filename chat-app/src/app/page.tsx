"use client";
import { FormEvent, useState } from "react";
import { socket } from "@/util/socket";

interface IMessages {
  message: string;
  userId: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Array<IMessages> | undefined>([]);
  const [message, setMessage] = useState<string>("");

  const onChange = (e: any) => {
    setMessage(e.target.value);
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    console.log(socket);
    if (message && messages && socket.id) {
      setMessages([...messages, { userId: socket.id, message }]);
      setMessage("");
      socket.emit("newMessage", { message, from: socket.id });
    }
  };

  socket.on("connected", async (data) => console.log(data));

  return (
    <main className="size-full flex items-center">
      <div className="bg-black h-[90%] w-[80%] mx-auto flex border-2 rounded-lg flex-col justify-between p-1 gap-2">
        <div className="w-full border-2 rounded-lg h-full p-2 flex flex-col overflow-scroll s">
          {messages?.map((e, i) => (
            <div className="pb-2" key={i}>
              <p
                className={`bg-slate-600 ${
                  e.userId === "my" ? "float-right" : "float-left"
                } px-2 rounded-md`}
              >
                {e.message}
              </p>
            </div>
          ))}
        </div>
        <form
          className="flex justify-center items-center gap-2"
          onSubmit={submit}
        >
          <input
            type="text"
            className="bg-transparent border-2 rounded-full px-3 h-12 w-full outline-none"
            placeholder="message..."
            onChange={onChange}
            value={message}
          />
          <button
            type="submit"
            className="bg-white text-black font-medium rounded-full w-20 h-12 text-center"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
