import { gql } from "@apollo/client";

export const CHARACTER_DETAIL = gql`
query($search: ID!){
	character(id: $search){
    name
    status
    species
    type
    gender
    image
  }
}
`;