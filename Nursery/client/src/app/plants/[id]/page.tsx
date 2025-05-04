'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPlantById } from '@/lib/api';
import PlantActions from '@/components/PlantActions';
import Loading from '@/components/Loading';
import { useToast } from '@/components/ToastProvider';

interface Plant {
  id: string;
  species: string;
  isAlive: boolean;
  growthStage: 'seed' | 'seedling' | 'young' | 'mature';
  health: number;
  waterLevel: number;
  createdAt: string;
  updatedAt: string;
  harvestedAt?: string;
}

interface PlantDetailsPageProps {
  params: {
    id: string;
  };
}

export default function PlantDetailsPage({ params }: PlantDetailsPageProps) {
  const { id } = params;
  const [plant, setPlant] = useState<Plant | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchPlantDetails = async () => {
      try {
        const data = await getPlantById(id);
        setPlant(data);
      } catch (error: any) {
        setError(error.message);
        showToast(error.message, 'error');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlantDetails();
  }, [id, showToast]);

  const handlePlantUpdate = (updatedPlant: Plant) => {
    setPlant(updatedPlant);
  };

  const getStatusColor = (isAlive: boolean) => {
    return isAlive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Link 
          href="/plants" 
          className="text-gray-600 hover:text-gray-800 mr-4"
        >
          ← Back to Plants
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Plant Details</h1>
      </div>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md text-red-600">
          Error: {error}. Please try again later.
        </div>
      ) : plant ? (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-gray-800">{plant.species}</h2>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(plant.isAlive)}`}>
                {plant.isAlive ? 'ALIVE' : 'DEAD'}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Growth Stage</h3>
                  <p className="text-lg font-medium">{plant.growthStage}</p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Health</h3>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-green-500 h-2 rounded-full" 
                        style={{ width: `${plant.health}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{plant.health}%</span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Water Level</h3>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full" 
                        style={{ width: `${plant.waterLevel}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{plant.waterLevel}%</span>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Created At</h3>
                  <p className="text-medium">
                    {new Date(plant.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Last Updated</h3>
                  <p className="text-medium">
                    {new Date(plant.updatedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                {plant.harvestedAt && (
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Harvested At</h3>
                    <p className="text-medium">
                      {new Date(plant.harvestedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 border-t pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">Plant Actions</h3>
              <div className="max-w-xs">
                <PlantActions plant={plant} onPlantUpdate={handlePlantUpdate} showViewDetails={false} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-gray-600">Plant not found.</p>
          <Link 
            href="/plants"
            className="btn btn-primary mt-4"
          >
            Back to All Plants
          </Link>
        </div>
      )}
    </div>
  );
}