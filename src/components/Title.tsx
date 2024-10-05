import { FC, PropsWithChildren } from "react";
import Flex from "./Flex";
import { SubHeader } from "./Typography";
import PlusIcon from "./icons/PlusIcon";

interface TitleProps extends PropsWithChildren {
  action?: VoidFunction;
}

export const Title: FC<TitleProps> = ({ children, action }) => {
  return (
    <Flex align="center" gap="9px">
      <SubHeader>{children}</SubHeader>
      {action && <PlusIcon color="#9813D7" onClick={action} size={16} />}
    </Flex>
  );
};
