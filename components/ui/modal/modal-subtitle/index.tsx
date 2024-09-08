import { IModalSubtitleProps } from "./types";
import Text from "../../text";

const ModalSubtitle = (props: IModalSubtitleProps) => {
  const { children } = props || {};

  return (
    <Text size="sm" color="secondary">
      {children}
    </Text>
  );
};

export default ModalSubtitle;
