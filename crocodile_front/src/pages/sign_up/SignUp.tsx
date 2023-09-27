import { FC } from "react";
import { SplitContainer } from "../../containers/SplitContainer/SplitContainer.tsx";

export const SignUp: FC = () => {
  return (
    <SplitContainer leftChild={<div>left</div>} rightChild={<div>right</div>} />
  );
};
