import { PageTitle } from "@/components/Layout/PageTitle";
import { UsersTable } from "@/components/Users/UsersTable";
import React from "react";

export default function Home() {
  return (
    <>
      <PageTitle title="Manage users" />
      <UsersTable />
    </>
  );
}
