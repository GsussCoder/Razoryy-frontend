import { useState } from "react";
import { apiClient } from "../../services/apiClient";
import { useToast } from "../../contexts/ToastContext";

export function ContactSection() {
  const { showSuccess, showError } = useToast();
  const [sending, setSending] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    from: "",
    message: "",
  });

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitContactForm = async (e) => {
    e.preventDefault();
    setSending(true);

    try {
      await apiClient.post("/api/v1/emails/contact", contactForm);
      showSuccess(
        "¡Mensaje enviado correctamente! \nPronto nos pondremos en contacto contigo.",
      );
      setContactForm({ name: "", from: "", message: "" });
    } catch (err) {
      showError(
        err.message ||
          "¡Ups! No se ha podido enviar el correo, inténtalo más tarde.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/50"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Contactanos
          </h2>
          <p className="text-lg text-slate-400">
            Lleva tu negocio a otro nivel y empieza a automatizar hoy mismo.
          </p>
        </div>

        <div className="mx-auto max-w-md bg-slate-800 rounded-xl p-6">
          <form onSubmit={onSubmitContactForm} className="space-y-4">
            <div>
              <label htmlFor="contact-name" className="ml-2">
                Nombre
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={contactForm.name}
                onChange={handleContactChange}
                placeholder="Nombre"
                required
                disabled={sending}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg mt-1.5 p-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="contact-from" className="ml-2">
                Correo electrónico
              </label>
              <input
                id="contact-from"
                type="email"
                name="from"
                value={contactForm.from}
                onChange={handleContactChange}
                placeholder="example@gmail.com"
                required
                disabled={sending}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg mt-1.5 p-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="contact-message" className="ml-2">
                Mensaje
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={contactForm.message}
                onChange={handleContactChange}
                placeholder="¡Hola! Estoy interesado en automatizar mi local."
                required
                disabled={sending}
                className="w-full h-30 bg-slate-900 border border-slate-700 rounded-lg mt-1.5 p-2 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all disabled:opacity-50"
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="w-full px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-600/50 text-white font-semibold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                "Enviar mensaje"
              )}
            </button>
          </form>
        </div>

        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
              <Mail className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Email</h3>
              <p className="text-slate-400 text-sm">clustsol@gmail.com</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
              <Phone className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Teléfono</h3>
              <p className="text-slate-400 text-sm">+57 313 880 2211</p>
            </div>
            <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 text-center">
              <MapPin className="w-8 h-8 text-indigo-500 mx-auto mb-3" />
              <h3 className="font-semibold text-white mb-2">Ubicación</h3>
              <p className="text-slate-400 text-sm">Bogotá, Colombia</p>
            </div>
          </div> */}
      </div>
    </section>
  );
}
