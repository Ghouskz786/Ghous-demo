import "./App.css";
import Input from "./components/input";
import Heading from "./components/heading";
import Todos from "./components/Todos";
import Message from "./components/message";
import Button from "./components/button";
import MessageTodo from "./components/messageTodo";
import { WrapEveryThing } from "./store/storeItems";
function App() {
  return (
    <>
      <WrapEveryThing>
        <center>
          <Heading />
          <Input></Input>
          <Button />
          <Message /> <Todos />
          <MessageTodo></MessageTodo>
        </center>
      </WrapEveryThing>
    </>
  );
}

export default App;
