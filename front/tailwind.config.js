/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
    	{
	        mytheme: {
	          primary: "#000",
	          secondary: "#00f",
	          accent: "#000",
	          neutral: "#000",
            "base-content": "#000", /* Color de la letra */
	          "base-100": "#fff",
            "base-200": "#eee",
            "base-300": "#ccc",
            "error":"#ef4444"
    		},
    	},
      {
        myDark: {
          primary: "#000",
          secondary: "#00f",
          accent: "#444",
          neutral: "#444",
          "base-content": "#fff", /* Color de la letra */
          "base-100": "#222",
          "base-200": "#fff",
          "base-300": "#444",
          error:"#d00"
      },
    },
    ],
  },
}
