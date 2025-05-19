import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const PaymentResult = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const status = queryParams.get('status') || 'failed';

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/blogs');
        }, 5000);
        return () => clearTimeout(timer);
    }, [navigate]);
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-gray-50 to-gray-100 p-8">
            {status === 'success' ? (
                <div className="animate-fade-in-up">
                    <div className="mb-6 animate-bounce">
                        <svg className="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-green-600 mb-4 font-serif">
                        Payment Successful! <span className="animate-pulse">🎉</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">Thank you for your support! You'll be redirected shortly.</p>
                    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border border-green-200">
                        <div className="flex justify-between items-center mb-4">
                            <span className="text-gray-500">Transaction</span>
                            <span className="font-mono text-sm bg-green-100 text-green-800 px-2 py-1 rounded">#STB-{Math.floor(Math.random() * 10000)}</span>
                        </div>
                        <div className="flex justify-center my-6">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png"
                                alt="Starbucks"
                                className="h-12 w-auto opacity-90"
                            />
                        </div>
                        <p className="text-gray-700 mb-2">Thank you so much!</p>
                        <div className="h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full my-4"></div>
                        <p className="text-sm text-gray-500">Redirecting in 5 seconds...</p>
                    </div>
                </div>
            ) : (
                <div className="animate-fade-in-up">
                    <div className="mb-6 animate-shake">
                        <svg className="w-24 h-24 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h1 className="text-4xl font-bold text-red-600 mb-4 font-serif">
                        Payment Failed <span className="animate-pulse">😞</span>
                    </h1>
                    <p className="text-lg text-gray-600 mb-8">We couldn't process your payment. Please try again.</p>
                    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 border border-red-200">
                        <div className="flex justify-center my-6">
                            <img
                                src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png"
                                alt="Starbucks"
                                className="h-12 w-auto opacity-90"
                            />
                        </div>
                        <div className="h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full my-4"></div>
                        <button
                            onClick={handleBuyMeACoffee}
                            className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
                        >
                            Try Again
                        </button>
                        <p className="text-sm text-gray-500 mt-4">Or contact support@example.com</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default PaymentResult