import { useState } from 'react';

export const ImageGallery = ({ images, productName }) => {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-4/5 bg-beige-100 overflow-hidden relative group">
        <img 
          src={images[activeImg]} 
          alt={productName} 
          className="w-full h-full object-cover mix-blend-multiply transition-transform duration-700 min-h-full min-w-full"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gold-500">
          {images.map((img, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveImg(idx)}
              className={`w-20 h-24 shrink-0 bg-beige-100 border-2 transition-colors ${activeImg === idx ? 'border-gold-500' : 'border-transparent'}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover mix-blend-multiply" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
