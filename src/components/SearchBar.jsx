import React from 'react';
import { Search, MapPin } from 'lucide-react';
import Button from './Button';

const SearchBar = () => {
    return (
        <div className="bg-white p-3 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex flex-col md:flex-row gap-3 w-full max-w-3xl border border-gray-100 mx-auto">
            <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <Search className="text-gray-400 mr-3 hidden md:block" size={24} />
                <input
                    type="text"
                    placeholder="Job title or keyword"
                    className="bg-transparent border-none outline-none w-full text-lg text-gray-900 placeholder-gray-400 font-medium"
                />
            </div>
            <div className="h-px md:h-auto md:w-px bg-gray-200 mx-2 hidden md:block"></div>
            <div className="flex-1 flex items-center px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <MapPin className="text-gray-400 mr-3 hidden md:block" size={24} />
                <input
                    type="text"
                    placeholder="City, state, or zip"
                    className="bg-transparent border-none outline-none w-full text-lg text-gray-900 placeholder-gray-400 font-medium"
                />
            </div>
            <Button className="md:w-auto w-full px-8 py-3 text-lg rounded-xl shadow-lg shadow-primary/30">Search</Button>
        </div>
    );
};

export default SearchBar;
