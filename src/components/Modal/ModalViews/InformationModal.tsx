import { FC } from "react";
import { Text } from "@components/Typography";
import { StyledModalContent, StyledModalWrap } from "../ModalStyles";
import Flex from "@components/Flex";
import { ModalViewProps } from "../helpers";
import CloseIcon from "@components/icons/CloseIcon";

export const InformationModal: FC<ModalViewProps> = (props) => {
  const { title, onConfirm, hideModal, description, okText, size } = props;
  return (
    <StyledModalWrap $size={size}>
      <StyledModalContent>
        <Flex justify="space-between">
          <Text $size="title" $top="xsmall">
            {title}
          </Text>

          <CloseIcon onClick={hideModal} size={28} />
        </Flex>

        <Flex justify="flex-end">
          <Flex direction="column">
            <Text $size="default" $top="medium">
              {description}
            </Text>
            <Flex gap="16px" $top="large" justify="start">
              {onConfirm && okText && (
                <button onClick={onConfirm}>{okText}</button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </StyledModalContent>
    </StyledModalWrap>
  );
};
