import Image from 'next/image';
import React from 'react'

export default function Feauturelogo() {
    const Data = [
        '/Logo1.png',
        '/Logo2.png',
        '/Logo3.png',
        '/Logo4.png',
        '/Logo5.png',
        '/Logo6.png',
      ];
  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 mx-auto max-w-screen-xl m-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {Data.map((val, i) => (
          <div key={i} className="flex justify-center">
            <Image
              src={val}
              alt={`Logo${i}`}
              width={1000}
              height={1000}
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
