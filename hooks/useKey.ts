import { RefObject, useEffect, useState } from "react";

type UseKeyFn = (
  keys: string[],
  handler: Function,
  ref?: RefObject<HTMLElement>
) => void;

export const useKey: UseKeyFn = (keys, handler, ref?) => {
  const [keysPressed, setKeysPressed] = useState<string[]>([]);

  useEffect(() => {
    const isMatch = matchKey(keys, keysPressed);
    if (isMatch) handler();
  }, [keysPressed.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (keysPressed.includes(e.key)) return;
      setKeysPressed((prev) => [...prev, e.key]);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const index = keysPressed.indexOf(e.key);

      if (index === -1) return;

      setKeysPressed((prev) => prev.filter((_, i) => i !== index));
    };

    if (ref && ref.current) {
      ref.current.addEventListener("keydown", handleKeyDown);
      ref.current.addEventListener("keyup", handleKeyUp);
    } else {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
    }

    return () => {
      if (ref && ref.current) {
        ref.current.removeEventListener("keydown", handleKeyDown);
        ref.current.removeEventListener("keyup", handleKeyUp);
      } else {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      }
    };
  }, [keys, handler]);
};

function matchKey(handlerKeys: string[], keysPressed: string[]) {
  const onlyOneHandlerKeys = handlerKeys.length < 2;
  const isNotMultiKeys = handlerKeys[0].split("+").length > 0;
  const isMatch = keysPressed.includes(handlerKeys[0]);

  if (onlyOneHandlerKeys && isNotMultiKeys && isMatch) return true;

  let result = true;
  for (let i = 0; i < handlerKeys.length; i++) {
    const processedKeys = handlerKeys[i].split("+");
    result = true;

    for (let j = 0; j < processedKeys.length; j++) {
      const key = processedKeys[j];
      if (keysPressed.includes(key) && processedKeys.length === 1) return true;

      if (!keysPressed.includes(key)) result = false;
    }
  }

  return result;
}
