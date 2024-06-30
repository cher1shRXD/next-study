import React, { Suspense } from "react";
import View from "./view";

const viewPage = () => {
  return (
    <Suspense>
      <View />
    </Suspense>
  );
};

export default viewPage;
