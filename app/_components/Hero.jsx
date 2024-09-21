import { AtomIcon, Edit, Share2 } from 'lucide-react'
import React from 'react'

function Hero() {
  return (
    <section>
      <div className="mx-auto max-w-screen-s px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="pb-4 bg-gradient-to-r from-orange-300 via-red-500 to-red-200 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            Create your Forms
            <span className="sm:block">In Seconds using AI.</span>
          </h1>

          <p className="mx-auto text-s text-gray-500 mt-4 max-w-xl">
            Welcome to <b>FormWiz</b>, the AI-powered form builder that helps you create sleek, customizable forms in seconds! Our intuitive platform uses advanced AI to streamline form creation for you.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded border border-primary bg-primary px-12 py-3 text-sm font-bold text-white hover:bg-transparent hover:text-primary focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
              href="/dashboard"
            >
              + Create AI Form
            </a>

            <a
              className="block w-full rounded border border-primary px-12 py-3 text-sm text-primary font-bold hover:bg-primary hover:text-white focus:outline-none focus:ring sm:w-auto"
              href="#how-it-works"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>

      <section id="how-it-works">
        <div className="mx-auto max-w-screen-xl px-4 py-20"> {/* Further reduced padding */}
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">How it Works</h2>

            <p className="mt-4 text-gray-600">
            FormWiz is an intuitive form-building platform designed to help users create custom forms with ease. It enables seamless integration, robust data handling, and a smooth user experience. Whether you're building contact forms, surveys or lead-generation forms, FormWiz makes it easy to create and manage them with just a few clicks.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="/dashboard"
            >
              <AtomIcon className='h-8 w-8'/>

              <h2 className="mt-4 text-xl font-bold text-black">Write Prompt for Your Form</h2>

              <p className="mt-1 text-sm text-gray-600">
                Click! Click! Click! Our editor allows you to quickly craft prompts that speak directly to your audience, improving form clarity and completion rates.


              </p>
            </a>

            <a
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="/dashboard"
            >
              <Edit className='h-8 w-8'/>

              <h2 className="mt-4 text-xl font-bold text-black">Edit Your Form</h2>

              <p className="mt-1 text-sm text-gray-600">
              Easily modify and customize your forms with our intuitive editor. Add, remove, or rearrange fields. 
              With built-in preview functionality, you can see exactly how your form will appear on different devices. 
              Our powerful editing tools give you full control over the design and functionality.

</p>
            </a>

            <a
              className="block rounded-xl border border-gray-800 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="/dashboard"
            >
              <Share2 className='h-8 w-8'/>

              <h2 className="mt-4 text-xl font-bold text-black">Share & Start Accepting Responses</h2>

              <p className="mt-1 text-sm text-gray-600">
              Easily share your form and start collecting responses in minutes. Generate a shareable link or embed your form directly on your website. Get real-time notifications and view responses instantly as they come in.              </p>
            </a>
          </div>

          <div className="mt-12 text-center">
            <a
              href="/sign-in"
              className="inline-block rounded bg-primary px-12 py-3 text-sm font-medium text-white transition hover:bg-red-700 focus:outline-none focus:ring focus:ring-yellow-400"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </section>
  )
}

export default Hero;
