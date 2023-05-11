import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import '../../Styles/Home.css';

function SliderContainer({children}) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = React.Children.count(children);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % totalSlides);
        }, 5000); 
        return () => clearInterval(timer);
    }, [currentIndex, totalSlides]);

    const handlers = useSwipeable({
        onSwipedLeft: () => setCurrentIndex((currentIndex + 1) % totalSlides),
        onSwipedRight: () => setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides),
    });

    return (
        <div className='slider-parent'>
            <div className="slider-container" {...handlers}>
            {React.Children.map(children, (child, index) =>
                React.cloneElement(child, { isVisible: index === currentIndex })
            )}
            <div className="slider-dots">
                {Array(totalSlides).fill(0).map((_, index) => (
                    <div
                        key={index}
                        className={`slider-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
        </div>
    );
}

export default SliderContainer;