export interface Task {
    id?: number;
    description: string;
    date: Date;
    completed: Boolean;
}

export interface RequestBodyComplete {
  id: number;
  completed: Boolean;
}


