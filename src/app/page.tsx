import Index from "./component/HomePage";
import Table from "./component/AddTask";
import TextInputField from "./component/TextInputField";
import EditCard from "./component/EditCard";
import ParentComponent from "./component/ParentComponent";

export default function Home() {
  return (
    <main>
      <ParentComponent />
    </main>
  );
}
