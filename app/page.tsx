import Posts from "src/home";
import TodoForm from "../components/todos/todoForm";

const Page: React.FC = () => {
  
  return (
    <div className="max-w-md mx-auto my-8 p-6 bg-white rounded-md shadow-md">
      <Posts />
    </div>
  );
};

export default Page;
