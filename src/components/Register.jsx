import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Loader2,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  MapPin,
} from "lucide-react";
import { apiClient } from "../services/apiClient";
import { useToast } from "../contexts/ToastContext";
import { useDetectLocation } from "../hooks/useDetectLocation";
import RazoryyLogo from "../assets/logo.svg";
import { useRegister } from "../hooks/useRegister";

const MEMBERSHIP_PLANS = [
  {
    value: "PRO",
    label: "PRO (Prueba gratis de 20 días)",
    price: "30.000",
    description:
      "Plan independiente, hasta 2 barberos, 1 sucursal y más operaciones.",
  },
  {
    value: "BUSINESS",
    label: "Business (Prueba gratis de 20 días)",
    price: "70.000",
    description:
      "Plan avanzado. hasta 8 barberos, 2 sucursales y más operaciones.",
  },
];

const INITIAL_STATE = {
  // Paso 1
  barberName: "",
  membership: "PRO",
  locationData: {
    country: "",
    state: "",
    city: "",
    address: "",
  },
  // Paso 2
  name: "",
  number: "",
  email: "",
  password: "",
  confirmPassword: ""
};

export default function Register() {
  const navigate = useNavigate();
  const { showError, showSuccess } = useToast();
  const { register, isLoading, error } = useRegister();
  const { detect, detecting, locationError } = useDetectLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [submitting, setSubmitting] = useState(false);

  // Cambios en campos raíz
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Cambios en locationData (campos anidados)
  const handleLocationChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      locationData: { ...prev.locationData, [name]: value },
    }));
  };

  const handleDetectLocation = async () => {
    try {
      const location = await detect();
      setFormData((prev) => ({
        ...prev,
        locationData: {
          ...prev.locationData,
          country: location.country,
          state: location.state,
          city: location.city,
          // address la dejamos intacta — el usuario la escribe siempre
        },
      }));
    } catch {
      // locationError ya está seteado en el hook, lo mostramos abajo
    }
  };

  const validateStep1 = () => {
    const { barberName, locationData } = formData;
    if (!barberName.trim()) return "El nombre de la barbería es obligatorio.";
    if (!locationData.country.trim()) return "El país es obligatorio.";
    if (!locationData.state.trim())
      return "El departamento/estado es obligatorio.";
    if (!locationData.city.trim()) return "La ciudad es obligatoria.";
    if (!locationData.address.trim()) return "La dirección es obligatoria.";
    return null;
  };

  const validateStep2 = () => {
    const { name, number, email, password, confirmPassword } = formData;
    if (!name.trim()) return "El nombre completo es obligatorio.";
    if (!number.trim()) return "El teléfono es obligatorio.";
    if (!email.trim()) return "El correo es obligatorio.";
    if (password.length < 6)
      return "La contraseña debe tener al menos 6 caracteres.";
    if (password !== confirmPassword) return "Las contraseñas no coinciden.";
    return null;
  };

  const handleNext = () => {
    const error = validateStep1();
    if (error) {
      showError(error);
      return;
    }
    setStep(2);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateStep2();
    if (error) {
      showError(error);
      return;
    }

    setSubmitting(true);
    try {
      const { confirmPassword, ...payload } = formData;
      await register(
        payload.barberName,
        payload.locationData,
        payload.membership,
        payload.name,
        payload.number,
        payload.email,
        payload.password,
      );
      showSuccess("¡Barbería registrada! Ya puedes iniciar sesión.");
      navigate("/login");
    } catch (err) {
      showError(
        err.message || "No se pudo completar el registro. Inténtalo de nuevo.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm disabled:opacity-50 transition-colors";
  const labelClass = "block text-sm font-medium text-slate-300 mb-1.5";

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <header className="shrink-0 px-4 py-4 border-b border-slate-800">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <img src={RazoryyLogo} alt="Razoryy" className="w-5 h-5" />
            </div>
            <span className="text-base font-bold text-white">
              Razor<span className="text-indigo-400">yy</span>
            </span>
          </a>
          <a
            href="/login"
            className="text-sm text-slate-400 hover:text-white transition-colors"
          >
            ¿Ya tienes cuenta?
          </a>
        </div>
      </header>

      {/* Body */}
      <main className="flex-1 px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Título */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-white">
              {step === 1
                ? "Registra tu barbería"
                : "Crea tu cuenta de administrador"}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              {step === 1
                ? "Cuéntanos sobre tu negocio para comenzar."
                : "Esta será la cuenta principal para gestionar todo."}
            </p>
          </div>

          {/* Barra de progreso */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              {[1, 2].map((s) => (
                <div key={s} className="flex items-center gap-2 flex-1">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      s < step
                        ? "bg-indigo-600 text-white"
                        : s === step
                          ? "bg-indigo-600 text-white ring-2 ring-indigo-400/30"
                          : "bg-slate-700 text-slate-400"
                    }`}
                  >
                    {s < step ? <CheckCircle className="w-4 h-4" /> : s}
                  </div>
                  {s < 2 && (
                    <div
                      className={`h-0.5 flex-1 rounded transition-colors ${s < step ? "bg-indigo-600" : "bg-slate-700"}`}
                    />
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500">Paso {step} de 2</p>
          </div>

          {/* PASO 1 — El negocio */}
          {step === 1 && (
            <div className="space-y-5">
              {/* Nombre de la barbería */}
              <div>
                <label className={labelClass}>Nombre de la barbería</label>
                <input
                  type="text"
                  name="barberName"
                  value={formData.barberName}
                  onChange={handleChange}
                  placeholder="Ej. La Paternal Barber Club"
                  className={inputClass}
                  required
                />
              </div>

              {/* Plan */}
              <div>
                <label className={labelClass}>Plan de membresía</label>
                <div className="space-y-2">
                  {MEMBERSHIP_PLANS.map((plan) => (
                    <label
                      key={plan.value}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border cursor-pointer transition-colors ${
                        formData.membership === plan.value
                          ? "border-indigo-500 bg-indigo-500/10"
                          : "border-slate-700 bg-slate-800 hover:border-slate-600"
                      }`}
                    >
                      <input
                        type="radio"
                        name="membership"
                        value={plan.value}
                        checked={formData.membership === plan.value}
                        onChange={handleChange}
                        className="mt-0.5 accent-indigo-500"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-white">
                            {plan.label}
                          </span>
                          {plan.popular && (
                            <span className="px-1.5 py-0.5 bg-indigo-600 text-white text-xs rounded-full font-medium">
                              Plan independiente
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {plan.description}
                        </p>
                      </div>
                      <span className="text-sm font-bold text-white shrink-0">
                        ${plan.price}
                        <span className="text-slate-400 font-normal text-xs">
                          /mes
                        </span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ubicación */}
              <div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className={labelClass}>Ubicación del negocio</p>
                    <button
                      type="button"
                      onClick={handleDetectLocation}
                      disabled={detecting}
                      className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 disabled:opacity-50 transition-colors"
                    >
                      {detecting ? (
                        <>
                          <Loader2 className="w-3 h-3 animate-spin" />
                          Detectando...
                        </>
                      ) : (
                        <>
                          <MapPin className="w-3 h-3" />
                          Detectar automáticamente
                        </>
                      )}
                    </button>
                  </div>

                  {locationError && (
                    <p className="text-xs text-red-400 mb-2">{locationError}</p>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* los 4 inputs igual que antes */}
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      País
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.locationData.country}
                      onChange={handleLocationChange}
                      placeholder="Colombia"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Departamento / Estado
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.locationData.state}
                      onChange={handleLocationChange}
                      placeholder="Sucre"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.locationData.city}
                      onChange={handleLocationChange}
                      placeholder="Sincelejo"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">
                      Dirección
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.locationData.address}
                      onChange={handleLocationChange}
                      placeholder="Calle 25 # 10-45"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Continuar
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* PASO 2 — La cuenta */}
          {step === 2 && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Nombre completo</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Carlos Mendoza"
                  className={inputClass}
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className={labelClass}>Teléfono / WhatsApp</label>
                <input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="+57 313 880 2211"
                  className={inputClass}
                  required
                  disabled={submitting}
                />
              </div>

              <div>
                <label className={labelClass}>Correo electrónico</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="carlos@barberia.com"
                  className={inputClass}
                  required
                  disabled={submitting}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={labelClass}>Contraseña</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    minLength={6}
                    className={inputClass}
                    required
                    disabled={submitting}
                  />
                </div>
                <div>
                  <label className={labelClass}>Confirmar contraseña</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    minLength={6}
                    className={inputClass}
                    required
                    disabled={submitting}
                  />
                </div>
              </div>

              <p className="text-xs text-slate-500">
                Al registrarte aceptas nuestros{" "}
                <a href="#" className="text-indigo-400 hover:underline">
                  términos y condiciones
                </a>
                .
              </p>

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  disabled={submitting}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-700 hover:bg-slate-600 text-slate-200 rounded-xl text-sm font-medium transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Atrás
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Registrando...
                    </>
                  ) : (
                    "Crear barbería"
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
