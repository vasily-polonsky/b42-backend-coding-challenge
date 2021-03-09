export interface IExercise {
  name: string;

  repetitions: number;
}

export interface ICreateWorkout {
  name: string;

  exercises: IExercise[];
}
