import { faker } from '@faker-js/faker';

export interface Prompt {
  title: string
  slug: string
  seller: string
  cover: string
  price: number,
  description: string,
  platform: 'CHAT GPT' | 'MIDJOURNEY' | 'DALLE 2' | 'STABLE DIFFUSION' | 'BARD',
  bgColor?: string
}

export const featuredPrompts: Prompt[] = [
  {
    title: "Detailed Waldo Puzzle Illustrations",
    seller: "@esco",
    cover:
      "https://res.cloudinary.com/djdr0q0k2/image/upload/q_auto:eco/f_auto/v1685436353/prompt-attack/grid_0_2_5d3017d12b.png",
    price: 1.99,
    description: '',
    platform: 'MIDJOURNEY',
    slug: 'detailed-waldo-puzzle-illustrations'
  },
  {
    title: "Bustling cityscape at night",
    seller: "@ShirtScene",
    cover:
      "https://res.cloudinary.com/djdr0q0k2/image/upload/q_auto:eco/f_auto/v1685184423/prompt-attack/Crime_Scene_A_mesmerizing_mixed_media_collage_depicting_a_bustling01_38c36c96fd.png",
    price: 2.99,
    description: '',
    platform: 'STABLE DIFFUSION',
    slug: 'bustling-cityscape-at-night'
  },
  {
    title: "Future Inspired City Skylines",
    seller: "@ParaDimm",
    cover:
      "https://res.cloudinary.com/djdr0q0k2/image/upload/q_auto:eco/f_auto/v1685159148/prompt-attack/DALL_E_2023_05_25_20_54_22_a_futuristic_cityscape_at_night_with_towering_skyscrapers_vibrant_neon_lights_and_flying_vehicles_filling_the_sky_045559d847.png",
    price: 4.99,
    description: '',
    platform: 'MIDJOURNEY',
    slug: 'future-inspired-city-skylines'
  },
  {
    title: "Fantasy Bioluminescent Landscapes",
    seller: "@ParaDimm",
    cover:
      "https://res.cloudinary.com/djdr0q0k2/image/upload/q_auto:eco/f_auto/v1685405435/prompt-attack/gu5ug565_3ea8770b54.jpg",
    price: 1.99,
    description: '',
    platform: 'MIDJOURNEY',
    slug: 'fantasy-bioluminescent-landscapes'
  },
  {
    title: "How to write a likeable villain",
    seller: "@Dragontrader",
    cover:
      "https://promptattack.com/assets/images/gpt-icons/white/062-pencil.svg",
    price: 3.99,
    description: '',
    platform: 'CHAT GPT',
    bgColor: 'rgb(228, 143, 143)',
    slug: 'dhow-to-write-a-likeable-villain'
  },
  {
    title: "Aurorapunk Girl",
    seller: "@Ctrl-P",
    cover:
      "https://res.cloudinary.com/djdr0q0k2/image/upload/q_auto:eco/f_auto/v1685272539/prompt-attack/Ctrl_P_beautiful_lady_with_long_hair_shinyglossywhite_backgroun_2e79d584_8cc8_4c8b_8e8f_6bc8b0ba02a0_f039539f74.png",
    price: 5.99,
    description: '',
    platform: 'STABLE DIFFUSION',
    slug: 'aurorapunk-girl'
  },
]

export const singlePrompt = {
  title: faker.lorem.sentence,
  seller: faker.internet.userName,
  tags: faker.helpers.uniqueArray(faker.word.sample, 50),
  cover:
    "https://res.cloudinary.com/djdr0q0k2/image/upload/q_auto:eco/f_auto/v1685436353/prompt-attack/grid_0_2_5d3017d12b.png",
  price: faker.commerce.price({ min: 1, max: 7 }),
  description: faker.lorem.paragraph,
  platform: 'MIDJOURNEY',
  category: faker.lorem.word(),
  slug: 'detailed-waldo-puzzle-illustrations',
  images: [
    'https://res.cloudinary.com/djdr0q0k2/image/upload/q_auto:eco/f_auto/v1685159148/prompt-attack/DALL_E_2023_05_25_20_54_22_a_futuristic_cityscape_at_night_with_towering_skyscrapers_vibrant_neon_lights_and_flying_vehicles_filling_the_sky_045559d847.png',
    'https://res.cloudinary.com/djdr0q0k2/image/upload/q_auto:eco/f_auto/v1685159152/prompt-attack/DALL_E_2023_05_25_20_54_19_a_futuristic_cityscape_at_night_with_towering_skyscrapers_vibrant_neon_lights_and_flying_vehicles_filling_the_sky_af14fca293.png',
    'https://res.cloudinary.com/djdr0q0k2/image/upload/q_auto:eco/f_auto/v1685159147/prompt-attack/DALL_E_2023_05_25_20_54_17_a_futuristic_cityscape_at_night_with_towering_skyscrapers_vibrant_neon_lights_and_flying_vehicles_filling_the_sky_553bbcc296.png',
    'https://res.cloudinary.com/djdr0q0k2/image/upload/q_auto:eco/f_auto/v1685159148/prompt-attack/DALL_E_2023_05_25_20_54_13_a_futuristic_cityscape_at_night_with_towering_skyscrapers_vibrant_neon_lights_and_flying_vehicles_filling_the_sky_eb6e06e88b.png',
    'https://res.cloudinary.com/djdr0q0k2/image/upload/q_auto:eco/f_auto/v1685159147/prompt-attack/DALL_E_2023_05_25_20_53_54_a_futuristic_cityscape_at_night_with_towering_skyscrapers_vibrant_neon_lights_and_flying_vehicles_filling_the_sky_0ebc1cd11f.png',
    'https://res.cloudinary.com/djdr0q0k2/image/upload/q_auto:eco/f_auto/v1685159151/prompt-attack/DALL_E_2023_05_25_20_53_50_a_futuristic_cityscape_at_night_with_towering_skyscrapers_vibrant_neon_lights_and_flying_vehicles_filling_the_sky_06409e4fa2.png'
  ]
}