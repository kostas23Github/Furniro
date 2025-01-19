A small e-commerce which:

- Fetces demo data from REST API
- Adds/Removes/Modify user cart
- Gets order data
- Possibly add user data(register, login)

# Built with

React(^18.3.1) + Vite(^6.0.5)

# Libraries used

- **React icons(^5.4.0)**
  - An easy way to access icons, custom for react applications.
  - [Official page](https://react-icons.github.io/react-icons/)
- **React responsive(^10.0.0)**
  - An easy way to get the current screen size and apply styles/logic. See './src/components/context/ScreenSizeContext.jsx' for more details.
  - An example: `const isMobile = useMediaQuery(breakpoints.mobile);`
  - [Official page](https://www.npmjs.com/package/react-responsive)
- **React Router(^7.1.1)**
  - For page routing, navigation. See 'app.jsx, routes folder & Layout.jsx' for more details.
  - [Official page](https://reactrouter.com/home)
- **Tailwindcss(^3.4.17)**
  - For easy, highly customizable css styling.
  - [Official page](https://tailwindcss.com/)
- **Figma**
  - Found a challenging yet appealing full e-commerce design to code.

# REST API

Free Fake REST API for Placeholder JSON Data
[DummyJSON](https://dummyjson.com/). Currently using the following product categories _furniture_, _home-decoration_, _kitchen-accessories_.

To start app run `npm run dev`.

## TODO

1. Add for each product a modal displaying more information about the product, some text of its characteristics. To that modal a button navigating to a specific product page.
2. Make expanding navigation bar for mobile, add user-action buttons functionality.
3. Finish Shop & Home pages by adding their remaining components(footer, aknowledges etc)

## Continue from

**ProductCard.jsx**
Just finished carousel for each product.

1. Add to every btn component its tooltip.
2. Add to it more parameters than a simple text value, something like `tooltip = { text, position, color, orientation, ...etc }`. Perhaps even a separate component(subcomponent of the btn component).
