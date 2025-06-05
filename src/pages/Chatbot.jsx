import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Paper,
  ScrollArea,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { useScreen } from "../context/screen.context";
import { PaperAirplaneIcon } from "@primer/octicons-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const { height } = useScreen();
  const handleSend = () => {
    if (input.trim() === "") return;

    const userMsg = { text: input, sender: "user" };
    const botMsg = {
      text: "Thanks! This is just a frontend demo for now.",
      sender: "bot",
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput("");
  };

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <Flex direction={"column"} size="l" px="xs" h={height}>
      <ScrollArea
        ref={scrollRef}
        style={{ flex: 1 }}
        type="auto"
        offsetScrollbars
        scrollbarSize={4}
      >
        <Box py="sm">
          {messages.map((msg, index) => (
            <Flex
              key={index}
              justify={msg.sender === "user" ? "flex-end" : "flex-start"}
              mb="sm"
            >
              <Paper
                shadow="md"
                radius="xl"
                px="md"
                py="xs"
                maw="75%"
                bg={msg.sender === "user" ? "blue.6" : "gray.1"}
                c={msg.sender === "user" ? "white" : "black"}
                style={{
                  wordBreak: "break-word",
                  fontSize: rem(15),
                  lineHeight: 1.4,
                }}
              >
                <Text>{msg.text}</Text>
              </Paper>
            </Flex>
          ))}
        </Box>
      </ScrollArea>
      <Box>
        <Flex gap="xs" align="center">
          <TextInput
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.currentTarget.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            radius="xl"
            style={{ flex: 1 }}
            size="md"
          />
          <Button
            radius="xl"
            onClick={handleSend}
            size="md"
            leftSection={<PaperAirplaneIcon size={18} />}
          >
            Send
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Chatbot;
