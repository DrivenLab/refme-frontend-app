import React, { useState } from "react";
import {
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  Heading,
  ModalBody,
  Text,
  ModalFooter,
  Button,
  ButtonText,
  Box,
  Pressable,
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@gluestack-ui/themed";
import i18n from "@/languages/i18n";
import { Member } from "@/types/user";
import CBtn from "@/components/CBtn";
import CheckCircle from "@/assets/svgs/CheckCircle";
import { useAuth } from "@/context/auth";
import api from "@/queries/api";

type Props = {
  isModalOpen: boolean;
  onCancel: () => void;
  member: Member;
  idWorkout: number;
};
const ConfirmMemberModal = ({
  isModalOpen,
  onCancel,
  member,
  setSelected,
  idWorkout,
}: Props) => {
  const memberTypeMapping = {
    ["re"]: i18n.t("referee"),
    ["ar"]: i18n.t("assistant_referee"),
  };
  const { currentOrganization } = useAuth();

  const handleAssignReferee = async () => {
    if (!member || !idWorkout) return;
    if (!currentOrganization) {
      throw new Error("Current organization is null");
    }
    const participants = {
      participants: [member.user.id],
    };
    try {
      const { data } = await api.patch(
        `organizations/${currentOrganization.id}/workouts/${idWorkout}/participants/`,
        participants
      );
    } catch (error: any) {
      if (error?.response?.status === 400)
        setError(i18n.t("errors.login_invalid_credentials"));
      else setError(i18n.t("errors.generic_error"));
    } finally {
    }
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={() => {
        setSelected(false);
      }}
      size="lg"
    >
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader justifyContent="center">
          <Heading size="lg" textAlign="center">
            {i18n.t("assign_workout.who_do_test")}
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Box
            flexDirection="row"
            alignItems="center"
            alignContent="center"
            py={"$2"}
          >
            <Box marginRight={20}>
              <Avatar size="m" marginHorizontal="auto">
                <AvatarFallbackText>{member.user?.fullName}</AvatarFallbackText>

                <AvatarImage
                  source={
                    member.user?.profilePicture
                      ? { uri: member.user?.profilePicture }
                      : ""
                  }
                  alt="User Profile picture"
                />
              </Avatar>
            </Box>
            <Box
              flex={1}
              justifyContent="space-arround"
              alignItems="flex-start"
            >
              <Text fontWeight="bold" color="black" fontSize={20}>
                {member.user.fullName ? member.user.fullName : "--"}
              </Text>
              <Text color="black" fontSize={16}>
                {member.memberType
                  ? memberTypeMapping[member.memberType]
                  : "--"}
              </Text>
            </Box>
            <CheckCircle />
          </Box>
          <ModalFooter justifyContent="center">
            <CBtn
              title={i18n.t("common.confirm_and_continue")}
              onPress={handleAssignReferee}
            />
          </ModalFooter>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmMemberModal;
