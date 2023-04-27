import { gql } from "@apollo/client";

export const SEARCH_CHARACTERS = gql`
query($search: String){
	characters(filter: { name: $search }){
    results {
      name
      id
      image
    }
    info{
        next
        prev
    }
  }
}
`;