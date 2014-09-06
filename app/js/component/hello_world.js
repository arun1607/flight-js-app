define(function (require) {
// import dependencies
    var defineComponent = require('flight/lib/component');
// export component constructor
    return defineComponent(helloWorld);
// component definition
    function helloWorld() {
        this.after('initialize', function () {
            console.log('Hello, world!');
        })

    }
});
