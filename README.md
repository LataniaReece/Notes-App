## Full Site 

https://latania-notesapp.netlify.app

## Technologies Explored

- **Tailwind CSS**: Embraced Tailwind CSS for its utility-first approach to styling. This exploration allowed me to customize the app's design with more granularity and control compared to using traditional CSS frameworks like Material-UI or Bootstrap. Tailwind's responsive design features were instrumental in achieving a mobile-friendly interface that adapts elegantly across devices.
- **classnames Package**: Utilized the `classnames` package to dynamically manage CSS classes, especially for toggling between light and dark themes. This approach streamlined the implementation of theme switching, enhancing the app's responsiveness. 
- **Playwright for Testing**: Ventured into using Playwright as the testing framework. Playwright stood out for its ability to record user interactions and automatically generate tests, a feature that significantly accelerated the testing process. The exploration into Playwright revealed its advantages over other testing frameworks like Cypress, including more comprehensive browser support and improved testing capabilities for modern web applications.
- **Redux Toolkit**: Used Redux Toolkit for state management to take advantage of its simplified store setup, built-in middleware, and utilities for reducing boilerplate code in Redux logic. This choice significantly enhanced state management practices within the app, making state updates more predictable and the codebase cleaner and more maintainable.

## Key Features

- **Rich Text Editing**: Leverage ReactQuill for a versatile note-taking experience.
- **Theme Support**: Easily switch between light and dark themes for comfortable viewing under any lighting conditions.
- **Responsive Design**: Tailwind CSS ensures the app looks great on both desktop and mobile.
- **Robust Testing**: Playwright tests ensure reliability and help maintain high code quality.

## What I Learned

Building the Notes App was an insightful journey. Tailwind CSS provided a fresh perspective on styling, emphasizing utility over predefined components. Integrating ReactQuill challenged me to implement rich text editing within a React ecosystem, enhancing the app's functionality.

The exploration of the `classnames` package for theme management was a testament to the power of dynamic class binding in React, simplifying the implementation of multi-theme support.

Using Redux Toolkit for state management streamlined my approach to managing app state, making the code more concise and easier to understand. Finally, adopting Playwright for testing opened up new avenues for ensuring app reliability and performance, setting a new standard for my future projects.

## Getting Started

To get a local copy up and running, follow these simple steps:

1. Clone the repo
```sh
git clone https://github.com/LataniaReece/Notes-App
```
2. Install NPM packages
```sh
npm install
```
3. Run the app
```sh
npm run dev
```
