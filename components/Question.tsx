"use client";
import { askQuestion } from "@/utils/api";
import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightAddon,
  Button,
  Center,
  Spinner,
  Card,
  Text,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { FC, useState } from "react";

interface QuestionProps {}

const Question: FC<QuestionProps> = ({}) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);
  const { colorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "") {
      setError(true);
      return;
    }
    setLoading(true);
    setError(false);
    const answer = await askQuestion(value);
    setResponse(answer);
    onOpen();
    setValue("");
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <InputGroup
          borderRadius={10}
          w={["xs", "sm", "md", "xl"]}
          className="my-5"
        >
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.400" />
          </InputLeftElement>
          <Input
            disabled={loading}
            type="text"
            value={value}
            onChange={onChange}
            placeholder={error ? "Please enter the question" : "Ask a question"}
            border={`1px solid ${
              error ? "red" : colorMode === "dark" ? "#4b5563" : "#A0AEC0"
            } `}
            textColor="gray.400"
            _placeholder={{ color: "gray.400" }}
          />

          <InputRightAddon
            className={`rounded-md bg-slate-400/50 dark:bg-gray-800`}
            p={0}
            mx={3}
            border="none"
          >
            <Button size="sm" disabled={loading} type="submit">
              <SearchIcon
                color={`${colorMode === "dark" ? "gray.400" : "gray.800"}`}
              />
            </Button>
          </InputRightAddon>
        </InputGroup>
      </form>
      {loading && (
        <Center>
          <Spinner />
        </Center>
      )}

      <div className="">
        <Modal closeOnEsc isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent px={1}>
            <ModalHeader>Answer</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{response}</ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </div>
  );
};

export default Question;
