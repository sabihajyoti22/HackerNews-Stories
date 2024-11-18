const plugin = {
  install: (app: any) => {
    app.config.globalProperties.$formatTime = (time: number) => {
       return new Date(time).toLocaleTimeString()
    }
  }
}

export default plugin