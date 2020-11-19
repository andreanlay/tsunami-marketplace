export default {
    data() {
        return {
            darkMode: null
        }
    },
    created() {
        var flag = JSON.parse(localStorage.getItem('darkMode'))
        this.darkMode = (flag ? true : false)
    }
}