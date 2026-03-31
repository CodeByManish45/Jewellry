export const CategoryBanner = ({ title, description, imageStr, position = "center" }) => {
  return (
    <div className="relative h-[45vh] min-h-[350px] w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src={imageStr} 
          alt={title} 
          className={`w-full h-full object-cover object-${position}`}
        />
        <div className="absolute inset-0 bg-slate-900/40"></div>
      </div>
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-white tracking-widest uppercase mb-4 drop-shadow-sm">{title}</h1>
        <div className="w-16 h-0.5 bg-gold-500 mx-auto mb-6"></div>
        <p className="text-lg text-beige-100 font-light tracking-wide drop-shadow-sm">{description}</p>
      </div>
    </div>
  );
};
