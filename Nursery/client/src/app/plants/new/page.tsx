'use client';

import Link from 'next/link';
import PlantForm from '@/components/PlantForm';

export default function NewPlantPage() {
  return (
    <div>
      <div className="flex items-center mb-6">
        <Link 
          href="/plants" 
          className="text-gray-600 hover:text-gray-800 mr-4"
        >
          ← Back to Plants
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Add New Plant</h1>
      </div>
      
      <div className="max-w-md mx-auto">
        <PlantForm />
        
        <div className="mt-6 bg-blue-50 p-4 rounded-md">
          <h3 className="text-blue-800 font-medium mb-2">Plant Tips</h3>
          <ul className="text-blue-700 text-sm list-disc pl-5 space-y-1">
            <li>Water your plants regularly to maintain health</li>
            <li>Fertilize to speed up growth and improve health</li>
            <li>Plants go through several growth stages before they can be harvested</li>
            <li>Harvest plants when they reach maturity for the best results</li>
          </ul>
        </div>
      </div>
    </div>
  );
}