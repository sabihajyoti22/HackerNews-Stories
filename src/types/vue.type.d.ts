export { }
declare module 'vue' {
    interface ComponentCustomProperties {
        $axios: any,
        $formatTime: Function
    }
}