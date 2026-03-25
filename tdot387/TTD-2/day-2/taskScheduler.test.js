const { TaskScheduler } = require("./taskScheduler");

describe("TaskScheduler", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe("schedule()", () => {
    test("executes task after correct delay", () => {
      const scheduler = new TaskScheduler();
      const taskFn = jest.fn();

      scheduler.schedule("task", taskFn, 5000);

      expect(taskFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(4000);
      expect(taskFn).not.toHaveBeenCalled()

      jest.advanceTimersByTime(1000);
      expect(taskFn).toHaveBeenCalledTimes(1);
    });

  });

  describe("scheduleRecurring()", () => {
    test('executes task multiple times after specified time', () => {

      const scheduler = new TaskScheduler();
      const taskFn = jest.fn();

      scheduler.scheduleRecurring('recurring-task', taskFn, 1000);

      jest.advanceTimersByTime(1000);
      expect(taskFn).toHaveBeenCalledTimes(1);

      jest.advanceTimersByTime(1000);
      expect(taskFn).toHaveBeenCalledTimes(2);

      jest.advanceTimersByTime(5000);
      expect(taskFn).toHaveBeenCalledTimes(7);
    });
  });

  describe("cancelAll()", () => {
    test('scheduled tasks should not start', () => {

      const scheduler = new TaskScheduler();
      const taskFn = jest.fn();

      scheduler.schedule('cancel-task', taskFn, 5000);

      scheduler.cancelAll();
      jest.advanceTimersByTime(6000);
      
      expect(taskFn).not.toHaveBeenCalled();

    })
  });
});
