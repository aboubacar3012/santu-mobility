'use client';

import { useState, useEffect } from 'react';
import { Vehicle } from '../page';

type VehicleFormProps = {
  vehicule: Vehicle | null;
  onSave: (vehicule: Vehicle) => void;
  onCancel: () => void;
};

export default function VehicleForm({ vehicule, onSave, onCancel }: VehicleFormProps) {
  const [formData, setFormData] = useState({
    numero: '',
    type: 'voiture' as Vehicle['type'],
    marque: '',
    modele: '',
    annee: new Date().getFullYear(),
    immatriculation: '',
    chauffeur: '',
    statut: 'actif' as 'actif' | 'maintenance' | 'inactif',
  });

  useEffect(() => {
    if (vehicule) {
      setFormData({
        numero: vehicule.numero,
        type: vehicule.type,
        marque: vehicule.marque,
        modele: vehicule.modele,
        annee: vehicule.annee,
        immatriculation: vehicule.immatriculation,
        chauffeur: vehicule.chauffeur,
        statut: vehicule.statut,
      });
    }
  }, [vehicule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (vehicule) {
      onSave({ ...vehicule, ...formData });
    } else {
      onSave({ ...formData, id: '', recettes: [], depenses: [] } as Vehicle);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-green-800 mb-2">
            {vehicule ? '✏️ Modifier le Véhicule' : '➕ Ajouter un Nouveau Véhicule'}
          </h2>
          <p className="text-sm text-gray-600">
            {vehicule ? 'Modifiez les informations du véhicule' : 'Remplissez les informations pour ajouter un nouveau véhicule'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold text-green-800 mb-2">
                Numéro du Véhicule *
              </label>
              <input
                type="text"
                required
                value={formData.numero}
                onChange={(e) => setFormData({ ...formData, numero: e.target.value })}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 transition-all"
                placeholder="VEH-001"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-green-800 mb-2">
                Type de Véhicule *
              </label>
              <select
                required
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Vehicle['type'] })}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 transition-all"
              >
                <option value="voiture">🚗 Voiture</option>
                <option value="moto">🏍️ Moto</option>
                <option value="camion">🚚 Camion</option>
                <option value="autre">🚙 Autre</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-green-800 mb-2">
                Immatriculation *
              </label>
              <input
                type="text"
                required
                value={formData.immatriculation}
                onChange={(e) => setFormData({ ...formData, immatriculation: e.target.value })}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 transition-all"
                placeholder="AB-123-CD"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-green-800 mb-2">
                Marque *
              </label>
              <input
                type="text"
                required
                value={formData.marque}
                onChange={(e) => setFormData({ ...formData, marque: e.target.value })}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 transition-all"
                placeholder="Toyota"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-green-800 mb-2">
                Modèle *
              </label>
              <input
                type="text"
                required
                value={formData.modele}
                onChange={(e) => setFormData({ ...formData, modele: e.target.value })}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 transition-all"
                placeholder="Corolla"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-green-800 mb-2">
                Année *
              </label>
              <input
                type="number"
                required
                min="1990"
                max={new Date().getFullYear() + 1}
                value={formData.annee}
                onChange={(e) => setFormData({ ...formData, annee: parseInt(e.target.value) })}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-green-800 mb-2">
                Statut *
              </label>
              <select
                required
                value={formData.statut}
                onChange={(e) => setFormData({ ...formData, statut: e.target.value as any })}
                className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 transition-all"
              >
                <option value="actif">✅ Actif</option>
                <option value="maintenance">⚠️ Maintenance</option>
                <option value="inactif">❌ Inactif</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-green-800 mb-2">
              Chauffeur *
            </label>
            <input
              type="text"
              required
              value={formData.chauffeur}
              onChange={(e) => setFormData({ ...formData, chauffeur: e.target.value })}
              className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white text-gray-900 transition-all"
              placeholder="Nom du chauffeur"
            />
          </div>

          {/* Buttons - Optimisé Mobile */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 active:scale-95 transition-all font-semibold shadow-lg text-sm sm:text-base"
            >
              {vehicule ? '💾 Enregistrer les modifications' : '➕ Ajouter le véhicule'}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 active:scale-95 transition-all font-medium text-sm sm:text-base"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

