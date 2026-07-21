function Hero() {
  return (
    <section className="bg-green-50 py-16">
       <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-10">

        <div className="max-w-xl">
         <h1 className="text-4xl md:text-3xl font-bold text-green-800 text-center md:text-left">
            Fresh Groceries at Your Doorstep
          </h1>

          <p className="mt-4 text-base md:text-Ig text-gray-600 leading-7 text-center md:text-left">
            Buy vegetables, fruits, milk, groceries, snacks,
            and daily essentials from nearby shops with fast
            home delivery.
          </p>

          <button className="mt-6 bg-green-700 text-white px-6 py-3 rounded-full  hover:bg-green-800 transitionduration-300 shadow-Ig">
            Shop Now
          </button>
        </div>

        <img
  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"
  alt="Fresh groceries"
  className="w-full max-w-sm md:w-80 rounded-3xl shadow-xl"
/>

      </div>
    </section>
  );
}

export default Hero;