# 🛍️ Starlfinx - Modern E-commerce Platform

A beautiful, responsive e-commerce application built with Next.js 15, React 19, and Tailwind CSS. Browse products, manage your shopping cart, and enjoy a seamless shopping experience.

![Starlfinx E-commerce](https://img.shields.io/badge/Next.js-15.5.0-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🛍️ Product Catalog**: Browse products with beautiful cards displaying images, prices, and ratings
- **🛒 Shopping Cart**: Add/remove items, update quantities, and view cart total
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **⚡ Fast Performance**: Built with Next.js 15 for optimal speed and SEO
- **🎨 Modern UI**: Clean, intuitive interface with Tailwind CSS
- **🔍 Real-time Updates**: Dynamic cart updates and product loading states
- **📊 Product Details**: View comprehensive product information including ratings and stock

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **State Management**: React Context API for cart management
- **Data Source**: [DummyJSON API](https://dummyjson.com/) for product data
- **Development**: ESLint for code quality

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/starlfinx.git
   cd starlfinx
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
starlfinx/
├── src/
│   ├── app/                 # Next.js App Router pages
│   │   ├── cart/           # Shopping cart page
│   │   ├── layout.tsx      # Root layout component
│   │   └── page.tsx        # Home page with product catalog
│   ├── components/         # Reusable React components
│   │   ├── CartItem.tsx    # Individual cart item component
│   │   ├── Header.tsx      # Navigation header
│   │   └── ProductCard.tsx # Product display card
│   ├── context/            # React Context providers
│   │   └── CartContext.tsx # Shopping cart state management
│   └── types/              # TypeScript type definitions
│       └── index.ts        # Product and cart interfaces
├── public/                 # Static assets
└── package.json           # Dependencies and scripts
```

## 🎯 Usage

### Browsing Products
- Visit the home page to see all available products
- Each product card displays:
  - Product image and title
  - Price and discount percentage
  - Rating and stock information
  - Add to cart button

### Shopping Cart
- Click "Add to Cart" on any product to add it to your cart
- Navigate to the cart page to:
  - View all items in your cart
  - Update quantities
  - Remove items
  - See order summary with total
  - Clear entire cart
  - Proceed to checkout

### Navigation
- Use the header navigation to switch between home and cart
- Responsive design adapts to different screen sizes

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🌟 Key Features Explained

### Product Management
- Fetches product data from DummyJSON API
- Displays products in a responsive grid layout
- Shows loading states and error handling
- Product cards with hover effects and animations

### Shopping Cart
- Persistent cart state using React Context
- Real-time quantity updates
- Cart total calculation
- Empty cart state with call-to-action

### Responsive Design
- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly interface elements
- Optimized for all device types

## 🔧 Configuration

The application uses several configuration files:

- `next.config.ts` - Next.js configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint rules

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically on every push

### Other Platforms
The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [DummyJSON](https://dummyjson.com/) for providing the product API
- [Vercel](https://vercel.com/) for the deployment platform

## 📞 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Made with ❤️ using Next.js and React**
