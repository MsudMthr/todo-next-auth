import { getOneTodo } from "../api/todos/[todoId]";

const todoDetails = ({ todo }) => {
    console.log(todo);
  return (
    <div>
      <h1>todo details page</h1>
      {todo.todo}
      {todo.description}
    </div>
  );
};

export default todoDetails;

export async function getServerSideProps(context) {
  const { query } = context;
  const todo =await getOneTodo(query);
  return {
    props: {
      todo: JSON.parse(JSON.stringify(todo)),
    },
  };
}
