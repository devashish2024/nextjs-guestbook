"use client";

import { useState } from "react";
import EntryForm from "./entryform";
import EntryList from "./entrylist";

export default function Guestbook() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey(refreshKey + 1);
  };

  return (
    <>
      <EntryForm refresh={handleRefresh} />
      <EntryList key={refreshKey} />
    </>
  );
}
