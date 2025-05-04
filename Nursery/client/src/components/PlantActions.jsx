'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { waterPlant, fertilizePlant, harvestPlant } from '@/lib/api';
import { useToast } from './ToastProvider';

export default function PlantActions({ plant, onPlantUpdate, showViewDetails = false }) {
    const router = useRouter();
    const { showToast } = useToast();
    const [isLoading, setIsLoading] = useState({
        water: false,
        fertilize: false,
        harvest: false
    });

    // Helper function to handle action button clicks
    const handleAction = async (action, actionFn) => {
        setIsLoading(prev => ({ ...prev, [action]: true }));

        try {
            const updatedPlant = await actionFn(plant._id); // Ensure `_id` is used consistently
            if (onPlantUpdate) {
                onPlantUpdate(updatedPlant); // Update the plant state if callback is provided
            }
            showToast(`Successfully ${action}ed plant!`);
        } catch (error) {
            showToast(error.response?.data?.message || error.message || 'An error occurred', 'error');
        } finally {
            setIsLoading(prev => ({ ...prev, [action]: false }));
        }
    };

    // Disable actions if plant is not alive or already harvested
    const isDisabled = !plant.isAlive || plant.isHarvested;

    return (
        <div className="flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2">
                <button
                    onClick={() => handleAction('water', waterPlant)}
                    disabled={isDisabled || isLoading.water}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isDisabled
                            ? 'bg-white/10 text-white/50 cursor-not-allowed'
                            : 'bg-blue-500/80 text-white hover:bg-blue-600 transform hover:scale-[1.02]'
                        }`}
                >
                    {isLoading.water ? 'Watering...' : '💧 Water'}
                </button>

                <button
                    onClick={() => handleAction('fertilize', fertilizePlant)}
                    disabled={isDisabled || isLoading.fertilize}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isDisabled
                            ? 'bg-white/10 text-white/50 cursor-not-allowed'
                            : 'bg-green-500/80 text-white hover:bg-green-600 transform hover:scale-[1.02]'
                        }`}
                >
                    {isLoading.fertilize ? 'Fertilizing...' : '🍃 Fertilize'}
                </button>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => handleAction('harvest', harvestPlant)}
                    disabled={isDisabled || isLoading.harvest || plant.isHarvested}
                    className={`flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${isDisabled || plant.isHarvested
                            ? 'bg-white/10 text-white/50 cursor-not-allowed'
                            : 'bg-yellow-500/80 text-white hover:bg-yellow-600 transform hover:scale-[1.02]'
                        }`}
                >
                    {isLoading.harvest ? 'Harvesting...' : '🌾 Harvest'}
                </button>

                {showViewDetails && (
                    <Link
                        href={`/plants/${plant._id}`}
                        className="flex-1 px-4 py-2 text-sm font-medium rounded-lg bg-white/20 text-white hover:bg-white/30 text-center transition-all duration-300 transform hover:scale-[1.02]"
                    >
                        View Details
                    </Link>
                )}
            </div>
        </div>
    );
}