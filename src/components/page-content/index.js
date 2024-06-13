import React from "react";
import utils from "../../utils";
import { Grid } from "antd";
const { useBreakpoint } = Grid;
/*
    Átomo que DELIMITA CONTAINER DE PÁGINA. Geralmente usado para delimitar o conteúdo
*/
export default function PageContent({
  paddingLeft = 150,
  paddingRight = 150,
  ...props
}) {
  const screens = utils.getBreakPoint(useBreakpoint());
  const isMobile = !screens.includes("md");
  return (
    <div
      style={
        !isMobile
          ? {
              paddingLeft,
              paddingRight,
            }
          : { paddingLeft: 10, paddingRight: 10 }
      }
      {...props}
    />
  );
}
