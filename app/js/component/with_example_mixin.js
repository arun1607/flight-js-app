define(function() {
    var defineComponent = require('flight/lib/component');
    var withJumping = require('component/with_jumping');
    return defineComponent(frog, withJumping);
    function frog() {
        this.after('initialize', function(){
            this.on('hasSeenCat', this.jump);
        });
    };
});