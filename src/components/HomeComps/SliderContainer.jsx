import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import '../../Styles/Home.css';

// The SliderContainer component is a slider that can contain multiple children, cycling between them at a set interval.
function SliderContainer({children}) {
    // State for the current index of visible slide.
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = React.Children.count(children);

    // Effect to cycle through slides every 5 seconds.
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((currentIndex + 1) % totalSlides);
        }, 5000); 
        return () => clearInterval(timer);
    }, [currentIndex, totalSlides]);

    // Use the useSwipeable hook to add swipe interactions.
    const handlers = useSwipeable({
        onSwipedLeft: () => setCurrentIndex((currentIndex + 1) % totalSlides),
        onSwipedRight: () => setCurrentIndex((currentIndex - 1 + totalSlides) % totalSlides),
    });
    
    // Render the children, passing isVisible prop to them.
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