import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import Base from "./Base";
import { FUTURE_OPERATIONS } from "../queries";
import { REORDER_OPERATIONS } from "../mutations";

const OperationsPage = () => {

  const [slots, setSlots] = useState(null);

  
  const { loading, data } = useQuery(FUTURE_OPERATIONS, {
    skip: slots !== null,
    onCompleted: data => {
      setSlots([...data.slots]);
    }
  });


  const [reorderOperation, reorderOperationMutation] = useMutation(REORDER_OPERATIONS, {
    onCompleted: data => {
      slots[data.reorderOperations.slot.order - 1] = data.reorderOperations.slot;
      setSlots([...slots]);
    }
  });

  const reorder = (slotId, operationId, index) => {
    reorderOperation({
      variables: {slot: slotId, index, operation: operationId}
    });
  }

  if (!slots) {
    return (
      <Base className="operations-page">
        Loading
      </Base>
    );
  }


  return (
    <Base className="operations-page">
      <div className="slots">
        {slots.map(slot => (
          <div className="slot">
            <h2 className="slot-title">{slot.name}</h2>
            {slot.operations.edges.map(edge => edge.node).map((operation, index) => (
              <div className="operation">
                <h3>{operation.name}</h3>
                <div className="order-buttons">
                  <div
                    className={`order-button ${index === 0 ? "hidden" : ""}`}
                    onClick={() => reorder(slot.id, operation.id, index - 1)}
                  >⬆️</div>
                  <div
                    className={`order-button ${index === slot.operations.edges.length - 1 ? "hidden" : ""}`}
                    onClick={() => reorder(slot.id, operation.id, index + 1)}
                  >⬇️</div>
                </div>
              </div>
            ))}
          </div>
        ))}        
      </div>
    </Base>
  );
};

OperationsPage.propTypes = {
  
};

export default OperationsPage;