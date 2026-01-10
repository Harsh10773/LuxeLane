import { useNavigate } from 'react-router-dom';

const LoginScreen = () => {
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        // Mock login
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center pt-10">
            <h1 className="text-3xl font-black tracking-tight mb-6">LUXELANE</h1>

            <div className="w-full max-w-[350px] border rounded-lg p-6 shadow-sm">
                <h2 className="text-2xl font-normal mb-4">Sign in</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-bold mb-1">Email or mobile phone number</label>
                        <input type="email" className="w-full border rounded px-3 py-1.5 focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] focus:border-[#e77600] outline-none transition-shadow" />
                    </div>
                    <div>
                        <label className="block text-sm font-bold mb-1">Password</label>
                        <input type="password" className="w-full border rounded px-3 py-1.5 focus:shadow-[0_0_3px_2px_rgba(228,121,17,0.5)] focus:border-[#e77600] outline-none transition-shadow" />
                    </div>
                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 border border-yellow-600 rounded-sm py-1.5 text-sm shadow-sm font-medium">
                        Sign in
                    </button>
                </form>

                <p className="text-xs text-gray-600 mt-4 leading-normal">
                    By continuing, you agree to LuxeLane's <span className="text-blue-600 hover:underline cursor-pointer">Conditions of Use</span> and <span className="text-blue-600 hover:underline cursor-pointer">Privacy Notice</span>.
                </p>

                <div className="relative mt-6 mb-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">New to LuxeLane?</span>
                    </div>
                </div>

                <div className="w-full bg-gray-50 border hover:bg-gray-100 border-gray-300 rounded shadow-sm py-1.5 text-sm font-medium text-center cursor-pointer">
                    Create your LuxeLane account
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
