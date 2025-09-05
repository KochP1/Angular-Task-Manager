export interface Project {
    id?: number;
    name: string;
    description: string;
}

export interface ProjectTasks {
    id?: number;
    name: string;
    description: string;
    tasks: Task[];
}

export interface Task {
    id?: number;
    title: string;
    description: string;
    status: string;
    dueDate: Date;
    idProject?: number;
    subTasks?:SubTask[];
}

export interface SubTask {
    id?: number;
    description: string;
    isCompleted: boolean;
    idTask: number
}

export interface Percentage {
    Finalizada: number
    En_curso: number;
    Pendiente: number;
}
