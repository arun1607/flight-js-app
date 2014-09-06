define(function () {
        var defineComponent = require('flight/lib/component');
        var withStorage = require('component/with_storage');
        return defineComponent(taskData,withStorage);
        function taskData() {
            this.handleAddTask = function (e, data) {
                data.task.id = Date.now();
                this.tasks[data.task.id] = data.task;
                this.write(this.attr.taskStorageKey, this.tasks);
                this.trigger('dataTaskAdded', {
                        task: data.task
                    }
                )
            }

            this.handleNeedsTasks = function() {
                this.tasks = this.read(this.attr.taskStorageKey);
                this.trigger('dataTasks', {
                    tasks: this.tasks
                });
            };
            this.handleTaskCompleted = function (event, data) {
                var task = this.tasks[data.taskId];
                if (task) {
                    task.completed = true;
                    this.trigger('dataTaskCompleted', {
                        task: task
                    });
                } else {
                    this.trigger('dataTaskError', {
                        error: 'Task does not exist',
                        request: {
                            event: event,
                            data: data
                        }
                    });
                }
            }
            this.after('initialize', function () {
                this.tasks = this.read(this.attr.taskStorageKey) || {};
                this.on('uiAddTask', this.handleAddTask);
                this.on('uiNeedsTask', this.handleNeedsTask);
                this.on('uiNeedsTasks', this.handleNeedsTasks);
                this.on('uiTaskCompleted', this.handleTaskCompleted);
            });
        }
    }
)
