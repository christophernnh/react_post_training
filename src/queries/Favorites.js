import { gql } from "@apollo/client";

export const FAVORITES = gql`
query($ID: [ID!]!){
	charactersByIds(ids: $ID){
		name
        image
        id
  }
}`;