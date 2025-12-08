import React from 'react';

const StatusCard = ({ label, value, color, bgColor }) => (
    <div className="bg-white p-4 rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
        <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">{label}</span>
            <div className={`w-3 h-3 rounded-full ${bgColor}`}></div>
        </div>
        <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
);

export default StatusCard;
