function Hero() {
  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">

        <div className="max-w-xl">
          <h1 className="text-5xl font-bold text-green-800">
            Fresh Groceries Delivered to Your Doorstep
          </h1>

          <p className="mt-6 text-lg text-gray-700">
            Buy vegetables, fruits, milk, groceries, snacks,
            and daily essentials from nearby shops with fast
            home delivery.
          </p>

          <button className="mt-8 bg-green-700 text-white px-8 py-3 rounded-lg hover:bg-green-800">
            Shop Now
          </button>
        </div>

        <div className="text-8xl">
          🛒🥬🥛🍎
        </div>

      </div>
    </section>
  );
}

export default Hero;