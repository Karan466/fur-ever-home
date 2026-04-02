import { Link } from "react-router-dom";
import FeaturedPets from "../components/FeaturedPets";

const Home = () => {
  return (
    <div className="bg-orange-50">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-orange-500 font-semibold mb-3">
            Adopt • Rescue • Care
          </p>
          <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight mb-6">
            Find Your <span className="text-orange-500">Perfect Pet</span> Companion
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-8">
            Discover lovable pets, send adoption requests, and support rescue
            campaigns — all in one place.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              to="/pets"
              className="bg-orange-500 hover:bg-orange-600 text-white px-7 py-3 rounded-2xl font-semibold transition"
            >
              Browse Pets
            </Link>

            <Link
              to="/campaigns"
              className="bg-white border border-orange-300 hover:bg-orange-100 text-orange-500 px-7 py-3 rounded-2xl font-semibold transition"
            >
              Support Campaigns
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-4">
          <img
            src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1200&auto=format&fit=crop"
            alt="Cute dog"
            className="w-full h-[450px] object-cover rounded-3xl"
          />
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h2 className="text-4xl font-bold text-orange-500 mb-2">100+</h2>
            <p className="text-slate-600">Pets Ready for Adoption</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h2 className="text-4xl font-bold text-orange-500 mb-2">50+</h2>
            <p className="text-slate-600">Happy Adoption Matches</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-8 text-center">
            <h2 className="text-4xl font-bold text-orange-500 mb-2">20+</h2>
            <p className="text-slate-600">Active Rescue Campaigns</p>
          </div>
        </div>
      </section>

      {/* Featured Pets */}
      <FeaturedPets />

      {/* Why Choose */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-3">
            Why Choose FurEver Home?
          </h2>
          <p className="text-slate-600 text-lg">
            Everything you need to help pets find a better life.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Easy Adoption
            </h3>
            <p className="text-slate-600 leading-7">
              Browse pets, view details, and send adoption requests in a simple process.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Trusted Owners
            </h3>
            <p className="text-slate-600 leading-7">
              Pet owners can manage requests and connect with genuine adopters.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-3">
              Rescue Support
            </h3>
            <p className="text-slate-600 leading-7">
              Donation campaigns help support medical care, shelter, and rescue efforts.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-orange-500 py-16 px-6 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Change a Pet’s Life?
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto">
          Whether you want to adopt, list a pet, or support a campaign — your action matters.
        </p>
        <Link
          to="/register"
          className="bg-white text-orange-500 px-8 py-3 rounded-2xl font-bold hover:bg-orange-100 transition"
        >
          Get Started
        </Link>
      </section>
    </div>
  );
};

export default Home;