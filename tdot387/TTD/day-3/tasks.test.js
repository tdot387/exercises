const { TaskManager } = require('./taskManager');

describe('Task creation', () => {
  let taskManager;

  beforeEach(() => {
    taskManager = new TaskManager();
  })

  describe('data is valid', () => {
    
    test('should create a new task with title and description', () => {
      const task = taskManager.createTask({
        title: 'Write tests',
        description: 'Organize test suite'
      });
    
      expect(task.id).toBeDefined();
      expect(task.title).toBe('Write tests');
    });

    test('should set default status (pending)', () => {
      const task = taskManager.createTask({
        title: 'Write tests',
        description: 'Organize test suite'
      });
    
      expect(task.status).toBe('pending');
    });

    test('should set default priority (medium)', () => {
      const task = taskManager.createTask({
        title: 'Write tests',
        description: 'Organize test suite'
      });
    
      expect(task.priority).toBe('medium');
    });
  
    
  describe('data is valid', () => {
    
    test('should throw an error if title is empty', () => {
      expect(() => {
        taskManager.createTask({ 
          description: 'No title' 
        });
      }).toThrow('Title is required');
    });
    
    test('should throw an error if title is an empty string', () => {
      expect(() => {
        taskManager.createTask({ 
          title: '', 
          description: 'Empty title' });
      }).toThrow('Title is required');
    });

  })
});
});

describe('Task completion', () => {
  let taskManager;
  let task;

  beforeEach(() => {
    taskManager = new TaskManager();
    task = taskManager.createTask({
      title: 'test task',
      description: 'for testing'
    });
  })

  test('should mark task as completed', () => {
    taskManager.completeTask(task.id);
      
    const completedTask = taskManager.getTask(task.id);
    expect(completedTask.status).toBe('completed');
  });

  test('should create a completion timestamp', () => {
    const before = Date.now();
    taskManager.completeTask(task.id);
    const after = Date.now();
  
    const completedTask = taskManager.getTask(task.id);
    expect(completedTask.completedAt).toBeGreaterThanOrEqual(before);
    expect(completedTask.completedAt).toBeLessThanOrEqual(after);
  });

  test('should throw an error if task is already completed', () => {
    taskManager.completeTask(task.id);
  
    expect(() => {
      taskManager.completeTask(task.id);
    }).toThrow('Task is already completed');
  });
  
  test('should not complete task if id is invalid', () => {
    expect(() => {
      taskManager.completeTask('invalid-id');
    }).toThrow('Task not found');
  });

})



describe('Check task priorities', () => {
  let taskManager;
  let task;

  beforeEach(() => {
    taskManager = new TaskManager();
  })
  
  test('should set task priority to high', () => {
    const task = taskManager.createTask({
      title: 'Urgent task',
      description: 'High priority',
      priority: 'high'
    });
  
    expect(task.priority).toBe('high');
  });

  test('should set task priority to low', () => {
    const task = taskManager.createTask({
      title: 'Minor task',
      description: 'Low priority',
      priority: 'low'
    });
  
    expect(task.priority).toBe('low');
  });

  test('should throw an error if priority is invalid', () => {
    expect(() => {
      taskManager.createTask({
        title: 'Task',
        description: 'Invalid priority',
        priority: 'urgent'
      });
    }).toThrow('Invalid priority level');
  });

  test('should update priority to high', () => {
    const task = taskManager.createTask({
      title: 'Task',
      description: 'Medium priority'
    });
  
    taskManager.updatePriority(task.id, 'high');
  
    const updatedTask = taskManager.getTask(task.id);
    expect(updatedTask.priority).toBe('high');
  });

})

describe('Filtering and listing', () => {
  let taskManager;

  beforeEach(() => {
    taskManager = new TaskManager();
    taskManager.createTask({ title: 'Task 1', description: 'First' });
    taskManager.createTask({ title: 'Task 2', description: 'Second' });
    taskManager.createTask({ title: 'Task 3', description: 'Third' });
  })

  test('should show all created tasks', () => {
    const tasks = taskManager.listTasks();
    expect(tasks).toHaveLength(3);
  });

  test('should filter tasks by status', () => {
    const task = taskManager.listTasks()[0];
    taskManager.completeTask(task.id);
  
    const pendingTasks = taskManager.listTasks({ status: 'pending' });
    expect(pendingTasks).toHaveLength(2);
  });

  test('should filter tasks by priority', () => {
    const task = taskManager.listTasks()[0];
    taskManager.updatePriority(task.id, 'high');
  
    const highPriorityTasks = taskManager.listTasks({ priority: 'high' });
    expect(highPriorityTasks).toHaveLength(1);
    expect(highPriorityTasks[0].priority).toBe('high');
  });

})






