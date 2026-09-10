import { useAuth } from './context/AuthContext';

function App() {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Clothing Store E-Commerce</h1>
        {user ? (
          <div>
            <p className="mb-2 text-green-600 font-medium">Welcome, {user.name}!</p>
            <p className="text-sm text-gray-500 mb-6">{user.email}</p>
            <button
              onClick={logout}
              className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        ) : (
          <p className="text-gray-600">Please log in or sign up via Postman/API to test frontend state.</p>
        )}
      </div>
    </div>
  );
}

export default App;