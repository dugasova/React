const STATUS_TODO = 0;
const STATUS_IN_PROGRESS = 1;
const STATUS_DONE = 2;
const ON_HOLD = 4;

export { STATUS_TODO, 
    STATUS_IN_PROGRESS, 
    STATUS_DONE,
    ON_HOLD,
};

export const NEW_TASK_DEFAULT = {
    title: `Hello World`,
    status: STATUS_TODO
}