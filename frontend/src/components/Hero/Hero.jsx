function Hero() {
  return (
    <section className="bg-green-50 py-16">
       <div className="max-w-7xl mx-auto px-5 flex flex-col md:flex-row items-center justify-between gap-10">

        <div className="max-w-xl">
         <h1 className="text-xl md:text-4xl font-bold text-green-800 text-center md:text-left">
            Fresh Groceries at Your Doorstep
          </h1>

         

        </div>

        <img
  src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=600"
  alt="Fresh groceries"
  className="w-full max-w[260px] md:max-w-sm rounded-3xl shadow-xl"
/>

      </div>
    </section>
  );
}

export default Hero;