import React from "react";

const DefultError = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-gradient-to-br from-indigo-900 via-indigo-800 to-indigo-700 text-white relative overflow-hidden">


            <div className="absolute w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl -top-20 -left-20"></div>
            <div className="absolute w-[400px] h-[400px] bg-purple-400/20 rounded-full blur-3xl -bottom-20 -right-20"></div>


            <div className="absolute inset-0 opacity-10 
                bg-[linear-gradient(to_right,white_1px,transparent_1px),
                linear-gradient(to_bottom,white_1px,transparent_1px)] 
                bg-[size:40px_40px]">
            </div>


            <div className="relative text-center max-w-xl">


                <h1 className="text-[120px] sm:text-[160px] font-extrabold leading-none tracking-tight bg-gradient-to-r from-indigo-200 to-white text-transparent bg-clip-text">
                    404
                </h1>


                <h2 className="text-2xl sm:text-3xl font-semibold mt-4">
                    Lost in Space 🚀
                </h2>

                <p className="mt-4 text-indigo-200 text-sm sm:text-base">
                    The page you’re looking for doesn’t exist, was moved, or never existed.
                    Don’t worry — we’ll guide you back.
                </p>


                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                    <a href="/">
                        <button className="px-8 py-3 rounded-xl bg-white text-indigo-700 font-semibold 
                        hover:bg-indigo-100 transition-all duration-200 shadow-lg">
                            Go Home
                        </button>
                    </a>

                    <button
                        onClick={() => window.history.back()}
                        className="px-8 py-3 rounded-xl border border-white/30 text-white 
                        hover:bg-white/10 transition-all duration-200"
                    >
                        Go Back
                    </button>

                </div>

       
                <p className="mt-8 text-xs text-indigo-300">
                    Error code: 404 • Page not found
                </p>

            </div>

        </div>
    );
};

export default DefultError;