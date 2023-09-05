"use client";
import { askQuestion } from "@/utils/api";
import { SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputRightAddon,
  Button,
  useColorMode,
  Center,
  Spinner,
  Card,
  Text,
} from "@chakra-ui/react";
import { FC, useState } from "react";

interface QuestionProps {}

const Question: FC<QuestionProps> = ({}) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");
  const { colorMode } = useColorMode();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const answer = await askQuestion(value);
    setResponse(answer);
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
            placeholder={"Ask a question"}
            border="1px solid #A0AEC0"
            textColor="gray.400"
            _placeholder={{ color: "gray.400" }}
          />

          <InputRightAddon
            className={`rounded-md bg-slate-600/50 dark:bg-[#A0AEC0]`}
            p={0}
            mx={3}
            border="none"
          >
            <Button size="sm" disabled={loading} type="submit">
              <SearchIcon color="gray.900" />
            </Button>
          </InputRightAddon>
        </InputGroup>
      </form>
      {loading && (
        <Center>
          <Spinner />
        </Center>
      )}
      {response && (
        <Card maxW={"xl"} variant={"outline"} p={5}>
          <Center>
            <Text>{response}</Text>
          </Center>
        </Card>
      )}
    </div>
  );
};

export default Question;
