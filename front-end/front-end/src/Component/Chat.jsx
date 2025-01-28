/* Chat Component */
export const Chat = () => {
  return (
    <aside className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h3 className="text-3xl font-bold mb-6 text-gray-800 text-center">
        Chats
      </h3>
      <div className="space-y-4">
        {[
          { name: 'nilmadhab1994' },
          { name: 'test@gmail.com' },
          { name: 'Smit Tailor' },
        ].map((chat, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-gray-50 rounded-lg p-4 shadow-sm hover:shadow-md transition duration-200 border border-gray-200"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-lg font-bold">
                {chat.name[0].toUpperCase()}
              </div>
              <span className="font-semibold text-gray-700">{chat.name}</span>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 active:bg-blue-700 transition duration-200">
              Chat
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
};
