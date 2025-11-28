import React, { useState } from "react";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <>
          <Login onLogin={setUser} />
          <Signup onSignup={setUser} />
        </>
      ) : (
        <Dashboard user={user} />
      )}
    </div>
  );
}

export default App;
