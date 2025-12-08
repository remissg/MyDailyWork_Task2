import React from 'react';

const InputField = ({ label, id, type = 'text', error, icon: Icon, ...props }) => {
    return (
        <div className="flex flex-col gap-1.5 mb-4">
            {label && (
                <label htmlFor={id} className="text-sm font-bold text-gray-700">
                    {label}
                </label>
            )}
            <div className="relative">
                {Icon && (
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    id={id}
                    type={type}
                    className={`w-full ${Icon ? 'pl-10' : 'px-3'} py-3 border rounded-lg bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#10b981]/20 focus:border-[#10b981] transition-all font-medium placeholder-gray-400 text-gray-900 ${error ? 'border-red-500' : 'border-gray-200'
                        }`}
                    {...props}
                />
            </div>
            {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
        </div>
    );
};

export default InputField;
