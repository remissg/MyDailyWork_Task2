import React from 'react';
import { Link } from 'react-router-dom';
import { Ghost } from 'lucide-react';
import Button from '../components/Button';

const NotFound = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-4 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-6 animate-bounce">
                <Ghost size={48} />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Page not found</h1>
            <p className="text-xl text-gray-500 mb-8 max-w-md mx-auto">
                Oops! The page you are looking for might have been removed or temporarily unavailable.
            </p>
            <Link to="/">
                <Button className="px-8 py-3 rounded-full text-lg shadow-xl shadow-primary/20">
                    Go Back Home
                </Button>
            </Link>
        </div>
    );
};

export default NotFound;
