db.workouts.insertMany([
  {
    _id: 'Cristiano',
    name: 'Cristiano',
    exercises: [
      { name: 'Push Up', repetitions: 20 },
      { name: 'Leg Lever', repetitions: 25 },
      { name: 'Hip Extension', repetitions: 20 },
      { name: 'Sit-Up', repetitions: 15 },
      { name: 'Mountain Climber', repetitions: 15 },
    ],
  },
  {
    _id: 'Virgil',
    name: 'Virgil',
    exercises: [
      { name: 'Pull Up', repetitions: 10 },
      { name: 'Mountain Climber', repetitions: 15 },
      { name: 'Hip Extension Leg Raise', repetitions: 10 },
      { name: 'Push Up', repetitions: 20 },
      { name: 'Sideplank Rotation', repetitions: 10 },
    ],
  },
  {
    _id: 'Harry',
    name: 'Harry',
    exercises: [
      { name: 'Burpee', repetitions: 20 },
      { name: 'Single Leg Hip Extension', repetitions: 10 },
      { name: 'Squat', repetitions: 20 },
      { name: 'Single Leg Deadlift', repetitions: 10 },
      { name: 'Reverse Lunge', repetitions: 10 },
    ],
    rating: {
      value: 4.5,
      ratesCount: 6,
    },
  },
  {
    _id: 'Zlatan',
    name: 'Zlatan',
    exercises: [
      { name: 'Burpee', repetitions: 20 },
      { name: 'Sprinter', repetitions: 10 },
      { name: 'Forward Lunge', repetitions: 10 },
      { name: 'Reverse Table Hip Extension', repetitions: 20 },
      { name: 'Squat', repetitions: 20 },
    ],
  },
]);
