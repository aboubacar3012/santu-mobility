'use client';

import { useState } from 'react';
import { Vehicule, Recette, Depense } from '../page';

type VehiculeDetailProps = {
  vehicule: Vehicule;
  onBack: () => void;
  onAddRecette: (vehiculeId: string, recette: Omit<Recette, 'id'>) => void;
  onAddDepense: (vehiculeId: string, depense: Omit<Depense, 'id'>) => void;
  onDeleteRecette: (vehiculeId: string, recetteId: string) => void;
  onDeleteDepense: (vehiculeId: string, depenseId: string) => void;
};

const getTypeIcon = (type: Vehicule['type']) => {
  switch (type) {
    case 'voiture': return '🚗';
    case 'moto': return '🏍️';
    case 'camion': return '🚚';
    default: return '🚙';
  }
};

export default function VehiculeDetail({
  vehicule,
  onBack,
  onAddRecette,
  onAddDepense,
  onDeleteRecette,
  onDeleteDepense,
}: VehiculeDetailProps) {
  const [showRecetteForm, setShowRecetteForm] = useState(false);
  const [showDepenseForm, setShowDepenseForm] = useState(false);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthRecettes = vehicule.recettes.filter(r => {
    const date = new Date(r.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const monthDepenses = vehicule.depenses.filter(d => {
    const date = new Date(d.date);
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
  });

  const totalRecettes = monthRecettes.reduce((sum, r) => sum + r.montant, 0);
  const totalDepenses = monthDepenses.reduce((sum, d) => sum + d.montant, 0);
  const benefice = totalRecettes - totalDepenses;

  const handleRecetteSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onAddRecette(vehicule.id, {
      date: formData.get('date') as string,
      montant: parseFloat(formData.get('montant') as string),
      description: formData.get('description') as string,
    });
    e.currentTarget.reset();
    setShowRecetteForm(false);
  };

  const handleDepenseSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onAddDepense(vehicule.id, {
      date: formData.get('date') as string,
      montant: parseFloat(formData.get('montant') as string),
      type: formData.get('type') as Depense['type'],
      description: formData.get('description') as string,
    });
    e.currentTarget.reset();
    setShowDepenseForm(false);
  };

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header - Optimisé Mobile */}
      <div className="flex flex-col gap-3 sm:gap-4">
        <button
          onClick={onBack}
          className="self-start flex items-center gap-2 text-green-700 hover:text-green-800 font-medium text-sm sm:text-base"
        >
          <span className="text-lg">←</span> Retour à la liste
        </button>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-green-800">
              {getTypeIcon(vehicule.type)} {vehicule.numero}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mt-1">
              {vehicule.marque} {vehicule.modele} ({vehicule.annee}) • {vehicule.type}
            </p>
          </div>
          <span className={`px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto ${
            vehicule.statut === 'actif'
              ? 'bg-green-200 text-green-900'
              : vehicule.statut === 'maintenance'
              ? 'bg-yellow-200 text-yellow-900'
              : 'bg-gray-200 text-gray-800'
          }`}>
            {vehicule.statut}
          </span>
        </div>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-3 sm:mb-4">
          📋 Informations
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">Immatriculation</p>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">{vehicule.immatriculation}</p>
          </div>
          <div>
            <p className="text-xs sm:text-sm text-gray-500 mb-1">Chauffeur</p>
            <p className="font-semibold text-gray-900 text-sm sm:text-base">{vehicule.chauffeur}</p>
          </div>
        </div>
      </div>

      {/* Monthly Summary - Optimisé Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-4 sm:p-6 border-2 border-green-200">
          <p className="text-xs sm:text-sm font-medium text-green-700 mb-2">
            Recettes {monthNames[currentMonth]}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-green-600">
            {totalRecettes.toLocaleString('fr-FR')} <span className="text-sm">GNF</span>
          </p>
        </div>
        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-4 sm:p-6 border-2 border-yellow-200">
          <p className="text-xs sm:text-sm font-medium text-yellow-700 mb-2">
            Dépenses {monthNames[currentMonth]}
          </p>
          <p className="text-xl sm:text-2xl font-bold text-yellow-600">
            {totalDepenses.toLocaleString('fr-FR')} <span className="text-sm">GNF</span>
          </p>
        </div>
        <div className={`rounded-2xl p-4 sm:p-6 border-2 ${
          benefice >= 0
            ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300'
            : 'bg-gradient-to-br from-red-50 to-red-100 border-red-300'
        }`}>
          <p className={`text-xs sm:text-sm font-medium mb-2 ${
            benefice >= 0
              ? 'text-green-700'
              : 'text-red-700'
          }`}>
            Bénéfice {monthNames[currentMonth]}
          </p>
          <p className={`text-xl sm:text-2xl font-bold ${
            benefice >= 0 ? 'text-green-600' : 'text-red-600'
          }`}>
            {benefice.toLocaleString('fr-FR')} <span className="text-sm">GNF</span>
          </p>
        </div>
      </div>

      {/* Recettes Section - Optimisé Mobile */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-lg sm:text-xl font-bold text-green-800">
            💰 Recettes
          </h3>
          <button
            onClick={() => setShowRecetteForm(!showRecetteForm)}
            className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 active:scale-95 transition-all text-sm font-medium shadow-sm"
          >
            {showRecetteForm ? '❌ Annuler' : '➕ Ajouter Recette'}
          </button>
        </div>

        {showRecetteForm && (
          <form onSubmit={handleRecetteSubmit} className="mb-4 sm:mb-6 p-4 bg-green-50 rounded-xl space-y-3 sm:space-y-4 border-2 border-green-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-green-800 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 bg-white text-gray-900 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-green-800 mb-2">
                  Montant (GNF) *
                </label>
                <input
                  type="number"
                  name="montant"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 bg-white text-gray-900 transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-semibold text-green-800 mb-2">
                Description
              </label>
              <input
                type="text"
                name="description"
                className="w-full px-4 py-3 border-2 border-green-200 rounded-xl focus:ring-2 focus:ring-green-500 bg-white text-gray-900 transition-all"
                placeholder="Description de la recette"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 active:scale-95 transition-all font-medium shadow-sm"
            >
              💾 Enregistrer
            </button>
          </form>
        )}

        <div className="space-y-2">
          {monthRecettes.length === 0 ? (
            <p className="text-gray-500 text-center py-6 text-sm sm:text-base">
              Aucune recette enregistrée ce mois
            </p>
          ) : (
            monthRecettes.map(recette => (
              <div
                key={recette.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-green-50 rounded-xl border border-green-200"
              >
                <div className="flex-1 mb-2 sm:mb-0">
                  <p className="font-semibold text-gray-900 text-sm sm:text-base">
                    {new Date(recette.date).toLocaleDateString('fr-FR')}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {recette.description || 'Sans description'}
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <p className="text-base sm:text-lg font-bold text-green-600">
                    {recette.montant.toLocaleString('fr-FR')} <span className="text-xs">GNF</span>
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('Supprimer cette recette ?')) {
                        onDeleteRecette(vehicule.id, recette.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-700 text-sm active:scale-95 transition-all"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Dépenses Section - Optimisé Mobile */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-lg sm:text-xl font-bold text-green-800">
            💸 Dépenses
          </h3>
          <button
            onClick={() => setShowDepenseForm(!showDepenseForm)}
            className="px-4 py-2 bg-yellow-500 text-yellow-900 rounded-xl hover:bg-yellow-600 active:scale-95 transition-all text-sm font-medium shadow-sm"
          >
            {showDepenseForm ? '❌ Annuler' : '➕ Ajouter Dépense'}
          </button>
        </div>

        {showDepenseForm && (
          <form onSubmit={handleDepenseSubmit} className="mb-4 sm:mb-6 p-4 bg-yellow-50 rounded-xl space-y-3 sm:space-y-4 border-2 border-yellow-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-yellow-800 mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  defaultValue={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 bg-white text-gray-900 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-yellow-800 mb-2">
                  Type *
                </label>
                <select
                  name="type"
                  required
                  className="w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 bg-white text-gray-900 transition-all"
                >
                  <option value="carburant">⛽ Carburant</option>
                  <option value="maintenance">🔧 Maintenance</option>
                  <option value="reparation">🛠️ Réparation</option>
                  <option value="assurance">🛡️ Assurance</option>
                  <option value="autre">📋 Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-yellow-800 mb-2">
                  Montant (GNF) *
                </label>
                <input
                  type="number"
                  name="montant"
                  required
                  min="0"
                  step="0.01"
                  className="w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 bg-white text-gray-900 transition-all"
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-semibold text-yellow-800 mb-2">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  className="w-full px-4 py-3 border-2 border-yellow-200 rounded-xl focus:ring-2 focus:ring-yellow-500 bg-white text-gray-900 transition-all"
                  placeholder="Description de la dépense"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-yellow-500 text-yellow-900 rounded-xl hover:bg-yellow-600 active:scale-95 transition-all font-medium shadow-sm"
            >
              💾 Enregistrer
            </button>
          </form>
        )}

        <div className="space-y-2">
          {monthDepenses.length === 0 ? (
            <p className="text-gray-500 text-center py-6 text-sm sm:text-base">
              Aucune dépense enregistrée ce mois
            </p>
          ) : (
            monthDepenses.map(depense => (
              <div
                key={depense.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-yellow-50 rounded-xl border border-yellow-200"
              >
                <div className="flex-1 mb-2 sm:mb-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-semibold text-gray-900 text-sm sm:text-base">
                      {new Date(depense.date).toLocaleDateString('fr-FR')}
                    </p>
                    <span className="px-2 py-1 bg-yellow-200 text-yellow-900 rounded text-xs font-medium">
                      {depense.type}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600">
                    {depense.description || 'Sans description'}
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <p className="text-base sm:text-lg font-bold text-yellow-600">
                    {depense.montant.toLocaleString('fr-FR')} <span className="text-xs">GNF</span>
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('Supprimer cette dépense ?')) {
                        onDeleteDepense(vehicule.id, depense.id);
                      }
                    }}
                    className="text-red-600 hover:text-red-700 text-sm active:scale-95 transition-all"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

