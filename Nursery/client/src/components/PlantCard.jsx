'use client';

import Link from 'next/link';
import { useState } from 'react';
import PlantActions from './PlantActions';

export default function PlantCard({ plant }) {
    const [localPlant, setLocalPlant] = useState(plant);

    // Update the local plant data when actions are performed
    const handlePlantUpdate = (updatedPlant) => {
        setLocalPlant(updatedPlant);
    };

    // Determine status color class
    const getStatusColor = () => {
        if (!localPlant.isAlive) {
            return 'bg-red-500/20 text-red-200'; // Dead
        }
        if (localPlant.isHarvested) {
            return 'bg-yellow-500/20 text-yellow-200'; // Harvested
        }
        return 'bg-green-500/20 text-green-200'; // Alive
    };

    // Determine status text
    const getStatusText = () => {
        if (!localPlant.isAlive) {
            return 'DEAD';
        }
        if (localPlant.isHarvested) {
            return 'HARVESTED';
        }
        return 'ALIVE';
    };

    // Get appropriate emoji for growth stage
    const getGrowthEmoji = () => {
        const stage = localPlant.growthStage.toLowerCase();
        if (stage.includes('seed')) return '🌱';
        if (stage.includes('seedling')) return '🌿';
        if (stage.includes('young')) return '🌳';
        if (stage.includes('mature')) return '🌴';
        return '🌱';
    };

    return (
        <div className="bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-500 rounded-xl border border-white/20 shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="p-6">
                {/* Plant Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold text-white">{localPlant.species}</h3>
                    <div className="w-12 h-12 flex items-center justify-center bg-indigo-500/30 rounded-full text-2xl">
                        {getGrowthEmoji()}
                    </div>
                </div>

                {/* Growth Stage */}
                <div className="flex items-center mb-3">
                    <span className="text-sm font-medium text-white/80 mr-2">Growth Stage:</span>
                    <span className="font-medium text-white">{localPlant.growthStage}</span>
                </div>

                {/* Health Bar */}
                <div className="mb-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-white/80">Health:</span>
                        <span className="text-sm font-medium text-white/80">{localPlant.health}%</span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2.5">
                        <div
                            className={`h-2.5 rounded-full ${localPlant.health > 50 ? 'bg-green-400' : 'bg-red-400'
                                }`}
                            style={{ width: `${localPlant.health}%` }}
                        ></div>
                    </div>
                </div>

                {/* Growth Progress */}
                <div className="mb-4">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-white/80">Growth Progress:</span>
                        <span className="text-sm font-medium text-white/80">
                            {Math.round(localPlant.growthProgress * 100) / 100}
                        </span>
                    </div>
                    <div className="w-full bg-white/20 rounded-full h-2.5">
                        <div
                            className="bg-gradient-to-r from-green-400 to-green-500 h-2.5 rounded-full"
                            style={{ width: `${Math.min(localPlant.growthProgress * 10, 100)}%` }}
                        ></div>
                    </div>
                </div>

                {/* Status */}
                <div className="flex items-center mb-5">
                    <span className="text-sm font-medium text-white/80 mr-2">Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
                        {getStatusText()}
                    </span>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2">
                    <PlantActions
                        plant={localPlant}
                        onPlantUpdate={handlePlantUpdate}
                        showViewDetails={true}
                    />
                </div>
            </div>
        </div>
    );
}