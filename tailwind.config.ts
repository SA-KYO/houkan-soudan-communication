import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        blush: {
          50: '#fff5f8',
          100: '#ffe4ee',
          200: '#fecddf',
          300: '#fcaac8',
          400: '#f77fb0',
          500: '#f25597',
          600: '#db3a7e',
          700: '#b62a64'
        },
        mist: '#f6f7fb',
        pearl: '#fefcff',
        mint: '#dff7ef',
        lavender: '#ece6ff',
        ink: '#2c1f2d'
      },
      borderRadius: {
        '2xl': '1rem'
      },
      fontFamily: {
        display: ['"M PLUS Rounded 1c"', '"Hiragino Maru Gothic ProN"', '"Yu Gothic"', 'sans-serif'],
        body: ['"M PLUS Rounded 1c"', '"Hiragino Kaku Gothic ProN"', '"Yu Gothic"', 'sans-serif']
      },
      boxShadow: {
        soft: '0 12px 30px rgba(242, 85, 151, 0.12)',
        card: '0 10px 20px rgba(44, 31, 45, 0.08)'
      },
      backgroundImage: {
        'soft-grad': 'linear-gradient(135deg, rgba(255,245,248,0.9) 0%, rgba(254,252,255,0.9) 40%, rgba(236,230,255,0.7) 100%)',
        'petal': 'radial-gradient(circle at 10% 20%, rgba(252,170,200,0.18), transparent 40%), radial-gradient(circle at 80% 0%, rgba(220,230,255,0.18), transparent 45%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 3.5s ease-in-out infinite'
      }
    }
  },
  plugins: []
};

export default config;
