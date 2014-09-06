define(function (require) {
    var defineComponent = require('flight/lib/component');
    return defineComponent(addTask);
    function addTask() {
        this.defaultAttrs({
            submitSelector: '.js-add-task-submit',
            descriptionSelector: '.js-add-task-description'
        });
        this.handleSubmit = function (event) {
// don't actually submit the form
            event.preventDefault();
// get the input element
            var $description = this.select('descriptionSelector');
            var description = $description.val();
// trim whitespace
            description = $.trim(description);
            this.trigger('uiAddTask', {
                task: {
                    description: description
                }
            });

            var $submit = this.select('submitSelector');
            $description.attr('disabled', true);
            $submit.attr('disabled', true);
        };
        this.after('initialize', function () {
// listen for submit events
            this.on('submit', this.handleSubmit);
        });

        this.handleTaskAdded = function (event, data) {
            this.select('submitSelector').attr('disabled', false);
            this.select('descriptionSelector').attr('disabled', false);
        };

        this.on('dataTaskAdded', this.handleTaskAdded);
    };
});