import '../styles/globals.css'
import Link from 'next/link'
import Script from 'next/script'
import { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import bg from '../public/assets/background.jpeg'

function MyApp({ Component, pageProps }) {
  
  const handleClick = (e, id) => {
    if (id == 'home') {
      document.getElementById('home').classList.add('md:text-blue-700')
      document.getElementById('seft').classList.remove('bg-blue-500')
      document.getElementById('dashboard').classList.remove('md:text-blue-700')
      document.getElementById('own').classList.remove('md:text-blue-700')
      document.getElementById('seft').classList.add('text-blue-400')


    }
    if (id == 'seft') {
      document.getElementById('seft').classList.remove('text-blue-400')
      document.getElementById('seft').classList.add('bg-blue-500', 'text-white')
      document.getElementById('home').classList.remove('md:text-blue-700', )
      document.getElementById('dashboard').classList.remove('md:text-blue-700')
      document.getElementById('own').classList.remove('md:text-blue-700')
    }
    if (id == 'own') {
      document.getElementById('seft').classList.add('text-blue-400')
      document.getElementById('own').classList.add('md:text-blue-700')
      document.getElementById('seft').classList.remove('bg-blue-500')
      document.getElementById('dashboard').classList.remove('md:text-blue-700')
      document.getElementById('home').classList.remove('md:text-blue-700')
    }
    if (id == 'dashboard') {
      document.getElementById('seft').classList.add('text-blue-400')
      document.getElementById('dashboard').classList.add('md:text-blue-700')
      document.getElementById('seft').classList.remove('bg-blue-500')
      document.getElementById('home').classList.remove('md:text-blue-700')
      document.getElementById('own').classList.remove('md:text-blue-700')
    }
    
  };

 
  return (

    <div className='container bg-cover bg-no-repeat bg-center' style={{backgroundImage: `url(${bg.src})`, width: '100%', height: '100%'}}>
      <nav class="bg-gray-500 border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-slate-800 sticky top-0 z-40">
        <div class="container flex flex-wrap justify-between items-center mx-auto">
          <a href="/" class="flex items-center">
            <img src="https://github.com/nam18022001/One-Chat/blob/main/assets/logo/logoofme2.png?raw=true" class="mr-3 h-6 sm:h-9" alt="Beryl Logo" />
            <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Beryl Market</span>
          </a>
          <div class="flex md:order-2">
              <Link href="/create-item">
              <button onClick={(e) => handleClick(e, 'seft')} id='seft' type="button" class="bg-transparent hover:bg-blue-500 text-blue-400 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">Create NFT</button>
              </Link>
              <button data-collapse-toggle="mobile-menu-4" type="button" class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-4" aria-expanded="false">
              <span class="sr-only">Open main menu</span>
              <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
              <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>

          <div class="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="mobile-menu-4">
            <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
              <li>
                <Link href="/">
                  <a onClick={(e) => handleClick(e, 'home')} id='home' class=" text-lg block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 md:text-blue-700 " aria-current="page">Home</a>
                </Link>
              </li>
              
              <li>
                <Link href="/my-assets">
                  <a onClick={(e) => handleClick(e, 'own')} id='own' class="text-lg block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">My NFT</a>
                </Link>
              </li>
              <li>
                <Link href="/creator-dashboard">
                  <a onClick={(e) => handleClick(e, 'dashboard')} id='dashboard' class="text-lg block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Dashboard</a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
    <Component {...pageProps} />
    
<footer class="p-4 bg-white sm:p-6 dark:bg-gray-800">
  <div class="md:flex md:justify-between">
    <div class="mb-6 md:mb-0">
    <a href="#" class="flex items-center">
    <img src="https://github.com/nam18022001/One-Chat/blob/main/assets/logo/logoofme2.png?raw=true" class="mr-3 h-8" alt="FlowBite Logo" />
    <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Beryl Market</span>
    </a>
    </div>
    <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
      <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Nembers</h2>
          <ul class="text-gray-600 dark:text-gray-400">
          <li class="mb-4">
          <a href="https://www.facebook.com/long.hoang.bear" class="hover:underline">Hoang Long</a>
          </li>
          <li class="mb-4">
          <a href="https://www.facebook.com/vanphuoc.thai.5" class="hover:underline">Thai Van Phuoc</a>
          </li>
          <li class="mb-4">
          <a href="https://www.facebook.com/thuloan22112001" class="hover:underline">Le Tran Thu Loan</a>
          </li>
          <li class="mb-4">
          <a href="https://www.facebook.com/nam1822001" class="hover:underline">Hoang Nguyen Viet Nam</a>
          </li>
          
          
          </ul>
        </div>

        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
          <ul class="text-gray-600 dark:text-gray-400">
          <li class="mb-4">
          <a href="#" class="hover:underline">NextJs</a> 
          </li>
          <li class="mb-4">
          <a href="https://openzeppelin.com" class="hover:underline">Openzeppelin</a>
          </li>
          <li class="mb-4">
          <a href="https://tailwindcss.com/" class="hover:underline">Tailwind CSS</a>
          </li>
          <li class="mb-4">
          <a href="https://polygon.technology/" class="hover:underline">Polygon</a>
          </li>
          </ul>
        </div>
        
        <div>
          <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
          <ul class="text-gray-600 dark:text-gray-400">
          <li class="mb-4">
          <a href="https://github.com/nam18022001/beryl-market" class="hover:underline ">Github</a>
          </li>
          </ul>
        </div>
      
    </div>
  </div>
  
  <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8"></hr>
  <div class="sm:flex sm:items-center sm:justify-center mb-3">
    <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="#" class="hover:underline">Beryl Market™</a>. All Rights Reserved.
    </span>
  </div>
  <div class="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
    <a href="https://www.facebook.com/messages/t/nam1822001" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd"></path></svg>
    </a>
    <a href="https://www.instagram.com/justbenam/" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clip-rule="evenodd"></path></svg>
    </a>
    <a href="https://github.com/nam18022001" class="text-gray-500 hover:text-gray-900 dark:hover:text-white">
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"></path></svg>
    </a>
  </div>
</footer>

  </div>
  
  )
}

export default MyApp
