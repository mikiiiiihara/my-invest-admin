import { Center } from "@/components/common/center";
import { Content } from "@/components/common/content";
import React from "react";

const TopComponent = () => {
  return (
    <Center>
      <Content>
        <h2>Admin</h2>
      </Content>
    </Center>
  );
};
TopComponent.displayName = "TopTemplate";
export const TopTemplate = React.memo(TopComponent);
