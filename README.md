A small e-commerce which:

- Fetches demo data from REST API
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
- **React Hook Form**
  - Used for easier form validation.
  - [Official page](https://react-hook-form.com/)

## Cmds

To start the app localy ` http://localhost:5173/Furniro-e-commerce-project/` in terminal run `npm run dev`.
To update app on github pages commit & push changes to main repository branch, then in terminal run `npm run deploy`.

# REST API

Free Fake REST API for Placeholder JSON Data
[DummyJSON](https://dummyjson.com/). Currently using the following product categories _furniture_, _home-decoration_, _kitchen-accessories_.

To start app run `npm run dev`.

## TODO

1. 
