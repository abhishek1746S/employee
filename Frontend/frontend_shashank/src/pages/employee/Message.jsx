import React, { useState } from "react";
import {
  FaPaperPlane,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "Ananya Singh",
    role: "Frontend Developer",
    online: true,
  },
  {
    id: 2,
    name: "Rohit Verma",
    role: "Backend Developer",
    online: true,
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Software Engineer",
    online: false,
  },
];

const initialMessages = {
  1: [
    {
      sender: "candidate",
      text: "Hello Sir 👋",
    },
    {
      sender: "employee",
      text: "Hello Ananya",
    },
    {
      sender: "candidate",
      text: "Can I get referral?",
    },
  ],

  2: [
    {
      sender: "candidate",
      text: "Good Morning Sir",
    },
  ],

  3: [
    {
      sender: "employee",
      text: "Resume received.",
    },
  ],
};

const Messages = () => {

  const [selectedUser, setSelectedUser] = useState(users[0]);

  const [messages, setMessages] = useState(initialMessages);

  const [input, setInput] = useState("");
  return (
  <div className="h-full p-6 overflow-hidden">

    <div className="bg-white rounded-2xl shadow flex h-full overflow-hidden">

      {/* LEFT SIDE */}

      <div className="w-80 border-r flex flex-col h-full">

        <div className="p-5">

          <h1 className="text-2xl font-bold">
            Messages
          </h1>

          <div className="relative mt-5">

            <FaSearch className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Search Candidate"
              className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none"
            />

          </div>

        </div>

        <div className="flex-1 overflow-y-auto">

          {users.map((user) => (

            <div
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`p-4 border-b cursor-pointer flex gap-4 items-center hover:bg-violet-50

              ${selectedUser.id === user.id ? "bg-violet-100" : ""}

              `}
            >

              <div className="relative">

                <FaUserCircle
                  size={45}
                  className="text-violet-600"
                />

                {user.online && (

                  <div className="w-3 h-3 rounded-full bg-green-500 absolute bottom-1 right-0 border-2 border-white"></div>

                )}

              </div>

              <div>

                <h2 className="font-semibold">
                  {user.name}
                </h2>

                <p className="text-sm text-gray-500">
                  {user.role}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* RIGHT SIDE */}

      <div className="flex-1 flex flex-col h-full overflow-hidden">

        <div className="border-b p-5 flex items-center gap-4">

          <FaUserCircle
            size={45}
            className="text-violet-600"
          />

          <div>

            <h2 className="font-bold text-xl">
              {selectedUser.name}
            </h2>

            <p className="text-green-500">

              {selectedUser.online ? "Online" : "Offline"}

            </p>

          </div>

        </div>

        {/* CHAT */}

        <div className="flex-1 overflow-y-scroll p-6 bg-gray-100 space-y-4">

          {messages[selectedUser.id].map((msg, index) => (

            <div
              key={index}
              className={`flex

              ${msg.sender === "employee"
                ? "justify-end"
                : "justify-start"}

              `}
            >

              <div
                className={`

                max-w-sm

                px-4

                py-3

                rounded-2xl

                ${msg.sender === "employee"

                    ? "bg-violet-600 text-white"

                    : "bg-white shadow"}

                `}
              >

                {msg.text}

              </div>

            </div>

          ))}

        </div>

        {/* INPUT */}

        <div className="border-t p-5 flex gap-4 bg-white sticky bottom-0">

          <input

            value={input}

            onChange={(e) => setInput(e.target.value)}

            placeholder="Type your message..."

            className="flex-1 border rounded-xl px-4"

          />

          <button
            className="bg-violet-600 hover:bg-violet-700 text-white px-6 rounded-xl"
          >

            <FaPaperPlane />

          </button>

        </div>

      </div>

    </div>

  </div>
);
};

export default Messages;