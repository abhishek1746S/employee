import React, { useState } from "react";
import {
  FaPaperPlane,
  FaSearch,
  FaUserCircle,
  FaArrowLeft,
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

  const [messages] = useState(initialMessages);

  const [input, setInput] = useState("");

  const [showChat, setShowChat] = useState(false);

  return (

    <div className="min-h-screen bg-[#F8F9FC] p-4 sm:p-5 lg:p-6">

      <div className="bg-white rounded-2xl shadow-sm h-[calc(100vh-120px)] overflow-hidden flex">

        <div
          className={`${
            showChat ? "hidden lg:flex" : "flex"
          } w-full lg:w-80 border-r flex-col`}
        >

          <div className="p-5 border-b">

            <h1 className="text-2xl font-bold">
              Messages
            </h1>

            <div className="relative mt-5">

              <FaSearch className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search Candidate"
                className="w-full pl-12 pr-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-violet-500"
              />

            </div>

          </div>

          <div className="flex-1 overflow-y-auto">

            {users.map((user) => (

              <div
                key={user.id}
                onClick={() => {
                  setSelectedUser(user);
                  setShowChat(true);
                }}
                className={`flex items-center gap-4 p-4 border-b cursor-pointer hover:bg-violet-50 transition

                ${
                  selectedUser.id === user.id
                    ? "bg-violet-100"
                    : ""
                }`}
              >

                <div className="relative">

                  <FaUserCircle
                    size={46}
                    className="text-violet-600"
                  />

                  {user.online && (

                    <div className="absolute bottom-1 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></div>

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

        </div>        <div
          className={`${
            showChat ? "flex" : "hidden lg:flex"
          } flex-1 flex-col`}
        >

          <div className="border-b p-5 flex items-center gap-4">

            <button
              onClick={() => setShowChat(false)}
              className="lg:hidden text-violet-600"
            >

              <FaArrowLeft size={22} />

            </button>

            <FaUserCircle
              size={46}
              className="text-violet-600"
            />

            <div>

              <h2 className="font-bold text-lg sm:text-xl">
                {selectedUser.name}
              </h2>

              <p
                className={`text-sm ${
                  selectedUser.online
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              >

                {selectedUser.online
                  ? "Online"
                  : "Offline"}

              </p>

            </div>

          </div>

          <div className="flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-6 space-y-4">

            {messages[selectedUser.id].map((msg, index) => (

              <div
                key={index}
                className={`flex ${
                  msg.sender === "employee"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[85%] sm:max-w-sm px-4 py-3 rounded-2xl break-words ${
                    msg.sender === "employee"
                      ? "bg-violet-600 text-white"
                      : "bg-white shadow"
                  }`}
                >

                  {msg.text}

                </div>

              </div>

            ))}

          </div>          <div className="border-t bg-white p-4 sm:p-5">

            <div className="flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-violet-500"
              />

              <button
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 transition text-white px-6 py-3 rounded-xl"
              >

                <FaPaperPlane />

                <span className="sm:hidden">
                  Send
                </span>

              </button>

            </div>

          </div>

        </div>

      </div>    </div>

  );
};

export default Messages;