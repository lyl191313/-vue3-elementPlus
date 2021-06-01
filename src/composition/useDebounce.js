export function debounce(fn,delay) {
    var timer = null
    return function (...args) {
        var that = this
        clearTimeout(timer)
        timer =setTimeout(function () {
            fn.apply(that,args)
        },delay)
    }
}