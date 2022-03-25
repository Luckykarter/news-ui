# News UI

vue.js based front-end for the News Reader project. 

It's intended to be decoupled from a back-end and served via Nginx

### Main Features

The main page shows articles provided by `news-portal` back-end. 

It supports:
1. Search by text
2. Search by period (from date - to date)
3. Ordering by date, author, title
4. Infinite scroll to make the page light to load and capable of showing a lot of results

### Build and deploy

The deployment is done via Nginx and controlled by super-project `news-reader`.

To run locally - `.env.local` 


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
To run locally, `.env.local` file should be added to the project (ignored by git) with the following content (assuming that `news-portal` back-end is up and running on port `8000`)
```
VUE_APP_API_GATEWAY=http://localhost:8000/gateway/
```
To run front-end
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
