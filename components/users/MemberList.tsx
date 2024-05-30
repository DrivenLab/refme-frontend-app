import { Member } from "@/types/user";
import { StyleSheet } from "react-native";
import { FlatList } from "@gluestack-ui/themed";

import MemberItem from "./MemberItem";

type Props = {
  members: Member[];
  idWorkout: number;
};

const MemberList = ({ members, idWorkout }: Props) => {
  return (
    <>
      <FlatList
        height="$3/4"
        data={members}
        renderItem={({ item: member }) => (
          <MemberItem
            member={member}
            idMember={member.id}
            idWorkout={idWorkout}
          />
        )}
        keyExtractor={(item: any) => item.id}
      />
    </>
  );
};

export default MemberList;
const styles = StyleSheet.create({
  MemberList: {
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,

    elevation: 9,
    backgroundColor: "#F3F3F4",
  },
});
