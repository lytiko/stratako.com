import gql from "graphql-tag";

export const USER_FIELDS = gql`
  fragment UserFields on UserType { 
    id email name defaultProjectGrouping showDoneProjects
  }`;

export const USER = gql`{
  user { 
    ...UserFields
  }
} ${USER_FIELDS}`;

export const TOKEN = gql`{ accessToken }`;

export const SLOTS = gql`{ user { id slots { id name order } } }`;

export const PROJECTS = gql`{ user {
  id projects { id name color status creationTime category }
  projectCategories { id name order }
} }`;

export const PROJECT = gql`query project($id: ID!) { user { id project(id: $id) {
  id name description status color creationTime category
  statusChanges { original timestamp }
  operations { id name started completed projects { id name color } }
} } }`;

export const PROJECT_CATEGORIES = gql`{ user { projectCategories {
  id name order projectCount activeProjectCount
} } }`;

export const FUTURE_OPERATIONS = gql`{ user { id slots { 
  id name order
  futureOperations { id name started completed projects { id name color } }
} } }`;