import React from "react";
import { useAuth } from "./hooks/useAuth";
import Login from "./components/Login";
import LogoutButton from "./components/LogoutButton";
import CalendarView from "./components/CalendarView";

function App() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <LogoutButton />
      <h1 className="text-2xl font-bold text-center mb-4 text-black">
        Outfit Tracker
      </h1>
      <CalendarView user={user} />
    </div>
  );
}

export default App;
