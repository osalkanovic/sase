'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import sendIcon from '../../images/send.png';
import MultilingualWelcome from './RotatingText';

export default function Login() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#F3F7FB] relative">
      <div className="absolute inset-0 rounded-2xl m-6 pointer-events-none z-10" />
      <div className="relative z-20 flex w-[90vw] max-w-[1600px]  min-h-[700px] bg-white rounded-2xl overflow-hidden shadow-xl">
        {/* Left Side */}
        <div className="w-1/2 h-full flex flex-col justify-center px-16 py-12 bg-gradient-to-br from-[#6C6CE5] via-[#A06AF9] to-[#FBC2EB] text-white relative">
          <div>
            <div className="text-5xl font-[400] mb-0 leading-tight">Berza.</div>
            <MultilingualWelcome />
          </div>
          <div className="mt-8">
            <div className="text-base font-semibold mb-2">
              Pokaži mi financijske izvještaje BH Telecoma za posljednji kvartal
            </div>
            <div className="inline-flex items-center px-4 py-1 bg-white/20 rounded-full text-xs font-medium mb-4">
              SASE A.I{' '}
              <span className="ml-2 bg-white/30 rounded-full px-2 py-0.5">
                9
              </span>
            </div>
            <div className="bg-white/20 rounded-2xl p-5 text-sm mb-4">
              <span className="font-normal text-white">
                Evo detaljnog pregleda financijskih izvještaja BH Telecoma za
                posljednji kvartal:
              </span>
              <p className="font-semibold text-white mt-2">Prihodi</p>
              <ol className="list-inside mt-1 text-white/90">
                <li>Trenutna godina: 528,325,078 KM</li>
                <li>Prethodna godina: 505,223,267 KM</li>
              </ol>

              <p className="font-semibold text-white mt-2">Dobit</p>
              <ol className="list-inside mt-1 text-white/90">
                <li>Dobit iz redovnog poslovanja: 65,842,371 KM</li>
                <li>Ukupni rezultat: 62,790,293 KM</li>
              </ol>

              <p className="font-semibold text-white mt-2">
                Pokazatelji po dionici
              </p>
              <ol className="list-inside mt-1 text-white/90">
                <li>Osnovna zarada po dionici: 1.04 KM</li>
              </ol>
              <div className="mt-2 text-white/80">
                Kompanija pokazuje pozitivan trend rasta u svim ključnim
                pokazateljima.
              </div>
            </div>
            <div className="flex items-center mt-6 bg-white/20 rounded-full px-4 py-2">
              <input
                className="flex-1 bg-transparent outline-none text-white placeholder-white/70 text-sm"
                placeholder="Šta želiš danas kupiti?"
                disabled
              />
              <button className="ml-2 bg-white/30 rounded-full p-2">
                <Image src={sendIcon} alt="send" width={20} height={20} />
              </button>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="w-1/2 h-full flex flex-col justify-center items-center bg-white px-16 py-12">
          <div className="w-full max-w-md">
            <div className="text-2xl font-bold text-gray-900 mb-2 text-center">
              Prijavi se
            </div>
            <div className="text-sm text-gray-500 mb-8 text-center">
              Povećaj svoje iskustvo, prijavi se za besplatan nalog danas
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs ml-4 font-medium text-gray-600 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 text-sm border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#6C6CE5]"
                  placeholder="Ex. rikimartin@gmail.com"
                />
              </div>
              <div>
                <label className="block text-xs ml-4 font-medium text-gray-600 mb-1">
                  Lozinka
                </label>
                <div className="relative">
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-200 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-[#6C6CE5] pr-10"
                    placeholder="Unesi lozinku"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg
                      width="20"
                      height="20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </span>
                </div>
              </div>
              <div className="text-xs text-gray-400 mb-2">
                Registracijom naloga pristajete na naše{' '}
                <a href="#" className="underline text-[#6C6CE5]">
                  Uvjete korištenja
                </a>{' '}
                i potvrđujete da ste pročitali i prihvatili{' '}
                <a href="#" className="underline text-[#6C6CE5]">
                  Globalnu izjavu o privatnosti
                </a>
                .
              </div>
              <button
                type="submit"
                onClick={() => router.push('/chat')}
                className="w-full bg-[#5661F6] hover:bg-[#5a5ad6] text-white font-semibold py-2 rounded-full transition"
              >
                Prijava
              </button>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="mx-4 text-gray-400 text-sm">ILI</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>
            <button className="w-full flex items-center justify-center border border-gray-200 rounded-lg py-2 mb-3 hover:bg-gray-50 transition">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                className="w-5 h-5 mr-2"
              />
              Prijava sa Google
            </button>
            <button className="w-full flex items-center justify-center border border-gray-200 rounded-lg py-2 hover:bg-gray-50 transition">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/976px-Apple_logo_black.svg.png?20220821121934"
                alt="Apple"
                className="w-4 mr-2 -mt-1"
              />
              Prijava sa Apple
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
