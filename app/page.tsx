import Head from 'next/head';
import "./globals.css";
export default function Home() {
  return (
    <>
      <Head>
        <title>19 Crimes – Cheers to the Infamous</title>
      </Head>
      <main className="bg-black text-white font-sans">
        {/* Hero Section */}
        <section className="text-center py-20 bg-cover bg-center bg-[url('/hero.jpg')]">
          <h1 className="text-5xl font-bold uppercase">Cheers to the Infamous</h1>
          <p className="mt-4 text-lg">Discover the story behind every bottle</p>
        </section>

        {/* Crimes Section */}
        <section className="py-16 px-6 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">The 19 Crimes</h2>
          <p className="text-gray-300">
            Each cork reveals one of the 19 crimes that led to “Punishment by Transportation.” What crime will you uncork tonight?
          </p>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-900 py-16 px-6">
          <h2 className="text-3xl font-semibold text-center mb-8">Don’t Take Our Word For It</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <blockquote className="bg-gray-800 p-6 rounded-lg">
              <p>“Love Cali Gold! Used it to celebrate my retirement. Smooth as Snoop himself!”</p>
              <footer className="mt-2 text-sm text-gray-400">– Peggy C.</footer>
            </blockquote>
            <blockquote className="bg-gray-800 p-6 rounded-lg">
              <p>“This wine is very tasty! Great blend! One of my favorites!”</p>
              <footer className="mt-2 text-sm text-gray-400">– Roger W.</footer>
            </blockquote>
          </div>
        </section>

        {/* AR Experience */}
        <section className="py-16 px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Play The AR Experience</h2>
          <p className="text-gray-300">Come face-to-face with infamous convicts and hear their story through augmented reality.</p>
          <button className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-white">Experience Now</button>
        </section>

        {/* Newsletter */}
        <section className="bg-gray-950 py-16 px-6 text-center">
          <h2 className="text-2xl font-semibold mb-4">Subscribe</h2>
          <p className="text-gray-400 mb-6">Get the latest on sales, new releases and more.</p>
          <form className="flex flex-col md:flex-row justify-center gap-4">
            <input type="text" placeholder="First Name" className="px-4 py-2 rounded bg-gray-800 text-white" />
            <input type="text" placeholder="Last Name" className="px-4 py-2 rounded bg-gray-800 text-white" />
            <input type="email" placeholder="Email" className="px-4 py-2 rounded bg-gray-800 text-white" />
            <button type="submit" className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded text-white">Sign Up</button>
          </form>
        </section>
      </main>
    </>
  );
}
