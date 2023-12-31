import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import {
  Box,
  Button,
  Stack,
  Text,
  useToast,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { ModeState } from "../Context/ModeProvider";

const MyChats = ({ fetchAgain }) => {
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  const [loggedUser, setLoggedUser] = useState();
  const { user, setSelectedChat, selectedChat, chats, setChats } = ChatState();
  const toast = useToast();
  const { mode } = ModeState();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);

      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the Chats",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
        flexDir={"column"}
        alignItems={"center"}
        p={3}
        backgroundColor={mode === "light" ? "white" : "#3f3f3f"}
        color={mode === "light" ? "black" : "white"}
        w={{ base: "100%", md: "31%" }}
        borderRadius={"lg"}
        borderWidth={"1px"}>
        <Box
          pb={3}
          px={3}
          fontSize={{ base: "28px", md: "30px" }}
          fontFamily={"Work sans"}
          display={"flex"}
          w={"100%"}
          justifyContent={"space-between"}
          alignItems={"center"}>
          MyChats
          <GroupChatModal>
            <Tooltip
              label="Create a New Group Chat"
              hasArrow
              placement="bottom-end">
              <Button
                display={"flex"}
                fontSize={{ base: "15px", md: "10px", lg: "17px" }}
                padding={1}
                paddingLeft={0}
                rightIcon={<AddIcon />}></Button>
            </Tooltip>
          </GroupChatModal>
        </Box>
        <Box
          display={"flex"}
          flexDir={"column"}
          p={3}
          bg={mode == "light" ? "#F8F8F8" : "#575757"}
          width={"100%"}
          h={"100%"}
          borderRadius={"lg"}
          overflowY={"hidden"}>
          {chats.length > 0 ? (
            <Stack overflow={"scroll"}>
              {chats.map((chat) => {
                return (
                  <Box
                    display={"flex"}
                    onClick={() => setSelectedChat(chat)}
                    cursor={"pointer"}
                    bg={
                      selectedChat === chat
                        ? mode == "light"
                          ? "#38B2AC"
                          : "#116D6E"
                        : mode == "light"
                        ? "#E8E8E8"
                        : "#9DB2BF"
                    }
                    color={selectedChat === chat ? "white" : "black"}
                    px={3}
                    py={2}
                    borderRadius={"lg"}
                    key={chat._id}
                    alignItems={"center"}>
                    <Image
                      borderRadius={"50%"}
                      boxSize={"2.9rem"}
                      objectFit="cover"
                      src={
                        !chat.isGroupChat
                          ? getSenderFull(loggedUser, chat.users).pic
                          : require("./images/group.png")
                      }></Image>
                    <Text ml={2}>
                      {!chat.isGroupChat
                        ? getSender(loggedUser, chat.users)
                        : chat.chatName}
                    </Text>
                  </Box>
                );
              })}
            </Stack>
          ) : (
            ""
          )}
        </Box>
      </Box>
    </>
  );
};

export default MyChats;
