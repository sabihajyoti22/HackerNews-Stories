export default {
  install: (app) => {
    app.config.globalProperties.$formatTime = (time) => {
       return new Date(time).toLocaleTimeString()
    }
  }
}