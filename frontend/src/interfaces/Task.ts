// src/interfaces/Task.ts
export interface Task {
    _id?: string;
    id?: number;
    worker: string;
    startTime: string;
    endTime: string;
    aisle: string;
    category: string;
    camera: string;
  }