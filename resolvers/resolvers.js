import todoMutations from './todos/todo.mutations.js';
import todoQueries from './todos/todo.queries.js';
import userMutations from './users/user.mutations.js';
import userQueries from './users/user.queries.js';

const resolvers = {
  Query: {
    ...userQueries,
    ...todoQueries,
  },
  Mutation: {
    ...userMutations,
    ...todoMutations,
  },
};

export default resolvers;
