# Mindful
{cool image}

{Description}

{link to live demo}

### Built With
* React
* React Router
* Vite
* Express.js
* MongoDB

## Getting Started
### Prerequisites
// TODO

### Installation
// TODO

## Contributing
### Project Structure
The project is split into the client side, which uses React / React Router / Vite to serve the frontend content, and server side, which uses Express.js to handle our API routes.

### Client
For the client side, we are using react router's data mode: https://reactrouter.com/start/data/routing

```
src
├── assets
├── components // use this for small components, e.g., buttons, navbar
│   ├── ComponentName
│   │   ├── componentName.css
│   │   └── ComponentName.tsx
│   └── ...
├── layouts // use this for layouts, e.g., navbar + content
│   ├── LayoutName
│   │   ├── layoutName.css
│   │   └── LayoutName.tsx
│   └── ...
├── pages // use this for entire pages for routes
│   ├── PageName
│   │   ├── pageName.css
│   │   └── PageName.tsx
│   └── ...
├── services // use this for important functions like authentication, data fetching, etc.
│   ├── serviceName.tsx
│   ├── ...
│   └── ...
├── index.css
└── main.tsx // routes go here, see react router data mode
```

### Server
// TODO

```
server
├── node modules
├── app.js
├── package-lock.json
└── package.json
```