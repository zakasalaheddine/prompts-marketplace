'use client'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

type PromptImagesSliderProps = {
  images: string[]
}

export default function PromptImagesSlider({
  images
}: PromptImagesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    )
  }
  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    )
  }
  return (
    <div className="max-w-[1400px] h-[780px] w-full m-auto pr-4 relative">
      <div className="w-full h-full overflow-hidden relative">
        {images.map((image, idx) => (
          <Image
            key={idx}
            src={image}
            width={1000}
            height={1000}
            alt="Test"
            className={cn(
              'w-full h-full rounded-2xl bg-cover transition-all duration-500 absolute',
              idx === currentIndex ? 'block opacity-100' : 'hidden opacity-0'
            )}
          />
        ))}
      </div>

      <div
        className="absolute top-[50%] translate-y-[-50%] left-5 rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-8 w-8" />
      </div>
      <div
        className="absolute top-[50%] translate-y-[-50%] right-5 rounded-full p-2 bg-black/20 text-white cursor-pointer"
        onClick={nextSlide}
      >
        <ChevronRight className="h-8 w-8" />
      </div>
    </div>
  )
}
