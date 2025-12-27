import React, { useState, useEffect } from "react";
import Button from "../UI/Button";
import { assets } from "../../assets/assets";

const HeroCarousel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        {
            id: 1,
            title: "Order your favourite food here",
            subtitle: "Choose from a diverse menu featuring a delectable array of dishes.",
            image: assets.header_img,
            color: "from-orange-500 to-orange-600",
        },
        {
            id: 2,
            title: "Fresh & Healthy Meals",
            subtitle: "Start your day with our healthy breakfast options.",
            image: "https://images.unsplash.com/photo-1543353071-87d3df1a6a6f?q=80&w=2669&auto=format&fit=crop",
            color: "from-emerald-500 to-emerald-600",
        },
        {
            id: 3,
            title: "Craving Sweet Treats?",
            subtitle: "Indulge in our premium selection of desserts.",
            image: "https://images.unsplash.com/photo-1563729768-7491b31c7b44?q=80&w=2574&auto=format&fit=crop",
            color: "from-pink-500 to-pink-600",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative w-full h-[34vw] min-h-[300px] max-h-[500px] my-8 rounded-2xl overflow-hidden shadow-xl group">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

                    <div className="absolute inset-0 flex flex-col justify-center items-start px-[6vw] md:px-[6vw] gap-[1.5vw] max-w-[70%] animate-fade-in">
                        <h2 className="text-white text-[max(4.5vw,28px)] font-bold leading-tight drop-shadow-lg">
                            {slide.title}
                        </h2>
                        <p className="text-white text-[max(1.2vw,14px)] font-medium max-w-[80%] drop-shadow-md hidden sm:block">
                            {slide.subtitle}
                        </p>
                        <Button
                            variant="primary"
                            size="lg"
                            className="mt-4 rounded-full px-8 py-3 !text-[max(1vw,14px)] shadow-lg hover:scale-105 transition-transform"
                            onClick={() => document.getElementById("explore-menu")?.scrollIntoView()}
                        >
                            View Menu
                        </Button>
                    </div>
                </div>
            ))}

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                            ? "bg-white w-8"
                            : "bg-white/50 hover:bg-white/80"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            <button
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all hidden md:block"
                onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            >
                &#10094;
            </button>
            <button
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-all hidden md:block"
                onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            >
                &#10095;
            </button>
        </div>
    );
};

export default HeroCarousel;
