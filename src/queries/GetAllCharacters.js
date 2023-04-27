import { gql } from "@apollo/client";

export const GET_ALL_CHARACTERS = gql`
query($page: Int){
    characters(page: $page){
        results{
            id
            name
            image
        }
        info{
            next
            prev
        }
    }
  }  
`;