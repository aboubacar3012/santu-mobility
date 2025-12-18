'use client';

import { Vehicle } from '../page';

type DashboardProps = {
  vehicules: Vehicle[];
  onViewVehicule: (vehicule: Vehicle) => void;
};

export default function Dashboard({ vehicules, onViewVehicule }: DashboardProps) {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const calculateMonthlyBenefit = (vehicule: Vehicle) => {
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
    return totalRecettes - totalDepenses;
  };

  const totalBenefit = vehicules.reduce((sum, vehicule) => sum + calculateMonthlyBenefit(vehicule), 0);
  const totalRecettes = vehicules.reduce((sum, vehicule) => {
    const monthRecettes = vehicule.recettes.filter(r => {
      const date = new Date(r.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
    return sum + monthRecettes.reduce((s, r) => s + r.montant, 0);
  }, 0);
  const totalDepenses = vehicules.reduce((sum, vehicule) => {
    const monthDepenses = vehicule.depenses.filter(d => {
      const date = new Date(d.date);
      return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
    });
    return sum + monthDepenses.reduce((s, d) => s + d.montant, 0);
  }, 0);

  const activeVehicules = vehicules.filter(v => v.statut === 'actif').length;
  const maintenanceVehicules = vehicules.filter(v => v.statut === 'maintenance').length;

  const monthNames = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-800 mb-1 sm:mb-2">
          Tableau de bord
        </h2>
        <p className="text-sm sm:text-base text-green-700">
          Vue d'ensemble - {monthNames[currentMonth]} {currentYear}
        </p>
      </div>

      {/* Stats Cards - Optimisé Mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Bénéfice Total */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 border-l-4 border-green-600">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                Bénéfice Total
              </p>
              <p className={`text-xl sm:text-2xl font-bold ${
                totalBenefit >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {totalBenefit.toLocaleString('fr-FR')} <span className="text-sm">GNF</span>
              </p>
            </div>
            <div className="text-3xl sm:text-4xl ml-2">💰</div>
          </div>
        </div>

        {/* Recettes Total */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                Recettes Total
              </p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                {totalRecettes.toLocaleString('fr-FR')} <span className="text-sm">GNF</span>
              </p>
            </div>
            <div className="text-3xl sm:text-4xl ml-2">📈</div>
          </div>
        </div>

        {/* Dépenses Total */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                Dépenses Total
              </p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-600">
                {totalDepenses.toLocaleString('fr-FR')} <span className="text-sm">GNF</span>
              </p>
            </div>
            <div className="text-3xl sm:text-4xl ml-2">📉</div>
          </div>
        </div>

        {/* Véhicules Actifs */}
        <div className="bg-white rounded-2xl shadow-md p-4 sm:p-5 border-l-4 border-green-400">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
                Véhicules Actifs
              </p>
              <p className="text-xl sm:text-2xl font-bold text-green-600">
                {activeVehicules} <span className="text-base text-gray-500">/ {vehicules.length}</span>
              </p>
            </div>
            <div className="text-3xl sm:text-4xl ml-2">🚗</div>
          </div>
        </div>
      </div>

      {/* Véhicules avec bénéfices - Optimisé Mobile */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-3 sm:mb-4">
          Bénéfices par Véhicule
        </h3>
        <div className="space-y-3">
          {vehicules.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-3">🚗</div>
              <p className="text-gray-600 text-sm sm:text-base">
                Aucun véhicule enregistré
              </p>
            </div>
          ) : (
            vehicules.map(vehicule => {
              const benefit = calculateMonthlyBenefit(vehicule);
              return (
                <div
                  key={vehicule.id}
                  onClick={() => onViewVehicule(vehicule)}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl hover:shadow-md cursor-pointer transition-all active:scale-[0.98]"
                >
                  <div className="flex-1 mb-2 sm:mb-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-base sm:text-lg font-bold text-green-800">
                        {vehicule.numero}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        vehicule.statut === 'actif'
                          ? 'bg-green-200 text-green-800'
                          : vehicule.statut === 'maintenance'
                          ? 'bg-yellow-200 text-yellow-800'
                          : 'bg-gray-200 text-gray-800'
                      }`}>
                        {vehicule.statut}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {vehicule.marque} {vehicule.modele} - {vehicule.chauffeur}
                    </p>
                  </div>
                  <div className="sm:ml-4">
                    <p className={`text-base sm:text-lg font-bold ${
                      benefit >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {benefit.toLocaleString('fr-FR')} <span className="text-xs">GNF</span>
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Alertes - Optimisé Mobile */}
      {(maintenanceVehicules > 0 || vehicules.length === 0) && (
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl sm:text-3xl">⚠️</span>
            <div className="flex-1">
              <h4 className="font-semibold text-yellow-800 mb-1 text-sm sm:text-base">
                Alertes
              </h4>
              {maintenanceVehicules > 0 && (
                <p className="text-xs sm:text-sm text-yellow-700">
                  {maintenanceVehicules} véhicule(s) en maintenance
                </p>
              )}
              {vehicules.length === 0 && (
                <p className="text-xs sm:text-sm text-yellow-700">
                  Ajoutez votre premier véhicule pour commencer.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
