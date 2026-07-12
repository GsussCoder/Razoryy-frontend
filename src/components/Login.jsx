import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import RazoryyLogo from "../assets/logo.svg";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const { doLogin, isLoading, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const ok = await doLogin(email, password);

    if (ok) navigate("/dashboard");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-900 p-4">
      <div className="w-full max-w-md">
        <header className="shrink-0 px-4 py-4">
          <div className="flex flex-col items-center">
            <a
              href="/"
              className="flex items-center justify-center gap-2 w-fit mb-1"
            >
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <img src={RazoryyLogo} alt="Razoryy" className="w-5 h-5" />
              </div>
              <span className="text-base font-bold text-white">
                Razor<span className="text-indigo-400">yy</span>
              </span>
            </a>
            <p className="w-fit text-sm text-slate-400">¿Ya eres barbero?</p>
          </div>
        </header>
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 shadow-2xl">
          <h2 className="text-xl font-semibold text-white text-center">
            Iniciar Sesión
          </h2>
          <p className="mb-4 text-center text-slate-400">
            ¡Ingresa tus credenciales para acceder!
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="example@gmail.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-slate-900 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                <p className="text-sm text-red-400 text-center">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Ingresar al sistema"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-slate-500 text-sm mt-4">
          © 2026 Razoryy. Todos los derechos reservados.
        </p>
      </div>
    </main>
  );
}
