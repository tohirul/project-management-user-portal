import React from "react";

type Props = {
  id: number;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
};

const BoardView = ({ id, setIsModalNewTaskOpen }: Props) => {
  return <div>BoardView: {id}</div>;
};

export default BoardView;
