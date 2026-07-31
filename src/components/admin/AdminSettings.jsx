import { useState, useRef } from "react";
import { Upload, X, Palette, CreditCard } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useBranding } from "../../contexts/BrandingContext";
import { usePermissions } from "../../hooks/usePermissions";
import { FEATURES } from "../../config/permissions";
import { useUpdateBusinessName } from "../../hooks/useUpdateBusinessName";
import { usePageTour } from "../../tours/usePageTour";
import { useBreakpoint } from "../../tours/useBreakpoint";
import { createSettingsTour } from "../../tours/steps/settingsTour";

export default function AdminSettings() {
  const { user } = useAuth();
  const {
    branding,
    updatePrimaryColor,
    uploadLogo,
    deleteLogo,
    setBarberName,
  } = useBranding();
  const { updateName, saving } = useUpdateBusinessName();
  const { can } = usePermissions();
  const [barberName, setBarberNameInput] = useState(branding.barberName);
  const [color, setColor] = useState(branding.primaryColor);
  const [uploading, setUploading] = useState(false);
  const isMobile = useBreakpoint();

  usePageTour("settings", () => createSettingsTour({ isMobile }));
  const fileInputRef = useRef(null);

  // const handleColorChange = (e) => {
  //   const newColor = e.target.value;
  //   setColor(newColor);
  //   updatePrimaryColor(newColor);
  // };

  // const handleLogoUpload = async (e) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const validTypes = ['image/jpeg', 'image/png', 'image/svg+xml', 'image/webp'];
  //   if (!validTypes.includes(file.type)) {
  //     alert('Solo se permiten archivos JPG, PNG, SVG o WebP');
  //     return;
  //   }

  //   if (file.size > 2 * 1024 * 1024) {
  //     alert('El archivo no debe superar los 2MB');
  //     return;
  //   }

  //   setUploading(true);
  //   try {
  //     await uploadLogo(file);
  //   } catch (err) {
  //     alert('Error al subir el logo: ' + err.message);
  //   } finally {
  //     setUploading(false);
  //   }
  // };

  // const handleDeleteLogo = async () => {
  //   await deleteLogo();
  // };

  const handleSaveName = async () => {
    try {
      await updateName(barberName);
      setBarberName(barberName);
    } catch {}
  };

  return (
    <div id="panel-settings">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white">Configuración</h2>
        <p className="text-slate-400">Información y configuración del local.</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Nombre del negocio */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-sm">
          <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Nombre de la barberia
          </h3>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={barberName}
              onChange={(e) => setBarberNameInput(e.target.value)}
              className="w-full sm:flex-1 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={handleSaveName}
              disabled={saving}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm whitespace-nowrap"
            >
              {saving ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>

        {/* Color primario - solo para standard y professional */}
        {/* {can(FEATURES.BRAND_SETTINGS) && (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-sm">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Color primario
            </h3>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={color}
                onChange={handleColorChange}
                className="w-16 h-16 rounded-lg cursor-pointer border border-slate-600"
              />
              <div>
                <p className="text-sm text-slate-300">Color seleccionado: <span className="font-mono font-medium">{color}</span></p>
                <p className="text-xs text-slate-500 mt-1">Este color se aplicará a botones, acentos y elementos de marca.</p>
              </div>
            </div>
            Preview
            <div className="mt-4 flex gap-3">
              <button
                className="px-4 py-2 text-white rounded-lg text-sm"
                style={{ backgroundColor: color }}
              >
                Botón de ejemplo
              </button>
              <span className="px-4 py-2 rounded-lg text-sm" style={{ color, backgroundColor: `${color}15` }}>
                Texto con acento
              </span>
            </div>
          </div>
        )} */}

        {/* Logo - solo para standard y professional */}
        {/* {can(FEATURES.BRAND_SETTINGS) && (
          <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-sm">
            <h3 className="font-semibold text-white mb-4 flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Logo / Imagen del local
            </h3>
            <div className="flex items-start gap-4">
              {branding.logo ? (
                <div className="relative">
                  <img
                    src={branding.logo}
                    alt="Logo"
                    className="w-24 h-24 rounded-lg object-cover border border-slate-600"
                  />
                  <button
                    onClick={handleDeleteLogo}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-lg border-2 border-dashed border-slate-600 flex items-center justify-center">
                  <Upload className="w-6 h-6 text-slate-500" />
                </div>
              )}
              <div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 text-sm"
                >
                  {uploading ? 'Subiendo...' : branding.logo ? 'Cambiar logo' : 'Subir logo'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/svg+xml,image/webp"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
                <p className="text-xs text-slate-500 mt-2">JPG, PNG, SVG o WebP. Máximo 2MB.</p>
              </div>
            </div>
          </div>
        )} */}

        {/* Membresía (solo lectura) */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 shadow-sm">
          <h3 className="font-semibold text-white mb-4">Plan de membresía</h3>
          <div className="bg-slate-700/50 rounded-lg p-4">
            <p className="text-sm text-slate-300">
              Tu plan actual es{" "}
              <span className="font-semibold text-white">
                {user?.membership?.toUpperCase() ?? "—"}
              </span>
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Para cambiar de plan, contacta con el equipo de Razoryy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
