export interface ProjectModal {
    members:      Member[];
    creator:      Creator;
    id:           number;
    projectName:  string;
    description:  string;
    categoryId:   number;
    categoryName: string;
    alias:        string;
    deleted:      boolean;
}


export interface ProjectDetail {
    lstTask:         LstTask[];
    members:         Member[];
    creator:         Creator;
    id:              number;
    projectName:     string;
    description:     string;
    projectCategory: Creator;
    alias:           string;
}

export interface TaskDetail {
    priorityTask:          PriorityTask;
    taskTypeDetail:        TaskTypeDetail;
    assigness:             any[];
    lstComment:            any[];
    taskId:                number;
    taskName:              string;
    alias:                 string;
    description:           string;
    statusId:              string;
    originalEstimate:      number;
    timeTrackingSpent:     number;
    timeTrackingRemaining: number;
    typeId:                number;
    priorityId:            number;
    projectId:             number;
}

export interface PriorityTask {
    priorityId: number;
    priority:   string;
}

export interface TaskTypeDetail {
    id:       number;
    taskType: string;
}

export interface LstTask {
    lstTaskDeTail: any[];
    statusId:      string;
    statusName:    string;
    alias:         string;
}
export interface Creator {
    id:   number;
    name: string;
}

export interface Member {
    userId: number;
    name:   string;
    avatar: string;
}


export interface FormUpdate {
    projectName:string,
    description:string,
    categoryId:string,
    creator: number,
}

export interface IColumnsFromBackend {
    name:string,
    items:any[]

}