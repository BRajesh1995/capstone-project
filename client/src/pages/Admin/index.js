import { Tabs } from "antd";
import MovieList from "./MovieList";
import TheatresTable from "./TheatresTable";

function Admin() {
  const tableItems = [
    {
      key: "1",
      label: "Movies",
      children: <MovieList />,
    },
    {
      key: "2",
      label: "Theatres",
      children: <TheatresTable />,
    },
  ];
  return (
    <div>
      <h1>Admin page</h1>
      <Tabs items={tableItems} />
    </div>
  );
}

export default Admin;
