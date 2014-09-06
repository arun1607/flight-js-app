define(function() {
    var withJumping = function () {
        this.jump = function(howFar) {
            console.log("Jumping");
        }
    };
    return withJumping;
});