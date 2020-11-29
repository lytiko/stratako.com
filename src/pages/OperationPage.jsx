import React from "react";
import { useRouteMatch } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import Base from "./Base";
import { OPERATION } from "../queries";

const OperationPage = () => {

  const operationId = useRouteMatch("/operations/:id").params.id;

  const { loading, data } = useQuery(OPERATION, {
    variables: { id: operationId}
  });

  if (loading) {
    return (
      <Base className="operation-page">
        Loading
      </Base>
    );
  }

  const operation = data.operation;

  return (
    <Base className="operation-page">
      <h1>{operation.name}</h1>
      <p>{operation.description}</p>

      {operation.started && <div>Started: {operation.started}</div> }
      {operation.completed && <div>Completed: {operation.completed}</div> }
    </Base>
  );
};

OperationPage.propTypes = {
  
};

export default OperationPage;