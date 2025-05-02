// src/interfaces/Task.ts
export interface Task {
    _id?: string;
    worker?: string;
    day?: string;
    task?: string;
    startTime?: string;
    endTime?: string;
    aisle?: string;
    id?: number;
    name?: string;
    description?: string;
  }