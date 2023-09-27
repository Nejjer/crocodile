import { FC } from "react";
import { SplitContainer } from "../../containers/SplitContainer/SplitContainer.tsx";
import { DataInputContainer } from "../../containers/DataInputContainer/DataInputContainer.tsx";
import { TextField } from "@mui/material";

export const SignUp: FC = () => {
  return (
    <SplitContainer
      leftChild={
        <DataInputContainer
          btnText={"Присоединиться"}
          text={"Идентификатор комнаты:"}
          onClick={() => console.log("click")}
        >
          <TextField />
        </DataInputContainer>
      }
      rightChild={
        <DataInputContainer
          btnText={"Создать комнату"}
          text={
            "Создайте комнату, к вам смогут присоединиться ваши друзья по идентификатору комнаты."
          }
          onClick={() => console.log("click")}
        />
      }
    />
  );
};
