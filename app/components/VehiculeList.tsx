'use client';

import { Vehicule } from '../page';

type VehiculeListProps = {
  vehicules: Vehicule[];
  onViewVehicule: (vehicule: Vehicule) => void;
  onEditVehicule: (vehicule: Vehicule) => void;
  onDeleteVehicule: (id: string) => void;
  onAddClick: () => void;
};

const getTypeIcon = (type: Vehicule['type']) => {
  switch (type) {
    case 'voiture': return '🚗';
    case 'moto': return '🏍️';
    case 'camion': return '🚚';
    default: return '🚙';
  }
};

export default function VehiculeList({ vehicules, onViewVehicule, onEditVehicule, onDeleteVehicule, onAddClick }: VehiculeListProps) {
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      onDeleteVehicule(id);
    }
  };

  if (vehicules.length === 0) {
    return (
      <div className="text-center py-12 sm:py-16">
        <div className="text-6xl sm:text-7xl mb-4">🚗</div>
        <h3 className="text-xl sm:text-2xl font-semibold text-green-800 mb-2">
          Aucun véhicule enregistré
        </h3>
        <p className="text-sm sm:text-base text-gray-600 px-4">
          Commencez par ajouter votre premier véhicule à la flotte
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-1 sm:mb-2">
            Ma Flotte
          </h2>
          <p className="text-sm sm:text-base text-green-700">
            {vehicules.length} véhicule(s) enregistré(s)
          </p>
        </div>
        <button
          onClick={onAddClick}
          className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 active:scale-95 transition-all font-semibold shadow-lg text-sm sm:text-base flex items-center justify-center gap-2"
        >
          <span className="text-lg">➕</span>
          Ajouter un Véhicule
        </button>
      </div>

      {/* Vehicules Grid - Optimisé Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        {vehicules.map(vehicule => (
          <div
            key={vehicule.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            onClick={() => onViewVehicule(vehicule)}
          >
            {/* Header Card avec gradient */}
            <div className="bg-gradient-to-r from-green-600 to-green-500 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {vehicule.numero}
                  </h3>
                  <p className="text-xs sm:text-sm text-green-100 mt-1">
                    {vehicule.immatriculation}
                  </p>
                </div>
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${
                  vehicule.statut === 'actif'
                    ? 'bg-yellow-400 text-green-900'
                    : vehicule.statut === 'maintenance'
                    ? 'bg-yellow-200 text-yellow-900'
                    : 'bg-gray-200 text-gray-800'
                }`}>
                  {vehicule.statut}
                </span>
              </div>
            </div>

            {/* Body Card */}
            <div className="p-4 sm:p-5">
              <div className="space-y-2 sm:space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-lg">{getTypeIcon(vehicule.type)}</span>
                  <span className="font-medium capitalize">{vehicule.type}</span>
                  <span className="text-gray-500">•</span>
                  <span className="font-medium">{vehicule.marque} {vehicule.modele}</span>
                  <span className="text-gray-500">({vehicule.annee})</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-lg">👤</span>
                  <span>{vehicule.chauffeur}</span>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center justify-between pt-3 sm:pt-4 border-t-2 border-green-100">
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-1">Recettes</p>
                  <p className="text-sm sm:text-base font-bold text-green-600">
                    {vehicule.recettes.reduce((sum, r) => sum + r.montant, 0).toLocaleString('fr-FR')} <span className="text-xs">GNF</span>
                  </p>
                </div>
                <div className="flex-1 text-right">
                  <p className="text-xs text-gray-500 mb-1">Dépenses</p>
                  <p className="text-sm sm:text-base font-bold text-yellow-600">
                    {vehicule.depenses.reduce((sum, d) => sum + d.montant, 0).toLocaleString('fr-FR')} <span className="text-xs">GNF</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Actions - Optimisé Mobile */}
            <div className="bg-green-50 px-4 py-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEditVehicule(vehicule);
                }}
                className="flex-1 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 active:bg-green-800 transition-colors text-xs sm:text-sm font-medium shadow-sm"
              >
                ✏️ Modifier
              </button>
              <button
                onClick={(e) => handleDelete(e, vehicule.id)}
                className="px-3 sm:px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors text-xs sm:text-sm font-medium shadow-sm"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

