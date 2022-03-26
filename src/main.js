import {createApp} from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

export function isSafari() {
    let ua = window.navigator.userAgent;
    return !!ua.match(/mac|iPhone|iPad/i) && !!ua.match(/WebKit/i);
}

createApp(App).mount('#app')
