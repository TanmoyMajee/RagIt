


// client/src/pages/Signup.tsx

import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const {login} = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    // console.log(e);
    try {
      setLoading(true);
      const backendURL = import.meta.env.VITE_BACKEND_URL || "";
      const respose = await axios.post(`${backendURL}/auth/register`, {
        email,
        password,
        name,
      })

      //  console.log(respose.data);

      if (respose.data) {
        // set the token in local storage then redict to chat page
        login(respose.data.user, respose.data.token);
        setEmail(''); setName(''); setPassword('');
        navigate('/chat');
      }
    } catch (error) {
      console.error("Login error:", error);
    }finally{ setLoading(false); }
    // now call the api and if suces se the user and redirect to chat 
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-700">Create your RagIT account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block  mb-2">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block  mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block  mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Create a password"
              autoComplete="new-password"
              required
            />
          </div>
          <button
            disabled={loading}
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded-lg font-semibold hover:bg-blue-800 transition-colors"
          >
            {
              (!loading)? "Signup" : "loading wait"
            }
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-400">Already have an account?</span>
          <a href="/login" className="text-blue-700 font-semibold ml-2 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;