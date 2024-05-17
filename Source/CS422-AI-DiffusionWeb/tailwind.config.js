/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'mybg':"url('https://static.vecteezy.com/system/resources/previews/008/311/935/non_2x/the-illustration-graphic-consists-of-abstract-background-with-a-blue-gradient-dynamic-shapes-composition-eps10-perfect-for-presentation-background-website-landing-page-wallpaper-vector.jpg')"
      },
      fontSize: {
        small: '0.6rem',
        meidum: '0.7rem',
      },
      colors: {
        textMau: 'rgb(253 224 71)',
        textXanh: 'rgb(0,191,255)',
        textHong : '#e5989b',
        textVang : 'rgb(250, 112, 112)',
        hi: 'rgb(47,73,120)'
      },
      scale: {
        'mayBay': '0.3',
        'base': '0.3',
      },
      screens: {
        'pc': '1650px',
      }
    }
  },
  plugins: [
    require("flowbite/plugin")
  ],
}
