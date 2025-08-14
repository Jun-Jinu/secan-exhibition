import React from "react";
import TitleWithColorBlocks from "./TitleWithColorBlocks";

const ExhibitionTitle = ({ sub_title = "2025", main_title = "SECAN EXHIBITION" }) => {
  return <TitleWithColorBlocks sub_title={sub_title} main_title={main_title} align="left" mainTitleSize="3.2rem" />;
};

export default ExhibitionTitle;
