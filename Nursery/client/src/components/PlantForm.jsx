'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createPlant } from '@/lib/api';
import { useToast } from './ToastProvider';

export default function PlantForm() {
    const router = useRouter();
    const { showToast } = useToast();
    const [species, setSpecies] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validate species input
        if (!species.trim()) {
            setError('Species name is required');
            return;
        }

        setIsSubmitting(true);

        try {
            // Call the API to create a new plant
            const newPlant = await createPlant(species.trim());
            showToast(`Successfully planted a new ${newPlant.species}!`);
            router.push('/plants'); // Redirect to the plants page
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
            setError(errorMessage);
            showToast(errorMessage, 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="relative z-10">
            {/* Background decoration */}
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>

            <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-md p-8 rounded-xl border border-white/20 shadow-xl relative z-10"
            >
                <h2 className="text-2xl font-bold text-white mb-6">Plant a New Seed</h2>

                <div className="mb-6">
                    <label htmlFor="species" className="block text-sm font-medium text-white/90 mb-2">
                        Species Name
                    </label>
                    <input
                        type="text"
                        id="species"
                        value={species}
                        onChange={(e) => setSpecies(e.target.value)}
                        placeholder="Enter plant species (e.g., Tomato, Rose, Sunflower)"
                        className="w-full px-4 py-3 bg-white/20 border border-white/30 text-white placeholder-white/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                        disabled={isSubmitting}
                    />
                    {error && <p className="mt-2 text-sm text-red-300">{error}</p>}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="transform transition-all duration-300 hover:scale-105 px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-white/90 hover:text-indigo-700 shadow-lg disabled:bg-white/30 disabled:text-indigo-300 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Planting Seed...' : '🌱 Plant New Seed'}
                    </button>
                </div>

                <p className="mt-6 text-sm text-white/70">
                    Once planted, you'll need to water and care for your plant to help it grow through various stages.
                </p>
            </form>
        </div>
    );
}