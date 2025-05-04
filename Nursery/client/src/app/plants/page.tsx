'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getAllPlants } from '@/lib/api';
import PlantCard from '@/components/PlantCard';
import Loading from '@/components/Loading';
import { useToast } from '@/components/ToastProvider';

interface Plant {
  _id: string;
  species: string;
  plantingDate: string;
  lastWateredDate: string;
  health: number;
  growthStage: 'seed' | 'seedling' | 'young' | 'mature';
  isAlive: boolean;
  isHarvested: boolean;
  growthProgress: number;
  growthRate: number;
  lastGrowthStage: string;
  createdAt: string;
  updatedAt: string;
}

export default function PlantsPage() {
  const [plants, setPlants] = useState<Plant[]>([]); // Ensure plants is always an array
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const plants = await getAllPlants(); // `getAllPlants` already validates the response
        setPlants(plants);
      } catch (error: unknown) {
        if (error instanceof Error) {
          console.error('Error fetching plants:', error); // Log error for debugging
          setError(error.message || 'An unexpected error occurred');
          showToast(error.message || 'An unexpected error occurred', 'error');
        } else {
          console.error('Unknown error:', error);
          setError('An unexpected error occurred');
          showToast('An unexpected error occurred', 'error');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlants();
  }, [showToast]);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">All Plants</h1>
        <Link 
          href="/plants/new"
          className="btn btn-primary"
        >
          Add New Plant
        </Link>
      </div>

      {isLoading ? (
        <Loading />
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-md text-red-600">
          Error: {error}. Please try again later.
        </div>
      ) : plants.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-600 mb-4">You don&apos;t have any plants yet.</p>
          <Link 
            href="/plants/new"
            className="btn btn-primary"
          >
            Create Your First Plant
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {plants.map((plant) => (
            <PlantCard key={plant._id} plant={plant} />
          ))}
        </div>
      )}
    </div>
  );
}