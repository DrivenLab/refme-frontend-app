interface TaskStats {
    type: string;
    correct: number;
    decisions: number;
    responseAvgTime: number;
    prom: number;
}

interface UserTaskStats {
    user?: TaskStats[];
    refme?: TaskStats[];
}

interface SuccessByType {
    successByType: UserTaskStats[];
}

interface UserDataRpeZone {
    zone: string;
    percentageZone: number;
    answers: number;
    successAnswers: number;
    successPercentage: number;
}

interface PeriodStats {
    period: string;
    correct: number;
    decisions: number;
    responseAvgTime?: number; // Optional because "successByTopicAndTime" doesn't have it
    prom: number;
}

interface SuccessByTypeAndTime {
    dm: PeriodStats[];
    memory: PeriodStats[];
    recognition: PeriodStats[];
    dmMemory: PeriodStats[];
    random: PeriodStats[];
}

interface SuccessByTopicAndTime {
    hand: PeriodStats[];
    disputes: PeriodStats[];
    tacticalFouls: PeriodStats[];
}

export interface Stats {
    successByType: UserTaskStats[];
    userDataRpeZone: UserDataRpeZone[];
    successByTypeAndTime: SuccessByTypeAndTime;
    successByTopicAndTime: SuccessByTopicAndTime;
}