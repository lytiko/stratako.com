import gql from "graphql-tag";

export const COMPLETE_OPERATION = gql`mutation complete($id: ID!) {
  completeOperation(id: $id) { operation { id } }
}`;

export const ACTIVATE_OPERATION = gql`mutation activate($id: ID!) {
  activateOperation(id: $id) { operation { id slot { order } } }
}`;

export const REORDER_OPERATIONS = gql`mutation reorderOperations(
  $slot: ID! $operation: ID! $index: Int!
) { reorderOperations(slot: $slot operation: $operation index: $index) { slot {
  id order name operations(started: false) { id slotOrder name description }
} } }`;

export const CREATE_OPERATION = gql`mutation createOperation(
  $name: String! $slot: ID!
) { createOperation(name: $name slot: $slot) { operation { id slot { order }}}}`;


export const CREATE_TASK = gql`mutation createTask(
  $name: String! $operation: ID $project: ID
) { createTask(name: $name operation: $operation project: $project) {
  task { id operation { id slot { id order }}}
}}`;

export const UPDATE_TASK = gql`mutation createTask(
  $id: ID! $name: String!
) { updateTask(id: $id name: $name) { task { id name } } }`;

export const TOGGLE_TASK = gql`mutation toggleTask($id: ID!) {
  toggleTask(id: $id) { task { id completed } }
}`;

export const MOVE_TASK = gql`mutation moveTask($id: ID! $index: Int!) {
  moveTask(id: $id index: $index) {
    task { id }
  }
}`;

export const DELETE_TASK = gql`mutation deleteTask($id: ID!) {
  deleteTask(id: $id) { success }
}`;