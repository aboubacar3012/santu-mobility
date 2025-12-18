'use client';

import { useState } from 'react';
import VehiculeList from './components/VehiculeList';
import VehiculeForm from './components/VehiculeForm';
import VehiculeDetail from './components/VehiculeDetail';
import Dashboard from './components/Dashboard';

export type Vehicule = {
  id: string;
  numero: string;
  type: 'voiture' | 'moto' | 'camion' | 'autre';
  marque: string;
  modele: string;
  annee: number;
  immatriculation: string;
  chauffeur: string;
  statut: 'actif' | 'maintenance' | 'inactif';
  recettes: Recette[];
  depenses: Depense[];
};

export type Recette = {
  id: string;
  date: string;
  montant: number;
  description: string;
};

export type Depense = {
  id: string;
  date: string;
  montant: number;
  type: 'carburant' | 'maintenance' | 'reparation' | 'assurance' | 'autre';
  description: string;
};

export default function Home() {
  const [vehicules, setVehicules] = useState<Vehicule[]>([
    {
      id: '1',
      numero: 'VEH-001',
      type: 'voiture',
      marque: 'Toyota',
      modele: 'Corolla',
      annee: 2020,
      immatriculation: 'AB-123-CD',
      chauffeur: 'Amadou Diallo',
      statut: 'actif',
      recettes: [
        { id: 'r1', date: '2024-01-15', montant: 45000, description: 'Recettes du jour' },
        { id: 'r2', date: '2024-01-16', montant: 52000, description: 'Recettes du jour' },
      ],
      depenses: [
        { id: 'd1', date: '2024-01-15', montant: 15000, type: 'carburant', description: 'Plein essence' },
        { id: 'd2', date: '2024-01-16', montant: 5000, type: 'maintenance', description: 'Vidange' },
      ],
    },
    {
      id: '2',
      numero: 'VEH-002',
      type: 'moto',
      marque: 'Yamaha',
      modele: 'MT-07',
      annee: 2019,
      immatriculation: 'EF-456-GH',
      chauffeur: 'Fatou Sall',
      statut: 'actif',
      recettes: [
        { id: 'r3', date: '2024-01-15', montant: 38000, description: 'Recettes du jour' },
      ],
      depenses: [
        { id: 'd3', date: '2024-01-15', montant: 12000, type: 'carburant', description: 'Plein essence' },
      ],
    },
  ]);

  const [view, setView] = useState<'dashboard' | 'list' | 'add' | 'detail'>('dashboard');
  const [selectedVehicule, setSelectedVehicule] = useState<Vehicule | null>(null);
  const [editingVehicule, setEditingVehicule] = useState<Vehicule | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAddVehicule = (vehicule: Omit<Vehicule, 'id' | 'recettes' | 'depenses'>) => {
    const newVehicule: Vehicule = {
      ...vehicule,
      id: Date.now().toString(),
      recettes: [],
      depenses: [],
    };
    setVehicules([...vehicules, newVehicule]);
    setView('list');
    setMobileMenuOpen(false);
  };

  const handleUpdateVehicule = (updatedVehicule: Vehicule) => {
    setVehicules(vehicules.map(v => v.id === updatedVehicule.id ? updatedVehicule : v));
    setEditingVehicule(null);
    setView('list');
    setMobileMenuOpen(false);
  };

  const handleDeleteVehicule = (id: string) => {
    setVehicules(vehicules.filter(v => v.id !== id));
    if (selectedVehicule?.id === id) {
      setSelectedVehicule(null);
      setView('list');
    }
  };

  const handleViewVehicule = (vehicule: Vehicule) => {
    setSelectedVehicule(vehicule);
    setView('detail');
    setMobileMenuOpen(false);
  };

  const handleEditVehicule = (vehicule: Vehicule) => {
    setEditingVehicule(vehicule);
    setView('add');
    setMobileMenuOpen(false);
  };

  const handleAddRecette = (vehiculeId: string, recette: Omit<Recette, 'id'>) => {
    const newRecette: Recette = {
      ...recette,
      id: Date.now().toString(),
    };
    setVehicules(vehicules.map(v => 
      v.id === vehiculeId 
        ? { ...v, recettes: [...v.recettes, newRecette] }
        : v
    ));
    if (selectedVehicule?.id === vehiculeId) {
      setSelectedVehicule({ ...selectedVehicule, recettes: [...selectedVehicule.recettes, newRecette] });
    }
  };

  const handleAddDepense = (vehiculeId: string, depense: Omit<Depense, 'id'>) => {
    const newDepense: Depense = {
      ...depense,
      id: Date.now().toString(),
    };
    setVehicules(vehicules.map(v => 
      v.id === vehiculeId 
        ? { ...v, depenses: [...v.depenses, newDepense] }
        : v
    ));
    if (selectedVehicule?.id === vehiculeId) {
      setSelectedVehicule({ ...selectedVehicule, depenses: [...selectedVehicule.depenses, newDepense] });
    }
  };

  const handleDeleteRecette = (vehiculeId: string, recetteId: string) => {
    setVehicules(vehicules.map(v => 
      v.id === vehiculeId 
        ? { ...v, recettes: v.recettes.filter(r => r.id !== recetteId) }
        : v
    ));
    if (selectedVehicule?.id === vehiculeId) {
      setSelectedVehicule({ ...selectedVehicule, recettes: selectedVehicule.recettes.filter(r => r.id !== recetteId) });
    }
  };

  const handleDeleteDepense = (vehiculeId: string, depenseId: string) => {
    setVehicules(vehicules.map(v => 
      v.id === vehiculeId 
        ? { ...v, depenses: v.depenses.filter(d => d.id !== depenseId) }
        : v
    ));
    if (selectedVehicule?.id === vehiculeId) {
      setSelectedVehicule({ ...selectedVehicule, depenses: selectedVehicule.depenses.filter(d => d.id !== depenseId) });
    }
  };

  const handleNavClick = (newView: 'dashboard' | 'list' | 'add') => {
    setView(newView);
    setMobileMenuOpen(false);
    if (newView === 'add') {
      setEditingVehicule(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-yellow-50/30 to-green-50">
      {/* Header Mobile Optimized */}
      <header className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg sticky top-0 z-50">
        <div className="px-3 sm:px-4 lg:px-6">
          <div className="flex justify-between items-center h-14 sm:h-16">
            <div className="flex items-center gap-2">
              <div className="text-2xl sm:text-3xl">🚗</div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
                Santu Mobility
              </h1>
            </div>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex gap-2">
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  view === 'dashboard'
                    ? 'bg-yellow-400 text-green-900 shadow-md'
                    : 'text-white hover:bg-green-600'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => handleNavClick('list')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  view === 'list'
                    ? 'bg-yellow-400 text-green-900 shadow-md'
                    : 'text-white hover:bg-green-600'
                }`}
              >
                Flotte
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white hover:bg-green-600 rounded-lg transition-colors"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 space-y-2 animate-in slide-in-from-top">
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  view === 'dashboard'
                    ? 'bg-yellow-400 text-green-900 shadow-md'
                    : 'text-white hover:bg-green-600'
                }`}
              >
                📊 Dashboard
              </button>
              <button
                onClick={() => handleNavClick('list')}
                className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  view === 'list'
                    ? 'bg-yellow-400 text-green-900 shadow-md'
                    : 'text-white hover:bg-green-600'
                }`}
              >
                🚗 Ma Flotte
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="px-3 sm:px-4 lg:px-6 py-4 sm:py-6 max-w-7xl mx-auto">
        {view === 'dashboard' && (
          <Dashboard vehicules={vehicules} onViewVehicule={handleViewVehicule} />
        )}
        {view === 'list' && (
          <VehiculeList
            vehicules={vehicules}
            onViewVehicule={handleViewVehicule}
            onEditVehicule={handleEditVehicule}
            onDeleteVehicule={handleDeleteVehicule}
            onAddClick={() => {
              setEditingVehicule(null);
              setView('add');
            }}
          />
        )}
        {view === 'add' && (
          <VehiculeForm
            vehicule={editingVehicule}
            onSave={editingVehicule ? handleUpdateVehicule : handleAddVehicule}
            onCancel={() => {
              setEditingVehicule(null);
              setView('list');
            }}
          />
        )}
        {view === 'detail' && selectedVehicule && (
          <VehiculeDetail
            vehicule={selectedVehicule}
            onBack={() => setView('list')}
            onAddRecette={handleAddRecette}
            onAddDepense={handleAddDepense}
            onDeleteRecette={handleDeleteRecette}
            onDeleteDepense={handleDeleteDepense}
          />
        )}
      </main>
    </div>
  );
}
